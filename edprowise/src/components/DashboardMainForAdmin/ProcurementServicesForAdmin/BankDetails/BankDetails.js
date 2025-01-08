import React from "react";
import { useLocation } from "react-router-dom";

import BankDetailsTable from "./BankDetailsTable";
import AddNewBankDetail from "./AddNewBankDetail/AddNewBankDetail";
import UpdateBankDetail from "./UpdateBankDetail/UpdateBankDetail.js";

const BankDetails = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/add-bank-detail";

  const isUpdateRoute =
    location.pathname === "/admin-dashboard/bank-detail/update-bank-detail";

  return (
    <>
      {isCreateRoute ? (
        <AddNewBankDetail />
      ) : isUpdateRoute ? (
        <UpdateBankDetail />
      ) : (
        <>
          <BankDetailsTable />
        </>
      )}
    </>
  );
};

export default BankDetails;
