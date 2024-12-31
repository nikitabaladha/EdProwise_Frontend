import React from "react";
import TrackQuote from "./TrackQuote";
import RequestQuote from "./RequestQuote/RequestQuote";
import { useLocation } from "react-router-dom";

const ProcurementServices = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/request-quote";
  return <>{isCreateRoute ? <RequestQuote /> : <TrackQuote />}</>;
};

export default ProcurementServices;
