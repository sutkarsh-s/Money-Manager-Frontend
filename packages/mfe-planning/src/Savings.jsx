import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { PiggyBank, Pencil } from "lucide-react";
import { Dashboard, axiosConfig, API_ENDPOINTS, getErrorMessage, Modal, DeleteAlert, EmptyState, Skeleton, PageHeader, Badge, ProgressBar } from "@mm/shared";

const STATUS_BADGE = {
  ACTIVE: "info",
  COMPLETED: "success",
};

const Savings = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [contributeGoal, setContributeGoal] = useState(null);
  const [contributeAmt, setContributeAmt] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [editGoal, setEditGoal] = useState(null);
  const [form, setForm] = useState({ name: "", icon: "🎯", targetAmount: "", targetDate: "" });

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get(API_ENDPOINTS.GET_SAVINGS_GOALS);
      setGoals(res.data);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchGoals(); }, [fetchGoals]);

  const handleAdd = async () => {
    if (!form.name || !form.targetAmount) {
      toast.error("Name and target amount are required");
      return;
    }
    try {
      const payload = {
        ...form, targetAmount: Number(form.targetAmount),
        targetDate: form.targetDate || null,
      };
      if (editGoal) {
        await axiosConfig.put(API_ENDPOINTS.UPDATE_SAVINGS_GOAL(editGoal.id), payload);
        toast.success("Savings goal updated");
      } else {
        await axiosConfig.post(API_ENDPOINTS.CREATE_SAVINGS_GOAL, payload);
        toast.success("Savings goal created");
      }
      setShowAdd(false);
      setEditGoal(null);
      setForm({ name: "", icon: "🎯", targetAmount: "", targetDate: "" });
      fetchGoals();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const openEdit = (g) => {
    setForm({
      name: g.name || "",
      icon: g.icon || "🎯",
      targetAmount: String(g.targetAmount ?? ""),
      targetDate: g.targetDate?.slice(0, 10) || "",
    });
    setEditGoal(g);
    setShowAdd(true);
  };

  const handleContribute = async () => {
    if (!contributeAmt || Number(contributeAmt) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await axiosConfig.patch(API_ENDPOINTS.CONTRIBUTE_SAVINGS(contributeGoal.id), { amount: Number(contributeAmt) });
      toast.success("Contribution added!");
      setContributeGoal(null);
      setContributeAmt("");
      fetchGoals();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_SAVINGS_GOAL(deleteId));
      toast.success("Goal deleted");
      setDeleteId(null);
      fetchGoals();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  return (
    <Dashboard activeMenu="Savings">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Savings Goals"
          subtitle="Set targets and track your progress"
          action={
            <button onClick={() => setShowAdd(true)} className="add-btn add-btn-fill">+ New Goal</button>
          }
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        ) : !goals.length ? (
          <EmptyState
            icon={PiggyBank}
            title="No savings goals yet"
            description="Create your first savings goal and start tracking your progress."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((g) => (
              <div key={g.id} className="card p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{g.name}</h3>
                      <Badge variant={STATUS_BADGE[g.status] ?? "neutral"}>
                        {g.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(g)}
                      className="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => setDeleteId(g.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">
                      Delete
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>₹{g.currentAmount?.toLocaleString()} saved</span>
                  <span>₹{g.targetAmount?.toLocaleString()} target</span>
                </div>

                <ProgressBar value={g.currentAmount} max={g.targetAmount} color="purple" height="h-3" showLabel />

                <div className="flex justify-between items-center">
                  {g.targetDate && <p className="text-xs text-gray-400 dark:text-gray-500">Target: {g.targetDate}</p>}
                  {g.status === "ACTIVE" && (
                    <button onClick={() => setContributeGoal(g)}
                      className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors ml-auto">
                      + Contribute
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showAdd} onClose={() => { setShowAdd(false); setEditGoal(null); setForm({ name: "", icon: "🎯", targetAmount: "", targetDate: "" }); }} title={editGoal ? "Edit Savings Goal" : "New Savings Goal"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Goal Name *</label>
            <input type="text" placeholder="e.g. Emergency Fund" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Icon</label>
            <input type="text" placeholder="e.g. 🎯" value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Target Amount *</label>
            <input type="number" placeholder="₹ 0.00" value={form.targetAmount}
              onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Target Date (optional)</label>
            <input type="date" value={form.targetDate} onChange={(e) => setForm({ ...form, targetDate: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <button onClick={handleAdd} className="btn-primary w-full">{editGoal ? "Update Goal" : "Create Goal"}</button>
        </div>
      </Modal>

      <Modal isOpen={!!contributeGoal} onClose={() => setContributeGoal(null)} title={`Contribute to ${contributeGoal?.name}`}>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current: ₹{contributeGoal?.currentAmount?.toLocaleString()} / ₹{contributeGoal?.targetAmount?.toLocaleString()}
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Amount</label>
            <input type="number" placeholder="₹ 0.00" value={contributeAmt}
              onChange={(e) => setContributeAmt(e.target.value)} className="input-box !mb-0 !mt-0" />
          </div>
          <button onClick={handleContribute} className="btn-primary w-full">Add Contribution</button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Savings Goal">
        <DeleteAlert content="Delete this savings goal?" onDelete={handleDelete} />
      </Modal>
    </Dashboard>
  );
};

export default Savings;
