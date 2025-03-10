import React from "react";
import SubCategoryTable from "./SubCategoryTable";
import AddSubCategory from "./AddSubCategory";
import UpdateSubCategory from "./UpdateSubCategory";
import { useLocation } from "react-router-dom";

const Category = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/define-goods-services/sub-category/add-sub-category";

  const isUpdateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/define-goods-services/sub-category/update-sub-category";

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
