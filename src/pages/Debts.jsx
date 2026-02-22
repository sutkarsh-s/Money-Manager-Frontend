import { useState, useEffect, useCallback } from "react";
import Dashboard from "../components/Dashboard.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { getErrorMessage } from "../util/errorUtils.js";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { CreditCard } from "lucide-react";

const DEBT_TYPES = ["MORTGAGE", "CAR_LOAN", "STUDENT_LOAN", "CREDIT_CARD", "PERSONAL_LOAN", "OTHER"];

const STATUS_BADGE = {
  PAID_OFF: "success",
  ACTIVE: "warning",
};

const Debts = () => {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [payDebt, setPayDebt] = useState(null);
  const [payAmount, setPayAmount] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    name: "", icon: "💳", type: "PERSONAL_LOAN", originalAmount: "",
    interestRate: "", emiAmount: "", startDate: "", endDate: "", notes: "",
  });

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get(API_ENDPOINTS.GET_DEBTS);
      setDebts(res.data);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const totalDebt = debts.reduce((s, d) => s + (d.remainingAmount || 0), 0);

  const handleAdd = async () => {
    if (!form.name || !form.originalAmount || !form.startDate) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await axiosConfig.post(API_ENDPOINTS.CREATE_DEBT, {
        ...form, originalAmount: Number(form.originalAmount),
        interestRate: form.interestRate ? Number(form.interestRate) : null,
        emiAmount: form.emiAmount ? Number(form.emiAmount) : null,
        endDate: form.endDate || null,
      });
      toast.success("Debt added");
      setShowAdd(false);
      setForm({ name: "", icon: "💳", type: "PERSONAL_LOAN", originalAmount: "", interestRate: "", emiAmount: "", startDate: "", endDate: "", notes: "" });
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const handlePayment = async () => {
    if (!payAmount || Number(payAmount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await axiosConfig.patch(API_ENDPOINTS.DEBT_PAYMENT(payDebt.id), { amount: Number(payAmount) });
      toast.success("Payment recorded!");
      setPayDebt(null);
      setPayAmount("");
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  const handleDelete = async () => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_DEBT(deleteId));
      toast.success("Debt deleted");
      setDeleteId(null);
      fetchAll();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  return (
    <Dashboard activeMenu="Debts">
      <div className="space-y-6 animate-fade-in">
        <PageHeader
          title="Debt Tracking"
          subtitle="Track loans, credit cards, and repayments"
          action={
            <button onClick={() => setShowAdd(true)} className="add-btn add-btn-fill">+ Add Debt</button>
          }
        />

        {loading ? (
          <>
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </>
        ) : (
          <>
            <div className="card p-5">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Outstanding Debt</p>
              <p className="text-3xl font-bold text-red-500 dark:text-red-400 mt-1">₹{totalDebt.toLocaleString()}</p>
            </div>

            {!debts.length ? (
              <EmptyState
                icon={CreditCard}
                title="No debts tracked"
                description="Great job staying debt-free! Add a debt if you need to track one."
              />
            ) : (
              <div className="space-y-3">
                {debts.map((d) => (
                  <div key={d.id} className="card p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xl">{d.icon}</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{d.name}</span>
                        <Badge variant={STATUS_BADGE[d.status] ?? "neutral"}>
                          {d.status?.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex gap-3 items-center flex-shrink-0">
                        {d.status === "ACTIVE" && (
                          <button onClick={() => setPayDebt(d)}
                            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium transition-colors">
                            Pay
                          </button>
                        )}
                        <button onClick={() => setDeleteId(d.id)} className="text-red-400 hover:text-red-600 text-sm transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>₹{d.paidAmount?.toLocaleString()} paid</span>
                      <span>₹{d.originalAmount?.toLocaleString()} total</span>
                    </div>

                    <ProgressBar value={d.paidAmount} max={d.originalAmount} color="green" />

                    <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
                      <span>{d.type?.replace("_", " ")}</span>
                      {d.interestRate > 0 && <span>{d.interestRate}% interest</span>}
                      {d.emiAmount > 0 && <span>EMI: ₹{d.emiAmount?.toLocaleString()}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Debt">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
            <input type="text" placeholder="e.g. Home Loan" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-box !mb-0 !mt-0">
              {DEBT_TYPES.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Total Amount *</label>
            <input type="number" placeholder="₹ 0.00" value={form.originalAmount}
              onChange={(e) => setForm({ ...form, originalAmount: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Interest Rate (%)</label>
              <input type="number" step="0.01" placeholder="0.00" value={form.interestRate}
                onChange={(e) => setForm({ ...form, interestRate: e.target.value })} className="input-box !mb-0 !mt-0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">EMI Amount</label>
              <input type="number" placeholder="₹ 0.00" value={form.emiAmount}
                onChange={(e) => setForm({ ...form, emiAmount: e.target.value })} className="input-box !mb-0 !mt-0" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Start Date *</label>
            <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input-box !mb-0 !mt-0" />
          </div>
          <button onClick={handleAdd} className="btn-primary w-full">Add Debt</button>
        </div>
      </Modal>

      <Modal isOpen={!!payDebt} onClose={() => setPayDebt(null)} title={`Payment for ${payDebt?.name}`}>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Remaining: ₹{payDebt?.remainingAmount?.toLocaleString()}</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Payment Amount</label>
            <input type="number" placeholder="₹ 0.00" value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)} className="input-box !mb-0 !mt-0" />
          </div>
          <button onClick={handlePayment} className="btn-primary w-full">Record Payment</button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Debt">
        <DeleteAlert content="Delete this debt record?" onDelete={handleDelete} />
      </Modal>
    </Dashboard>
  );
};

export default Debts;
