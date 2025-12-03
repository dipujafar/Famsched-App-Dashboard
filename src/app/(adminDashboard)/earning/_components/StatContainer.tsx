import StatCard from "@/components/(adminDashboard)/cards/statCard";
import React from "react";

;

export default function StatContainer({ earningStatData }: any) {

  const statData = [
    {
      id: 1,
      title: "Total Earning",
      amount: `$${earningStatData?.totalEarnings || 0}`,
    },
    {
      id: 2,
      title: "Today Earning",
      amount: `$${earningStatData?.todayEarnings || 0}`,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 xl:gap-5 gap-3">
      {statData?.map((item) => (
        <div key={item.id}>
          <StatCard {...item} />
        </div>
      ))}
    </div>
  );
}
