import moment from "moment";
import { Search } from "lucide-react";
import EmptyState from "../ui/EmptyState.jsx";
import Skeleton from "../ui/Skeleton.jsx";
import { addThousandsSeparator } from "../../util/util.js";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "OVERDUE", label: "Overdue" },
];

const statusStyles = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  OVERDUE: "bg-rose-50 text-rose-700 border-rose-200",
};

const LendBorrowList = ({
  title,
  type,
  loading,
  entries,
  pageData,
  search,
  status,
  onSearch,
  onStatusChange,
  onPageChange,
  onDelete,
  onStatusUpdate,
}) => {
  const isEmpty = !loading && !entries?.length;

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h5 className="text-lg font-semibold text-gray-900">{title}</h5>
          <p className="text-sm text-gray-500 mt-0.5">Search, filter and manage your records</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={({ target }) => onSearch(target.value)}
              placeholder="Search by name or person"
              className="w-full sm:w-64 bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>
          <select
            value={status}
            onChange={({ target }) => onStatusChange(target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
      ) : isEmpty ? (
        <EmptyState
          icon={type}
          title={`No ${type} entries yet`}
          description={`Your ${type} entries will appear here once you add them.`}
        />
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border border-gray-200/80 bg-white flex flex-col lg:flex-row lg:items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                  {entry.icon || "💸"}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">{entry.name}</p>
                  <p className="text-xs text-gray-500">
                    {entry.personName} • {moment(entry.date).format("Do MMM YYYY")}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">₹{addThousandsSeparator(entry.amount)}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyles[entry.status] || statusStyles.PENDING}`}>
                  {entry.status}
                </span>
                <span className="text-xs text-gray-500">Due: {moment(entry.dueDate).format("Do MMM")}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {entry.status !== "PAID" && (
                  <button
                    type="button"
                    className="card-btn !py-2 !px-3"
                    onClick={() => onStatusUpdate(entry.id, "PAID")}
                  >
                    Mark Paid
                  </button>
                )}
                {entry.status === "PAID" && (
                  <button
                    type="button"
                    className="card-btn !py-2 !px-3"
                    onClick={() => onStatusUpdate(entry.id, "PENDING")}
                  >
                    Mark Pending
                  </button>
                )}
                <button type="button" className="card-btn !py-2 !px-3 hover:!text-rose-700" onClick={() => onDelete(entry.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && pageData?.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Page {pageData.page + 1} of {pageData.totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="card-btn !py-2 !px-3"
              disabled={pageData.first}
              onClick={() => onPageChange(pageData.page - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className="card-btn !py-2 !px-3"
              disabled={pageData.last}
              onClick={() => onPageChange(pageData.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LendBorrowList;
