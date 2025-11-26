import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton({length}: {length?: number}) {
  return (
    <div className="w-full rounded-xl border p-4 bg-white">
      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <Skeleton className="h-10 w-64" />
      </div>

      {/* Header row */}
      <div className="grid grid-cols-6 gap-4 py-3 border-b font-semibold text-sm text-gray-500">
        <div> <Skeleton className="h-4 w-12" /> </div>
        <div> <Skeleton className="h-4 w-20" /> </div>
        <div> <Skeleton className="h-4 w-24" /> </div>
        <div> <Skeleton className="h-4 w-28" /> </div>
        <div> <Skeleton className="h-4 w-24" /> </div>
        <div> <Skeleton className="h-4 w-16" /> </div>
      </div>

      {/* Rows */}
      {Array.from({ length: length || 10 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 py-4 border-b items-center"
        >
          <Skeleton className="h-4 w-8" />

          {/* Avatar + Name */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />

          {/* Actions */}
          <div className="flex gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}
