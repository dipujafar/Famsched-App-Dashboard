import StatCard from "@/components/(adminDashboard)/cards/statCard";
import React from "react";

const statData = [
  {
    id: 1,
    title: "Total Earning",
    amount: "$2434.00",
    growth: "35.80%",
    days: "30 days",
    increase: true,
  },
  {
    id: 2,
    title: "Total Subscription Purchased",
    amount: "450",
    growth: "5.80%",
    days: "30 days",
    increase: false,
  },
];

export default function StatContainer() {
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
