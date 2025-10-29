import StatCard from "@/components/(adminDashboard)/cards/statCard";
import { UsesIcon } from "@/icon";
import React from "react";

const statData = [
  {
    id: 1,
    title: "Total Users",
    amount: "1220",
    icon: <UsesIcon />,
  },
  {
    id: 2,
    title: "Total Earning",
    amount: "$5,000",
    icon: <UsesIcon />,
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
