import { memo } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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

const MonthlyTrendChart = ({ data }) => {
  if (!data?.length) return null;

  return (
    <div className="card">
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Trend</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Income, expense, and savings over the year</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
          <XAxis dataKey="monthName" tick={{ fontSize: 12, fill: "#888" }} stroke="none" />
          <YAxis tick={{ fontSize: 11, fill: "#888" }} stroke="none" tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
          <Tooltip content={<ChartTooltip />} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" fill="url(#incomeGrad)" strokeWidth={2.5} dot={false} />
          <Area type="monotone" dataKey="expense" name="Expense" stroke="#f43f5e" fill="url(#expenseGrad)" strokeWidth={2.5} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(MonthlyTrendChart);
