import { Skeleton } from "@/components/ui/skeleton";

export default function EditFromSkeleton() {
  return (
    <div className="w-full p-6 space-y-6">
      {/* Title Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Plan Name */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Cost */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Members Count */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-12 w-full" />
        </div>

        {/* Features & Permissions */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-48 w-full" />
        </div>

        {/* Update Button */}
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
