import StatCard from "@/components/(adminDashboard)/cards/statCard";
import { UsesIcon } from "@/icon";
import { useGetDashboardDataQuery } from "@/redux/api/dashboardApi";
import React from "react";
import StatCardsSkeleton from "../skeletons/StatCardsSkeleton";



export default function StatContainer() {
  const { data, isLoading } = useGetDashboardDataQuery(undefined);

  if (isLoading) {
    return <StatCardsSkeleton />
  }

  const statData = [
    {
      id: 1,
      title: "Total Users",
      amount: data?.data?.totalUsers || 0,
      icon: <UsesIcon />,
    },
    {
      id: 2,
      title: "Total Earning",
      amount: `$${data?.data?.totalEarnings || 0}`,
      icon: <UsesIcon />,
    },
  ];
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
