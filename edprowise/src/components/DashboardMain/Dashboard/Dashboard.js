import React, { useState, useEffect } from "react";
import getAPI from "../../../api/getAPI";

import DashboardInformationCards from "./DashboardInformationCards";
import DashboardPerformance from "./DashboardPerformance";
import DashboardConversions from "./DashboardConversions";
import DashboardRecentSchools from "./DashboardRecentSchools";

const Dashboard = () => {
  const [schools, setSchools] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState(null);

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSchools(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School List:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <DashboardInformationCards />
        </div>
        <div className="row">
          <DashboardPerformance />
          <DashboardConversions />
        </div>

        <DashboardRecentSchools
          schools={schools}
          setSchools={setSchools}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
      </div>
    </>
  );
};

export default Dashboard;
