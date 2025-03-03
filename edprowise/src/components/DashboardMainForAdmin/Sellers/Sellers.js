import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../api/getAPI";

import SellersTable from "./SellersTable";
import AddNewSeller from "./AddNewSeller/AddNewSeller";
import ViewSeller from "./ViewSeller/ViewSeller";
import UpdateSeller from "./UpdateSeller/UpdateSeller.js";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);

  const [selectedSeller, setSelectedSeller] = useState(null);

  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/admin-dashboard/sellers/add-new-seller";
  const isViewRoute =
    location.pathname === "/admin-dashboard/sellers/view-seller";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/sellers/update-seller";

  const fetchSellersData = async () => {
    try {
      const response = await getAPI(`/seller-profile-get-all`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSellers(response.data.data);
        console.log("school data", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Seller List:", err);
    }
  };

  useEffect(() => {
    fetchSellersData();
  }, []);

  const addSeller = (newSeller) => {
    setSellers((prevSellers) => [...prevSellers, newSeller]);
  };

  const updateSeller = (newUpdatedSeller) => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) =>
        seller._id === newUpdatedSeller._id ? newUpdatedSeller : seller
      )
    );
  };

  return (
    <>
      {isCreateRoute ? (
        <AddNewSeller addSeller={addSeller} />
      ) : isViewRoute ? (
        <ViewSeller
          sellers={sellers}
          setSellers={setSellers}
          selectedSeller={selectedSeller}
          setSelectedSeller={setSelectedSeller}
        />
      ) : isUpdateRoute ? (
        <UpdateSeller sellers={sellers} updateSeller={updateSeller} />
      ) : (
        <>
          <SellersTable
            sellers={sellers}
            setSellers={setSellers}
            selectedSeller={selectedSeller}
            setSelectedSeller={setSelectedSeller}
          />
        </>
      )}
    </>
  );
};

export default Sellers;
