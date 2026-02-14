import { memo } from "react";
import Header from "../Header.jsx";
import { assets } from "../../assets/assets.js";

const AuthLayout = ({ children, title, subtitle, maxWidth = "max-w-md" }) => (
  <div className="min-h-screen w-full flex flex-col bg-slate-50">
    <Header />
    <main className="flex-grow w-full relative flex items-center justify-center overflow-hidden py-12">
      {/* Background image with gradient overlay */}
      <img
        src={assets.login_bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-md scale-105 select-none pointer-events-none opacity-60"
        role="presentation"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-purple-800/40"
        aria-hidden
      />
      {/* Decorative mesh */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(at 30% 20%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(at 70% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className={`relative z-10 w-full ${maxWidth} px-6 animate-fade-in`}
        role="article"
      >
        <div className="glass rounded-3xl shadow-2xl shadow-purple-500/10 border border-white/60 p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center mb-8">
            {subtitle}
          </p>
          {children}
        </div>
      </div>
    </main>
  </div>
);

export default memo(AuthLayout);
