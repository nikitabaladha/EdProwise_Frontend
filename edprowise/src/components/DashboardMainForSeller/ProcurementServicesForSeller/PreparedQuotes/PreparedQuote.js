import React from "react";
import PreparedQuoteTable from "./PreparedQuoteTable";

import ViewPreparedQuote from "./ViewPreparedQuote/ViewPreparedQuote";

import { useLocation } from "react-router-dom";

const PreparedQuote = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/view-prepared-quote";

  return <>{isViewRoute ? <ViewPreparedQuote /> : <PreparedQuoteTable />}</>;
};
export default PreparedQuote;
