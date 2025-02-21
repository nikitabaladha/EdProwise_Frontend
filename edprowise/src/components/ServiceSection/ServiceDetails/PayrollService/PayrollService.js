import React,{useState} from "react";
import PayrollCommonHeader from "./PayrollCommonHeader";
import Serviceinfomainpage from "../Serviceinfomainpage";
import PayrollTabs from "./PayrollTabs";

const PayrollService=()=>{
    return(
        <>
        <PayrollCommonHeader/>
        <Serviceinfomainpage/>
        <PayrollTabs/>
        </>
    )
}

export default PayrollService;