import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";
import RequestQuote from "./RequestQuote/RequestQuote";
import { useLocation } from "react-router-dom";

const TrackQuotes = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/request-quote";
  return <>{isCreateRoute ? <RequestQuote /> : <TrackQuoteTable />}</>;
};

export default TrackQuotes;
