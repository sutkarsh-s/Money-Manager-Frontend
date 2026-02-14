import { memo } from "react";
import { LoaderCircle } from "lucide-react";

const Button = ({
  type = "submit",
  disabled = false,
  isLoading = false,
  loadingText = "Processing...",
  variant = "primary",
  children,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100";
  const variants = {
    primary:
      "w-full py-3 px-4 text-white bg-purple-700 shadow-md shadow-purple-900/20 hover:bg-purple-800 active:scale-[0.98]",
    secondary:
      "py-2 px-4 text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
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
