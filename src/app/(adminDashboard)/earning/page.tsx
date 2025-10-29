import React from "react";
import StatContainer from "./_components/StatContainer";
import EarningTable from "./_components/EarningTable";

export default function page() {
  return (
    <div className="space-y-5">
      <StatContainer />
      <EarningTable />
    </div>
  );
}
