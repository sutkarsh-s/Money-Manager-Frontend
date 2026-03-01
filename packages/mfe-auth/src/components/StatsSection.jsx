import { memo } from "react";
import { TrendingUp, PieChart, Wallet, Shield } from "lucide-react";

const STATS = [
  { icon: Wallet, value: "6+", label: "Financial Modules", color: "from-purple-500 to-indigo-500" },
  { icon: PieChart, value: "10+", label: "Chart Types", color: "from-emerald-500 to-teal-500" },
  { icon: TrendingUp, value: "100%", label: "Free to Use", color: "from-amber-500 to-orange-500" },
  { icon: Shield, value: "JWT", label: "Secured APIs", color: "from-blue-500 to-cyan-500" },
];

const StatsSection = () => (
  <section className="relative py-16 md:py-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600" aria-hidden />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMzR2MmgzNHYtMkgyem0wLTMwdjJoMzR2LTJIMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" aria-hidden />

    <div className="relative z-10 container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center group">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform duration-300">
              <stat.icon className="w-7 h-7 text-white" />
            </div>
            <p className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</p>
            <p className="text-purple-200 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default memo(StatsSection);
