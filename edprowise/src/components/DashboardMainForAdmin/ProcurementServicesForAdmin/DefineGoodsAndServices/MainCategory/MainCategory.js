import React from "react";
import MainCategoryTable from "./MainCategoryTable";
import AddMainCategory from "./AddMainCategory";
import UpdateMainCategory from "./UpdateMainCategory";
import { useLocation } from "react-router-dom";

const MainCategory = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/define-goods-services/main-category/add-main-category";

  const isUpdateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/update-main-category";

  return (
    <>
      {isUpdateRoute ? (
        <UpdateMainCategory />
      ) : isCreateRoute ? (
        <AddMainCategory />
      ) : (
        <MainCategoryTable />
      )}
    </>
  );
};

export default MainCategory;
