import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ViewEmployeeCTCDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const employeeData = location.state?.employee;

    const [employeeDetails, setEmployeeDetails] = useState({});
    const [ctcComponents, setCtcComponents] = useState([]);
    const [annualCostToInstitution, setAnnualCostToInstitution] = useState(0);

    useEffect(() => {
        if (employeeData) {
            setEmployeeDetails(employeeData.employeeInfo || {});
            setCtcComponents(employeeData.components || []);
            setAnnualCostToInstitution(employeeData.totalAnnualCost || 0);
        }
    }, [employeeData]);

    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2 d-flex align-items-center">
                                    <h4 className="payroll-title flex-grow-1 text-center mb-0">
                                        Employee CTC Details
                                    </h4>
                                    <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>

                            <div className="row m-0 mb-2 pt-2 salary-slip-box">
                                <div className="col-md-8">
                                    <p className='text-dark payroll-box-text'>
                                        <strong>Employee Name: </strong> {employeeDetails.employeeName}
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <p className='text-dark payroll-box-text'>
                                        <strong>Employee ID: </strong> {employeeData.employeeId}
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <p className='text-dark payroll-box-text'>
                                        <strong>Designation: </strong> {employeeDetails.jobDesignation}
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <p className='text-dark payroll-box-text'>
                                        <strong>Category of Employees: </strong> {employeeDetails.categoryOfEmployees}
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <p className='text-dark payroll-box-text'>
                                        <strong>Grade: </strong> {employeeDetails.grade}
                                    </p>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="table-responsive px-lg-6 px-md-5">
                                    <table className="table align-middle mb-0 table-hover table-centered text-center">
                                        <thead className="bg-light-subtle">
                                            <tr className="payroll-table-header">
                                                <th>Components</th>
                                                <th>Annual Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ctcComponents.map((component, index) => (
                                                <tr key={index} className="payroll-table-body">
                                                    <td>
                                                        <span className="form-label fw-bold">
                                                            {component.ctcComponentName}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="col-md-8 mx-auto">
                                                            <input
                                                                type="number"
                                                                className="form-control payroll-table-body payroll-input-border"
                                                                value={component.annualAmount}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            <tr className='payroll-table-body'>
                                                <td>
                                                    <label className="form-label payroll-table-body fw-bold">
                                                        Annual Cost To Institution
                                                    </label>
                                                </td>
                                                <td>
                                                    <div className="col-md-8 mx-auto">
                                                        <input
                                                            type="number"
                                                            className="form-control payroll-table-body payroll-input-border fw-bold"
                                                            value={annualCostToInstitution}
                                                            readOnly
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeCTCDetails;
