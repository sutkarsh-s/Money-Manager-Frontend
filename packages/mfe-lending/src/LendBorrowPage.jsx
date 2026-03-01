import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Dashboard, Modal, DeleteAlert, useUser, axiosConfig, API_ENDPOINTS, getErrorMessage } from "@mm/shared";
import LendBorrowOverview from "./components/LendBorrowOverview.jsx";
import LendBorrowList from "./components/LendBorrowList.jsx";
import LendBorrowForm from "./components/LendBorrowForm.jsx";

const LendBorrowPage = ({ type }) => {
  useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [pageData, setPageData] = useState({
    page: 0, size: 8, totalPages: 0, totalElements: 0, first: true, last: true,
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, id: null });

  const activeMenu = type === "lend" ? "Lend" : "Borrow";
  const sectionTitle = type === "lend" ? "Lend Entries" : "Borrow Entries";

  const fetchEntries = async (nextPage = pageData.page) => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_LEND_BORROW, {
        params: {
          type: type.toUpperCase(), page: nextPage, size: pageData.size,
          search, status, sortField: "date", sortOrder: "desc",
        },
      });
      if (response.status === 200) {
        setEntries(response.data.content ?? []);
        setPageData((prev) => ({
          ...prev,
          page: response.data.page,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          first: response.data.first,
          last: response.data.last,
        }));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchEntries(0), 250);
    return () => clearTimeout(timer);
  }, [search, status, type]);

  const validatePayload = (payload) => {
    if (!payload.name?.trim()) { toast.error("Please enter a purpose"); return false; }
    if (!payload.personName?.trim()) { toast.error("Please enter person name"); return false; }
    if (!payload.amount || Number(payload.amount) <= 0) { toast.error("Please enter a valid amount"); return false; }
    if (!payload.date || !payload.dueDate) { toast.error("Transaction date and due date are required"); return false; }
    if (payload.dueDate < payload.date) { toast.error("Due date cannot be before transaction date"); return false; }
    return true;
  };

  const handleAdd = async (payload) => {
    if (!validatePayload(payload)) return;
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_LEND_BORROW, {
        ...payload, amount: Number(payload.amount),
      });
      if (response.status === 201) {
        toast.success(`${activeMenu} entry added`);
        setOpenAddModal(false);
        fetchEntries(0);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setOpenEditModal(true);
  };

  const handleUpdate = async (payload) => {
    if (!validatePayload(payload)) return;
    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_LEND_BORROW(selectedEntry.id), {
        ...payload, amount: Number(payload.amount),
      });
      toast.success("Entry updated successfully");
      setOpenEditModal(false);
      setSelectedEntry(null);
      fetchEntries(pageData.page);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_LEND_BORROW(id));
      setOpenDeleteAlert({ show: false, id: null });
      toast.success("Entry deleted successfully");
      fetchEntries(pageData.page);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusUpdate = async (id, nextStatus) => {
    try {
      await axiosConfig.patch(API_ENDPOINTS.UPDATE_LEND_BORROW_STATUS(id), null, {
        params: { status: nextStatus },
      });
      toast.success("Status updated successfully");
      fetchEntries(pageData.page);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleAddSettlement = async (entryId, payload) => {
    try {
      await axiosConfig.post(API_ENDPOINTS.ADD_SETTLEMENT(entryId), {
        amount: Number(payload.amount),
        date: payload.date || null,
        notes: payload.notes || null,
      });
      toast.success("Settlement recorded");
      fetchEntries(pageData.page);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteSettlement = async (entryId, paymentId) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_SETTLEMENT(entryId, paymentId));
      toast.success("Settlement removed");
      fetchEntries(pageData.page);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const pageHeader = useMemo(
    () => <LendBorrowOverview type={type} entries={entries} onAdd={() => setOpenAddModal(true)} />,
    [type, entries],
  );

  return (
    <Dashboard activeMenu={activeMenu}>
      <div className="my-5 mx-auto grid grid-cols-1 gap-6">
        {pageHeader}

        <LendBorrowList
          title={sectionTitle}
          type={type}
          loading={loading}
          entries={entries}
          pageData={pageData}
          search={search}
          status={status}
          onSearch={setSearch}
          onStatusChange={setStatus}
          onPageChange={fetchEntries}
          onDelete={(id) => setOpenDeleteAlert({ show: true, id })}
          onStatusUpdate={handleStatusUpdate}
          onEdit={handleEdit}
          onAddSettlement={handleAddSettlement}
          onDeleteSettlement={handleDeleteSettlement}
        />
      </div>

      <Modal isOpen={openAddModal} onClose={() => setOpenAddModal(false)} title={`Add ${activeMenu}`}>
        <LendBorrowForm type={type} onSubmit={handleAdd} />
      </Modal>

      <Modal
        isOpen={openEditModal}
        onClose={() => { setOpenEditModal(false); setSelectedEntry(null); }}
        title={`Edit ${activeMenu}`}
      >
        <LendBorrowForm type={type} onSubmit={handleUpdate} initialData={selectedEntry} isEditing />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, id: null })}
        title={`Delete ${activeMenu}`}
      >
        <DeleteAlert
          content={`Are you sure you want to delete this ${type} entry?`}
          onDelete={() => handleDelete(openDeleteAlert.id)}
        />
      </Modal>
    </Dashboard>
  );
};

export default LendBorrowPage;
