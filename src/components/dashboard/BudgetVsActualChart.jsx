import { memo } from "react";
import ProgressBar from "../ui/ProgressBar.jsx";
import { addThousandsSeparator } from "../../util/util.js";

const BudgetVsActualChart = ({ data }) => {
  if (!data?.budgets?.length) {
    return (
      <div className="card">
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Budget vs Actual</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Compare planned vs actual spending</p>
        </div>
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">No budgets set for this month</p>
      </div>
    );
  }

  const { totalBudgeted, totalSpent, budgets } = data;
  const overallPct = totalBudgeted > 0 ? Math.min((totalSpent / totalBudgeted) * 100, 100) : 0;
  const isOver = totalSpent > totalBudgeted;

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Budget vs Actual</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Compare planned vs actual spending</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ₹{addThousandsSeparator(totalSpent)} / ₹{addThousandsSeparator(totalBudgeted)}
          </p>
          <p className={`text-sm font-semibold ${isOver ? "text-red-500" : "text-emerald-500"}`}>
            {overallPct.toFixed(0)}% used
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {budgets.slice(0, 5).map((b) => {
          const pct = b.amount > 0 ? Math.min((b.spent / b.amount) * 100, 100) : 0;
          const budgetOver = b.spent > b.amount;
          return (
            <div key={b.id}>
              <div className="flex justify-between items-center text-sm mb-1.5">
                <div className="flex items-center gap-2">
                  <span>{b.categoryIcon}</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{b.categoryName}</span>
                </div>
                <span className={`text-xs tabular-nums ${budgetOver ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
                  ₹{addThousandsSeparator(b.spent)} / ₹{addThousandsSeparator(b.amount)}
                </span>
              </div>
              <ProgressBar value={pct} max={100} color={budgetOver ? "red" : pct > 80 ? "amber" : "purple"} height="h-2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(BudgetVsActualChart);
