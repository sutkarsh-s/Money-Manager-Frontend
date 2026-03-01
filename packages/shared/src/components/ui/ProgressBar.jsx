import { memo } from "react";

const COLOR_MAP = {
  purple: "bg-gradient-to-r from-purple-500 to-indigo-500",
  green: "bg-gradient-to-r from-green-400 to-green-600",
  red: "bg-gradient-to-r from-red-400 to-red-600",
  blue: "bg-gradient-to-r from-blue-400 to-blue-600",
  amber: "bg-gradient-to-r from-amber-400 to-amber-600",
};

const ProgressBar = ({
  value = 0,
  max = 100,
  color = "purple",
  height = "h-2.5",
  showLabel = false,
  className = "",
}) => {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const barColor = COLOR_MAP[color] ?? COLOR_MAP.purple;

  return (
    <div className={className}>
      <div className={`w-full bg-gray-100 dark:bg-gray-700 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} rounded-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mt-1">
          {pct.toFixed(1)}%
        </p>
      )}
    </div>
  );
};

export default memo(ProgressBar);
