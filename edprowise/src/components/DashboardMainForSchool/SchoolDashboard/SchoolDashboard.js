import React, { useState, useEffect } from "react";
import getAPI from "../../../api/getAPI";

import SchoolDashboardInformationCards from "./SchoolDashboardInformationCards";
import SchoolDashboardPerformance from "./SchoolDashboardPerformance";
import SchoolDashboardConversions from "./SchoolDashboardConversions";

const SchoolDashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SchoolDashboardInformationCards />
        </div>
        <div className="row">
          <SchoolDashboardPerformance />
          <SchoolDashboardConversions />
        </div>
      </div>
    </>
  );
};

export default SchoolDashboard;
