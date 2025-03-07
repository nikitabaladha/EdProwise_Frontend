import React, { useState, useEffect } from "react";
import getAPI from "../../../api/getAPI";

import SellerDashboardInformationCards from "./SellerDashboardInformationCards";
import SellerDashboardPerformance from "./SellerDashboardPerformance";
import SellerDashboardConversions from "./SellerDashboardConversions";
import SellerDashboardRecentQuotes from "./SellerDashboardRecentQuotes";

const Dashboard = () => {
  const [totalCounts, setTotalCounts] = useState({});

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const id = userDetails?.id;

  const fetchTotalCounts = async () => {
    try {
      const response = await getAPI(`/get-count-by-seller-id/${id}`, {}, true);
      if (!response.hasError && response.data) {
        setTotalCounts(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Total Counts:", err);
    }
  };

  // const fetchPerformance = async (year) => {
  //   try {
  //     const response = await getAPI(`/get-by-month-year/${year}`, {}, true);
  //     if (
  //       !response.hasError &&
  //       response.data &&
  //       Array.isArray(response.data.data)
  //     ) {
  //       setPerformance(response.data.data);
  //     } else {
  //       console.error("Invalid response format or error in response");
  //     }
  //   } catch (err) {
  //     console.error("Error fetching Total Counts:", err);
  //   }
  // };

  useEffect(() => {
    // fetchSchoolData();
    fetchTotalCounts();
    // fetchPerformance(new Date().getFullYear());
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SellerDashboardInformationCards
            totalCounts={totalCounts}
            setTotalCounts={setTotalCounts}
          />
        </div>
        <div class="row">
          <div class="row">
            {/* <SellerDashboardPerformance
              performance={performance}
              fetchPerformance={fetchPerformance}
            /> */}
            <SellerDashboardConversions />
            <div />
          </div>
        </div>
        ;
        <SellerDashboardRecentQuotes />
      </div>
    </>
  );
};

export default Dashboard;
