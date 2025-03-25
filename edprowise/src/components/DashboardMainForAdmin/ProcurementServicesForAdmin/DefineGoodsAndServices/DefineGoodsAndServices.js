import React from "react";
import GoodsAndServicesTable from "./GoodsAndServicesTable";
import AddGoodsAndServices from "./AddGoodsAndServices/AddGoodsAndServices";
import UpdateGoodAndService from "./UpdateGoodAndService/UpdateGoodAndService";
import { useLocation } from "react-router-dom";

const DefineGoodsAndServices = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/add-good-services";

  const isUpdateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/update-good-service";

  return (
    <>
      {isUpdateRoute ? (
        <UpdateGoodAndService />
      ) : isCreateRoute ? (
        <AddGoodsAndServices />
      ) : (
        <GoodsAndServicesTable />
      )}
    </>
  );
};
export default DefineGoodsAndServices;
