import StatContainer from "./_components/stats/StatContainer";

import RecentAccountList from "./_components/recentAccountList/RecentAccountList";
import EarningOverviewChart from "./_components/earningOverview/EarningOverviewChart";
import UserOverviewChart from "./_components/userOverviewChart/UserOverviewChart";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-7 space-y-5 ">
      <StatContainer></StatContainer>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1">
          <UserOverviewChart />
        </div>
        <div className="flex-1">
          <EarningOverviewChart />
        </div>
      </div>

      <RecentAccountList></RecentAccountList>
    </div>
  );
};

export default DashboardPage;
