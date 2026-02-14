import { memo } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProductShowcase = () => (
  <section className="relative py-20 md:py-32 overflow-hidden">
    <div
      className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-white to-indigo-50/30"
      aria-hidden
    />
    <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-gray-200/80 bg-white/50 backdrop-blur-sm p-4 md:p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 rounded-3xl pointer-events-none" aria-hidden />
        <img
          src={assets.landing}
          className="relative w-full h-auto object-cover rounded-2xl"
          alt="Money Manager Dashboard Preview"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/1200x600/F8FAFC/7C3AED?text=Dashboard+Preview";
          }}
        />
        <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-lg">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your financial command center</h3>
            <p className="text-sm text-gray-600">Track, analyze, and grow your money in one place.</p>
          </div>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all duration-200 shrink-0"
          >
            Try it free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default memo(ProductShowcase);
