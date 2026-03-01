import { memo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="relative py-20 md:py-28 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" aria-hidden />
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/10 rounded-full blur-3xl" aria-hidden />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-800/10 rounded-full blur-3xl" aria-hidden />

    <div className="relative z-10 container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 text-sm font-medium mb-6 border border-purple-200/60 dark:border-purple-700/40">
          <Sparkles className="w-4 h-4" />
          <span>100% Free — No Credit Card Required</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          Ready to Take Control of{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Your Finances?
          </span>
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-10">
          Join thousands making smarter financial decisions every day. Start tracking, planning, and growing your wealth today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/signup"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default memo(CTASection);
