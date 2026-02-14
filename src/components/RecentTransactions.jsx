import { memo } from "react";
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import EmptyState from "./ui/EmptyState.jsx";

const RecentTransactions = ({ transactions, onMore }) => {
  const items = transactions?.slice(0, 5) ?? [];
  const isEmpty = !items?.length;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Recent Transactions</h4>
          <p className="text-sm text-gray-500 mt-0.5">Your latest activity</p>
        </div>
        <button
          type="button"
          className="card-btn"
          onClick={onMore}
        >
          More <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>

      {isEmpty ? (
        <EmptyState
          icon="transactions"
          title="No transactions yet"
          description="Your recent transactions will appear here. Add income or expenses to get started."
          action={
            <button type="button" className="card-btn" onClick={onMore}>
              View All
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
              type={item.type}
              hideDeleteBtn
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(RecentTransactions);
