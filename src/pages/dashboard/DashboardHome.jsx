import React from "react";
import Stats from "../../components/dashboard/stats/Stats";
import Team from "../../components/team/Team";
import Event from "../../components/dashboard/event/Event";

const DashboardHome = () => {
  return (
    <div>
      <Stats darkMode={false} />
      <div className="flex flex-col gap-3 lg:flex-row">
        <Team darkMode={false} />
        <Event darkMode={false} />
      </div>
    </div>
  );
};

export default DashboardHome;
