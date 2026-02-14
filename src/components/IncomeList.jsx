import { useState, memo } from "react";
import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import EmptyState from "./ui/EmptyState.jsx";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);
  const isEmpty = !transactions?.length;

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h5 className="text-lg font-semibold text-gray-900">Income Sources</h5>
          <p className="text-sm text-gray-500 mt-0.5">Manage your income records</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={loading}
            className="card-btn"
            onClick={handleEmail}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={16} aria-hidden />
                Email
              </>
            )}
          </button>
          <button
            type="button"
            disabled={loading}
            className="card-btn"
            onClick={handleDownload}
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} aria-hidden />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState
          icon="income"
          title="No income yet"
          description="Your income records will appear here. Add an income to get started."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactions?.map((income) => (
            <TransactionInfoCard
              key={income.id}
              title={income.name}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(IncomeList);
