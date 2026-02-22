import { memo } from "react";
import { BarChart3, CalendarCheck2, Layers2, ShieldCheck, Moon, FileDown } from "lucide-react";

const highlights = [
  { title: "Actionable Insights", description: "See cashflow trends, health scores, and make quicker financial decisions.", icon: BarChart3 },
  { title: "Budget Tracking", description: "Set category budgets and monitor actual spending against your plan in real time.", icon: CalendarCheck2 },
  { title: "Unified Workspace", description: "Income, expenses, budgets, savings, investments, and debts in one dashboard.", icon: Layers2 },
  { title: "Secure Access", description: "JWT-authenticated APIs with email verification and encrypted passwords.", icon: ShieldCheck },
  { title: "Dark Mode", description: "Full light and dark theme support with system preference detection.", icon: Moon },
  { title: "Export & Reports", description: "Download Excel, CSV, or PDF reports. Email summaries directly to your inbox.", icon: FileDown },
];

const SaaSHighlights = () => (
  <section className="py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Built like a modern SaaS, designed for everyday money management
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
          Enterprise-grade architecture with clean workflows, responsive layouts, and meaningful financial context.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/50 p-5 hover:border-purple-200 dark:hover:border-purple-700 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg dark:hover:shadow-purple-500/5 transition-all duration-200">
            <item.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default memo(SaaSHighlights);
