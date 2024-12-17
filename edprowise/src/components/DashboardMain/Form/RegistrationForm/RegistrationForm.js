import React from "react";
import RegistrationFormHeader from "./RegistrationFormHeader";
import RegistrationFormTable from "./RegistrationFormTable";
import { useLocation } from "react-router-dom";
import AddNewRegistration from "./AddNewRegistration/AddNewRegistration";

const RegistrationForm = () => {
  const location = useLocation();
  const isCreateRoute =
    location.pathname === "/dashboard/formMenu/registrationForm/create";
  return (
    <>
      {isCreateRoute ? (
        <AddNewRegistration />
      ) : (
        <>
          <RegistrationFormHeader />
          <RegistrationFormTable />
        </>
      )}
    </>
  );
};

export default RegistrationForm;
