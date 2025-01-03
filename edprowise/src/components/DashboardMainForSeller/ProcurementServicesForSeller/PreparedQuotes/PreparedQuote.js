import React from "react";
import PreparedQuoteTable from "./PreparedQuoteTable";

// import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import UpdatePreparedQuote from "./UpdatePreparedQuote/UpdatePreparedQuote";

import { useLocation } from "react-router-dom";

const PreparedQuote = () => {
  const location = useLocation();

  const isUpdateRoute =
    location.pathname === "/seller-dashboard/procurement-services/update-quote";

  return (
    <>{isUpdateRoute ? <UpdatePreparedQuote /> : <PreparedQuoteTable />}</>
  );
};
export default PreparedQuote;
