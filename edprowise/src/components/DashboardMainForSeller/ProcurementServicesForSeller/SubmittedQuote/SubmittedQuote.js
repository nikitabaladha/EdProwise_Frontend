import React from "react";
import SubmittedQuoteTable from "./SubmittedQuoteTable";

// import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import UpdatePreparedQuote from "./UpdatePreparedQuote/UpdatePreparedQuote";
// import SubmitQuote from "./SubmitQuote/SubmitQuote";
import PrepareQuoteForm from "./PrepareQuoteForm/PrepareQuoteForm";
import { useLocation } from "react-router-dom";

const SubmittedQuote = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/prepare-quote";

  return <>{isCreateRoute ? <PrepareQuoteForm /> : <SubmittedQuoteTable />}</>;
};
export default SubmittedQuote;
