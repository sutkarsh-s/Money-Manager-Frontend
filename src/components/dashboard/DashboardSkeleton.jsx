import { memo } from "react";
import Skeleton from "../ui/Skeleton.jsx";

const ChartSkeleton = ({ height = "h-72" }) => (
  <div className="card space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-3 w-60" />
    </div>
    <Skeleton className={`w-full ${height} rounded-xl`} />
  </div>
);

const CardSkeleton = () => (
  <div className="flex gap-5 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 shadow-md">
    <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-32" />
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="space-y-2">
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-72" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, i) => <CardSkeleton key={i} />)}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2"><ChartSkeleton height="h-80" /></div>
      <ChartSkeleton height="h-80" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  </div>
);

export default memo(DashboardSkeleton);
