import { CirclePlus } from "lucide-react";
import { addThousandsSeparator } from "../../util/util.js";

const LendBorrowOverview = ({ type, entries, onAdd }) => {
  const total = entries.reduce((acc, item) => acc + Number(item.amount || 0), 0);
  const pendingCount = entries.filter((item) => item.status === "PENDING").length;
  const overdueCount = entries.filter((item) => item.status === "OVERDUE").length;

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{type === "lend" ? "Lend Overview" : "Borrow Overview"}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current page financial snapshot</p>
        </div>

        <button type="button" onClick={onAdd} className="add-btn add-btn-fill">
          <CirclePlus className="w-4 h-4" />
          Add Entry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
          <p className="text-xl font-semibold text-purple-700 dark:text-purple-400 mt-1">₹{addThousandsSeparator(total)}</p>
        </div>
        <div className="rounded-xl p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-xl font-semibold text-amber-700 dark:text-amber-400 mt-1">{pendingCount}</p>
        </div>
        <div className="rounded-xl p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/40">
          <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
          <p className="text-xl font-semibold text-rose-700 dark:text-rose-400 mt-1">{overdueCount}</p>
        </div>
      </div>
    </div>
  );
};

export default LendBorrowOverview;
