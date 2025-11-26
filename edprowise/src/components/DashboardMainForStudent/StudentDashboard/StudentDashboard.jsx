import React, { useContext, useState, useEffect, useRef } from "react";
import PrincipalDashboardInformationCards from './StudentDashboardInformationCards';
import StudentDashboardInformationCards from "./StudentDashboardInformationCards";
const StudentDashboard = () => {
  const [totalCounts, setTotalCounts] = useState({});

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const id = userDetails?.schoolId;

  //   const fetchTotalCounts = async () => {
  //     try {
  //       const response = await getAPI(`/get-count-by-school-id/${id}`, {}, true);
  //       if (!response.hasError && response.data) {
  //         setTotalCounts(response.data.data);
  //       } else {
  //         console.error("Invalid response format or error in response");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching Total Counts:", err);
  //     }
  //   };

  //   useEffect(() => {
  //     // fetchSchoolData();
  //     fetchTotalCounts();
  //     // fetchPerformance(new Date().getFullYear());
  //   }, []);

  return (
    <>
      <div className="container-fluid">
        <StudentDashboardInformationCards
        //   totalCounts={totalCounts}
        //   setTotalCounts={setTotalCounts}
        />
      </div>
    </>
  );
};

export default StudentDashboard;