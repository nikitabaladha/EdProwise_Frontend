import React from "react";
import CategoryTable from "./CategoryTable";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import { useLocation } from "react-router-dom";

const Category = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/define-goods-services/category/add-category";

  const isUpdateRoute =
    location.pathname ===
    "/admin-dashboard/procurement-services/define-goods-services/category/update-category";

  return (
    <>
      {isUpdateRoute ? (
        <UpdateCategory />
      ) : isCreateRoute ? (
        <AddCategory />
      ) : (
        <CategoryTable />
      )}
    </>
  );
};

export default Category;
