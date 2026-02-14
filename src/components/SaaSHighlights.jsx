import { BarChart3, CalendarCheck2, Layers2, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "Actionable Insights",
    description: "See cashflow trends and make quicker, smarter decisions.",
    icon: BarChart3,
  },
  {
    title: "Due-Date Tracking",
    description: "Stay ahead of lending and borrowing due timelines.",
    icon: CalendarCheck2,
  },
  {
    title: "Unified Workspace",
    description: "Income, expenses, categories, and filters in one dashboard.",
    icon: Layers2,
  },
  {
    title: "Secure Access",
    description: "JWT-authenticated APIs with protected account workflows.",
    icon: ShieldCheck,
  },
];

const SaaSHighlights = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Built like a modern SaaS, designed for everyday money management</h2>
        <p className="mt-3 text-gray-600 text-lg">A practical product experience with clean workflows, responsive layouts, and meaningful financial context.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 hover:border-purple-200 hover:bg-white hover:shadow-lg transition-all duration-200">
            <item.icon className="w-6 h-6 text-purple-600" />
            <h3 className="mt-4 font-semibold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SaaSHighlights;
