import { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import InfoCard from "../components/InfoCard.jsx";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { getErrorMessage } from "../util/errorUtils.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";
import Greeting from "../components/ui/Greeting.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import { AppContext } from "../context/AppContext.jsx";

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const infoCards = [
    {
      icon: <WalletCards className="w-6 h-6" aria-hidden />,
      label: "Total Balance",
      value: addThousandsSeparator(dashboardData?.totalBalance ?? 0),
      color: "bg-purple-600",
    },
    {
      icon: <Wallet className="w-6 h-6" aria-hidden />,
      label: "Total Income",
      value: addThousandsSeparator(dashboardData?.totalIncome ?? 0),
      color: "bg-emerald-600",
    },
    {
      icon: <Coins className="w-6 h-6" aria-hidden />,
      label: "Total Expense",
      value: addThousandsSeparator(dashboardData?.totalExpense ?? 0),
      color: "bg-rose-600",
    },
  ];

  const InfoCardSkeleton = () => (
    <div className="flex gap-5 p-6 rounded-2xl bg-white/80 border border-gray-100 shadow-md">
      <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  );

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-6 mx-auto animate-fade-in">
        <Greeting userName={user?.fullName} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {loading && !dashboardData ? (
            <>
              <InfoCardSkeleton />
              <InfoCardSkeleton />
              <InfoCardSkeleton />
            </>
          ) : (
            infoCards.map((card) => (
              <InfoCard
                key={card.label}
                icon={card.icon}
                label={card.label}
                value={card.value}
                color={card.color}
              />
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance ?? 0}
            totalIncome={dashboardData?.totalIncome ?? 0}
            totalExpense={dashboardData?.totalExpense ?? 0}
          />

          <Transactions
            transactions={dashboardData?.recent5Expenses ?? []}
            onMore={() => navigate("/expense")}
            type="expense"
            title="Recent Expenses"
          />

          <Transactions
            transactions={dashboardData?.recent5Incomes ?? []}
            onMore={() => navigate("/income")}
            type="income"
            title="Recent Incomes"
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
