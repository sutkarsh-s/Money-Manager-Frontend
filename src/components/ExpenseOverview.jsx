import { useEffect, useState, memo } from "react";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart.jsx";
import { prepareIncomeLineChartData } from "../util/util.js";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h5 className="text-lg font-semibold text-gray-900">Expense Overview</h5>
          <p className="text-sm text-gray-500 mt-0.5">
            Track your spending trends over time
          </p>
        </div>

        <button
          type="button"
          className="add-btn shrink-0"
          onClick={onExpenseIncome}
        >
          <Plus size={18} aria-hidden />
          Add Expense
        </button>
      </div>

      <div className="mt-6">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default memo(ExpenseOverview);
