import { memo } from "react";
import { Trash2, TrendingDown, TrendingUp, Receipt } from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";
  const amountStyles = isIncome
    ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-emerald-200/80"
    : "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-800 border-rose-200/80";

  return (
    <div className="group relative flex items-center gap-4 p-4 rounded-xl hover:bg-purple-50/50 transition-all duration-200 border border-transparent hover:border-purple-100">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600 group-hover:from-purple-50 group-hover:to-indigo-50 group-hover:text-purple-600 transition-colors">
        {icon ? (
          <img src={icon} alt="" className="w-6 h-6" />
        ) : (
          <Receipt className="w-6 h-6 text-purple-600" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{date}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!hideDeleteBtn && (
            <button
              type="button"
              onClick={onDelete}
              className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
              aria-label="Delete"
            >
              <Trash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-semibold text-xs ${amountStyles}`}
          >
            <span>{isIncome ? "+" : "-"} &#8377;{addThousandsSeparator(amount)}</span>
            {isIncome ? (
              <TrendingUp size={16} className="text-emerald-600" aria-hidden />
            ) : (
              <TrendingDown size={16} className="text-rose-600" aria-hidden />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TransactionInfoCard);
