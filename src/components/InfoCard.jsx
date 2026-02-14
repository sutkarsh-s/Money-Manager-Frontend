import { memo } from "react";

const GRADIENTS = {
  purple: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 shadow-purple-500/30",
  green: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 shadow-emerald-500/30",
  red: "bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 shadow-rose-500/30",
  "bg-purple-600": "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 shadow-purple-500/30",
  "bg-emerald-600": "bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 shadow-emerald-500/30",
  "bg-rose-600": "bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 shadow-rose-500/30",
};

const InfoCard = ({ icon, label, value, color = "purple" }) => {
  const gradientClass =
    GRADIENTS[color] ?? (color?.startsWith("bg-") ? `${color} text-white shadow-lg` : GRADIENTS.purple);

  return (
    <article
      className="group relative flex gap-5 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 10px 40px -15px rgba(0,0,0,0.08)",
      }}
      aria-labelledby={`info-${label?.replace(/\s/g, "-")}`}
    >
      {/* Subtle gradient accent on hover */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity -translate-y-1/2 translate-x-1/2 ${
          color?.includes("purple") ? "bg-purple-500" : color?.includes("emerald") || color === "green" ? "bg-emerald-500" : "bg-rose-500"
        }`}
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
          className="text-sm font-medium text-gray-500 mb-0.5"
        >
          {label}
        </h3>
        <p className="text-xl font-bold text-gray-900 tabular-nums">
          &#8377;{value}
        </p>
      </div>
    </article>
  );
};

export default memo(InfoCard);
