import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";

import ProcurementDashboardInformationCards from "./ProcurementDashboardInformationCards";
import ProcurementDashboardPerformance from "./ProcurementDashboardPerformance";
import ProcurementDashboardConversions from "./ProcurementDashboardConversions";
import ProcurementDashboardRecentSchools from "./ProcurementDashboardRecentSchools";

const Dashboard = () => {
  const [schools, setSchools] = useState([]);
  const [totalCounts, setTotalCounts] = useState({});
  const [performance, setPerformance] = useState([]);

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

  const fetchTotalCounts = async () => {
    try {
      const response = await getAPI(`/get-total-count`, {}, true);
      if (!response.hasError && response.data) {
        setTotalCounts(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Total Counts:", err);
    }
  };

  const fetchPerformance = async (year) => {
    try {
      const response = await getAPI(`/get-by-month-year/${year}`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setPerformance(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Total Counts:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
    fetchTotalCounts();
    fetchPerformance(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="container-fluid">
        <ProcurementDashboardInformationCards
          totalCounts={totalCounts}
          setTotalCounts={setTotalCounts}
        />
        <div class="row">
          <ProcurementDashboardPerformance
            performance={performance}
            fetchPerformance={fetchPerformance}
          />
          <ProcurementDashboardConversions />
          <div />
        </div>

        <ProcurementDashboardRecentSchools
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
