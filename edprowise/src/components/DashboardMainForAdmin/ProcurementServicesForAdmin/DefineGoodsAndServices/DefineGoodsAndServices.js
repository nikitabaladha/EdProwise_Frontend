// import React from "react";
// import GoodsAndServicesTable from "./GoodsAndServicesTable";
// // import RequestQuote from "./RequestQuote/RequestQuote";
// // import ViewRequestedQuote from "./ViewRequestedQuote/ViewRequestedQuote";
// // import UpdateRequestedQuote from "./UpdateRequestedQuote/UpdateRequestedQuote";
// import { useLocation } from "react-router-dom";

// const DefineGoodsAndServices = () => {
//   const location = useLocation();

//   const isCreateRoute =
//     location.pathname === "/admin-dashboard/procurement-services/request-quote";

//   const isViewRoute =
//     location.pathname ===
//     "/admin-dashboard/procurement-services/view-requested-quote";

//   const isUpdateRoute =
//     "/admin-dashboard/procurement-services/update-requested-quote";

//   return (
//     <>
//       {isCreateRoute ? (
//         <RequestQuote />
//       ) : isViewRoute ? (
//         <ViewRequestedQuote />
//    ) : isUpdateRoute ? (
//      <UpdateRequestedQuote />
//   ) : (
//         <TrackQuoteTable />
//       )}
//     </>
//   );
// };
// export default DefineGoodsAndServices;

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
