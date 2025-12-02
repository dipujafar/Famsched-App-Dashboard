"use client"
import { useGetChartDataQuery } from "@/redux/api/dashboardApi";
import EarningOverviewChart from "./earningOverview/EarningOverviewChart";
import RecentAccountList from "./recentAccountList/RecentAccountList";
import StatContainer from "./stats/StatContainer";
import UserOverviewChart from "./userOverviewChart/UserOverviewChart";
import { useState } from "react";

export default function DashboardContainer() {
    const [earningChartYear, setEarningChartYear] = useState(new Date().getFullYear().toString());
    const [userChartYear, setUserChartYear] = useState(new Date().getFullYear().toString());
    const queries: Record<string, string>  = {};

    if (earningChartYear) queries.incomeYear = earningChartYear;
    if (userChartYear) queries.joinYear = userChartYear;

    const { data, isLoading } = useGetChartDataQuery(queries);
    return (
        <div className="lg:space-y-7 space-y-5 ">
            <StatContainer></StatContainer>
            <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1">
                    <UserOverviewChart loading={isLoading} data={data?.data?.monthlyUsers} selectedYear={userChartYear} setSelectedYear={setUserChartYear} />
                </div>
                <div className="flex-1">
                    <EarningOverviewChart loading={isLoading} data={data?.data?.monthlyIncome} selectedYear={earningChartYear} setSelectedYear={setEarningChartYear} />
                </div>
            </div>
            <RecentAccountList />
        </div>
    )
}
