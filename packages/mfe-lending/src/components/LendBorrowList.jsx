import { useState } from "react";
import moment from "moment";
import { Search, ChevronDown, ChevronUp, Pencil, Trash2, Plus } from "lucide-react";
import { EmptyState, Skeleton, addThousandsSeparator, ProgressBar } from "@mm/shared";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Paid" },
  { value: "OVERDUE", label: "Overdue" },
];

const statusStyles = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700/50",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700/50",
  OVERDUE: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-700/50",
};

const LendBorrowList = ({
  title, type, loading, entries, pageData, search, status,
  onSearch, onStatusChange, onPageChange, onDelete, onStatusUpdate,
  onEdit, onAddSettlement, onDeleteSettlement,
}) => {
  const isEmpty = !loading && !entries?.length;
  const [expandedId, setExpandedId] = useState(null);
  const [settlementForm, setSettlementForm] = useState({ amount: "", date: "", notes: "" });
  const [showSettlementForm, setShowSettlementForm] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    setShowSettlementForm(null);
    setSettlementForm({ amount: "", date: "", notes: "" });
  };

  const handleSettlementSubmit = (entryId) => {
    if (!settlementForm.amount || Number(settlementForm.amount) <= 0) return;
    onAddSettlement(entryId, settlementForm);
    setSettlementForm({ amount: "", date: "", notes: "" });
    setShowSettlementForm(null);
  };

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Search, filter and manage your records</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={({ target }) => onSearch(target.value)}
              placeholder="Search by name or person"
              className="w-full sm:w-64 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:bg-gray-700 transition-all"
            />
          </div>
          <select
            value={status}
            onChange={({ target }) => onStatusChange(target.value)}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 px-3 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:bg-gray-700"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
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
          {entries.map((entry) => {
            const isExpanded = expandedId === entry.id;
            const paidAmt = entry.paidAmount || 0;
            const totalAmt = entry.amount || 0;
            const hasSettlements = entry.settlements?.length > 0;

            return (
              <div
                key={entry.id}
                className="rounded-xl border border-gray-200/80 dark:border-gray-700/60 bg-white dark:bg-gray-800/50 transition-colors overflow-hidden"
              >
                <div className="p-4 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl flex-shrink-0">
                      {entry.icon || "💸"}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{entry.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {entry.personName} &middot; {moment(entry.date).format("Do MMM YYYY")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tabular-nums">
                      ₹{addThousandsSeparator(totalAmt)}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyles[entry.status] || statusStyles.PENDING}`}>
                      {entry.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Due: {moment(entry.dueDate).format("Do MMM")}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {entry.status !== "PAID" && (
                      <button type="button" className="card-btn !py-2 !px-3" onClick={() => onStatusUpdate(entry.id, "PAID")}>
                        Mark Paid
                      </button>
                    )}
                    {entry.status === "PAID" && (
                      <button type="button" className="card-btn !py-2 !px-3" onClick={() => onStatusUpdate(entry.id, "PENDING")}>
                        Mark Pending
                      </button>
                    )}
                    <button type="button" className="card-btn !py-2 !px-3" onClick={() => toggleExpand(entry.id)}>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      Settlements
                    </button>
                    {onEdit && (
                      <button type="button" className="card-btn !py-2 !px-3 hover:!text-purple-700 dark:hover:!text-purple-400" onClick={() => onEdit(entry)}>
                        <Pencil size={14} />
                      </button>
                    )}
                    <button type="button" className="card-btn !py-2 !px-3 hover:!text-rose-700 dark:hover:!text-rose-400" onClick={() => onDelete(entry.id)}>
                      Delete
                    </button>
                  </div>
                </div>

                {/* Settlement progress bar */}
                {(paidAmt > 0 || hasSettlements) && (
                  <div className="px-4 pb-3">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                      <span>₹{addThousandsSeparator(paidAmt)} settled</span>
                      <span>₹{addThousandsSeparator(totalAmt)} total</span>
                    </div>
                    <ProgressBar
                      value={paidAmt}
                      max={totalAmt}
                      color={paidAmt >= totalAmt ? "green" : "purple"}
                    />
                  </div>
                )}

                {/* Expanded settlement section */}
                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-900/30 p-4 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <h6 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Payment History</h6>
                      {entry.status !== "PAID" && (
                        <button
                          type="button"
                          className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium flex items-center gap-1 transition-colors"
                          onClick={() => setShowSettlementForm(showSettlementForm === entry.id ? null : entry.id)}
                        >
                          <Plus size={14} /> Record Payment
                        </button>
                      )}
                    </div>

                    {/* Add settlement form */}
                    {showSettlementForm === entry.id && (
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Amount *</label>
                            <input
                              type="number"
                              placeholder="₹ 0.00"
                              value={settlementForm.amount}
                              onChange={(e) => setSettlementForm({ ...settlementForm, amount: e.target.value })}
                              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
                            <input
                              type="date"
                              value={settlementForm.date}
                              onChange={(e) => setSettlementForm({ ...settlementForm, date: e.target.value })}
                              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Notes</label>
                            <input
                              type="text"
                              placeholder="Optional"
                              value={settlementForm.notes}
                              onChange={(e) => setSettlementForm({ ...settlementForm, notes: e.target.value })}
                              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="add-btn add-btn-fill !py-2 !px-4 text-sm"
                            onClick={() => handleSettlementSubmit(entry.id)}
                          >
                            Add Payment
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Settlement list */}
                    {hasSettlements ? (
                      <div className="space-y-2">
                        {entry.settlements.map((s) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs font-bold flex-shrink-0">
                                ₹
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                  ₹{addThousandsSeparator(s.amount)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {moment(s.date).format("Do MMM YYYY")}
                                  {s.notes && ` — ${s.notes}`}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onDeleteSettlement(entry.id, s.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                              aria-label="Remove settlement"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                        No payments recorded yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!loading && pageData?.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Page {pageData.page + 1} of {pageData.totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button type="button" className="card-btn !py-2 !px-3" disabled={pageData.first} onClick={() => onPageChange(pageData.page - 1)}>
              Previous
            </button>
            <button type="button" className="card-btn !py-2 !px-3" disabled={pageData.last} onClick={() => onPageChange(pageData.page + 1)}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LendBorrowList;
