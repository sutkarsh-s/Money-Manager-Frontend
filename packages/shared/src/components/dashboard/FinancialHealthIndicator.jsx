import { memo, useMemo } from "react";
import { TrendingUp, TrendingDown, Minus, ShieldCheck, AlertTriangle, AlertCircle } from "lucide-react";

const computeHealthScore = (data) => {
  if (!data) return { score: 0, label: "Unknown", color: "gray" };

  let score = 50;
  const { totalIncome, totalExpense, totalBalance, totalSavings, totalInvestments, totalDebt, netWorth } = data;

  const income = Number(totalIncome) || 0;
  const expense = Number(totalExpense) || 0;
  const balance = Number(totalBalance) || 0;
  const savings = Number(totalSavings) || 0;
  const investments = Number(totalInvestments) || 0;
  const debt = Number(totalDebt) || 0;
  const net = Number(netWorth) || 0;

  if (income > 0) {
    const savingsRate = ((income - expense) / income) * 100;
    if (savingsRate >= 30) score += 15;
    else if (savingsRate >= 20) score += 10;
    else if (savingsRate >= 10) score += 5;
    else if (savingsRate < 0) score -= 15;
  }

  if (balance > 0) score += 5;
  else if (balance < 0) score -= 10;

  if (net > 0) score += 10;
  else if (net < 0) score -= 10;

  if (savings > 0) score += 5;
  if (investments > 0) score += 5;

  if (income > 0) {
    const debtToIncome = (debt / income) * 100;
    if (debtToIncome > 50) score -= 15;
    else if (debtToIncome > 30) score -= 5;
    else if (debtToIncome === 0) score += 5;
  }

  score = Math.max(0, Math.min(100, score));

  if (score >= 80) return { score, label: "Excellent", color: "emerald", icon: ShieldCheck };
  if (score >= 60) return { score, label: "Good", color: "blue", icon: TrendingUp };
  if (score >= 40) return { score, label: "Fair", color: "amber", icon: Minus };
  if (score >= 20) return { score, label: "Needs Attention", color: "orange", icon: AlertTriangle };
  return { score, label: "Critical", color: "red", icon: AlertCircle };
};

const COLOR_MAP = {
  emerald: { ring: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
  blue: { ring: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400" },
  amber: { ring: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  orange: { ring: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400" },
  red: { ring: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
  gray: { ring: "text-gray-400", bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-500 dark:text-gray-400" },
};

const FinancialHealthIndicator = ({ dashboardData }) => {
  const health = useMemo(() => computeHealthScore(dashboardData), [dashboardData]);
  const colors = COLOR_MAP[health.color] ?? COLOR_MAP.gray;
  const Icon = health.icon ?? Minus;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (health.score / 100) * circumference;

  const income = Number(dashboardData?.totalIncome) || 0;
  const expense = Number(dashboardData?.totalExpense) || 0;
  const savingsRate = income > 0 ? (((income - expense) / income) * 100).toFixed(1) : "0.0";
  const debt = Number(dashboardData?.totalDebt) || 0;
  const debtToIncome = income > 0 ? ((debt / income) * 100).toFixed(1) : "0.0";

  return (
    <div className="card">
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Health</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Overall assessment of your finances</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor"
              className="text-gray-100 dark:text-gray-700" strokeWidth="10" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor"
              className={colors.ring} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s ease-out" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${colors.text}`}>{health.score}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">/ 100</span>
          </div>
        </div>

        <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg}`}>
          <Icon className={`w-4 h-4 ${colors.text}`} />
          <span className={`text-sm font-semibold ${colors.text}`}>{health.label}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 dark:bg-gray-700/40 p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Savings Rate</p>
          <p className={`text-lg font-bold mt-0.5 ${Number(savingsRate) >= 20 ? "text-emerald-600 dark:text-emerald-400" : Number(savingsRate) >= 0 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
            {savingsRate}%
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 dark:bg-gray-700/40 p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Debt-to-Income</p>
          <p className={`text-lg font-bold mt-0.5 ${Number(debtToIncome) < 30 ? "text-emerald-600 dark:text-emerald-400" : Number(debtToIncome) < 50 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
            {debtToIncome}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(FinancialHealthIndicator);
