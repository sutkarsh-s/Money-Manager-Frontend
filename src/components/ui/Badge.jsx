import { memo } from "react";

const VARIANTS = {
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  neutral: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

const Badge = ({ children, variant = "neutral", className = "" }) => (
  <span
    className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${VARIANTS[variant] ?? VARIANTS.neutral} ${className}`}
  >
    {children}
  </span>
);

export default memo(Badge);
