import React from "react";
import { FaPrint, FaDownload } from "react-icons/fa";

const SalarySlip = () => {

    return (
        <div className="container my-4 text-dark" style={{ padding: 16 }}>
            <div class="custom-bg d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
            <div className="d-flex flex-wrap align-items-center gap-3">
                <label for="yearSelect" class="mb-0">Year :</label>
                <select id="yearSelect" class="custom-select" aria-label="Select Year">
                    <option selected>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                    <option>2028</option>
                    <option>2029</option>
                </select>

                <label for="monthSelect" class="mb-0">Month :</label>
                <select id="monthSelect" class="custom-select" aria-label="Select Month">
                    <option selected>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December.</option>
                </select>
                <button className="btn btn-light btn-sm"
                >
                    <iconify-icon
                        icon="solar:eye-broken"
                        className="align-middle fs-18"
                    />
                </button>
                </div>
                <div className="d-flex">
                <button className="btn btn-light me-2">
                    <FaPrint /> Print
                </button>

                <button className="btn btn-light">
                    <FaDownload /> Download PDF
                </button>
                </div>
            </div>

            <div id="receipt-content" className="border border-dark p-3">
                <div className="text-center mb-3">
                    <h6>
                        <strong>[From Letter Head]</strong>
                    </h6>
                </div>
                <h6 className="text-center bg-light py-1">
                    <strong>SALARY SLIP</strong>
                </h6>
                <div className="row mb-2">
                    <div className="col-6">
                        <p style={{ color: 'black' }}>
                            <strong>Name :</strong>
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>Employee No:</strong> 1
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>PF No :</strong> 123456
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>Paid Days :</strong> 30
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>Lone/Advance Balance :</strong> 200
                        </p>
                    </div>

                    <div className="col-6">
                        <p style={{ color: 'black' }}>
                            <strong>Grade :</strong> A
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>Job Designation :</strong> Teacher
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>UAN :</strong>
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>Pay Mode :</strong> Cash
                        </p>
                        <p style={{ color: 'black' }}>
                            <strong>Security Deposit :</strong> 500
                        </p>
                    </div>
                </div>

                <div className="row pt-3 mb-2" style={{ borderTop: "2px solid black" }} />

                <div className="table-responsive mb-4">
                    <table className="table mb-4" style={{ border: "1px solid black", color: "black" }}>
                        <thead>
                            <tr>
                                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                                    Earning
                                </th>
                                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                                    Amt.
                                </th>
                                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                                    Deduction
                                </th>
                                <th className="text-center p-2" style={{ border: "1px solid black" }}>
                                    Amt.
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                    Basic Salary
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                    PF Deduction
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                </td>
                            </tr>
                            <tr >
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                    HRA
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                    Professional Tax
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                </td>
                            </tr>
                            <tr >
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>
                                    Income Tax
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black" }}>

                                </td>
                            </tr>
                            <tr >
                                <td className="text-center p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                                    Gross Earning
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                                    0
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                                    Gross Deduction
                                </td>
                                <td className="text-center p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                                    0
                                </td>
                            </tr>
                            <tr >
                                <td colSpan={3} className="text-center p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                                    Net Salary
                                </td>

                                <td className="text-center p-2" style={{ border: "1px solid black", fontWeight: "bold" }}>
                                    0
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="row text-dark">

                    <div className="col-12 text-end">
                        <p style={{ color: 'black' }}>
                            <strong>Signature of Principal</strong>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default SalarySlip