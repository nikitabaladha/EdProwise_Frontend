import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";

import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import UpdateRequestedQuote from "./UpdateRequestedQuote/UpdateRequestedQuote";
import SubmitQuote from "./SubmitQuote/SubmitQuote";
import { useLocation } from "react-router-dom";

const TrackQuotes = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/view-requested-quote";

  const isUpdateRoute =
    "/seller-dashboard/procurement-services/update-requested-quote";

  const isSubmitRoute =
    location.pathname === "/seller-dashboard/procurement-services/submit-quote";

  return (
    <>
      {isViewRoute ? (
        <ViewRequestedQuote />
      ) : isSubmitRoute ? (
        <SubmitQuote />
      ) : isUpdateRoute ? (
        <UpdateRequestedQuote />
      ) : (
        <TrackQuoteTable />
      )}
    </>
  );
};
export default TrackQuotes;
