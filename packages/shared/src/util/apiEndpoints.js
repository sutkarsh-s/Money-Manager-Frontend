export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dhadf5h7j";

export const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    UPDATE_PROFILE: "/profile",
    CHANGE_PASSWORD: "/profile/change-password",
    DELETE_ACCOUNT: "/profile",

    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,

    GET_ALL_INCOMES: "/incomes",
    ADD_INCOME: "/incomes",
    UPDATE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,

    GET_ALL_EXPENSE: "/expenses",
    ADD_EXPENSE: "/expenses",
    UPDATE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,

    APPLY_FILTERS: "/transactions/filter",
    DASHBOARD_DATA: "/dashboard",

    ADD_LEND_BORROW: "/lend-borrow",
    GET_LEND_BORROW: "/lend-borrow",
    UPDATE_LEND_BORROW: (id) => `/lend-borrow/${id}`,
    DELETE_LEND_BORROW: (id) => `/lend-borrow/${id}`,
    UPDATE_LEND_BORROW_STATUS: (id) => `/lend-borrow/${id}/status`,
    ADD_SETTLEMENT: (id) => `/lend-borrow/${id}/settlements`,
    GET_SETTLEMENTS: (id) => `/lend-borrow/${id}/settlements`,
    DELETE_SETTLEMENT: (id, paymentId) => `/lend-borrow/${id}/settlements/${paymentId}`,

    CONTACT_US: "/support/contact",

    // Budgets
    CREATE_BUDGET: "/budgets",
    GET_BUDGET_SUMMARY: "/budgets/summary",
    UPDATE_BUDGET: (id) => `/budgets/${id}`,
    DELETE_BUDGET: (id) => `/budgets/${id}`,

    // Recurring Transactions
    GET_RECURRING: "/recurring-transactions",
    CREATE_RECURRING: "/recurring-transactions",
    UPDATE_RECURRING: (id) => `/recurring-transactions/${id}`,
    TOGGLE_RECURRING: (id) => `/recurring-transactions/${id}/toggle`,
    DELETE_RECURRING: (id) => `/recurring-transactions/${id}`,

    // Savings Goals
    GET_SAVINGS_GOALS: "/savings-goals",
    CREATE_SAVINGS_GOAL: "/savings-goals",
    UPDATE_SAVINGS_GOAL: (id) => `/savings-goals/${id}`,
    CONTRIBUTE_SAVINGS: (id) => `/savings-goals/${id}/contribute`,
    DELETE_SAVINGS_GOAL: (id) => `/savings-goals/${id}`,

    // Investments
    GET_INVESTMENTS: "/investments",
    CREATE_INVESTMENT: "/investments",
    UPDATE_INVESTMENT: (id) => `/investments/${id}`,
    DELETE_INVESTMENT: (id) => `/investments/${id}`,

    // Debts
    GET_DEBTS: "/debts",
    CREATE_DEBT: "/debts",
    UPDATE_DEBT: (id) => `/debts/${id}`,
    DEBT_PAYMENT: (id) => `/debts/${id}/payment`,
    DELETE_DEBT: (id) => `/debts/${id}`,

    // Analytics
    NET_WORTH: "/analytics/net-worth",
    MONTHLY_SUMMARY: "/analytics/monthly-summary",
    CATEGORY_BREAKDOWN: "/analytics/category-breakdown",

    // Reports
    DOWNLOAD_REPORT: (type, format) => `/reports/download/${type}?format=${format}`,
    INCOME_EXCEL_DOWNLOAD: "/reports/excel/download/income",
    EXPENSE_EXCEL_DOWNLOAD: "/reports/excel/download/expense",
    EMAIL_INCOME: "/reports/email/income",
    EMAIL_EXPENSE: "/reports/email/expense",

    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}
