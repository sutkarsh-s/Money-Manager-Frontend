import { memo } from "react";
import { Wallet, Receipt, FileText } from "lucide-react";

const ICONS = {
  transactions: Receipt,
  expense: Receipt,
  income: Wallet,
  default: FileText,
};

const EmptyState = ({
  icon: IconKey = "default",
  title = "No data yet",
  description = "Get started by adding your first item.",
  action,
}) => {
  const IconComponent = typeof IconKey === "string" ? ICONS[IconKey] || ICONS.default : IconKey;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 text-purple-500 dark:text-purple-400 mb-5">
        <IconComponent className="w-10 h-10" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
};

export default memo(EmptyState);
