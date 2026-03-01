import { memo } from "react";
import moment from "moment";
import { Download, Mail } from "lucide-react";
import { TransactionInfoCard, EmptyState } from "@mm/shared";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail, onEdit }) => {
  const isEmpty = !transactions?.length;

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">All Expenses</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your expense records</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="card-btn" onClick={onEmail}>
            <Mail size={16} aria-hidden />
            Email
          </button>
          <button type="button" className="card-btn" onClick={onDownload}>
            <Download size={16} aria-hidden />
            Download
          </button>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState
          icon="expense"
          title="No expenses yet"
          description="Your expense records will appear here. Add an expense to get started."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactions?.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.name}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
              onEdit={onEdit ? () => onEdit(expense) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ExpenseList);
