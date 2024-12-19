import React from "react";
import SchoolsTable from "./SchoolsTable";
import { useLocation } from "react-router-dom";
import AddNewSchool from "./AddNewSchool/AddNewSchool";
const Schools = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/dashboard/schools/add-new-school";

  return (
    <>
      {isCreateRoute ? (
        <AddNewSchool />
      ) : (
        <>
          <SchoolsTable />
        </>
      )}
    </>
  );
};

export default Schools;
