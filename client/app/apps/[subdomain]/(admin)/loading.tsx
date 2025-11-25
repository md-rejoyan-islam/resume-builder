import {
    ActivityCardSkeleton,
    ChartSkeleton,
    StatCardSkeleton,
} from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton variant="shimmer" className="h-9 w-64 mb-2" />
          <Skeleton variant="shimmer" className="h-4 w-80" />
        </div>
        <Skeleton variant="pulse" className="h-10 w-40" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Skeleton variant="pulse" className="w-10 h-10 rounded-lg" />
            <Skeleton variant="shimmer" className="h-6 w-36" />
          </div>
          <Skeleton variant="shimmer" className="h-9 w-20" />
        </div>

        <div className="space-y-4">
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
        </div>
      </div>
    </div>
  );
}
