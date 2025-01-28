import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../api/getAPI";

import SchoolsTable from "./SchoolsTable";
import AddNewSchool from "./AddNewSchool/AddNewSchool";
import ViewSchool from "./ViewSchool/ViewSchool";
import UpdateSchool from "./UpdateSchool/UpdateSchool.js";

const Schools = () => {
  const [schools, setSchools] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState(null);

  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/admin-dashboard/schools/add-new-school";
  const isViewRoute =
    location.pathname === "/admin-dashboard/schools/view-school";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/schools/update-school";

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSchools(response.data.data);
        console.log("school data", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School List:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const addSchool = (newSchool) => {
    setSchools((prevSchools) => [...prevSchools, newSchool]);
  };

  const updateSchool = (newUpdatedSchool) => {
    setSchools((prevSchools) =>
      prevSchools.map((school) =>
        school._id === newUpdatedSchool._id ? newUpdatedSchool : school
      )
    );
  };

  return (
    <>
      {isCreateRoute ? (
        <AddNewSchool addSchool={addSchool} />
      ) : isViewRoute ? (
        <ViewSchool
          schools={schools}
          setSchools={setSchools}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
        />
      ) : isUpdateRoute ? (
        <UpdateSchool schools={schools} updateSchool={updateSchool} />
      ) : (
        <>
          <SchoolsTable
            schools={schools}
            setSchools={setSchools}
            selectedSchool={selectedSchool}
            setSelectedSchool={setSelectedSchool}
          />
        </>
      )}
    </>
  );
};

export default Schools;
