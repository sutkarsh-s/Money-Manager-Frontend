import { memo } from "react";

const Skeleton = ({ className = "", variant = "default" }) => {
  if (variant === "card") {
    return (
      <div className="card p-5 space-y-4" aria-hidden>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          </div>
        </div>
        <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="card p-4 space-y-3" aria-hidden>
        <div className="flex gap-4 pb-3 border-b border-gray-100 dark:border-gray-700">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 flex-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="flex gap-4 py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 flex-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "stats") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-hidden>
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-5 space-y-3">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      aria-hidden
    />
  );
};

export default memo(Skeleton);
