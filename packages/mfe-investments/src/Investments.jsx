import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { TrendingUp, Pencil } from "lucide-react";
import { Dashboard, axiosConfig, API_ENDPOINTS, getErrorMessage, Modal, DeleteAlert, EmptyState, Skeleton, PageHeader, Badge } from "@mm/shared";

const INVESTMENT_TYPES = ["STOCKS", "MUTUAL_FUND", "FIXED_DEPOSIT", "CRYPTO", "REAL_ESTATE", "GOLD", "BONDS", "OTHER"];

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editInvestment, setEditInvestment] = useState(null);
  const [form, setForm] = useState({
    name: "", icon: "📈", type: "STOCKS", investedAmount: "",
    currentValue: "", purchaseDate: "", notes: "",
  });

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get(API_ENDPOINTS.GET_INVESTMENTS);
      setInvestments(res.data);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const totals = investments.reduce((acc, i) => ({
    invested: acc.invested + (i.investedAmount || 0),
    current: acc.current + (i.currentValue || 0),
  }), { invested: 0, current: 0 });

  const handleAdd = async () => {
    if (!form.name || !form.investedAmount || !form.currentValue || !form.purchaseDate) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      const payload = {
        ...form, investedAmount: Number(form.investedAmount),
        currentValue: Number(form.currentValue),
      };
      if (editInvestment) {
        await axiosConfig.put(API_ENDPOINTS.UPDATE_INVESTMENT(editInvestment.id), payload);
        toast.success("Investment updated");
      } else {
        await axiosConfig.post(API_ENDPOINTS.CREATE_INVESTMENT, payload);
        toast.success("Investment added");
      }
      setShowAdd(false);
      setEditInvestment(null);
      setForm({ name: "", icon: "📈", type: "STOCKS", investedAmount: "", currentValue: "", purchaseDate: "", notes: "" });
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const openEdit = (inv) => {
    setForm({
      name: inv.name || "",
      icon: inv.icon || "📈",
      type: inv.type || "STOCKS",
      investedAmount: String(inv.investedAmount ?? ""),
      currentValue: String(inv.currentValue ?? ""),
      purchaseDate: inv.purchaseDate?.slice(0, 10) || "",
      notes: inv.notes || "",
    });
    setEditInvestment(inv);
    setShowAdd(true);
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INVESTMENT(deleteId));
      toast.success("Investment deleted");
      setDeleteId(null);
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const returnAmount = totals.current - totals.invested;

  return (
    <Dashboard activeMenu="Investments">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Investment Tracking"
          subtitle="Track your portfolio and returns"
          action={
            <button onClick={() => setShowAdd(true)} className="add-btn add-btn-fill">+ Add Investment</button>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
              <div className="card p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Invested</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">₹{totals.invested.toLocaleString()}</p>
              </div>
              <div className="card p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">₹{totals.current.toLocaleString()}</p>
              </div>
              <div className="card p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Returns</p>
                <p className={`text-2xl font-bold mt-1 ${returnAmount >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {returnAmount >= 0 ? "+" : ""}₹{returnAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {!investments.length ? (
              <EmptyState
                icon={TrendingUp}
                title="No investments tracked"
                description="Add your first investment to start tracking your portfolio."
              />
            ) : (
              <div className="space-y-3">
                {investments.map((inv) => (
                  <div key={inv.id} className="card p-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-lg">{inv.icon}</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{inv.name}</span>
                          <Badge variant="purple">{inv.type?.replace("_", " ")}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
                          Invested: ₹{inv.investedAmount?.toLocaleString()} &middot; Current: ₹{inv.currentValue?.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                        <p className={`font-semibold ${inv.gainLoss >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {inv.gainLoss >= 0 ? "+" : ""}₹{inv.gainLoss?.toLocaleString()} ({inv.gainLossPercent?.toFixed(1)}%)
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(inv)}
                            className="text-purple-500 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm transition-colors"
                            aria-label="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => setDeleteId(inv.id)} className="text-red-400 hover:text-red-600 text-xs transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={showAdd} onClose={() => { setShowAdd(false); setEditInvestment(null); setForm({ name: "", icon: "📈", type: "STOCKS", investedAmount: "", currentValue: "", purchaseDate: "", notes: "" }); }} title={editInvestment ? "Edit Investment" : "Add Investment"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
            <input type="text" placeholder="e.g. Apple Stock" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Icon</label>
            <input type="text" placeholder="e.g. 📈" value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-box !mb-0 !mt-0">
              {INVESTMENT_TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Invested *</label>
              <input type="number" placeholder="₹ 0.00" value={form.investedAmount}
                onChange={(e) => setForm({ ...form, investedAmount: e.target.value })} className="input-box !mb-0 !mt-0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Value *</label>
              <input type="number" placeholder="₹ 0.00" value={form.currentValue}
                onChange={(e) => setForm({ ...form, currentValue: e.target.value })} className="input-box !mb-0 !mt-0" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Purchase Date *</label>
            <input type="date" value={form.purchaseDate} onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Notes</label>
            <textarea placeholder="Optional notes" value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-box !mb-0 !mt-0" rows={2} />
          </div>
          <button onClick={handleAdd} className="btn-primary w-full">{editInvestment ? "Update Investment" : "Add Investment"}</button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Investment">
        <DeleteAlert content="Delete this investment?" onDelete={handleDelete} />
      </Modal>
    </Dashboard>
  );
};

export default Investments;
