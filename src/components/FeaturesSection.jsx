import { memo } from "react";
import {
  BarChart3,
  PiggyBank,
  Tags,
  Filter,
  FileSpreadsheet,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const FEATURES = [
  {
    icon: BarChart3,
    title: "Visual Dashboard",
    description: "Beautiful charts and insights to understand your spending patterns at a glance.",
    gradient: "from-purple-500 to-indigo-500",
    path: "/dashboard",
  },
  {
    icon: Tags,
    title: "Smart Categories",
    description: "Organize income and expenses with custom categories and emojis.",
    gradient: "from-emerald-500 to-teal-500",
    path: "/category",
  },
  {
    icon: PiggyBank,
    title: "Income & Expense Tracking",
    description: "Track every rupee. Add, edit, and manage transactions with ease.",
    gradient: "from-amber-500 to-orange-500",
    path: "/income",
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description: "Filter by date range, category, and more. Find what you need instantly.",
    gradient: "from-rose-500 to-pink-500",
    path: "/filter",
  },
  {
    icon: FileSpreadsheet,
    title: "Export & Download",
    description: "Download your data as Excel. Keep records for taxes and budgeting.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Mail,
    title: "Email Reports",
    description: "Get your financial summary delivered to your inbox on demand.",
    gradient: "from-violet-500 to-purple-500",
  },
];

const FeatureCard = ({ icon: Icon, title, description, gradient, path }) => {
  const content = (
    <div className="group h-full p-6 rounded-2xl bg-white/80 backdrop-blur border border-gray-200/80 hover:border-purple-200/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300">
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );

  if (path) {
    return <Link to={path}>{content}</Link>;
  }
  return content;
};

const FeaturesSection = () => (
  <section className="relative py-20 md:py-32 overflow-hidden">
    <div
      className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white"
      aria-hidden
    />
    <div className="relative z-10 container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Manage Money
          </span>
        </h2>
        <p className="text-gray-600 text-lg">
          Powerful features wrapped in a beautiful, intuitive interface.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
      <div className="mt-16 text-center">
        <Link
          to="/signup"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-200"
        >
          Get Started — It&apos;s Free
        </Link>
      </div>
    </div>
  </section>
);

export default memo(FeaturesSection);
