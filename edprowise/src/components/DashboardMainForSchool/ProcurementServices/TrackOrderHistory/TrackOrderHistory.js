import React, { useState, useEffect } from "react";
import TrackOrderHistoryTable from "./TrackOrderHistoryTable";
import { useLocation } from "react-router-dom";

const TrackOrderHistory = () => {
  const location = useLocation();

  return (
    <>
      {" "}
      <TrackOrderHistoryTable />
    </>
  );
};

export default TrackOrderHistory;
