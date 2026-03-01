import { memo } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
        isDark
          ? "bg-gray-700 text-amber-400 hover:bg-gray-600"
          : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600"
      } ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5" aria-hidden />
      ) : (
        <Moon className="w-5 h-5" aria-hidden />
      )}
    </button>
  );
};

export default memo(ThemeToggle);
