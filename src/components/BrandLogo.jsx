import { memo } from "react";
import { Landmark } from "lucide-react";

const BrandLogo = ({ size = "md", showText = true }) => {
  const sizeMap = {
    sm: "w-9 h-9",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center gap-3 min-w-0">
      <span
        className={`${sizeMap[size] ?? sizeMap.md} flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30`}
        aria-hidden
      >
        <Landmark className="w-5 h-5" />
      </span>
      {showText && (
        <span className="text-lg font-bold text-gray-900 truncate bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          Money Manager
        </span>
      )}
    </div>
  );
};

export default memo(BrandLogo);
