import React from "react";
import FinanceCommonHeader from "./FinanceCommonHeader";
import FinanceTabs from "./FinanceTabs";
import FinanceBookInfoMainPage from "./FinanceBookInfoMainPage";


const FinanceBook=()=>{
    return(
        <>
       <FinanceCommonHeader/>
       <FinanceBookInfoMainPage/>
       <FinanceTabs/>
        </>
    )
}

export default FinanceBook;