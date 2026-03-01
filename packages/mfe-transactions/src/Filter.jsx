import { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { Search, LoaderCircle } from "lucide-react";
import { Dashboard, useUser, axiosConfig, API_ENDPOINTS, getErrorMessage, TransactionInfoCard, PageHeader, EmptyState } from "@mm/shared";

const Filter = () => {
  useUser();
  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type, startDate, endDate, keyword, sortField, sortOrder,
      });
      setTransactions(response.data);
      setHasSearched(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
  const inputClass = "input-box !mb-0 !mt-0";

  return (
    <Dashboard activeMenu="Filters">
      <div className="space-y-6 animate-fade-in">
        <PageHeader title="Filter Transactions" subtitle="Search and filter your income and expense records" />

        <div className="card">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Filters</h5>
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} htmlFor="type">Type</label>
              <select value={type} id="type" className={inputClass} onChange={(e) => setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="startdate" className={labelClass}>Start Date</label>
              <input value={startDate} id="startdate" type="date" className={inputClass} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="enddate" className={labelClass}>End Date</label>
              <input value={endDate} id="enddate" type="date" className={inputClass} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="sortfield" className={labelClass}>Sort By</label>
              <select value={sortField} id="sortfield" className={inputClass} onChange={(e) => setSortField(e.target.value)}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortorder" className={labelClass}>Order</label>
              <select value={sortOrder} id="sortorder" className={inputClass} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <label htmlFor="keyword" className={labelClass}>Keyword</label>
              <div className="flex gap-2">
                <input value={keyword} id="keyword" type="text" placeholder="Search..." className={`${inputClass} flex-1`} onChange={(e) => setKeyword(e.target.value)} />
                <button type="submit" disabled={loading} className="flex items-center justify-center px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-60">
                  {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Search size={20} />}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="card">
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Results</h5>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoaderCircle className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          ) : !hasSearched ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Apply filters above and click search to find transactions.
            </p>
          ) : transactions.length === 0 ? (
            <EmptyState
              title="No results found"
              description="Try adjusting your filters to find what you're looking for."
            />
          ) : (
            <div className="space-y-1">
              {transactions.map((transaction) => (
                <TransactionInfoCard
                  key={transaction.id}
                  title={transaction.name}
                  icon={transaction.icon}
                  date={moment(transaction.date).format("Do MMM YYYY")}
                  amount={transaction.amount}
                  type={type}
                  hideDeleteBtn
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
