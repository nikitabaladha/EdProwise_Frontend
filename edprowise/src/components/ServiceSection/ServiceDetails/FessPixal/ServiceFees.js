import React from "react";
import ServiceInfoCommonHeader from "./ServiceInfoCommonHeader";
import ServiceTabs from "./ServiceTabs";
import PixalFeesInfoMainPage from "./PixalFeesInfoMainPage";

const ServiceFess = () => {
  return (
    <>
      <ServiceInfoCommonHeader />
      <PixalFeesInfoMainPage/>
      <ServiceTabs />
    </>
  );
};

export default ServiceFess;
