import { memo } from "react";
import { Pencil, Trash2, TrendingDown, TrendingUp, Receipt } from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  onEdit,
}) => {
  const isIncome = type === "income";
  const amountStyles = isIncome
    ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-700/50"
    : "bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 text-rose-800 dark:text-rose-400 border-rose-200/80 dark:border-rose-700/50";

  return (
    <div className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all duration-200 border border-transparent hover:border-purple-100 dark:hover:border-purple-800/40">
      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-600 dark:text-gray-400 group-hover:from-purple-50 group-hover:to-indigo-50 dark:group-hover:from-purple-900/30 dark:group-hover:to-indigo-900/30 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
        {icon ? (
          <img src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Receipt className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{date}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label="Edit"
            >
              <Pencil size={16} />
            </button>
          )}
          {!hideDeleteBtn && (
            <button
              type="button"
              onClick={onDelete}
              className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}

          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border font-semibold text-xs ${amountStyles}`}
          >
            <span>{isIncome ? "+" : "-"} &#8377;{addThousandsSeparator(amount)}</span>
            {isIncome ? (
              <TrendingUp size={14} className="text-emerald-600 dark:text-emerald-400 hidden sm:block" aria-hidden />
            ) : (
              <TrendingDown size={14} className="text-rose-600 dark:text-rose-400 hidden sm:block" aria-hidden />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TransactionInfoCard);
