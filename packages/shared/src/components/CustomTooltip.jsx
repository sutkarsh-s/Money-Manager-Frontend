import { addThousandsSeparator } from "../util/util.js";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-3 border border-gray-200 dark:border-gray-700">
        <p className="text-xs font-semibold text-purple-800 dark:text-purple-400 mb-1">{payload[0].name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Amount: <span className="text-sm font-medium text-gray-900 dark:text-white">&#8377;{addThousandsSeparator(payload[0].value)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
