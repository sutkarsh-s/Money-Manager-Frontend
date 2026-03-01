import { memo } from "react";
import { CustomPieChart, addThousandsSeparator } from "@mm/shared";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#7c3aed", "#10b981", "#f43f5e"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card">
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Overview</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Balance distribution</p>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default memo(FinanceOverview);
