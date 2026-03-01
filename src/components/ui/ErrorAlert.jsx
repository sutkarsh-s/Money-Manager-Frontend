import { memo, useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ message, className = "", duration = 5000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!visible || !message) return null;

  return (
    <div
      role="alert"
      className={`flex items-center gap-2.5 text-sm text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800/50 rounded-xl p-3.5 animate-fade-in ${className}`}
    >
      <AlertCircle className="flex-shrink-0 w-4 h-4 text-red-600 dark:text-red-400" aria-hidden />
      <span>{message}</span>
    </div>
  );
};

export default memo(ErrorAlert);
