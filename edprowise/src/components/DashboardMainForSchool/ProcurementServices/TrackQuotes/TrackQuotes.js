import React from "react";
import { useState, useEffect } from "react";
import TrackQuoteTable from "./TrackQuoteTable";
import RequestQuote from "./RequestQuote/RequestQuote";
import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
import { useLocation } from "react-router-dom";
import ViewQuote from "./ViewQuote/ViewQuote";
import ViewAllQuoteTable from "./ViewAllQuoteTable/ViewAllQuoteTable";
import getAPI from "../../../../api/getAPI";

const TrackQuotes = () => {
  const [products, setProducts] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await getAPI(`/get-quote`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setProducts(response.data.data);
          console.log("quote data", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };

    fetchSchoolData(); // Call the function to fetch data
  }, []);

  const isCreateRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/request-quote";

  const isViewRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/view-requested-quote";

  const isViewQuoteRoute =
    location.pathname === "/school-dashboard/procurement-services/view-quote";

  const isViewAllQuoteTableRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/view-quote-table";

  return (
    <>
      {isCreateRoute ? (
        <RequestQuote />
      ) : isViewRoute ? (
        <ViewRequestedQuote />
      ) : isViewQuoteRoute ? (
        <ViewQuote />
      ) : isViewAllQuoteTableRoute ? (
        <ViewAllQuoteTable />
      ) : (
        <TrackQuoteTable products={products} setProducts={setProducts} />
      )}
    </>
  );
};
export default TrackQuotes;
