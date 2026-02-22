import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { getErrorMessage } from "../util/errorUtils.js";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

const Category = () => {
  useUser();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const { name, type, icon } = category;
    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }

    const isDuplicate = categoryData.some(
      (c) => c.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("Category Name already exists");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, { name, type, icon });
      if (response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  };

  const handleUpdateCategory = async (updatedCategory) => {
    const { id, name, type, icon } = updatedCategory;
    if (!name.trim()) {
      toast.error("Category Name is required");
      return;
    }
    if (!id) {
      toast.error("Category ID is missing for update");
      return;
    }
    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, type, icon });
      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully");
      fetchCategoryDetails();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dashboard activeMenu="Category">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="All Categories"
          subtitle="Manage your income and expense categories"
          action={
            <button onClick={() => setOpenAddCategoryModal(true)} className="add-btn flex items-center gap-1">
              <Plus size={15} />
              Add Category
            </button>
          }
        />

        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

        <Modal isOpen={openAddCategoryModal} onClose={() => setOpenAddCategoryModal(false)} title="Add Category">
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        <Modal
          onClose={() => { setOpenEditCategoryModal(false); setSelectedCategory(null); }}
          isOpen={openEditCategoryModal}
          title="Update Category"
        >
          <AddCategoryForm initialCategoryData={selectedCategory} onAddCategory={handleUpdateCategory} isEditing />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
