import { memo } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { addThousandsSeparator } from "../../util/util.js";

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-3 border border-gray-200 dark:border-gray-700 text-sm">
      <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-6">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span className="font-medium text-gray-900 dark:text-white tabular-nums">
            ₹{addThousandsSeparator(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const IncomeVsExpenseChart = ({ data }) => {
  if (!data?.length) return null;

  const last6 = data.slice(-6);

  return (
    <div className="card">
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Income vs Expense</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Monthly comparison (last 6 months)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={last6} margin={{ top: 5, right: 5, left: -15, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} vertical={false} />
          <XAxis dataKey="monthName" tick={{ fontSize: 12, fill: "#888" }} stroke="none" />
          <YAxis tick={{ fontSize: 11, fill: "#888" }} stroke="none" tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(124, 58, 237, 0.05)" }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={32} />
          <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[6, 6, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(IncomeVsExpenseChart);
