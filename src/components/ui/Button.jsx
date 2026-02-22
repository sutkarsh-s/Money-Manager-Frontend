import { memo } from "react";
import { LoaderCircle } from "lucide-react";

const Button = ({
  type = "submit",
  disabled = false,
  isLoading = false,
  loadingText = "Processing...",
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer";

  const sizes = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-sm",
    lg: "py-3.5 px-6 text-base",
  };

  const variants = {
    primary:
      "w-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 hover:brightness-110 active:scale-[0.98]",
    secondary:
      "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-[0.98]",
    danger:
      "w-full text-white bg-gradient-to-r from-rose-500 to-red-600 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 hover:brightness-110 active:scale-[0.98]",
    outline:
      "text-gray-700 dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98]",
    ghost:
      "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60 active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <LoaderCircle className="animate-spin w-5 h-5" aria-hidden />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default memo(Button);
