import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";

import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import UpdateRequestedQuote from "./UpdateRequestedQuote/UpdateRequestedQuote";
import { useLocation } from "react-router-dom";

const TrackQuotes = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/view-requested-quote";

  const isUpdateRoute =
    "/admin-dashboard/procurement-services/update-requested-quote";

  return (
    <>
      {isViewRoute ? (
        <ViewRequestedQuote />
      ) : isUpdateRoute ? (
        <UpdateRequestedQuote />
      ) : (
        <TrackQuoteTable />
      )}
    </>
  );
};
export default TrackQuotes;
