import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Dashboard, axiosConfig, API_ENDPOINTS, getErrorMessage, Skeleton, PageHeader, ProgressBar } from "@mm/shared";

const Analytics = () => {
  const [netWorth, setNetWorth] = useState(null);
  const [monthly, setMonthly] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [breakdownType, setBreakdownType] = useState("expense");

  const year = new Date().getFullYear();
  const currentMonth = new Date().toISOString().slice(0, 7);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [nw, ms, cb] = await Promise.all([
        axiosConfig.get(API_ENDPOINTS.NET_WORTH),
        axiosConfig.get(API_ENDPOINTS.MONTHLY_SUMMARY, { params: { year } }),
        axiosConfig.get(API_ENDPOINTS.CATEGORY_BREAKDOWN, { params: { month: currentMonth, type: breakdownType } }),
      ]);
      setNetWorth(nw.data);
      setMonthly(ms.data);
      setBreakdown(cb.data);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  }, [year, currentMonth, breakdownType]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fetchBreakdown = async (type) => {
    setBreakdownType(type);
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BREAKDOWN, { params: { month: currentMonth, type } });
      setBreakdown(res.data);
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  if (loading) {
    return (
      <Dashboard activeMenu="Analytics">
        <div className="space-y-6">
          <Skeleton variant="stats" />
          <Skeleton variant="stats" />
          <Skeleton variant="table" />
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard activeMenu="Analytics">
      <div className="space-y-8 animate-fade-in">
        <PageHeader title="Financial Analytics" subtitle="Comprehensive overview of your finances" />

        {netWorth && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Net Worth</h2>
            <div className="card p-6 mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Net Worth</p>
              <p className={`text-3xl font-bold mt-1 ${netWorth.netWorth >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                ₹{netWorth.netWorth?.toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 stagger-children">
              {[
                { label: "Income", val: netWorth.totalIncome, color: "text-emerald-600 dark:text-emerald-400" },
                { label: "Expense", val: netWorth.totalExpense, color: "text-red-500 dark:text-red-400" },
                { label: "Cash", val: netWorth.cashBalance, color: "text-blue-600 dark:text-blue-400" },
                { label: "Savings", val: netWorth.totalSavings, color: "text-purple-600 dark:text-purple-400" },
                { label: "Investments", val: netWorth.totalInvestments, color: "text-indigo-600 dark:text-indigo-400" },
                { label: "Debt", val: netWorth.totalDebt, color: "text-amber-600 dark:text-amber-400" },
              ].map((item) => (
                <div key={item.label} className="card p-4">
                  <p className="text-xs text-gray-400 dark:text-gray-500">{item.label}</p>
                  <p className={`text-lg font-bold ${item.color} mt-0.5`}>₹{item.val?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {monthly && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Monthly Summary — {year}</h2>
            <div className="card p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    <th className="text-left py-3 px-3 font-medium">Month</th>
                    <th className="text-right py-3 px-3 font-medium">Income</th>
                    <th className="text-right py-3 px-3 font-medium">Expense</th>
                    <th className="text-right py-3 px-3 font-medium">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {monthly.months?.map((m) => (
                    <tr key={m.month} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="py-3 px-3 font-medium text-gray-700 dark:text-gray-300">{m.monthName}</td>
                      <td className="text-right py-3 px-3 text-emerald-600 dark:text-emerald-400 tabular-nums">₹{m.income?.toLocaleString()}</td>
                      <td className="text-right py-3 px-3 text-red-500 dark:text-red-400 tabular-nums">₹{m.expense?.toLocaleString()}</td>
                      <td className={`text-right py-3 px-3 font-medium tabular-nums ${m.savings >= 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}>₹{m.savings?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {breakdown && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Category Breakdown</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchBreakdown("expense")}
                  className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                    breakdownType === "expense"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Expense
                </button>
                <button
                  onClick={() => fetchBreakdown("income")}
                  className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                    breakdownType === "income"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>
            <div className="card p-5">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Total: ₹{breakdown.total?.toLocaleString()}
              </p>
              {breakdown.categories?.length ? (
                <div className="space-y-4">
                  {breakdown.categories.map((c) => (
                    <div key={c.categoryId}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-700 dark:text-gray-300">{c.categoryIcon} {c.categoryName}</span>
                        <span className="text-gray-600 dark:text-gray-400 tabular-nums">₹{c.amount?.toLocaleString()} ({c.percentage}%)</span>
                      </div>
                      <ProgressBar value={c.percentage} max={100} color="purple" height="h-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-6">No data for this period</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Analytics;
