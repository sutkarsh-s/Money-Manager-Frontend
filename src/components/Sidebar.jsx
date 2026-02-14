import { memo } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="w-64 min-h-[calc(100vh-65px)] bg-white/95 backdrop-blur-sm border-r border-gray-200/80 sticky top-[65px] z-20"
      role="navigation"
      aria-label="Main sidebar"
    >
      {/* Gradient accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-600 rounded-r-full opacity-80" aria-hidden />

      <div className="pl-4 pr-4 py-5">
        {/* Profile card */}
        <div className="flex flex-col items-center gap-3 mb-8 p-4 rounded-2xl bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border border-purple-100/60">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg ring-2 ring-purple-200/50"
            />
          ) : (
            <div
              className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-600"
              aria-hidden
            >
              <User className="w-8 h-8" />
            </div>
          )}
          <h2 className="text-sm font-semibold text-gray-900 truncate w-full text-center">
            {user?.fullName ?? ""}
          </h2>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col gap-1.5" aria-label="Sidebar navigation">
          {SIDE_BAR_DATA.map((item) => {
            const isActive = activeMenu === item.label;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className={`group relative w-full flex items-center gap-4 text-[15px] py-3 px-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg shadow-purple-500/25"
                    : "text-gray-600 hover:bg-purple-50/80 hover:text-purple-700"
                }`}
                aria-current={location.pathname === item.path ? "page" : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full opacity-80" aria-hidden />
                )}
                <span className={`flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 transition-colors ${
                  isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-purple-100"
                }`}>
                  <item.icon className="w-5 h-5" aria-hidden />
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default memo(Sidebar);
