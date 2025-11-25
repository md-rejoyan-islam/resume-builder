import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton variant="shimmer" className="h-4 w-24 mb-3" />
          <Skeleton variant="shimmer" className="h-8 w-20 mb-2" />
          <Skeleton variant="shimmer" className="h-3 w-28" />
        </div>
        <Skeleton variant="pulse" className="w-12 h-12 rounded-lg" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <Skeleton variant="shimmer" className="h-5 w-48 mb-4" />
      <div className="space-y-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton variant="shimmer" className="w-12 h-4" />
            <Skeleton variant="wave" className="flex-1 h-6" />
            <Skeleton variant="shimmer" className="w-12 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div className="flex items-center gap-4 flex-1">
        <Skeleton variant="pulse" className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <Skeleton variant="shimmer" className="h-4 w-32 mb-2" />
          <Skeleton variant="shimmer" className="h-3 w-48" />
        </div>
      </div>
      <Skeleton variant="shimmer" className="h-3 w-20" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <Skeleton variant="shimmer" className="h-4 w-8" />
      <Skeleton variant="shimmer" className="h-4 w-48" />
      <Skeleton variant="shimmer" className="h-4 w-24" />
      <Skeleton variant="pulse" className="h-6 w-20 rounded-full" />
      <Skeleton variant="shimmer" className="h-4 w-12" />
      <Skeleton variant="shimmer" className="h-4 w-24" />
      <Skeleton variant="shimmer" className="h-8 w-20" />
    </div>
  );
}
