import { memo, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isSelect,
  options = [],
  error,
  id,
  autoComplete,
  required,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${label?.replace(/\s/g, "-").toLowerCase() || Math.random()}`;

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const inputBaseStyles =
    "w-full bg-gray-50 border rounded-lg py-2.5 px-3 text-gray-800 text-base transition-colors duration-200";
  const inputFocusStyles =
    "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white";
  const inputErrorStyles = error
    ? "border-red-300 focus:ring-red-500/20 focus:border-red-500"
    : "border-gray-200";

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden>*</span>}
      </label>
      <div className="relative">
        {isSelect ? (
          <select
            id={inputId}
            className={`${inputBaseStyles} ${inputFocusStyles} ${inputErrorStyles} pr-10 appearance-none cursor-pointer`}
            value={value}
            onChange={(e) => onChange?.(e)}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              id={inputId}
              className={`${inputBaseStyles} ${inputFocusStyles} ${inputErrorStyles} ${
                type === "password" ? "pr-11" : "pr-3"
              }`}
              type={type === "password" ? (showPassword ? "text" : "password") : type}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange?.(e)}
              autoComplete={autoComplete}
              aria-invalid={!!error}
              aria-describedby={error ? `${inputId}-error` : undefined}
              {...rest}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-500" aria-hidden />
                ) : (
                  <Eye size={18} className="text-gray-500" aria-hidden />
                )}
              </button>
            )}
          </>
        )}
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default memo(Input);
