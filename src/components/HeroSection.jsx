import { memo } from "react";
import { ArrowRight, Shield, TrendingUp, Wallet, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden">
    {/* Gradient mesh background */}
    <div
      className="absolute inset-0 bg-mesh opacity-100"
      aria-hidden
    />
    <div
      className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-white/90 to-indigo-50/70"
      aria-hidden
    />
    {/* Decorative elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-float" aria-hidden />
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} aria-hidden />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200/10 rounded-full blur-3xl" aria-hidden />

    <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 text-purple-700 text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          <span>Smart financial management</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] animate-fade-in-up">
          Take Control of{" "}
          <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Your Finances
          </span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Your foundation for secure, intelligent financial management. Effortlessly track income and expenses to achieve your financial goals.
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-gray-700 bg-white/80 backdrop-blur border border-gray-200/80 hover:bg-white hover:border-purple-200 hover:shadow-lg transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-500 text-sm animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span>Smart Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-indigo-500" />
            <span>All-in-One Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default memo(HeroSection);
