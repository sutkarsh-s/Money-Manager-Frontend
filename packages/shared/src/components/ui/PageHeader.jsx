import { memo } from "react";

const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="min-w-0">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          {subtitle}
        </p>
      )}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

export default memo(PageHeader);
