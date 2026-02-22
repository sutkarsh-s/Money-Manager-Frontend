import { memo } from "react";

const GRADIENTS = {
  purple: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 shadow-purple-500/30",
  green: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 shadow-emerald-500/30",
  red: "bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 shadow-rose-500/30",
  "bg-purple-600": "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 shadow-purple-500/30",
  "bg-emerald-600": "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 shadow-emerald-500/30",
  "bg-rose-600": "bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 shadow-rose-500/30",
  "bg-blue-600": "bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 shadow-blue-500/30",
  "bg-amber-600": "bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 shadow-amber-500/30",
  "bg-indigo-600": "bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600 shadow-indigo-500/30",
};

const GLOW_COLORS = {
  purple: "bg-purple-500", green: "bg-emerald-500", red: "bg-rose-500",
  "bg-purple-600": "bg-purple-500", "bg-emerald-600": "bg-emerald-500", "bg-rose-600": "bg-rose-500",
  "bg-blue-600": "bg-blue-500", "bg-amber-600": "bg-amber-500", "bg-indigo-600": "bg-indigo-500",
};

const InfoCard = ({ icon, label, value, color = "purple" }) => {
  const gradientClass =
    GRADIENTS[color] ?? (color?.startsWith("bg-") ? `${color} text-white shadow-lg` : GRADIENTS.purple);
  const glowColor = GLOW_COLORS[color] ?? "bg-purple-500";

  return (
    <article
      className="group relative flex gap-5 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 40px -15px rgba(0,0,0,0.08)",
      }}
      aria-labelledby={`info-${label?.replace(/\s/g, "-")}`}
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity -translate-y-1/2 translate-x-1/2 ${glowColor}`}
        aria-hidden
      />
      <div
        className={`relative flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl text-white shadow-lg ${gradientClass}`}
        aria-hidden
      >
        {icon}
      </div>
      <div className="relative min-w-0 flex-1">
        <h3
          id={`info-${label?.replace(/\s/g, "-")}`}
          className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-0.5"
        >
          {label}
        </h3>
        <p className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
          &#8377;{value}
        </p>
      </div>
    </article>
  );
};

export default memo(InfoCard);
