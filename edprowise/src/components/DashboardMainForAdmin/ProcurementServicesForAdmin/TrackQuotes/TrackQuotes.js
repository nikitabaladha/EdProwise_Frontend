import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";
import RequestQuote from "./RequestQuote/RequestQuote";
import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import UpdateRequestedQuote from "./UpdateRequestedQuote/UpdateRequestedQuote";
import { useLocation } from "react-router-dom";

const TrackQuotes = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname === "/admin-dashboard/procurement-services/request-quote";

  const isViewRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/view-requested-quote";

  const isUpdateRoute =
    "/admin-dashboard/procurement-services/update-requested-quote";

  return (
    <>
      {isCreateRoute ? (
        <RequestQuote />
      ) : isViewRoute ? (
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
