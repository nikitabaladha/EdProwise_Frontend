import React, { useState, useEffect } from "react";
import TrackOrderHistoryTable from "./TrackOrderHistoryTable";
import { useLocation } from "react-router-dom";
import ViewOrderHistory from "./ViewOrderHistory/ViewOrderHistory";

const TrackOrderHistory = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/view-order-history";

  return <>{isViewRoute ? <ViewOrderHistory /> : <TrackOrderHistoryTable />}</>;
};

export default TrackOrderHistory;
