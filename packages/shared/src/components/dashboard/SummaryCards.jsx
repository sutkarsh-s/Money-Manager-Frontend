import { memo } from "react";
import { WalletCards, Wallet, Coins, PiggyBank, TrendingUp, CreditCard } from "lucide-react";
import InfoCard from "../InfoCard.jsx";
import Skeleton from "../ui/Skeleton.jsx";
import { addThousandsSeparator } from "../../util/util.js";

const CARDS = [
  { key: "totalBalance", label: "Total Balance", icon: WalletCards, color: "bg-purple-600" },
  { key: "totalIncome", label: "Total Income", icon: Wallet, color: "bg-emerald-600" },
  { key: "totalExpense", label: "Total Expense", icon: Coins, color: "bg-rose-600" },
  { key: "totalSavings", label: "Savings", icon: PiggyBank, color: "bg-blue-600" },
  { key: "totalInvestments", label: "Investments", icon: TrendingUp, color: "bg-amber-600" },
  { key: "netWorth", label: "Net Worth", icon: CreditCard, color: "bg-indigo-600" },
];

const CardSkeleton = () => (
  <div className="flex gap-5 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 shadow-md">
    <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-32" />
    </div>
  </div>
);

const SummaryCards = ({ data, loading }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
    {loading && !data
      ? Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)
      : CARDS.map(({ key, label, icon: Icon, color }) => (
          <InfoCard
            key={key}
            icon={<Icon className="w-6 h-6" aria-hidden />}
            label={label}
            value={addThousandsSeparator(data?.[key] ?? 0)}
            color={color}
          />
        ))}
  </div>
);

export default memo(SummaryCards);
