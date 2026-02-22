import { memo, useContext } from "react";
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
      className="w-64 min-h-[calc(100vh-65px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-r border-gray-200/80 dark:border-gray-700/60 sticky top-[65px] z-20 transition-colors duration-300 overflow-y-auto"
      role="navigation"
      aria-label="Main sidebar"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-600 rounded-r-full opacity-80" aria-hidden />

      <div className="pl-4 pr-4 py-5">
        <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-purple-900/30 dark:to-indigo-900/30 border border-purple-100/60 dark:border-purple-800/40">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt=""
              className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-gray-700 shadow-md ring-1 ring-purple-200/50 dark:ring-purple-700/50 flex-shrink-0"
            />
          ) : (
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-800 dark:to-indigo-800 text-purple-600 dark:text-purple-300 flex-shrink-0"
              aria-hidden
            >
              <User className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {user?.fullName ?? ""}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email ?? ""}
            </p>
          </div>
        </div>

        <nav className="space-y-5" aria-label="Sidebar navigation">
          {SIDE_BAR_DATA.map((group) => (
            <div key={group.section}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-3.5 mb-1.5">
                {group.section}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const isActive = activeMenu === item.label;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigate(item.path)}
                      className={`group relative w-full flex items-center gap-3 text-[13px] py-2 px-3.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md shadow-purple-500/20"
                          : "text-gray-600 dark:text-gray-400 hover:bg-purple-50/80 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300"
                      }`}
                      aria-current={location.pathname === item.path ? "page" : undefined}
                    >
                      <span className={`flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0 transition-colors ${
                        isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40"
                      }`}>
                        <item.icon className="w-4 h-4" aria-hidden />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default memo(Sidebar);
