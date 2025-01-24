import ServiceMainSection from "./ServiceMainSection";
import { useLocation } from "react-router-dom";
import CommonHeader from "./CommonHeader";
const ServiceMainPage = () => {
  const location = useLocation();

  const isDigitalServicesRoute =
    location.pathname === "/services/digital-services";

  const isBusinessServicesRoute =
    location.pathname === "/services/business-services";

  const isRecruitmentSectionRoute =
    location.pathname === "/services/recruitment-services";

  const isProcurementSectionRoute =
    location.pathname === "/services/procurement-services";

  return (
    <>
      {isDigitalServicesRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : isBusinessServicesRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : isRecruitmentSectionRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : isProcurementSectionRoute ? (
        <>
          <CommonHeader />
          <ServiceMainSection />
        </>
      ) : null}
    </>
  );
};

export default ServiceMainPage;
