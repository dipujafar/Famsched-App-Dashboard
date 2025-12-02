import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {[1, 2].map((i) => (
        <Card key={i} className="rounded-2xl shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            {/* Icon */}
            <Skeleton className="h-14 w-14 rounded-full" />

            <div className="flex flex-col space-y-2 w-full">
              {/* Label */}
              <Skeleton className="h-4 w-24" />
              {/* Value */}
              <Skeleton className="h-6 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
