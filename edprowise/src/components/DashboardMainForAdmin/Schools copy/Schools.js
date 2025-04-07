import React from "react";
import { useLocation } from "react-router-dom";

import SchoolsTable from "./SchoolsTable";
import AddNewSchool from "./AddNewSchool/AddNewSchool";
import ViewSchool from "./ViewSchool/ViewSchool";
import UpdateSchool from "./UpdateSchool/UpdateSchool.js";

const Schools = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/admin-dashboard/schools/add-new-school";
  const isViewRoute =
    location.pathname === "/admin-dashboard/schools/view-school";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/schools/update-school";

  return (
    <>
      {isCreateRoute ? (
        <AddNewSchool />
      ) : isViewRoute ? (
        <ViewSchool />
      ) : isUpdateRoute ? (
        <UpdateSchool />
      ) : (
        <>
          <SchoolsTable />
        </>
      )}
    </>
  );
};

export default Schools;
