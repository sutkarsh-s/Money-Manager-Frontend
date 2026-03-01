import { useState, useRef, useEffect, useContext, useCallback, memo } from "react";
import { LogOut, X, Menu, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";
import BrandLogo from "./BrandLogo.jsx";
import ThemeToggle from "./ui/ThemeToggle.jsx";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { clearUser, user } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setOpenSideMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  useEffect(() => {
    if (openSideMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [openSideMenu]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  }, [clearUser, navigate]);

  return (
    <header
      className="flex items-center justify-between gap-5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-700/60 py-3 px-4 sm:px-7 sticky top-0 z-30 shadow-sm shadow-gray-200/50 dark:shadow-none transition-colors duration-300"
      role="banner"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="block lg:hidden p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          onClick={() => setOpenSideMenu(!openSideMenu)}
          aria-label={openSideMenu ? "Close menu" : "Open menu"}
          aria-expanded={openSideMenu}
        >
          {openSideMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <BrandLogo />
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-800 dark:to-indigo-800 text-purple-700 dark:text-purple-300 hover:from-purple-200 hover:to-indigo-200 dark:hover:from-purple-700 dark:hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 overflow-hidden ring-2 ring-purple-200/50 dark:ring-purple-700/50"
            aria-haspopup="true"
            aria-expanded={showDropdown}
            aria-label="User menu"
          >
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold">
                {user?.fullName?.charAt(0) ?? "?"}
              </span>
            )}
          </button>

          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-700 py-2 z-50 animate-scale-in overflow-hidden"
              role="menu"
            >
              <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-900/20 dark:to-indigo-900/20">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.fullName ?? "User"}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">{user?.email ?? ""}</p>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setShowDropdown(false); navigate("/profile"); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400 transition-colors"
                  role="menuitem"
                >
                  <Settings className="w-4 h-4" aria-hidden />
                  <span>Profile Settings</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-700 dark:hover:text-rose-400 transition-colors"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4" aria-hidden />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {openSideMenu && (
        <>
          <div
            className="fixed inset-0 top-[57px] bg-black/40 dark:bg-black/60 backdrop-blur-sm lg:hidden z-20"
            onClick={() => setOpenSideMenu(false)}
            aria-hidden
          />
          <div
            className="fixed top-[57px] left-0 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-2xl lg:hidden z-30 animate-slide-in overflow-y-auto"
            role="dialog"
          >
            <Sidebar activeMenu={activeMenu} onNavigate={() => setOpenSideMenu(false)} />
          </div>
        </>
      )}
    </header>
  );
};

export default memo(Menubar);
