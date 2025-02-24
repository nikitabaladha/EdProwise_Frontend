import React from "react";
import SchoolOperationCommonHeader from "./SchoolOperationCommonHeader";
import SchoolOperationTabs from "./SchoolOperationTabs";
import SchoolOperationInfoSection from "./SchoolOperationInfoSection";

const SchoolOperation=()=>{
    return(
        <>
        <SchoolOperationCommonHeader/>
        <SchoolOperationInfoSection/>
        <SchoolOperationTabs/>
        </>
    )
}

export default SchoolOperation;