import React,{useState} from "react";
import Serviceinfomainpage from "../Serviceinfomainpage";
import ServiceInfoCommonHeader from "./ServiceInfoCommonHeader";
import ServiceTabs from "./ServiceTabs";

const ServiceFess=()=>{
    
 
    return(
        <>
        <ServiceInfoCommonHeader/>
        <Serviceinfomainpage/>
        <ServiceTabs/>
        </>
    )
}

export default ServiceFess;