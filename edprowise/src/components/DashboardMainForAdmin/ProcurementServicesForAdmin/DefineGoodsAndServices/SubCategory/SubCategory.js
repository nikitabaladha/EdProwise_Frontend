import React from "react";
import SubCategoryTable from "./SubCategoryTable";
import AddSubCategory from "./AddSubCategory";
import UpdateSubCategory from "./UpdateSubCategory";
import { useLocation } from "react-router-dom";

const Category = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/good-services/add-goods-services";

  const isUpdateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/good-services/update-goods-services";

  return (
    <>
      {isUpdateRoute ? (
        <UpdateSubCategory />
      ) : isCreateRoute ? (
        <AddSubCategory />
      ) : (
        <SubCategoryTable />
      )}
    </>
  );
};

export default Category;
