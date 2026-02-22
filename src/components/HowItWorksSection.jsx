import { memo } from "react";
import { UserPlus, LayoutDashboard, Target, TrendingUp } from "lucide-react";

const STEPS = [
  { step: 1, icon: UserPlus, title: "Create Your Account", description: "Sign up in seconds with email verification. Your data is protected from day one.", color: "from-purple-500 to-indigo-500" },
  { step: 2, icon: LayoutDashboard, title: "Add Your Transactions", description: "Log income, expenses, and categorize them. Set up recurring entries to save time.", color: "from-emerald-500 to-teal-500" },
  { step: 3, icon: Target, title: "Set Goals & Budgets", description: "Create savings goals, plan monthly budgets, and track investments and debts.", color: "from-amber-500 to-orange-500" },
  { step: 4, icon: TrendingUp, title: "Watch Your Money Grow", description: "Visualize trends, monitor health scores, and export reports to stay on track.", color: "from-blue-500 to-cyan-500" },
];

const HowItWorksSection = () => (
  <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-800/50 transition-colors">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get Started in{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            4 Simple Steps
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          From zero to financial clarity in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
        {STEPS.map(({ step, icon: Icon, title, description, color }) => (
          <div key={step} className="relative text-center group">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
              </div>
              <span className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 text-xs font-bold text-purple-600 dark:text-purple-400 shadow-md border border-purple-100 dark:border-purple-800">
                {step}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default memo(HowItWorksSection);
