import React, { useState, useEffect } from "react";
import ViewAllQuoteTable from "./ViewAllQuoteTable";
import { useLocation } from "react-router-dom";

import ViewQuote from "./ViewQuote/ViewQuote";

const ViewAllQuotes = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      nameOfSupplier: "Supplier A",
      expectedDeliveryDate: "2023-12-01",
      quotedAmount: "₹500.00",
      remarksFromSupplier: "Ready for delivery",
      commentFromBuyer: "Check quality before accepting",
      advancesRequiredAmount: "₹100.00",
    },
    {
      id: 2,
      nameOfSupplier: "Supplier B",
      expectedDeliveryDate: "2023-12-05",
      quotedAmount: "₹750.00",
      remarksFromSupplier: "Pending confirmation",
      commentFromBuyer: "Need to negotiate price",
      advancesRequiredAmount: "₹150.00",
    },
    {
      id: 3,
      nameOfSupplier: "Supplier C",
      expectedDeliveryDate: "2023-12-10",
      quotedAmount: "₹300.00",
      remarksFromSupplier: "Available stock",
      commentFromBuyer: "Confirm delivery date",
      advancesRequiredAmount: "₹50.00",
    },
  ]);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const location = useLocation();

  const isViewRoute =
    location.pathname === "/school-dashboard/procurement-services/view-quote";

  return (
    <>
      {isViewRoute ? (
        <ViewQuote
          quotes={quotes}
          setQuotes={setQuotes}
          selectedQuote={selectedQuote}
          setSelectedQuote={setSelectedQuote}
        />
      ) : (
        <ViewAllQuoteTable
          quotes={quotes}
          setQuotes={setQuotes}
          selectedQuote={selectedQuote}
          setSelectedQuote={setSelectedQuote}
        />
      )}
    </>
  );
};

export default ViewAllQuotes;
