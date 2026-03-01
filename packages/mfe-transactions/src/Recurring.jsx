import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Repeat, Pencil } from "lucide-react";
import { Dashboard, axiosConfig, API_ENDPOINTS, getErrorMessage, Modal, DeleteAlert, EmptyState, Skeleton, PageHeader, Badge } from "@mm/shared";

const Recurring = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "", icon: "", amount: "", type: "EXPENSE", frequency: "MONTHLY",
    startDate: "", endDate: "", categoryId: "",
  });

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get(API_ENDPOINTS.GET_RECURRING);
      setTransactions(res.data);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const fetchCategories = async (type) => {
    try {
      const t = type === "INCOME" ? "income" : "expense";
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE(t));
      setCategories(res.data);
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const handleAdd = async () => {
    if (!form.name || !form.amount || !form.categoryId || !form.startDate) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const payload = { ...form, amount: Number(form.amount), categoryId: Number(form.categoryId) };
      if (editId) {
        await axiosConfig.put(API_ENDPOINTS.UPDATE_RECURRING(editId), payload);
        toast.success("Recurring transaction updated");
      } else {
        await axiosConfig.post(API_ENDPOINTS.CREATE_RECURRING, payload);
        toast.success("Recurring transaction created");
      }
      setShowAdd(false);
      setEditId(null);
      setForm({ name: "", icon: "", amount: "", type: "EXPENSE", frequency: "MONTHLY", startDate: "", endDate: "", categoryId: "" });
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const openEdit = (t) => {
    setForm({
      name: t.name || "",
      icon: t.icon || "",
      amount: String(t.amount ?? ""),
      type: t.type || "EXPENSE",
      frequency: t.frequency || "MONTHLY",
      startDate: t.startDate?.slice(0, 10) || "",
      endDate: t.endDate?.slice(0, 10) || "",
      categoryId: String(t.categoryId ?? ""),
    });
    setEditId(t.id);
    fetchCategories(t.type);
    setShowAdd(true);
  };

  const handleToggle = async (id) => {
    try {
      await axiosConfig.patch(API_ENDPOINTS.TOGGLE_RECURRING(id));
      toast.success("Status toggled");
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_RECURRING(deleteId));
      toast.success("Deleted");
      setDeleteId(null);
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  return (
    <Dashboard activeMenu="Recurring">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Recurring Transactions"
          subtitle="Manage your automatic income and expense entries"
          action={
            <button onClick={() => { setShowAdd(true); fetchCategories(form.type); }} className="add-btn add-btn-fill">
              + Add Recurring
            </button>
          }
        />

        {loading ? (
          <>
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </>
        ) : !transactions.length ? (
          <EmptyState
            icon={Repeat}
            title="No recurring transactions"
            description="Set up automatic income or expense entries that repeat on a schedule."
          />
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="card p-5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg">{t.icon}</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{t.name}</span>
                      <Badge variant={t.type === "INCOME" ? "success" : "danger"}>
                        {t.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                      ₹{t.amount?.toLocaleString()} &middot; {t.frequency} &middot; {t.categoryName}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Next: {t.nextExecutionDate}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => openEdit(t)}
                      className="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleToggle(t.id)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                        t.isActive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/60"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {t.isActive ? "Active" : "Paused"}
                    </button>
                    <button onClick={() => setDeleteId(t.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showAdd} onClose={() => { setShowAdd(false); setEditId(null); setForm({ name: "", icon: "", amount: "", type: "EXPENSE", frequency: "MONTHLY", startDate: "", endDate: "", categoryId: "" }); }} title={editId ? "Edit Recurring Transaction" : "Add Recurring Transaction"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
            <input type="text" placeholder="e.g. Netflix Subscription" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Icon</label>
            <input type="text" placeholder="e.g. 📺" value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Amount *</label>
            <input type="number" placeholder="₹ 0.00" value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => { setForm({ ...form, type: e.target.value, categoryId: "" }); fetchCategories(e.target.value); }} className="input-box !mb-0 !mt-0">
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Frequency</label>
              <select value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} className="input-box !mb-0 !mt-0">
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
            <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="input-box !mb-0 !mt-0">
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Start Date *</label>
            <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">End Date (optional)</label>
            <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <button onClick={handleAdd} className="btn-primary w-full">{editId ? "Update" : "Create"}</button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Recurring Transaction">
        <DeleteAlert content="Delete this recurring transaction?" onDelete={handleDelete} />
      </Modal>
    </Dashboard>
  );
};

export default Recurring;
