import { Skeleton } from "@/components/ui/skeleton";

export default function TemplatesLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton variant="shimmer" className="h-9 w-52 mb-2" />
          <Skeleton variant="shimmer" className="h-4 w-72" />
        </div>
        <Skeleton variant="pulse" className="h-10 w-36" />
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4">
        <Skeleton variant="shimmer" className="h-10 flex-1" />
        <Skeleton variant="pulse" className="h-10 w-28" />
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
          >
            <Skeleton variant="wave" className="h-64 w-full rounded-none" />
            <div className="p-4 space-y-3">
              <Skeleton variant="shimmer" className="h-5 w-3/4" />
              <Skeleton variant="shimmer" className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton variant="pulse" className="h-9 flex-1" />
                <Skeleton variant="pulse" className="h-9 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Skeleton variant="pulse" className="h-9 w-20" />
        <Skeleton variant="pulse" className="h-9 w-20" />
        <Skeleton variant="pulse" className="h-9 w-20" />
      </div>
    </div>
  );
}
