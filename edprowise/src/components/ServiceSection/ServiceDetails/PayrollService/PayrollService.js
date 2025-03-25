import React from "react";
import PayrollCommonHeader from "./PayrollCommonHeader";
import PayrollTabs from "./PayrollTabs";
import PayrollInfoMainPage from "./PayrollInfoMainPage";

const PayrollService=()=>{
    return(
        <>
        <PayrollCommonHeader/>
        <PayrollInfoMainPage/>
        <PayrollTabs/>
        </>
    )
}

export default PayrollService;