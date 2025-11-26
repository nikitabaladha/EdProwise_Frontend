import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import putAPI from '../../../../../api/putAPI';
import AddAndUpdateCarryForwordModal from './AddAndUpdateCarryForwordModal';

const CarryForwardSetting = () => {
    const [schoolId, setSchoolId] = useState(null);
    const [academicYear, setAcademicYear] = useState("");
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [selectedLeaveType, setSelectedLeaveType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [conditions, setConditions] = useState([]);
    const [academicYearList, setAcademicYearList] = useState([]);

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const id = userDetails?.schoolId;
        const academicYear = localStorage.getItem("selectedAcademicYear");

        if (!id) {
            toast.error('School ID not found. Please log in again.');
            return;
        }
        setSchoolId(id);
        setAcademicYear(academicYear);
        fetchAcademicYears(id);
        fetchCarryForwardLeaveTypes(id, academicYear);
    }, []);

    useEffect(() => {
        if (schoolId && academicYear) {
          fetchCarryForwardLeaveTypes(schoolId, academicYear);
        }
      }, [schoolId, academicYear]);
    

    const fetchAcademicYears = async (schoolId) => {
        try {
            const response = await getAPI(`/get-payroll-academic-year/${schoolId}`);
            setAcademicYearList(response.data.data || []);
        } catch (err) {
            toast.error('Failed to fetch academic years.');
        }
    };

    const fetchCarryForwardLeaveTypes = async (schoolId, year) => {
        try {
            const res = await getAPI(`/getall-payroll-annual-leave/${schoolId}?academicYear=${year}`, {}, true);
            if (!res.hasError && Array.isArray(res.data?.data?.ctcComponent)) {
                const filtered = res.data.data.ctcComponent.filter((type) => type.isCarryForward);
                setLeaveTypes(filtered);
            } else {
                toast.error(res.message || 'No carry forward leave types found.');
            }
        } catch (error) {
            toast.error('Failed to fetch carry forward leave types.');
            console.error(error);
        }
    };

    const fetchConditions = async (leaveTypeId) => {
        try {
            const res = await getAPI(`/get-carryforward-conditions/${schoolId}/${leaveTypeId}?academicYear=${academicYear}`, {}, true);
            if (!res.hasError) {
                setConditions(res.data?.conditions || []);
            }
        } catch (error) {
            console.error('Error fetching conditions:', error);
        }
    };

    const handleOpenModal = async (leaveType) => {
        setSelectedLeaveType(leaveType);
        await fetchConditions(leaveType._id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedLeaveType(null);
        setConditions([]);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body custom-heading-padding">
                                <div className="container">
                                    <div className="card-header border border-0 mb-2 d-flex align-items-center">
                                        <h4 className="card-title flex-grow-1 text-center">
                                            Carry Forward Settings
                                        </h4>
                                        <div>
                                            <select
                                                id="yearSelect"
                                                className="form-select form-select-sm w-auto"
                                                aria-label="Select Year"
                                                value={academicYear}
                                                onChange={(e) => setAcademicYear(e.target.value)}
                                            >
                                                <option value="">Select Year</option>
                                                {academicYearList.map((yearObj, index) => (
                                                    <option key={index} value={yearObj.academicYear}>
                                                        {yearObj.academicYear}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="table-responsive px-lg-7 px-md-5">
                                    <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                        <thead className="bg-light-subtle">
                                            <tr className="payroll-table-header">
                                                <th style={{ width: "50px" }}>
                                                    <div className="form-check ms-1">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="customCheck1"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="customCheck1"
                                                        />
                                                    </div>
                                                </th>
                                                <th>Leave Type</th>
                                                <th>Days</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaveTypes.map((type) => (
                                                <tr key={type._id}>
                                                    <td>
                                                        <div className="form-check ms-1">
                                                            <input type="checkbox" className="form-check-input" />
                                                        </div>
                                                    </td>
                                                    <td>{type.annualLeaveTypeName}</td>
                                                    <td>{type.days}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => handleOpenModal(type)}
                                                        >
                                                            {conditions.length > 0 ? 'Edit Condition' : 'Add Condition'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && selectedLeaveType && (
                <AddAndUpdateCarryForwordModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    schoolId={schoolId}
                    academicYear={academicYear}
                    leaveType={selectedLeaveType}
                    conditions={conditions}
                    setConditions={setConditions}
                />
            )}
        </>
    );
};

export default CarryForwardSetting;
