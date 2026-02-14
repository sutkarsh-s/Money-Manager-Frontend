import { memo } from "react";
import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`flex items-center gap-2 text-sm text-red-800 bg-red-50 border border-red-100 rounded-lg p-3 ${className}`}
    >
      <AlertCircle className="flex-shrink-0 w-4 h-4 text-red-600" aria-hidden />
      <span>{message}</span>
    </div>
  );
};

export default memo(ErrorAlert);
