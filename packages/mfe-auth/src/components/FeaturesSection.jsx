import { memo } from "react";
import {
  BarChart3, PiggyBank, Tags, Filter, FileSpreadsheet, Mail, HandCoins,
  Target, TrendingUp, CreditCard, Repeat, Activity, IndianRupee,
} from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  { icon: BarChart3, title: "Advanced Dashboard", description: "6 summary cards, monthly trends, expense breakdown, budget tracking, and a financial health score — all at a glance.", gradient: "from-purple-500 to-indigo-500", path: "/dashboard" },
  { icon: Tags, title: "Smart Categories", description: "Organize income and expenses with custom categories and emojis for effortless tracking.", gradient: "from-emerald-500 to-teal-500", path: "/category" },
  { icon: IndianRupee, title: "Income & Expense Tracking", description: "Log every transaction with dates, sources, and categories. See your cash flow in real time.", gradient: "from-cyan-500 to-blue-500", path: "/income" },
  { icon: Target, title: "Budget Planning", description: "Set monthly budgets per category and monitor actual spending against your plan.", gradient: "from-amber-500 to-orange-500", path: "/budgets" },
  { icon: PiggyBank, title: "Savings Goals", description: "Define savings targets, contribute over time, and track progress toward each goal.", gradient: "from-green-500 to-emerald-500", path: "/savings" },
  { icon: TrendingUp, title: "Investment Tracking", description: "Monitor your portfolio with invested amounts, current values, and returns across platforms.", gradient: "from-violet-500 to-purple-500", path: "/investments" },
  { icon: CreditCard, title: "Debt Management", description: "Track loans and debts with EMI schedules, remaining balances, and payment history.", gradient: "from-rose-500 to-pink-500", path: "/debts" },
  { icon: Repeat, title: "Recurring Transactions", description: "Automate repeating income and expenses with configurable schedules.", gradient: "from-indigo-500 to-violet-500", path: "/recurring" },
  { icon: HandCoins, title: "Lend & Borrow", description: "Track who owes you and what you owe with due dates and status management.", gradient: "from-teal-500 to-cyan-500", path: "/lend" },
  { icon: Activity, title: "Financial Analytics", description: "Monthly summaries, category breakdowns, net worth calculations, and trend analysis.", gradient: "from-blue-500 to-indigo-500", path: "/analytics" },
  { icon: Filter, title: "Advanced Filters", description: "Filter by date range, category, keyword, and sort order. Find any transaction instantly.", gradient: "from-pink-500 to-rose-500", path: "/filter" },
  { icon: FileSpreadsheet, title: "Export Reports", description: "Download your data as Excel, CSV, or PDF. Email reports directly to your inbox.", gradient: "from-orange-500 to-amber-500" },
];

const FeatureCard = ({ icon: Icon, title, description, gradient, path }) => {
  const content = (
    <div className="group h-full p-6 rounded-2xl bg-white/80 dark:bg-gray-800/60 backdrop-blur border border-gray-200/80 dark:border-gray-700/60 hover:border-purple-200/80 dark:hover:border-purple-700/60 hover:shadow-xl hover:shadow-purple-500/5 dark:hover:shadow-purple-500/10 transition-all duration-300">
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );

  if (path) return <Link to={path}>{content}</Link>;
  return content;
};

const FeaturesSection = () => (
  <section className="relative py-20 md:py-32 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/10 dark:to-gray-900" aria-hidden />
    <div className="relative z-10 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Manage Money
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          12 powerful modules wrapped in a beautiful, intuitive interface.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default memo(FeaturesSection);
