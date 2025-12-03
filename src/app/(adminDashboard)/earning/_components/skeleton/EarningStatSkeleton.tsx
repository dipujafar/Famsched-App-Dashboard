import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function EarningStatSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1 */}
      <Card className="p-6">
        <CardContent className="p-0 space-y-4">
          <Skeleton className="h-5 w-40" /> 
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-4 w-28" /> 
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="p-6">
        <CardContent className="p-0 space-y-4">
          <Skeleton className="h-5 w-56" /> 
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-4 w-28" /> 
        </CardContent>
      </Card>
    </div>
  )
}
