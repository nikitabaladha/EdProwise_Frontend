import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../api/getAPI";

import SellersTable from "./SellersTable";
import AddNewSeller from "./AddNewSeller/AddNewSeller";
import ViewSeller from "./ViewSeller/ViewSeller";
import UpdateSeller from "./UpdateSeller/UpdateSeller.js";

const Sellers = () => {

  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/admin-dashboard/sellers/add-new-seller";
  const isViewRoute =
    location.pathname === "/admin-dashboard/sellers/view-seller";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/sellers/update-seller";

  return (
    <>
      {isCreateRoute ? (
        <AddNewSeller/>
      ) : isViewRoute ? (
        <ViewSeller
        />
      ) : isUpdateRoute ? (
        <UpdateSeller />
      ) : (
        <>
          <SellersTable/>
        </>
      )}
    </>
  );
};

export default Sellers;
