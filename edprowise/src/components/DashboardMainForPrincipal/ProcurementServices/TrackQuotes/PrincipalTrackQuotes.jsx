import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";
import RequestQuote from "./RequestQuote/RequestQuote";
import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import { useLocation } from "react-router-dom";
import ViewQuote from "./ViewQuote/ViewQuote";
import ViewAllQuoteTable from "./ViewAllQuoteTable/ViewAllQuoteTable";

import PrincipalTrackQuoteTable from "./PrincipalTrackQuoteTable";
import PrincipalRequestQuote from "./RequestQuote/PrincipalRequestQuote";
import PrincipalViewRequestedQuote from "./ViewRequestedQuote/PrincipalViewRequestedQuote";
import PrincipalViewQuoteDetails from "./ViewQuote/PrincipalViewQuoteDetails";
import PrincipalViewAllQuoteTable from "./ViewAllQuoteTable/PrincipalViewAllQuoteTable";

const PrincipalTrackQuotes = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/principal-dashboard/procurement-services/track-quote/request-quote";

  const isViewRoute =
    location.pathname ===
    "/principal-dashboard/procurement-services/track-quote/view-requested-quote";

  const isViewQuoteRoute =
    location.pathname ===
    "/principal-dashboard/procurement-services/track-quote/view-quote";

  const isViewAllQuoteTableRoute =
    location.pathname ===
    "/principal-dashboard/procurement-services/track-quote/view-quote-table";

  return (
    <>
      {isCreateRoute ? (
        <PrincipalRequestQuote />
      ) : isViewRoute ? (
        <PrincipalViewRequestedQuote />
      ) : isViewQuoteRoute ? (
        <PrincipalViewQuoteDetails />
      ) : isViewAllQuoteTableRoute ? (
        <PrincipalViewAllQuoteTable />
      ) : (
        <PrincipalTrackQuoteTable />
      )}
    </>
  );
};
export default PrincipalTrackQuotes;
