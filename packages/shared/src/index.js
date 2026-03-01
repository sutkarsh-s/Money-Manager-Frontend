// Contexts
export { AppContext, AppContextProvider, useAppContext } from './context/AppContext.jsx';
export { ThemeProvider, useTheme } from './context/ThemeContext.jsx';

// Hooks
export { default as useDashboardData } from './hooks/useDashboardData.jsx';
export { useUser } from './hooks/useUser.jsx';

// UI Components
export { default as Badge } from './components/ui/Badge.jsx';
export { default as Button } from './components/ui/Button.jsx';
export { default as EmptyState } from './components/ui/EmptyState.jsx';
export { default as ErrorAlert } from './components/ui/ErrorAlert.jsx';
export { default as ErrorBoundary } from './components/ui/ErrorBoundary.jsx';
export { default as Greeting } from './components/ui/Greeting.jsx';
export { default as PageHeader } from './components/ui/PageHeader.jsx';
export { default as ProgressBar } from './components/ui/ProgressBar.jsx';
export { default as Skeleton } from './components/ui/Skeleton.jsx';
export { default as ThemeToggle } from './components/ui/ThemeToggle.jsx';

// Layout Components
export { default as Dashboard } from './components/Dashboard.jsx';
export { default as Sidebar } from './components/Sidebar.jsx';
export { default as Menubar } from './components/Menubar.jsx';
export { default as Header } from './components/Header.jsx';
export { default as Footer } from './components/Footer.jsx';
export { default as BrandLogo } from './components/BrandLogo.jsx';
export { default as DeleteAlert } from './components/DeleteAlert.jsx';
export { default as Input } from './components/Input.jsx';
export { default as Modal } from './components/Modal.jsx';
export { default as InfoCard } from './components/InfoCard.jsx';
export { default as ProfilePhotoSelector } from './components/ProfilePhotoSelector.jsx';
export { default as TransactionInfoCard } from './components/TransactionInfoCard.jsx';
export { default as CustomTooltip } from './components/CustomTooltip.jsx';
export { default as CustomLegend } from './components/CustomLegend.jsx';
export { default as CustomLineChart } from './components/CustomLineChart.jsx';
export { default as CustomPieChart } from './components/CustomPieChart.jsx';
export { default as ProtectedRoute } from './components/guards/ProtectedRoute.jsx';
export { default as AuthLayout } from './components/layouts/AuthLayout.jsx';

// Dashboard components
export { default as BudgetVsActualChart } from './components/dashboard/BudgetVsActualChart.jsx';
export { default as DashboardSkeleton } from './components/dashboard/DashboardSkeleton.jsx';
export { default as ExpenseBreakdownChart } from './components/dashboard/ExpenseBreakdownChart.jsx';
export { default as FinancialHealthIndicator } from './components/dashboard/FinancialHealthIndicator.jsx';
export { default as IncomeVsExpenseChart } from './components/dashboard/IncomeVsExpenseChart.jsx';
export { default as MonthlyTrendChart } from './components/dashboard/MonthlyTrendChart.jsx';
export { default as SummaryCards } from './components/dashboard/SummaryCards.jsx';

// Util
export { BASE_URL, API_ENDPOINTS } from './util/apiEndpoints.js';
export { default as axiosInstance } from './util/axiosConfig.jsx';
export { default as axiosConfig } from './util/axiosConfig.jsx';
export * from './util/errorUtils.js';
export * from './util/util.js';
export * from './util/validation.js';
export { default as uploadProfileImage } from './util/uploadProfileImage.js';

// Assets
export { assets, SIDE_BAR_DATA } from './assets/assets.js';
