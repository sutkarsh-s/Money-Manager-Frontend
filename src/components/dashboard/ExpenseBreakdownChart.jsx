import { memo } from "react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from "recharts";
import { addThousandsSeparator } from "../../util/util.js";

const COLORS = ["#7c3aed", "#10b981", "#f43f5e", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#6366f1"];

const ChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { categoryName, amount, percentage } = payload[0].payload;
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-sm">
      <p className="font-semibold text-gray-800 dark:text-gray-200">{categoryName}</p>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        ₹{addThousandsSeparator(amount)} ({percentage}%)
      </p>
    </div>
  );
};

const ChartLegend = ({ payload }) => (
  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3">
    {payload?.map((entry, i) => (
      <div key={i} className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
        <span className="text-xs text-gray-600 dark:text-gray-400">{entry.value}</span>
      </div>
    ))}
  </div>
);

const ExpenseBreakdownChart = ({ data, total }) => {
  const hasData = data?.length > 0;

  return (
    <div className="card">
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Expense Breakdown</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">This month&apos;s spending by category</p>
      </div>

      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={115}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
            <Legend content={<ChartLegend />} />
            <text x="50%" y="48%" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400" fontSize="12">
              Total
            </text>
            <text x="50%" y="56%" textAnchor="middle" className="fill-gray-800 dark:fill-gray-200" fontSize="18" fontWeight="600">
              ₹{addThousandsSeparator(total ?? 0)}
            </text>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-400 dark:text-gray-500 py-12">No expense data this month</p>
      )}
    </div>
  );
};

export default memo(ExpenseBreakdownChart);
