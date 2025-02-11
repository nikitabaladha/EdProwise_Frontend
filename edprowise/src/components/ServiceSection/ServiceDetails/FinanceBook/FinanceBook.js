import React,{useState} from "react";
import FinanceCommonHeader from "./FinanceCommonHeader";
import Serviceinfomainpage from "../Serviceinfomainpage";
import FinanceTabs from "./FinanceTabs";


const FinanceBook=()=>{
    return(
        <>
       <FinanceCommonHeader/>
       <Serviceinfomainpage/>
       <FinanceTabs/>
        </>
    )
}

export default FinanceBook;