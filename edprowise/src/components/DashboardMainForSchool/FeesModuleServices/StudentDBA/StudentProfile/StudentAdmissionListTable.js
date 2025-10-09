

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import putAPI from "../../../../../api/putAPI";
import { FaFilter } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

const StudentAdmissionProfile = () => {
    const navigate = useNavigate();
    const [schoolId, setSchoolId] = useState(null);
    const [studentData, setStudentData] = useState([]);
    const [classList, setClassList] = useState([]);
    const [shifts, setShifts] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(localStorage.getItem("selectedAcademicYear") || "");
    const [loadingYears, setLoadingYears] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [dropoutStatus, setDropoutStatus] = useState("Dropout");
    const [dropoutReason, setDropoutReason] = useState("");
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [activeTab, setActiveTab] = useState("Admission No.");
    const [admissionNoFilter, setAdmissionNoFilter] = useState("");
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);
    const [selectedShifts, setSelectedShifts] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const tabs = ["Date", "Admission No.", "Academic Year", "Class, Section & Shift", "Status"];
    const pageShowOptions = [
        { value: 10, label: "10" },
        { value: 15, label: "15" },
        { value: 20, label: "20" },
        { value: 30, label: "30" },
        { value: "all", label: "All" },
    ];
    const statusOptions = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
    ];

    useEffect(() => {
        const fetchAcademicYears = async () => {
            try {
                setLoadingYears(true);
                const userDetails = JSON.parse(localStorage.getItem('userDetails'));
                const schoolId = userDetails?.schoolId;
                const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
                const uniqueYears = [...new Set(response.data.data.map(year => year.academicYear))]
                    .map(year => response.data.data.find(y => y.academicYear === year));
                setAcademicYears(uniqueYears || []);
            } catch (err) {
                toast.error("Error fetching academic years.");
                console.error(err);
            } finally {
                setLoadingYears(false);
            }
        };

        fetchAcademicYears();
    }, []);

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const id = userDetails?.schoolId;

        if (!id) {
            toast.error("School ID not found. Please log in again.");
            return;
        }

        setSchoolId(id);
    }, []);

    useEffect(() => {
        if (!schoolId || !selectedYear) return;

        const fetchStudents = async () => {
            try {
                const response = await getAPI(`/get-admission-form-by-acadmichistoryyear-schoolId/${schoolId}/${selectedYear}`);
                const classRes = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
                const shiftResponse = await getAPI(`/master-define-shift/${schoolId}`);
                if (!classRes.hasError) {
                    setClassList(classRes.data.data);
                    console.log("classList:", classRes.data.data); // Debug classList
                } else {
                    console.error("Class Fetch Error:", classRes.message);
                }
                if (!shiftResponse.hasError) {
                    const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : [];
                    setShifts(shiftArray);
                    console.log("shifts:", shiftArray); // Debug shifts
                } else {
                    toast.error(shiftResponse.message || 'Failed to fetch shifts.');
                    setShifts([]);
                }
                if (!response.hasError) {
                    const studentArray = Array.isArray(response.data.forms) ? response.data.forms : [];
                    setStudentData(studentArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)));
                    console.log("studentData:", studentArray); // Debug studentData
                } else {
                    toast.error(response.message || "Failed to fetch student list.");
                }
            } catch (err) {
                toast.error("Error fetching student data.");
                console.error("Student Fetch Error:", err);
            }
        };

        fetchStudents();
    }, [schoolId, selectedYear]);

    const getClassNameById = (id) => {
        if (!id) {
            console.warn("Class ID is missing or null");
            return "N/A";
        }
        const found = classList.find((cls) => cls._id.toString() === id.toString());
        if (!found) {
            console.warn(`Class not found for ID: ${id}`);
            return "N/A";
        }
        return found.className;
    };

    const getSectionNameById = (sectionId) => {
        if (!sectionId) {
            console.warn("Section ID is missing or null");
            return "N/A";
        }
        const found = classList.find((cls) => cls.sections?.some((sec) => sec._id.toString() === sectionId.toString()));
        if (!found) {
            console.warn(`Section not found for ID: ${sectionId}`);
            return "N/A";
        }
        const section = found.sections.find((sec) => sec._id.toString() === sectionId.toString());
        return section ? section.name : "N/A";
    };

    const getShiftName = (shiftId) => {
        if (!shiftId) {
            console.warn("Shift ID is missing or null");
            return "N/A";
        }
        const shift = shifts.find((s) => s._id.toString() === shiftId.toString());
        return shift ? shift.masterDefineShiftName : 'N/A';
    };

    const navigateToViewAdmissionInfo = (event, student) => {
        event.preventDefault();
        navigate(`/school-dashboard/fees-module/student-dba/student-profile/view-admission-form`, {
            state: { student },
        });
    };

    const navigateToUpdateAdmissionForm = (event, student) => {
        event.preventDefault();
        navigate(`/school-dashboard/fees-module/student-dba/student-profile/update-admission-form`, {
            state: { student },
        });
    };

    const handleStatusChange = (studentId, newStatus) => {
        if (!selectedYear) {
            toast.error("Please select an academic year before changing the status.");
            return;
        }
        if (newStatus === "Inactive") {
            setSelectedStudentId(studentId);
            setDropoutStatus("Dropout");
            setDropoutReason("");
            setShowModal(true);
        } else {
            updateStudentStatus(studentId, newStatus, null, null);
        }
    };

    const updateStudentStatus = async (studentId, newStatus, dropoutStatus, dropoutReason) => {
        try {
            const payload = { TCStatus: newStatus };
            if (dropoutStatus) payload.dropoutStatus = dropoutStatus;
            if (dropoutReason) payload.dropoutReason = dropoutReason;
            if (newStatus === "Inactive") payload.dropoutStatusYear = selectedYear;

            const response = await putAPI(`/update-tc-active-inactive-status/${studentId}`, payload);
            if (!response.hasError) {
                setStudentData((prevData) =>
                    prevData.map((student) =>
                        student._id === studentId
                            ? {
                                  ...student,
                                  TCStatus: newStatus,
                                  TCStatusDate: response.data.data.TCStatusDate,
                                  dropoutStatus: response.data.data.dropoutStatus || student.dropoutStatus,
                                  dropoutReason: response.data.data.dropoutReason || student.dropoutReason,
                                  dropoutStatusYear: newStatus === "Inactive" ? selectedYear : student.dropoutStatusYear,
                              }
                            : student
                    )
                );
                toast.success(response.message || `TCStatus updated to ${newStatus} successfully`);
            } else {
                toast.error(response.message || "Failed to update TCStatus");
            }
        } catch (error) {
            toast.error("Error updating TCStatus");
            console.error("TCStatus Update Error:", error);
        }
    };

    const handleModalSubmit = () => {
        if (!dropoutReason.trim()) {
            toast.error("Dropout reason is required.");
            return;
        }
        updateStudentStatus(selectedStudentId, "Inactive", dropoutStatus, dropoutReason);
        setShowModal(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedStudentId(null);
        setDropoutStatus("Dropout");
        setDropoutReason("");
    };

    const classOptions = classList.map(cls => ({
        value: cls._id.toString(),
        label: cls.className,
    }));

    const sectionOptions = selectedClasses.length > 0
        ? classList
            .filter(cls => selectedClasses.some(selected => selected.value === cls._id.toString()))
            .flatMap(cls => cls.sections.map(sec => ({
                value: sec._id.toString(),
                label: `${sec.name}`,
            })))
        : classList.flatMap(cls => cls.sections.map(sec => ({
            value: sec._id.toString(),
            label: `${sec.name}`,
        })));

    const shiftOptions = selectedClasses.length > 0
        ? [...new Set(
            classList
              .filter(cls => selectedClasses.some(selected => selected.value === cls._id.toString()))
              .flatMap(cls => cls.sections.map(sec => sec.shiftId))
          )].map(shiftId => {
            const shift = shifts.find(s => s._id.toString() === shiftId.toString());
            return shift ? { value: shift._id.toString(), label: shift.masterDefineShiftName } : null;
          }).filter(Boolean)
        : shifts.map(shift => ({
            value: shift._id.toString(),
            label: shift.masterDefineShiftName,
        }));

    const handleSelectChange = (selected, action) => {
        if (action.name === "class") {
            setSelectedClasses(selected || []);
            setSelectedSections([]); 
            setSelectedShifts([]);
        } else if (action.name === "section") {
            setSelectedSections(selected || []);
        } else if (action.name === "shift") {
            setSelectedShifts(selected || []);
        } else if (action.name === "status") {
            setSelectedStatuses(selected || []);
        }
    };

    const filteredStudents = studentData.filter(student => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = (
            (student.paymentDate
                ? new Date(student.paymentDate).toLocaleDateString('en-GB').replace(/\//g, '-')
                : '').toLowerCase().includes(searchLower) ||
            (student.AdmissionNumber || '').toLowerCase().includes(searchLower) ||
            (`${student.firstName} ${student.lastName}`).toLowerCase().includes(searchLower) ||
            getClassNameById(student.masterDefineClass).toLowerCase().includes(searchLower) ||
            getSectionNameById(student.section).toLowerCase().includes(searchLower) ||
            getShiftName(student.masterDefineShift).toLowerCase().includes(searchLower) ||
            (student.parentContactNumber || '').toLowerCase().includes(searchLower) ||
            (student.TCStatus || '').toLowerCase().includes(searchLower)
        );

        const matchesAdmissionNo = !admissionNoFilter || (student.AdmissionNumber || "").toLowerCase().includes(admissionNoFilter.toLowerCase());
        const matchesYear = selectedYear ? student.academicYear === selectedYear : true;
        const matchesClass = selectedClasses.length === 0 || selectedClasses.some(c => c.value === (student.masterDefineClass?.toString() || ""));
        const matchesSection = selectedSections.length === 0 || selectedSections.some(s => s.value === (student.section?.toString() || ""));
        const matchesShift = selectedShifts.length === 0 || selectedShifts.some(s => s.value === (student.masterDefineShift?.toString() || ""));
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some(st => st.value === student.TCStatus);
        const matchesDate = !startDate || !endDate || (
            student.paymentDate &&
            new Date(student.paymentDate) >= new Date(startDate) &&
            new Date(student.paymentDate) <= new Date(endDate)
        );

        console.log("Filter Check for student:", {
            student: student.AdmissionNumber,
            masterDefineClass: student.masterDefineClass,
            section: student.section,
            shift: student.masterDefineShift,
            matchesClass,
            matchesSection,
            matchesShift,
            matchesSearch,
            matchesAdmissionNo,
            matchesYear,
            matchesStatus,
            matchesDate
        }); // Debug filter logic

        return matchesSearch && matchesAdmissionNo && matchesYear && matchesClass && matchesSection && matchesShift && matchesStatus && matchesDate;
    });

    const itemsPerPage = rowsPerPage === "all" ? filteredStudents.length : rowsPerPage;
    const indexOfLastStudent = currentPage * itemsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const totalPages = itemsPerPage === filteredStudents.length ? 1 : Math.ceil(filteredStudents.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (selected) => {
        setRowsPerPage(selected ? selected.value : 10);
        setCurrentPage(1);
    };

    const toggleFilterPanel = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    const resetFilters = () => {
        setAdmissionNoFilter("");
        setSelectedYear(localStorage.getItem("selectedAcademicYear") || "");
        setSelectedClasses([]);
        setSelectedSections([]);
        setSelectedShifts([]);
        setSelectedStatuses([]);
        setStartDate("");
        setEndDate("");
        setCurrentPage(1);
    };

    const pageRange = 1;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);
    const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="row p-1 border border-dark" style={{ background: "#bfbfbf" }}>
                                    <div className="col-md-5 col-12">
                                        <input
                                            type="text"
                                            className="form-control border border-dark"
                                            placeholder="Search by any field"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                                        <Select
                                            isClearable
                                            name="rowsPerPage"
                                            placeholder="Show"
                                            options={pageShowOptions}
                                            value={pageShowOptions.find((option) => option.value === rowsPerPage)}
                                            onChange={handleRowsPerPageChange}
                                            className="me-lg-2"
                                        />
                                        <div
                                            className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
                                            style={{ cursor: "pointer" }}
                                            onClick={toggleFilterPanel}
                                        >
                                            <FaFilter />
                                        </div>
                                    </div>
                                </div>
                                {showFilterPanel && (
                                    <div className="row mt-1 border border-light rounded px-md-3 py-1">
                                        <div className="col-12 p-2">
                                            <ul className="nav nav-tabs mb-0 justify-content-center">
                                                {tabs.map((tab) => (
                                                    <li className="nav-item" key={tab}>
                                                        <a
                                                            className={`nav-link fw-bold ${activeTab === tab ? "active" : ""}`}
                                                            onClick={() => setActiveTab(tab)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {tab}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="tab-content mt-2">
                                                {activeTab === "Admission No." && (
                                                    <div className="row d-lg-flex justify-content-center">
                                                        <div className="col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control mt-2"
                                                                placeholder="Enter Admission No."
                                                                value={admissionNoFilter}
                                                                onChange={(e) => setAdmissionNoFilter(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "Academic Year" && (
                                                    <div className="row d-lg-flex justify-content-center">
                                                        <div className="col-md-8">
                                                            <Select
                                                                options={academicYears.map(year => ({
                                                                    value: year.academicYear,
                                                                    label: year.academicYear,
                                                                }))}
                                                                value={
                                                                    selectedYear
                                                                        ? { value: selectedYear, label: selectedYear }
                                                                        : null
                                                                }
                                                                onChange={(selected) => {
                                                                    const year = selected ? selected.value : "";
                                                                    setSelectedYear(year);
                                                                    localStorage.setItem("selectedAcademicYear", year);
                                                                }}
                                                                placeholder="Select Academic Year"
                                                                className="mt-2"
                                                                isLoading={loadingYears}
                                                                isClearable
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "Class, Section & Shift" && (
                                                    <div className="row d-flex justify-content-center">
                                                        <div className="col-md-4">
                                                            <CreatableSelect
                                                                isMulti
                                                                name="class"
                                                                options={classOptions}
                                                                value={selectedClasses}
                                                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                                                placeholder="Select Classes"
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <CreatableSelect
                                                                isMulti
                                                                name="section"
                                                                options={sectionOptions}
                                                                value={selectedSections}
                                                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                                                placeholder="Select Sections"
                                                                className="mt-2"
                                                                isDisabled={selectedClasses.length === 0}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <CreatableSelect
                                                                isMulti
                                                                name="shift"
                                                                options={shiftOptions}
                                                                value={selectedShifts}
                                                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                                                placeholder="Select Shifts"
                                                                className="mt-2"
                                                                isDisabled={selectedClasses.length === 0}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "Status" && (
                                                    <div className="row d-lg-flex justify-content-center">
                                                        <div className="col-md-8">
                                                            <CreatableSelect
                                                                isMulti
                                                                name="status"
                                                                options={statusOptions}
                                                                value={selectedStatuses}
                                                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                                                placeholder="Select Statuses"
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "Date" && (
                                                    <div className="row d-lg-flex justify-content-center">
                                                        <div className="col-md-4">
                                                            <input
                                                                type="date"
                                                                className="form-control mt-2"
                                                                placeholder="Start Date"
                                                                value={startDate}
                                                                onChange={(e) => setStartDate(e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <input
                                                                type="date"
                                                                className="form-control mt-2"
                                                                placeholder="End Date"
                                                                value={endDate}
                                                                onChange={(e) => setEndDate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-end mt-3">
                                                <button className="btn btn-secondary me-2" onClick={resetFilters}>
                                                    Reset
                                                </button>
                                                <button className="btn btn-primary" onClick={() => setShowFilterPanel(false)}>
                                                    Apply Filters
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <h4 className="card-title flex-grow-1 text-center mt-3 mb-3">
                                Student List
                            </h4>
                            <div className="table-responsive">
                                <table className="table align-middle mb-0 table-centered text-center text-nowrap">
                                    <thead className="bg-light-subtle">
                                        <tr>
                                            <th style={{ width: 20 }}>
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
                                            <th>Admission Date</th>
                                            <th>Admission No.</th>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Section</th>
                                            <th>Shift</th>
                                            <th>Contact No</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentStudents.map((student, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="form-check ms-1">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`customCheck${index + 2}`}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`customCheck${index + 2}`}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    {student.paymentDate
                                                        ? new Date(student.paymentDate).toLocaleDateString('en-GB').replace(/\//g, '-')
                                                        : '-'}
                                                </td>
                                                <td>{student.AdmissionNumber || '-'}</td>
                                                <td>{`${student.firstName} ${student.lastName}`}</td>
                                                <td>{getClassNameById(student.masterDefineClass)}</td>
                                                <td>{getSectionNameById(student.section)}</td>
                                                <td>{getShiftName(student.masterDefineShift)}</td>
                                                <td>{student.parentContactNumber || '-'}</td>
                                                <td>
                                                    <select
                                                        className={`form-select form-select-sm ${
                                                            student.TCStatus === 'Active' ? 'text-success' : 'text-danger'
                                                        }`}
                                                        value={student.TCStatus || 'Active'}
                                                        onChange={(e) => handleStatusChange(student._id, e.target.value)}
                                                    >
                                                        <option value="Active" className="text-success">Active</option>
                                                        <option value="Inactive" className="text-danger">Inactive</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <Link
                                                            className="btn btn-light btn-sm"
                                                            onClick={(event) => navigateToViewAdmissionInfo(event, student)}
                                                        >
                                                            <iconify-icon
                                                                icon="solar:eye-broken"
                                                                className="align-middle fs-18"
                                                            />
                                                        </Link>
                                                        <Link
                                                            className="btn btn-soft-primary btn-sm"
                                                            onClick={(event) => navigateToUpdateAdmissionForm(event, student)}
                                                        >
                                                            <iconify-icon
                                                                icon="solar:pen-2-broken"
                                                                className="align-middle fs-18"
                                                            />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer border-top">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end mb-0">
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={handlePreviousPage}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {pagesToShow.map((page) => (
                                        <li
                                            key={page}
                                            className={`page-item ${currentPage === page ? "active" : ""}`}
                                        >
                                            <button
                                                className={`page-link pagination-button ${currentPage === page ? "active" : ""}`}
                                                onClick={() => handlePageClick(page)}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Inactive Status */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="dropoutModalLabel" aria-hidden="false">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="dropoutModalLabel">Confirm Inactive Status</h5>
                                <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="dropoutStatus" className="form-label">Dropout Status</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="dropoutStatus"
                                        value={dropoutStatus}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dropoutReason" className="form-label">Dropout Reason</label>
                                    <textarea
                                        className="form-control"
                                        id="dropoutReason"
                                        value={dropoutReason}
                                        onChange={(e) => setDropoutReason(e.target.value)}
                                        placeholder="Enter reason for dropout"
                                        rows="4"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default StudentAdmissionProfile;
