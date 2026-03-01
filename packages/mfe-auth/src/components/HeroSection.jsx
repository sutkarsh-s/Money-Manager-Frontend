import { memo, useContext } from "react";
import { ArrowRight, Shield, TrendingUp, Wallet, Sparkles, BarChart3, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "@mm/shared";

const TRUST_BADGES = [
  { icon: Shield, label: "Bank-Grade Security", color: "text-emerald-500" },
  { icon: TrendingUp, label: "Smart Analytics", color: "text-purple-500" },
  { icon: Wallet, label: "All-in-One Dashboard", color: "text-indigo-500" },
  { icon: BarChart3, label: "Visual Reports", color: "text-amber-500" },
  { icon: PiggyBank, label: "Goal Tracking", color: "text-blue-500" },
];

const HeroSection = () => {
  const { user } = useContext(AppContext);
  const firstName = user?.fullName?.split(" ")[0];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-100" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-white/90 to-indigo-50/70 dark:from-gray-900/80 dark:via-gray-900/90 dark:to-gray-800/70" aria-hidden />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 dark:bg-purple-700/10 rounded-full blur-3xl animate-float" aria-hidden />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/15 dark:bg-indigo-700/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} aria-hidden />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-200/10 dark:bg-violet-800/5 rounded-full blur-3xl" aria-hidden />

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 text-sm font-medium mb-8 animate-fade-in border border-purple-200/60 dark:border-purple-700/40">
            <Sparkles className="w-4 h-4" />
            <span>{firstName ? `Welcome back, ${firstName}` : "Your personal finance companion"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] animate-fade-in-up">
            Master Your Money,{" "}
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Shape Your Future
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Track income, manage expenses, plan budgets, grow savings, and monitor investments — all in one beautiful, intelligent dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/signup"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Start Tracking for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200/80 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-lg transition-all duration-200"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-8 text-gray-500 dark:text-gray-400 text-sm animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
