import logo from "./logo.png";
import login_bg from "./login-bg.png";
import landing from "./landing.png";
import {
    ArrowDownCircle, ArrowUpCircle, Coins, FunnelPlus, LayoutDashboard,
    List, Wallet, Target, TrendingUp, CreditCard, Repeat, PiggyBank,
    BarChart3, HandCoins
} from "lucide-react";

export const assets = {
    logo,
    login_bg,
    landing,
}

export const SIDE_BAR_DATA = [
    {
        section: "Overview",
        items: [
            { id: "01", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
            { id: "12", label: "Analytics", icon: BarChart3, path: "/analytics" },
        ],
    },
    {
        section: "Transactions",
        items: [
            { id: "03", label: "Income", icon: Wallet, path: "/income" },
            { id: "04", label: "Expense", icon: Coins, path: "/expense" },
            { id: "02", label: "Categories", icon: List, path: "/category" },
            { id: "13", label: "Filters", icon: FunnelPlus, path: "/filter" },
        ],
    },
    {
        section: "Planning",
        items: [
            { id: "05", label: "Budgets", icon: Target, path: "/budgets" },
            { id: "06", label: "Recurring", icon: Repeat, path: "/recurring" },
            { id: "07", label: "Savings", icon: PiggyBank, path: "/savings" },
        ],
    },
    {
        section: "Portfolio",
        items: [
            { id: "08", label: "Investments", icon: TrendingUp, path: "/investments" },
            { id: "09", label: "Debts", icon: CreditCard, path: "/debts" },
        ],
    },
    {
        section: "Lending",
        items: [
            { id: "10", label: "Lend", icon: ArrowUpCircle, path: "/lend" },
            { id: "11", label: "Borrow", icon: ArrowDownCircle, path: "/borrow" },
        ],
    },
];
