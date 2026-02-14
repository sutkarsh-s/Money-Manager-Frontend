import { memo } from "react";
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import EmptyState from "./ui/EmptyState.jsx";

const Transactions = ({ transactions, onMore, type, title }) => {
  const items = transactions?.slice(0, 5) ?? [];
  const isEmpty = !items?.length;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold text-gray-900">{title}</h5>
        <button type="button" className="card-btn" onClick={onMore}>
          More <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>

      {isEmpty ? (
        <EmptyState
          icon={type}
          title={`No ${type}s yet`}
          description={`Your ${type} transactions will appear here. Add one to get started.`}
          action={
            <button type="button" className="card-btn" onClick={onMore}>
              Add {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          }
        />
      ) : (
        <div className="space-y-1">
          {items.map((item) => (
            <TransactionInfoCard
              key={item.id}
              title={item.name}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={type}
              hideDeleteBtn
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Transactions);
