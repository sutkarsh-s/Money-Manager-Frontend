import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { addThousandsSeparator } from "../util/util.js";

const CustomLineChart = ({ data }) => {
  const ChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;

      const groupedItemsForTooltip = dataPoint.items.reduce((acc, item) => {
        const { categoryName, amount } = item;
        if (!acc[categoryName]) {
          acc[categoryName] = { categoryName, totalAmount: 0 };
        }
        acc[categoryName].totalAmount += amount;
        return acc;
      }, {});

      const categoriesInTooltip = Object.values(groupedItemsForTooltip);

      return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</p>
          <hr className="my-1.5 border-gray-200 dark:border-gray-700" />
          <p className="text-sm text-gray-700 dark:text-gray-300 font-bold mb-2">
            Total: <span className="text-purple-600 dark:text-purple-400">&#8377;{addThousandsSeparator(dataPoint.totalAmount)}</span>
          </p>

          {categoriesInTooltip?.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Details:</p>
              {categoriesInTooltip.map((groupedItem, index) => (
                <div key={index} className="flex justify-between text-xs text-gray-700 dark:text-gray-300 gap-4">
                  <span>{groupedItem.categoryName}:</span>
                  <span className="tabular-nums">&#8377;{addThousandsSeparator(groupedItem.totalAmount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#888" }} stroke="none" />
          <YAxis tick={{ fontSize: 12, fill: "#888" }} stroke="none" />
          <Tooltip content={<ChartTooltip />} />

          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#875cf5"
            fill="url(#expenseGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
