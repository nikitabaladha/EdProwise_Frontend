import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";

import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import { useLocation } from "react-router-dom";
import ViewQuote from "./ViewQuote/ViewQuote";
import ViewAllQuoteTable from "./ViewAllQuoteTable/ViewAllQuoteTable";

const TrackQuotes = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/view-requested-quote";

  const isViewQuoteRoute =
    location.pathname === "/admin-dashboard/procurement-services/view-quote";

  const isViewAllQuoteTableRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/view-quote-table";

  return (
    <>
      {isViewRoute ? (
        <ViewRequestedQuote />
      ) : isViewQuoteRoute ? (
        <ViewQuote />
      ) : isViewAllQuoteTableRoute ? (
        <ViewAllQuoteTable />
      ) : (
        <TrackQuoteTable />
      )}
    </>
  );
};
export default TrackQuotes;
