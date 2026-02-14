import { useState, useRef, useEffect, useContext, useCallback, memo } from "react";
import { LogOut, X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { clearUser, user } = useContext(AppContext);
  const navigate = useNavigate();

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

  const handleLogout = useCallback(() => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    navigate("/login");
  }, [clearUser, navigate]);

  return (
    <header
      className="flex items-center justify-between gap-5 bg-white/95 backdrop-blur-md border-b border-gray-200/80 py-4 px-4 sm:px-7 sticky top-0 z-30 shadow-sm shadow-gray-200/50"
      role="banner"
    >
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="block lg:hidden p-2.5 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
          onClick={() => setOpenSideMenu(!openSideMenu)}
          aria-label={openSideMenu ? "Close menu" : "Open menu"}
          aria-expanded={openSideMenu}
        >
          {openSideMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex items-center gap-3">
          <img
            src={assets.logo}
            alt=""
            className="h-10 w-10 flex-shrink-0 rounded-xl shadow-md ring-2 ring-purple-100/50"
          />
          <span className="text-lg font-bold text-gray-900 truncate bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            Money Manager
          </span>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-700 hover:from-purple-200 hover:to-indigo-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 overflow-hidden ring-2 ring-purple-200/50"
          aria-haspopup="true"
          aria-expanded={showDropdown}
          aria-label="User menu"
        >
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold">
              {user?.fullName?.charAt(0) ?? "?"}
            </span>
          )}
        </button>

        {showDropdown && (
          <div
            className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/80 py-2 z-50 animate-fade-in overflow-hidden"
            role="menu"
          >
            <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.fullName ?? "User"}
              </p>
              <p className="text-xs text-gray-600 truncate mt-0.5">{user?.email ?? ""}</p>
            </div>

            <div className="py-1">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                role="menuitem"
              >
                <LogOut className="w-4 h-4 text-gray-500" aria-hidden />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {openSideMenu && (
        <div
          className="fixed top-[65px] left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-xl lg:hidden z-20 animate-fade-in"
          role="dialog"
        >
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </header>
  );
};

export default memo(Menubar);
