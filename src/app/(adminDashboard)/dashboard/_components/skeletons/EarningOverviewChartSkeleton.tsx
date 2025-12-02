import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EarningOverviewChartSkeleton() {
  return (
    <Card className="rounded-2xl p-6 w-full">
      <CardContent className="p-0 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-6 w-40" />

          <div className="flex items-center space-x-6">
            <Skeleton className="h-5 w-32" /> {/* Monthly Growth */}
            <Skeleton className="h-10 w-20 rounded-xl" /> {/* Year selector */}
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="w-full h-64 rounded-xl overflow-hidden relative">
          <Skeleton className="absolute inset-0 h-full w-full" />
        </div>

        {/* Months axis labels */}
        <div className="flex justify-between px-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-6" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
