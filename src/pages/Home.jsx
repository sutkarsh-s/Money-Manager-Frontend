import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import useDashboardData from "../hooks/useDashboardData.jsx";
import { AppContext } from "../context/AppContext.jsx";
import Greeting from "../components/ui/Greeting.jsx";
import SummaryCards from "../components/dashboard/SummaryCards.jsx";
import MonthlyTrendChart from "../components/dashboard/MonthlyTrendChart.jsx";
import IncomeVsExpenseChart from "../components/dashboard/IncomeVsExpenseChart.jsx";
import ExpenseBreakdownChart from "../components/dashboard/ExpenseBreakdownChart.jsx";
import BudgetVsActualChart from "../components/dashboard/BudgetVsActualChart.jsx";
import FinancialHealthIndicator from "../components/dashboard/FinancialHealthIndicator.jsx";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton.jsx";

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const { loading, dashboard, monthlySummary, categoryBreakdown, budgetSummary } = useDashboardData();

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-6 mx-auto animate-fade-in">
        {loading && !dashboard ? (
          <DashboardSkeleton />
        ) : (
          <>
            <Greeting userName={user?.fullName} />

            <SummaryCards data={dashboard} loading={false} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <MonthlyTrendChart data={monthlySummary?.months} />
              </div>
              <FinancialHealthIndicator dashboardData={dashboard} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <ExpenseBreakdownChart
                data={categoryBreakdown?.categories}
                total={categoryBreakdown?.total}
              />
              <BudgetVsActualChart data={budgetSummary} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <IncomeVsExpenseChart data={monthlySummary?.months} />
              <FinanceOverview
                totalBalance={dashboard?.totalBalance ?? 0}
                totalIncome={dashboard?.totalIncome ?? 0}
                totalExpense={dashboard?.totalExpense ?? 0}
              />
            </div>

            <div className="mt-8">
              <RecentTransactions
                transactions={dashboard?.recentTransactions}
                onMore={() => navigate("/expense")}
              />
            </div>
          </>
        )}
      </div>
    </Dashboard>
  );
};

export default Home;
