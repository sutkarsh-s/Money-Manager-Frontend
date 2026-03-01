import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Target, Pencil } from "lucide-react";
import { Dashboard, axiosConfig, API_ENDPOINTS, getErrorMessage, Modal, DeleteAlert, EmptyState, Skeleton, PageHeader, ProgressBar } from "@mm/shared";

const Budgets = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ categoryId: "", amount: "", budgetMonth: "" });
  const [deleteId, setDeleteId] = useState(null);
  const [editBudget, setEditBudget] = useState(null);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const fetchBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get(API_ENDPOINTS.GET_BUDGET_SUMMARY, { params: { month: currentMonth } });
      setSummary(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [currentMonth]);

  const fetchCategories = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      setCategories(res.data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  useEffect(() => { fetchBudgets(); }, [fetchBudgets]);

  const handleAdd = async () => {
    if (!form.categoryId || !form.amount) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const payload = {
        categoryId: Number(form.categoryId),
        amount: Number(form.amount),
        budgetMonth: currentMonth,
      };
      if (editBudget) {
        await axiosConfig.put(API_ENDPOINTS.UPDATE_BUDGET(editBudget.id), payload);
        toast.success("Budget updated");
      } else {
        await axiosConfig.post(API_ENDPOINTS.CREATE_BUDGET, payload);
        toast.success("Budget added");
      }
      setShowAdd(false);
      setEditBudget(null);
      setForm({ categoryId: "", amount: "", budgetMonth: "" });
      fetchBudgets();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const openEdit = (b) => {
    setForm({
      categoryId: String(b.categoryId ?? ""),
      amount: String(b.amount ?? ""),
      budgetMonth: currentMonth,
    });
    setEditBudget(b);
    fetchCategories();
    setShowAdd(true);
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_BUDGET(deleteId));
      toast.success("Budget deleted");
      setDeleteId(null);
      fetchBudgets();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Dashboard activeMenu="Budgets">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Budget Planning"
          subtitle="Track spending against your monthly budgets"
          action={
            <button onClick={() => { setShowAdd(true); fetchCategories(); }} className="add-btn add-btn-fill">
              + Add Budget
            </button>
          }
        />

        {loading ? (
          <>
            <Skeleton variant="stats" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </>
        ) : (
          <>
            {summary && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
                <div className="card p-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Budgeted</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                    ₹{summary.totalBudgeted?.toLocaleString()}
                  </p>
                </div>
                <div className="card p-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-red-500 dark:text-red-400 mt-1">
                    ₹{summary.totalSpent?.toLocaleString()}
                  </p>
                </div>
                <div className="card p-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
                  <p className={`text-2xl font-bold mt-1 ${summary.totalRemaining >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    ₹{summary.totalRemaining?.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {!summary?.budgets?.length ? (
              <EmptyState
                icon={Target}
                title="No budgets set"
                description="Create a budget to start tracking your spending this month."
              />
            ) : (
              <div className="space-y-3">
                {summary.budgets.map((b) => {
                  const isOver = b.spent > b.amount;
                  return (
                    <div key={b.id} className="card p-5">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{b.categoryIcon}</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{b.categoryName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(b)}
                            className="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => setDeleteId(b.id)} className="text-red-400 hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>₹{b.spent?.toLocaleString()} spent</span>
                        <span>₹{b.amount?.toLocaleString()} budget</span>
                      </div>
                      <ProgressBar value={b.spent} max={b.amount} color={isOver ? "red" : "purple"} />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={showAdd} onClose={() => { setShowAdd(false); setEditBudget(null); setForm({ categoryId: "", amount: "", budgetMonth: "" }); }} title={editBudget ? "Edit Budget" : "Add Budget"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
            <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="input-box !mb-0 !mt-0">
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget Amount</label>
            <input type="number" placeholder="₹ 0.00" value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <button onClick={handleAdd} className="btn-primary w-full">{editBudget ? "Update Budget" : "Add Budget"}</button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Budget">
        <DeleteAlert content="Are you sure you want to delete this budget?" onDelete={handleDelete} />
      </Modal>
    </Dashboard>
  );
};

export default Budgets;
