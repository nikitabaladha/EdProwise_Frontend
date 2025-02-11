import React,{useState} from "react";
import SchoolOperationCommonHeader from "./SchoolOperationCommonHeader";
import Serviceinfomainpage from "../Serviceinfomainpage";
import SchoolOperationTabs from "./SchoolOperationTabs";

const SchoolOperation=()=>{
    return(
        <>
        <SchoolOperationCommonHeader/>
        <Serviceinfomainpage/>
        <SchoolOperationTabs/>
        </>
    )
}

export default SchoolOperation;