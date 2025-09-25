import React, { useState, useEffect } from "react";
import TrackOrderHistoryTable from "./TrackOrderHistoryTable";
import { useLocation } from "react-router-dom";
import ViewOrderHistory from "./ViewOrderHistory/ViewOrderHistory";
import PrincipalTrackOrderHistoryTable from "./PrincipalTrackOrderHistoryTable";
import PrincipalViewOrderHistory from "./ViewOrderHistory/PrincipalViewOrderHistory";
const PrincipalTrackOrderHistory = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/principal-dashboard/procurement-services/view-order-history";

  return (
    <>
      {isViewRoute ? (
        <PrincipalViewOrderHistory />
      ) : (
        <PrincipalTrackOrderHistoryTable />
      )}
    </>
  );
};

export default PrincipalTrackOrderHistory;
