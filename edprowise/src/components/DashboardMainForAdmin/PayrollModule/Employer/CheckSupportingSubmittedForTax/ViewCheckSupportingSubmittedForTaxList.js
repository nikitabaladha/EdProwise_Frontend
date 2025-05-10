import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewCheckSupportingSubmittedForTaxList = () => {
      const navigate = useNavigate();
      
      const [isBuyer, setIsBuyer] = useState(true);
  
      const handleToggle = () => {
          setIsBuyer(!isBuyer);
      };
  
      const handleNavigateToRentDetails = () => {
          navigate("/admin-dashboard/payroll-module/employer/view-check-rent-details");
      };
  
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-xl-12">
                <div className="card m-2">
                    <div className="card-body">
                        <div className="container">
                            <div className="card-header mb-2">
                                <h4 className="card-title text-center custom-heading-font">
                                Check Supporting Submitted for Tax
                                </h4>
                            </div>
                        </div>
                        <form onSubmit="">
                            {/* <div className='d-flex'> */}
                                    <div className="row mb-2">
                                        <div className="col-6">
                                            <p style={{ color: 'black' }}>
                                                Employee Name : Umesh jadhav
                                            </p>

                                            <p style={{ color: 'black' }}>
                                                Tax Regime :
                                            </p>
                                        </div>

                                        <div className="col-6">
                                            <p style={{ color: 'black' }}>
                                                Financial Year: 2025-26
                                            </p>
                                        </div>
                                    </div>

                                    <div className="table-responsive mb-4">
                                        <table className="table mb-4" style={{ border: "1px solid black", color: "black", placeContent: "center" }}>
                                            <thead>
                                                <tr >
                                                    <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                        Investment
                                                    </th>
                                                    <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                        Limit
                                                    </th>
                                                    <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                        Declared
                                                    </th>
                                                    <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                        Proof Submitted
                                                    </th>
                                                    <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                        Maximum Deduction
                                                    </th>
                                                    <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                        Upload Document
                                                    </th>
                                                    <th className="text-center align-content-center p-2" style={{ border: "1px solid black", fontSize: "1.3rem" }}>
                                                        Admin Remarks
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style={{ fontWeight: "bold" }} >
                                                    <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        Section 80C
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        #####
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        #####
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        1,70,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        1,50,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            accept="image/*,application/pdf"
                                                            // onChange={handleChange}
                                                            required
                                                        />
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Life Insurance Premium including Bima Nivesh( only Self , Spouse and children)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        40,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        40,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Provident Fund
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        50,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        50,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="p-2 align-content-center" style={{ border: "1px solid black" }}>
                                                        Tuition Fees
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Term Deposits(Bank tax saving FD)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        90,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        80,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Sukanya Samriddhi Account
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Housing Loan Principal/Stamp Duty & Registration
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Subscription To Notified Central Government Security (NSS) / Mutual Funds/ELSS and Others / Pension Fund
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr style={{ fontWeight: "bold" }} >
                                                    <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        Section 80D
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>

                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        20,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        20,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        20,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            accept="image/*,application/pdf"
                                                            // onChange={handleChange}
                                                            required
                                                        />
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black", placeContent: "center" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Medical Insurance Premium For Self,Spouse and Dependent Children (If all are non-senior citizen)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        25,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        20,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        20,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        20,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Medical Insurance Premium For parents(Non-senior citizen)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        25,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Medical Insurance Premium For Parents (Senior citizen)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        50,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Medical Expenditure For Senior Citizen (self) (If No Insurance Premium)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        50,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Medical Expenditure For Senior Citizen(Parents) (If No Insurance Premium)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        50,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        Other Section
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        45,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        45,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Deduction For Dependent With Disability( Form 10-I) (Flat Dedcution of INR 75000) (Yes/No)
                                                        <div
                                                            className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                        >
                                                            <button
                                                                className={`btn ${isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                type='button'
                                                                style={{
                                                                    backgroundColor: isBuyer ? 'white' : 'black',
                                                                    borderColor: isBuyer ? 'black' : '',
                                                                    color: isBuyer ? 'black' : 'white',
                                                                    // color: 'black',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className={`btn ${!isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                style={{
                                                                    backgroundColor: !isBuyer ? 'white' : 'black',
                                                                    borderColor: !isBuyer ? 'black' : ' ',
                                                                    color: !isBuyer ? 'black' : 'white',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        75,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Deduction For Dependent With Severe Disability( Form 10-I) (Flat dedcution of INR 125000) (Yes/No)
                                                        <div
                                                            className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                        >
                                                            <button
                                                                className={`btn ${isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                type='button'
                                                                style={{
                                                                    backgroundColor: isBuyer ? 'white' : 'black',
                                                                    borderColor: isBuyer ? 'black' : '',
                                                                    color: isBuyer ? 'black' : 'white',
                                                                    // color: 'black',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className={`btn ${!isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                style={{
                                                                    backgroundColor: !isBuyer ? 'white' : 'black',
                                                                    borderColor: !isBuyer ? 'black' : ' ',
                                                                    color: !isBuyer ? 'black' : 'white',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        #####
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Deduction For Self Disability (Flat dedcution of INR 75000) (Yes/No)
                                                        <div
                                                            className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                        >
                                                            <button
                                                                className={`btn ${isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                type='button'
                                                                style={{
                                                                    backgroundColor: isBuyer ? 'white' : 'black',
                                                                    borderColor: isBuyer ? 'black' : '',
                                                                    color: isBuyer ? 'black' : 'white',
                                                                    // color: 'black',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className={`btn ${!isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                style={{
                                                                    backgroundColor: !isBuyer ? 'white' : 'black',
                                                                    borderColor: !isBuyer ? 'black' : ' ',
                                                                    color: !isBuyer ? 'black' : 'white',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        75,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Deduction For Self Severe Disability (Flat dedcution of INR 125000) (Yes/No)
                                                        <div
                                                            className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                                                        >
                                                            <button
                                                                className={`btn ${isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                type='button'
                                                                style={{
                                                                    backgroundColor: isBuyer ? 'white' : 'black',
                                                                    borderColor: isBuyer ? 'black' : '',
                                                                    color: isBuyer ? 'black' : 'white',
                                                                    // color: 'black',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type='button'
                                                                className={`btn ${!isBuyer ? 'btn-primary' : 'btn-dark'} w-50 rounded-pill`}
                                                                style={{
                                                                    backgroundColor: !isBuyer ? 'white' : 'black',
                                                                    borderColor: !isBuyer ? 'black' : ' ',
                                                                    color: !isBuyer ? 'black' : 'white',
                                                                    transition: 'all 0.4s ease-in-out',
                                                                    boxShadow: "none"
                                                                }}
                                                                onClick={handleToggle}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        ######
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred , Maximum of INR 40000)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        40,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        10,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        10,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred , Maximum of INR 100000)
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        ######
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        25,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        25,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        Interest On Educational Loan For Higher Studies (u/s 80E) - Self
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        10,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        10,000.00
                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        HRA Exemption
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        10,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        10,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        10,000.00
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0"
                                                            onClick={handleNavigateToRentDetails}
                                                            style={{
                                                                color: "black",
                                                                textDecoration: "underline",
                                                                fontWeight: "bold",
                                                                fontSize: "1rem"
                                                            }}
                                                        >
                                                            Enter Rent Details
                                                        </button>
                                                    </td>
                                                    <td className="text-center align-content-center fw-bold p-2" style={{ border: "1px solid black" }}>
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td className="align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                    <td className="text-center align-content-center p-2" style={{ border: "1px solid black" }}>

                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td colSpan={7} className="align-content-center p-2" style={{ border: "1px solid black" }}>
                                                        I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary custom-submit-button"
                                        >
                                            Verified
                                        </button>
                                    </div>
                                
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}

export default ViewCheckSupportingSubmittedForTaxList