import React from "react";
import TrackQuoteTable from "./TrackQuoteTable";
import { useLocation } from "react-router-dom";
import ViewQuote from "./ViewQuote/ViewQuote";
import ViewAllQuoteTable from "./ViewAllQuoteTable/ViewAllQuoteTable";
import StudentRegistrationForm from "./NewStudentRegistration/StudentRegistrationForm";
import ViewStudentInfoRegister from "./ViewStudentInfoRegister/ViewStudentInfoRegister";
import UpdateStudentRegistrationForm from "./UpdateStudentRegistrationForm.js/UpdateStudentRegistrationForm";

const StudentRegistration = () => {
  const location = useLocation();

  const isCreateRoute =
    location.pathname ===
    "/school-dashboard/fees-module/form/registration-form";

  const isViewRoute =
    location.pathname ===
    "/school-dashboard/fees-module/form/registed-student-info";

  const isUpdateRegisterRoute =
    location.pathname === "/school-dashboard/fees-module/form/update-registed-student-info";

  const isViewAllQuoteTableRoute =
    location.pathname ===
    "/school-dashboard/procurement-services/view-quote-table";

  return (
    <>
      {isCreateRoute ? (
        <StudentRegistrationForm/>
      ) : isViewRoute ? (
        <ViewStudentInfoRegister/>
      ) : isUpdateRegisterRoute ? (
        <UpdateStudentRegistrationForm />
      ) : isViewAllQuoteTableRoute ? (
        <ViewAllQuoteTable />
      ) : (
        <TrackQuoteTable />
      )}
    </>
  );
};
export default StudentRegistration;
