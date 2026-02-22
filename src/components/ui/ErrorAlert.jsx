import { memo } from "react";
import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`flex items-center gap-2.5 text-sm text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 rounded-xl p-3.5 ${className}`}
    >
      <AlertCircle className="flex-shrink-0 w-4 h-4 text-red-600 dark:text-red-400" aria-hidden />
      <span>{message}</span>
    </div>
  );
};

export default memo(ErrorAlert);
