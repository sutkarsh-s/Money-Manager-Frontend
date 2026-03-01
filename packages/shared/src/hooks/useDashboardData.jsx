import { useState, useEffect, useCallback } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { getErrorMessage } from "../util/errorUtils.js";

const currentYear = new Date().getFullYear();
const currentMonth = `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState(null);
  const [budgetSummary, setBudgetSummary] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [dashRes, monthlyRes, catRes, budgetRes] = await Promise.allSettled([
        axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA),
        axiosConfig.get(API_ENDPOINTS.MONTHLY_SUMMARY, { params: { year: currentYear } }),
        axiosConfig.get(API_ENDPOINTS.CATEGORY_BREAKDOWN, { params: { month: currentMonth, type: "expense" } }),
        axiosConfig.get(API_ENDPOINTS.GET_BUDGET_SUMMARY, { params: { month: currentMonth } }),
      ]);

      if (dashRes.status === "fulfilled") setDashboard(dashRes.value.data);
      else toast.error(getErrorMessage(dashRes.reason));

      if (monthlyRes.status === "fulfilled") setMonthlySummary(monthlyRes.value.data);
      if (catRes.status === "fulfilled") setCategoryBreakdown(catRes.value.data);
      if (budgetRes.status === "fulfilled") setBudgetSummary(budgetRes.value.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { loading, dashboard, monthlySummary, categoryBreakdown, budgetSummary, refresh: fetchAll };
};

export default useDashboardData;
