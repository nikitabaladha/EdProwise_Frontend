import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI"; // Import putAPI
import { Link } from 'react-router-dom';
 
const UpdatePayrollEmployeeDetails = () => {
    const [showForm, setShowForm] = useState(false);
    const [experiences, setExperiences] = useState([{ id: 1 }]);
    const [nominees, setNominees] = useState([{ id: 1 }]);
    const [schoolId, setSchoolId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        schoolId: '',
        employeeId: '',
        password: '',
        employeeName: '',
        emailId: '',
        contactNumber: '',
        dateOfBirth: '',
        gender: '',
        categoryOfEmployees: '',
        grade: '',
        jobDesignation: '',
        joiningDate: '',
        fatherName: '',
        spouseName: '',
        currentAddress: '',
        emergencyContactNumber: '',
        nationality: 'Indian',
        religion: '',
        maritalStatus: '',
        higherQualification: '',
        physicalHandicap: 'No',
        aadharPassportNumber: '',
        aadharPassportFile: null,
        panNumber: '',
        panFile: null,
        uanNumber: '',
        esicNumber: '',
        accountHolderName: '',
        bankName: '',
        ifscCode: '',
        accountNumber: '',
        accountType: '',
        class12Certificate: null,
        degreeCertificate: null,
        resume: null,
        experienceLetter: null,
        relievingLetter: null,
        nominationDetails: [{
            nomineeName: '',
            nomineeRelation: '',
            nomineeAadharNumber: '',
            nomineeAadharCardOrPassportFile: null,
            nomineeShearPercentage: ''
        }],
        experienceDetails: [{
            previousSchoolName: '',
            previousSchoolAddress: '',
            previousSchoolJoiningDate: '',
            previousSchoolLastDate: '',
            previousJobDesignation: '',
            numberOfExperience: ''
        }],
        securityDepositAmount: '',
        voluntaryPFContribution: '',
        taxRegime: 'new',
        status: 'On Payroll'
    });

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const userDetails = JSON.parse(localStorage.getItem("userDetails"));
            const id = userDetails?.schoolId;
            const empId = userDetails?.userId;

            if (!id || !empId) {
                toast.error("Authentication details missing");
                return;
            }

            setSchoolId(id);
            setEmployeeId(empId);

            try {
                setIsLoading(true);
                const response = await getAPI(`/get-employee-self-details/${id}/${empId}`);
                
                if (!response.hasError && response.data?.data) {
                    const employeeData = response.data.data;
                    setFormData({
                        ...employeeData,
                        dateOfBirth: employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toISOString().split('T')[0] : '',
                        joiningDate: employeeData.joiningDate ? new Date(employeeData.joiningDate).toISOString().split('T')[0] : '',
                        nominationDetails: employeeData.nominationDetails?.length > 0 ? employeeData.nominationDetails : [{
                            nomineeName: '',
                            nomineeRelation: '',
                            nomineeAadharNumber: '',
                            nomineeAadharCardOrPassportFile: null,
                            nomineeShearPercentage: ''
                        }],
                        experienceDetails: employeeData.experienceDetails?.length > 0 ? employeeData.experienceDetails.map(exp => ({
                            ...exp,
                            previousSchoolJoiningDate: exp.previousSchoolJoiningDate ? new Date(exp.previousSchoolJoiningDate).toISOString().split('T')[0] : '',
                            previousSchoolLastDate: exp.previousSchoolLastDate ? new Date(exp.previousSchoolLastDate).toISOString().split('T')[0] : ''
                        })) : [{
                            previousSchoolName: '',
                            previousSchoolAddress: '',
                            previousSchoolJoiningDate: '',
                            previousSchoolLastDate: '',
                            previousJobDesignation: '',
                            numberOfExperience: ''
                        }],
                    });
                    setNominees(employeeData.nominationDetails?.length > 0 ? 
                        employeeData.nominationDetails.map((_, index) => ({ id: index + 1 })) : 
                        [{ id: 1 }]);
                    setExperiences(employeeData.experienceDetails?.length > 0 ? 
                        employeeData.experienceDetails.map((_, index) => ({ id: index + 1 })) : 
                        [{ id: 1 }]);
                } else {
                    toast.error(response.message || "No employee data found");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load employee details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, []);

    const handleChange = (e, section, index) => {
        const { name, value } = e.target;
        
        if (section === 'nominationDetails') {
            setFormData(prev => ({
                ...prev,
                nominationDetails: prev.nominationDetails.map((item, i) => 
                    i === index ? { ...item, [name]: value } : item
                )
            }));
        } else if (section === 'experienceDetails') {
            setFormData(prev => ({
                ...prev,
                experienceDetails: prev.experienceDetails.map((item, i) => 
                    i === index ? { ...item, [name]: value } : item
                )
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e, section, index) => {
        const { name, files } = e.target;
        
        if (section === 'nominationDetails') {
            setFormData(prev => ({
                ...prev,
                nominationDetails: prev.nominationDetails.map((item, i) => 
                    i === index ? { ...item, [name]: files[0] } : item
                )
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        }
    };

    const addExperience = () => {
        const newExperience = { id: experiences.length + 1 };
        setExperiences([...experiences, newExperience]);
        setFormData(prev => ({
            ...prev,
            experienceDetails: [...prev.experienceDetails, {
                previousSchoolName: '',
                previousSchoolAddress: '',
                previousSchoolJoiningDate: '',
                previousSchoolLastDate: '',
                previousJobDesignation: '',
                numberOfExperience: ''
            }]
        }));
    };

    const removeExperience = (id) => {
        if (id !== 1) {
            setExperiences(experiences.filter(exp => exp.id !== id));
            setFormData(prev => ({
                ...prev,
                experienceDetails: prev.experienceDetails.filter((_, index) => experiences[index].id !== id)
            }));
        }
    };

    const addNominee = () => {
        const newNominee = { id: nominees.length + 1 };
        setNominees([...nominees, newNominee]);
        setFormData(prev => ({
            ...prev,
            nominationDetails: [...prev.nominationDetails, {
                nomineeName: '',
                nomineeRelation: '',
                nomineeAadharNumber: '',
                nomineeAadharCardOrPassportFile: null,
                nomineeShearPercentage: ''
            }]
        }));
    };

    const removeNominee = (id) => {
        if (id !== 1) {
            setNominees(nominees.filter(nom => nom.id !== id));
            setFormData(prev => ({
                ...prev,
                nominationDetails: prev.nominationDetails.filter((_, index) => nominees[index].id !== id)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const submissionData = new FormData();
            // Append non-file fields
            Object.keys(formData).forEach(key => {
                if (key === 'nominationDetails' || key === 'experienceDetails') {
                    submissionData.append(key, JSON.stringify(formData[key]));
                } else if (formData[key] instanceof File) {
                    submissionData.append(key, formData[key]);
                } else if (formData[key] !== null && formData[key] !== undefined) {
                    submissionData.append(key, formData[key]);
                }
            });

            formData.nominationDetails.forEach((nominee, index) => {
                if (nominee.nomineeAadharCardOrPassportFile instanceof File) {
                    submissionData.append('nomineeAadharCardOrPassportFile', nominee.nomineeAadharCardOrPassportFile);
                }
            });

            const response = await putAPI(`/update-employee-details/${schoolId}/${employeeId}`, submissionData, 
                { "Content-Type": "multipart/form-data" }
            ,true);

            if (!response.hasError) {
                toast.success("Employee details updated successfully");
            } else {
                toast.error(response.message || "Failed to update employee details");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to update employee details");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="payroll-title text-center mb-0">
                                        Employee Details
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="employeeId" className="form-label">
                                                Employee ID <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="employeeId"
                                                name="employeeId"
                                                className="form-control"
                                                value={formData.employeeId}
                                                readOnly
                                                placeholder="Employee ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="employeeName" className="form-label">
                                                Name of Employee <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="employeeName"
                                                name="employeeName"
                                                className="form-control"
                                                value={formData.employeeName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Employee Name"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="joiningDate" className="form-label">
                                                Joining Date <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="joiningDate"
                                                name="joiningDate"
                                                className="form-control"
                                                value={formData.joiningDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="categoryOfEmployees" className="form-label">
                                                Category of Employees <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="categoryOfEmployees"
                                                name="categoryOfEmployees"
                                                className="form-control"
                                                value={formData.categoryOfEmployees}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Category"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="grade" className="form-label">
                                                Grade <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="grade"
                                                name="grade"
                                                className="form-control"
                                                value={formData.grade}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Grade"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="jobDesignation" className="form-label">
                                                Job Designation <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="jobDesignation"
                                                name="jobDesignation"
                                                className="form-control"
                                                value={formData.jobDesignation}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Job Designation"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="dateOfBirth" className="form-label">
                                                Date of Birth <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="dateOfBirth"
                                                name="dateOfBirth"
                                                className="form-control"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="fatherName" className="form-label">
                                                Father Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="fatherName"
                                                name="fatherName"
                                                className="form-control"
                                                value={formData.fatherName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Father Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="spouseName" className="form-label">
                                                Spouse Name
                                            </label>
                                            <input
                                                type="text"
                                                id="spouseName"
                                                name="spouseName"
                                                className="form-control"
                                                value={formData.spouseName}
                                                onChange={handleChange}
                                                placeholder="Enter Spouse Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="currentAddress" className="form-label">
                                                Current Address <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="currentAddress"
                                                name="currentAddress"
                                                rows={3}
                                                value={formData.currentAddress}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="contactNumber" className="form-label">
                                                Contact Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="contactNumber"
                                                name="contactNumber"
                                                className="form-control"
                                                value={formData.contactNumber}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter 10-digit number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="emergencyContactNumber" className="form-label">
                                                Emergency Contact Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="emergencyContactNumber"
                                                name="emergencyContactNumber"
                                                className="form-control"
                                                value={formData.emergencyContactNumber}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter 10-digit number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="emailId" className="form-label">
                                                Email ID <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="emailId"
                                                name="emailId"
                                                className="form-control"
                                                value={formData.emailId}
                                                onChange={handleChange}
                                                required
                                                placeholder="example@gmail.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="nationality" className="form-label">
                                                Nationality <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="nationality"
                                                name="nationality"
                                                className="form-control"
                                                value={formData.nationality}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Nationality</option>
                                                <option value="Indian">Indian</option>
                                                <option value="Nepalese">Nepalese</option>
                                                <option value="Bhutanese">Bhutanese</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="religion" className="form-label">
                                                Religion <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="religion"
                                                name="religion"
                                                className="form-control"
                                                value={formData.religion}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Religion"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="gender" className="form-label">
                                                Gender <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="gender"
                                                name="gender"
                                                className="form-control"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Transgender">Transgender</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="maritalStatus" className="form-label">
                                                Marital Status <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="maritalStatus"
                                                name="maritalStatus"
                                                className="form-control"
                                                value={formData.maritalStatus}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Married">Married</option>
                                                <option value="Un-Married">Un-Married</option>
                                                <option value="Widower">Widower</option>
                                                <option value="Divorcee">Divorcee</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="higherQualification" className="form-label">
                                                Higher Qualification <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="higherQualification"
                                                name="higherQualification"
                                                className="form-control"
                                                value={formData.higherQualification}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Qualification</option>
                                                <option value="Below Class 12">Below Class 12</option>
                                                <option value="Upto Class 12">Upto Class 12</option>
                                                <option value="Graduate">Graduate</option>
                                                <option value="Post Graduate">Post Graduate</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="physicalHandicap" className="form-label">
                                                Physical Handicap <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="physicalHandicap"
                                                name="physicalHandicap"
                                                className="form-control"
                                                value={formData.physicalHandicap}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="aadharPassportNumber" className="form-label">
                                                Aadhar Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="aadharPassportNumber"
                                                name="aadharPassportNumber"
                                                className="form-control"
                                                value={formData.aadharPassportNumber}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter 12-digit Aadhar Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="aadharPassportFile" className="form-label">
                                                Aadhar Upload <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="aadharPassportFile"
                                                name="aadharPassportFile"
                                                className="form-control"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                onChange={(e) => handleFileChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="panNumber" className="form-label">
                                                PAN Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="panNumber"
                                                name="panNumber"
                                                className="form-control"
                                                value={formData.panNumber}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter PAN Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="panFile" className="form-label">
                                                PAN Upload <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="panFile"
                                                name="panFile"
                                                className="form-control"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                onChange={(e) => handleFileChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="uanNumber" className="form-label">
                                                UAN Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="uanNumber"
                                                name="uanNumber"
                                                className="form-control"
                                                value={formData.uanNumber}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter UAN Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="esicNumber" className="form-label">
                                                ESIC Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="esicNumber"
                                                name="esicNumber"
                                                className="form-control"
                                                value={formData.esicNumber}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter ESIC Number"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Bank Account Information
                                    </h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="accountHolderName" className="form-label">
                                                Account Holder Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="accountHolderName"
                                                name="accountHolderName"
                                                className="form-control"
                                                value={formData.accountHolderName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Account Holder Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="bankName" className="form-label">
                                                Bank Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="bankName"
                                                name="bankName"
                                                className="form-control"
                                                value={formData.bankName}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Bank Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="ifscCode" className="form-label">
                                                IFSC Code <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="ifscCode"
                                                name="ifscCode"
                                                className="form-control"
                                                value={formData.ifscCode}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter IFSC Code"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="accountNumber" className="form-label">
                                                Account Number <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="accountNumber"
                                                name="accountNumber"
                                                className="form-control"
                                                value={formData.accountNumber}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Account Number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="accountType" className="form-label">
                                                Account Type <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="accountType"
                                                name="accountType"
                                                className="form-control"
                                                value={formData.accountType}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Account Type</option>
                                                <option value="Savings">Savings</option>
                                                <option value="Current">Current</option>
                                                <option value="Salary">Salary</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Document Upload
                                    </h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="class12Certificate" className="form-label">
                                                Class 12 Certificate <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="class12Certificate"
                                                name="class12Certificate"
                                                className="form-control"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                onChange={(e) => handleFileChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="degreeCertificate" className="form-label">
                                                Degree Certificate <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="degreeCertificate"
                                                name="degreeCertificate"
                                                className="form-control"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                onChange={(e) => handleFileChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="resume" className="form-label">
                                                Resume <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                id="resume"
                                                name="resume"
                                                className="form-control"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                onChange={(e) => handleFileChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="experienceLetter" className="form-label">
                                                Experience Letter
                                            </label>
                                            <input
                                                type="file"
                                                id="experienceLetter"
                                                name="experienceLetter"
                                                className="form-control"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                onChange={(e) => handleFileChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="relievingLetter" className="form-label">
                                                Relieving Letter
                                            </label>
                                            <input
                                                type="file"
                                                id="relievingLetter"
                                                name="relievingLetter"
                                                className="form-control"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                onChange={(e) => handleFileChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Nomination For Gratuity & Others
                                    </h4>
                                </div>

                                {nominees.map((nominee, index) => (
                                    <div key={nominee.id} className='row'>
                                        <div className='d-flex justify-content-between' style={{ padding: "0" }}>
                                            <div className="card-header mt-0" style={{ padding: "0.50rem", borderBottom: "none" }}>
                                                <h4 className="card-title text-center">
                                                    Nominee {index + 1}
                                                </h4>
                                            </div>
                                            {nominee.id !== 1 && (
                                                <div className="card-header p-0">
                                                    <Link className="btn btn-soft-danger btn-sm"
                                                        onClick={() => removeNominee(nominee.id)}>
                                                        <iconify-icon
                                                            icon="solar:trash-bin-minimalistic-2-broken"
                                                            className="align-middle fs-18"
                                                        />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`nomineeName-${nominee.id}`} className="form-label">
                                                    Nominee Name <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`nomineeName-${nominee.id}`}
                                                    name="nomineeName"
                                                    className="form-control"
                                                    value={formData.nominationDetails[index]?.nomineeName || ''}
                                                    onChange={(e) => handleChange(e, 'nominationDetails', index)}
                                                    required
                                                    placeholder='Enter Nominee Name'
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`nomineeRelation-${nominee.id}`} className="form-label">
                                                    Relation <span className="text-danger">*</span>
                                                </label>
                                                <select
                                                    id={`nomineeRelation-${nominee.id}`}
                                                    name="nomineeRelation"
                                                    className="form-control"
                                                    value={formData.nominationDetails[index]?.nomineeRelation || ''}
                                                    onChange={(e) => handleChange(e, 'nominationDetails', index)}
                                                    required
                                                >
                                                    <option value="">Select Relation</option>
                                                    <option value="Spouse">Spouse</option>
                                                    <option value="Child">Child</option>
                                                    <option value="Father">Father</option>
                                                    <option value="Mother">Mother</option>
                                                    <option value="Sibling">Sibling</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor={`nomineeAadharNumber-${nominee.id}`} className="form-label">
                                                    Aadhar Number <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`nomineeAadharNumber-${nominee.id}`}
                                                    name="nomineeAadharNumber"
                                                    className="form-control"
                                                    value={formData.nominationDetails[index]?.nomineeAadharNumber || ''}
                                                    onChange={(e) => handleChange(e, 'nominationDetails', index)}
                                                    required
                                                    placeholder='Enter Nominee Aadhar Number'
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor={`nomineeAadharCardOrPassportFile-${nominee.id}`}
                                                    className="form-label"
                                                >
                                                    Aadhar Card/Passport Upload <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="file"
                                                    id={`nomineeAadharCardOrPassportFile-${nominee.id}`}
                                                    name="nomineeAadharCardOrPassportFile"
                                                    className="form-control"
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                    onChange={(e) => handleFileChange(e, 'nominationDetails', index)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor={`nomineeShearPercentage-${nominee.id}`} className="form-label">
                                                    Share Percentage (%) <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    id={`nomineeShearPercentage-${nominee.id}`}
                                                    name="nomineeShearPercentage"
                                                    className="form-control"
                                                    value={formData.nominationDetails[index]?.nomineeShearPercentage || ''}
                                                    onChange={(e) => handleChange(e, 'nominationDetails', index)}
                                                    required
                                                    placeholder='Enter Nominee Share Percentage'
                                                    min="0"
                                                    max="100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-end card-header">
                                    <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={addNominee}
                                    >
                                        Add Nominee
                                    </button>
                                </div>

                                <div className="card-header mt-1">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Previous Employment
                                    </h4>
                                </div>

                                {experiences.map((exp, index) => (
                                    <div key={exp.id} className='row'>
                                        <div className='d-flex justify-content-between' style={{ padding: "0" }}>
                                            <div className="card-header mt-0" style={{ padding: "0.50rem", borderBottom: "none" }}>
                                                <h4 className="card-title text-center">
                                                    Experience {index + 1}
                                                </h4>
                                            </div>
                                            {exp.id !== 1 && (
                                                <div className="card-header p-0">
                                                    <Link className="btn btn-soft-danger btn-sm"
                                                        onClick={() => removeExperience(exp.id)}>
                                                        <iconify-icon
                                                            icon="solar:trash-bin-minimalistic-2-broken"
                                                            className="align-middle fs-18"
                                                        />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`previousSchoolName-${exp.id}`} className="form-label">
                                                    Name of School/Others <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`previousSchoolName-${exp.id}`}
                                                    name="previousSchoolName"
                                                    className="form-control"
                                                    value={formData.experienceDetails[index]?.previousSchoolName || ''}
                                                    onChange={(e) => handleChange(e, 'experienceDetails', index)}
                                                    required
                                                    placeholder='Enter Previous School Name'
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`previousSchoolAddress-${exp.id}`} className="form-label">
                                                    Address <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`previousSchoolAddress-${exp.id}`}
                                                    name="previousSchoolAddress"
                                                    className="form-control"
                                                    value={formData.experienceDetails[index]?.previousSchoolAddress || ''}
                                                    onChange={(e) => handleChange(e, 'experienceDetails', index)}
                                                    required
                                                    placeholder='Enter Previous School Address'
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`previousSchoolJoiningDate-${exp.id}`} className="form-label">
                                                    From <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    id={`previousSchoolJoiningDate-${exp.id}`}
                                                    name="previousSchoolJoiningDate"
                                                    className="form-control"
                                                    value={formData.experienceDetails[index]?.previousSchoolJoiningDate || ''}
                                                    onChange={(e) => handleChange(e, 'experienceDetails', index)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`previousSchoolLastDate-${exp.id}`} className="form-label">
                                                    To <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    id={`previousSchoolLastDate-${exp.id}`}
                                                    name="previousSchoolLastDate"
                                                    className="form-control"
                                                    value={formData.experienceDetails[index]?.previousSchoolLastDate || ''}
                                                    onChange={(e) => handleChange(e, 'experienceDetails', index)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`previousJobDesignation-${exp.id}`} className="form-label">
                                                    Job Designation <span Grammarly="true" className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`previousJobDesignation-${exp.id}`}
                                                    name="previousJobDesignation"
                                                    className="form-control"
                                                    value={formData.experienceDetails[index]?.previousJobDesignation || ''}
                                                    onChange={(e) => handleChange(e, 'experienceDetails', index)}
                                                    required
                                                    placeholder='Enter Previous Job Designation'
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor={`numberOfExperience-${exp.id}`} className="form-label">
                                                    Year. of Experience <span className="text-danger">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`numberOfExperience-${exp.id}`}
                                                    name="numberOfExperience"
                                                    className="form-control"
                                                    value={formData.experienceDetails[index]?.numberOfExperience || ''}
                                                    onChange={(e) => handleChange(e, 'experienceDetails', index)}
                                                    required
                                                    placeholder='Enter Number of Experience'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-end card-header">
                                    <button
                                        type="button"
                                        className="btn btn-primary custom-submit-button"
                                        onClick={addExperience}
                                    >
                                        Add Employment
                                    </button>
                                </div>

                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Others
                                    </h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="securityDepositAmount" className="form-label">
                                                Security Deposit Amount <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                id="securityDepositAmount"
                                                name="securityDepositAmount"
                                                className="form-control"
                                                value={formData.securityDepositAmount}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter Amount"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="voluntaryPFContribution" className="form-label">
                                                Voluntary PF Contribution
                                            </label>
                                            <input
                                                type="number"
                                                id="voluntaryPFContribution"
                                                name="voluntaryPFContribution"
                                                className="form-control"
                                                value={formData.voluntaryPFContribution}
                                                onChange={handleChange}
                                                placeholder="Enter Amount"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="taxRegime" className="form-label">
                                                Tax Regime <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="taxRegime"
                                                name="taxRegime"
                                                className="form-control"
                                                value={formData.taxRegime}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select Tax Regime</option>
                                                <option value="old">Old</option>
                                                <option value="new">New</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary custom-submit-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Updating...
                                            </>
                                        ) : 'Update'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePayrollEmployeeDetails;