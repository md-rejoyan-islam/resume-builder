import { TableRowSkeleton } from "@/components/ui/loading-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton variant="shimmer" className="h-9 w-48 mb-2" />
          <Skeleton variant="shimmer" className="h-4 w-64" />
        </div>
        <Skeleton variant="pulse" className="h-10 w-32" />
      </div>

      {/* Filters & Search */}
      <div className="flex gap-4">
        <Skeleton variant="shimmer" className="h-10 flex-1" />
        <Skeleton variant="pulse" className="h-10 w-32" />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <Skeleton variant="shimmer" className="h-5 w-8" />
          <Skeleton variant="shimmer" className="h-5 w-32" />
          <Skeleton variant="shimmer" className="h-5 w-24" />
          <Skeleton variant="shimmer" className="h-5 w-28" />
          <Skeleton variant="shimmer" className="h-5 w-20" />
          <Skeleton variant="shimmer" className="h-5 w-20" />
        </div>

        <div className="divide-y divide-border">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Skeleton variant="shimmer" className="h-4 w-48" />
        <div className="flex gap-2">
          <Skeleton variant="pulse" className="h-9 w-20" />
          <Skeleton variant="pulse" className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
