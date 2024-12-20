import React, { useState, useEffect } from "react";
import SchoolsTable from "./SchoolsTable";
import { useLocation } from "react-router-dom";
import AddNewSchool from "./AddNewSchool/AddNewSchool";
import getAPI from "../../../api/getAPI";
const Schools = () => {
  const [schools, setSchools] = useState([]);

  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/dashboard/schools/add-new-school";

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSchools(response.data.data);
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

  return (
    <>
      {isCreateRoute ? (
        <AddNewSchool addSchool={addSchool} />
      ) : (
        <>
          <SchoolsTable schools={schools} />
        </>
      )}
    </>
  );
};

export default Schools;
