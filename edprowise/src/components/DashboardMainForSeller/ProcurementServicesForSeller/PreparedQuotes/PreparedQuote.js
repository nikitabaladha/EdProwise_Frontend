import React from "react";
import PreparedQuoteTable from "./PreparedQuoteTable";

import ViewPreparedQuote from "./ViewPreparedQuote/ViewPreparedQuote";
import UpdatePreparedQuote from "./UpdatePreparedQuote/UpdatePreparedQuote";

import { useLocation } from "react-router-dom";

const PreparedQuote = () => {
  const location = useLocation();

  const isUpdateRoute =
    location.pathname === "/seller-dashboard/procurement-services/update-quote";

  const isViewRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/view-prepared-quote";

  return (
    <>
      {isViewRoute ? (
        <ViewPreparedQuote />
      ) : isUpdateRoute ? (
        <UpdatePreparedQuote />
      ) : (
        <PreparedQuoteTable />
      )}
    </>
  );
};
export default PreparedQuote;
