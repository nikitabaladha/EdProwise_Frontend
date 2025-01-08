import React from "react";
import SubmittedQuoteTable from "./SubmittedQuoteTable";
import ViewSubmittedQuote from "./ViewSubmittedQuote/ViewSubmittedQuote";
import UpdateSubmittedQuote from "./UpdateSubmittedQuote/UpdateSubmittedQuote";
import PrepareQuoteForm from "./PrepareQuoteForm/PrepareQuoteForm";
import { useLocation } from "react-router-dom";

const SubmittedQuote = () => {
  const location = useLocation();

  const isViewRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/view-submitted-quote";

  const isUpdateRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/update-submitted-quote";

  const isCreateRoute =
    location.pathname ===
    "/seller-dashboard/procurement-services/prepare-quote";

  return (
    <>
      {isUpdateRoute ? (
        <UpdateSubmittedQuote />
      ) : isViewRoute ? (
        <ViewSubmittedQuote />
      ) : isCreateRoute ? (
        <PrepareQuoteForm />
      ) : (
        <SubmittedQuoteTable />
      )}
    </>
  );
};

export default SubmittedQuote;
