import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI";
import { Link } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";

const EmploerUpdateEmployeeDetails = () => {
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
        status: 'On Payroll',
        lastWorkingDate: '',
        reasonForLeaving: '',
        reasonType: '',
        pfCode: '',
        esiCode: '',
    });
    
    const [existingFiles, setExistingFiles] = useState({
        aadharPassportFile: null,
        panFile: null,
        class12Certificate: null,
        degreeCertificate: null,
        resume: null,
        experienceLetter: null,
        relievingLetter: null,
        nominationDetails: []
    });

    const reasonOptions = [
        { label: "Absconding", value: "Absconding", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Better opportunity & Remuneration", value: "Better opportunity & Remuneration", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "End of Contract", value: "End of Contract", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Family reason", value: "Family reason", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Health Issues", value: "Health Issues", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Higher Studies", value: "Higher Studies", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Marriage", value: "Marriage", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Performance below expectation", value: "Performance below expectation", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Relocation", value: "Relocation", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Role clarity", value: "Role clarity", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Starting own Venture", value: "Starting own Venture", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Worklife Balance", value: "Worklife Balance", data: { type2: "Left Services", pfCode: "C", esiCode: "2" } },
        { label: "Retirement", value: "Retirement", data: { type2: "Retirement", pfCode: "R", esiCode: "3" } },
        { label: "Death", value: "Death", data: { type2: "Death", pfCode: "D", esiCode: "5" } },
        { label: "Retrenchment", value: "Retrenchment", data: { type2: "Retrenchment", pfCode: "C", esiCode: "10" } },
        { label: "Permanent Disability", value: "Permanent Disability", data: { type2: "Permanent Disability", pfCode: "P", esiCode: "2" } }
    ];


    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const userDetails = JSON.parse(localStorage.getItem("userDetails"));
            const id = userDetails?.schoolId;
            if (!id) {
                toast.error("School Id not found, please login again");
                return;
            }
            setSchoolId(id);


        };

        fetchEmployeeDetails();
    }, []);

    const handleProceed = async () => {
        if (!employeeId.trim()) {
            toast.warning("Please enter a valid Employee ID.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await getAPI(`/get-employee-self-details/${schoolId}/${employeeId}`);

            if (!response.hasError && response.data?.data) {
                const employeeData = response.data.data;
                setFormData({
                    ...employeeData,
                    dateOfBirth: employeeData.dateOfBirth ? new Date(employeeData.dateOfBirth).toISOString().split('T')[0] : '',
                    joiningDate: employeeData.joiningDate ? new Date(employeeData.joiningDate).toISOString().split('T')[0] : '',
                    lastWorkingDate: employeeData.lastWorkingDate ? new Date(employeeData.lastWorkingDate).toISOString().split('T')[0] : '',
                    nominationDetails: employeeData.nominationDetails?.length > 0 ? employeeData.nominationDetails.map(nom => ({
                        ...nom,
                        nomineeAadharCardOrPassportFile: null 
                    })) : [{
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

                setExistingFiles({
                    aadharPassportFile: employeeData.aadharPassportFileUrl || employeeData.aadharPassportFileName || null,
                    panFile: employeeData.panFileUrl || employeeData.panFileName || null,
                    class12Certificate: employeeData.class12CertificateUrl || employeeData.class12CertificateName || null,
                    degreeCertificate: employeeData.degreeCertificateUrl || employeeData.degreeCertificateName || null,
                    resume: employeeData.resumeUrl || employeeData.resumeName || null,
                    experienceLetter: employeeData.experienceLetterUrl || employeeData.experienceLetterName || null,
                    relievingLetter: employeeData.relievingLetterUrl || employeeData.relievingLetterName || null,
                    nominationDetails: employeeData.nominationDetails?.map(nom => ({
                        nomineeAadharCardOrPassportFile: nom.nomineeAadharCardOrPassportFileUrl || nom.nomineeAadharCardOrPassportFileName || null
                    })) || []
                });
                setNominees(employeeData.nominationDetails?.length > 0 ?
                    employeeData.nominationDetails.map((_, index) => ({ id: index + 1 })) :
                    [{ id: 1 }]);
                setExperiences(employeeData.experienceDetails?.length > 0 ?
                    employeeData.experienceDetails.map((_, index) => ({ id: index + 1 })) :
                    [{ id: 1 }]);
                setShowForm(true);
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

    const handleReasonChange = (selectedOption) => {
        const reason = selectedOption ? selectedOption.value : '';
        const reasonData = selectedOption?.data || { type2: '', pfCode: '', esiCode: '' };

        setFormData(prev => ({
            ...prev,
            reasonForLeaving: reason,
            reasonType: reasonData.type2,
            pfCode: reasonData.pfCode,
            esiCode: reasonData.esiCode
        }));
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {

    let submissionFormData = { ...formData };
  if (submissionFormData.status === "On Payroll") {
      submissionFormData = {
        ...submissionFormData,
        lastWorkingDate: "",
        reasonForLeaving: "",
        reasonType: "",
        pfCode: "",
        esiCode: "",
      };
    }

    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'nominationDetails' || key === 'experienceDetails') {
        submissionData.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] instanceof File && formData[key].size > 0) {
        submissionData.append(key, formData[key]);
      } else if (formData[key] !== null && formData[key] !== undefined) {
        submissionData.append(key, formData[key]);
      }
    });

    formData.nominationDetails.forEach((nominee) => {
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
                                    <h4 className="payroll-title text-center">
                                        Employee Details
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit="">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="mb-6">
                                            <label htmlFor="employeeID" className="form-label">
                                                Employee ID <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="employeeID"
                                                name="employeeID"
                                                className="form-control"
                                                value={employeeId}
                                                onChange={(e) => setEmployeeId(e.target.value)}
                                                required
                                                placeholder="Enter Employee ID"
                                                disabled={showForm}
                                                readOnly={showForm}
                                            />
                                        </div>
                                    </div>
                                    <div className={`col-md-2 ${showForm ? 'd-none' : ''}`} style={{ alignContent: "end", textAlign: "center" }}>
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
                                            onClick={handleProceed}
                                        >
                                            Proceed
                                        </button>
                                    </div>
                                </div>

                                {showForm && (
                                    <>
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
                                                    {existingFiles.aadharPassportFile && (
                                                        <div className="mb-2">
                                                            <small>Existing File: {existingFiles.aadharPassportFile}</small>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="aadharPassportFile"
                                                        name="aadharPassportFile"
                                                        className="form-control"
                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                        onChange={(e) => handleFileChange(e)}
                                                        // Remove required if existing file exists
                                                        required={!existingFiles.aadharPassportFile}
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
                                                    {existingFiles.panFile && (
                                                        <div className="mb-2">
                                                            <small>Existing File: {existingFiles.panFile}</small>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="panFile"
                                                        name="panFile"
                                                        className="form-control"
                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                        onChange={(e) => handleFileChange(e)}
                                                        required={!existingFiles.panFile}
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
                                            {/* Repeat similar changes for other file inputs */}
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="class12Certificate" className="form-label">
                                                        Class 12 Certificate <span className="text-danger">*</span>
                                                    </label>
                                                    {existingFiles.class12Certificate && (
                                                        <div className="mb-2">
                                                            <small>Existing File: {existingFiles.class12Certificate}</small>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="class12Certificate"
                                                        name="class12Certificate"
                                                        className="form-control"
                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                        onChange={(e) => handleFileChange(e)}
                                                        required={!existingFiles.class12Certificate}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="degreeCertificate" className="form-label">
                                                        Degree Certificate <span className="text-danger">*</span>
                                                    </label>
                                                    {existingFiles.degreeCertificate && (
                                                        <div className="mb-2">
                                                            <small>Existing File: {existingFiles.degreeCertificate}</small>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="degreeCertificate"
                                                        name="degreeCertificate"
                                                        className="form-control"
                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                        onChange={(e) => handleFileChange(e)}
                                                        required={!existingFiles.degreeCertificate}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="resume" className="form-label">
                                                        Resume <span className="text-danger">*</span>
                                                    </label>
                                                    {existingFiles.resume && (
                                                        <div className="mb-2">
                                                            <small>Existing File: {existingFiles.resume}</small>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="resume"
                                                        name="resume"
                                                        className="form-control"
                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                        onChange={(e) => handleFileChange(e)}
                                                        required={!existingFiles.resume}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="experienceLetter" className="form-label">
                                                        Experience Letter
                                                    </label>
                                                    {existingFiles.experienceLetter && (
                                                        <div className="mb-2">
                                                            <small>Existing File: {existingFiles.experienceLetter}</small>
                                                        </div>
                                                    )}
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
                                                    {existingFiles.relievingLetter && (
                                                        <div className="mb-2">
                                                            <small>Existing File: {existingFiles.relievingLetter}</small>
                                                        </div>
                                                    )}
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

                                        <div className="card-header mb-2">
                                            <h4 className="card-title text-center custom-heading-font">
                                                Status
                                            </h4>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label
                                                        htmlFor="status"
                                                        className="form-label"
                                                    >
                                                        Status <span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        className="form-control"
                                                        value={formData.status || ''}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Select Status</option>
                                                        <option value="Left">Left</option>
                                                        <option value="On Payroll">On Payroll</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {formData.status === "Left" && (
                                                <>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastWorkingDate" className="form-label">
                                                                Last Working Date <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id="lastWorkingDate"
                                                                name="lastWorkingDate"
                                                                className="form-control"
                                                                value={formData.lastWorkingDate}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="reasonForLeaving" className="form-label">
                                                                Reason for Leaving <span className="text-danger">*</span>
                                                            </label>
                                                            <CreatableSelect
                                                                id="reasonForLeaving"
                                                                isClearable
                                                                placeholder="Select or type reason"
                                                                options={reasonOptions}
                                                                onChange={handleReasonChange}
                                                                value={formData.reasonForLeaving ? { label: formData.reasonForLeaving, value: formData.reasonForLeaving } : null}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="reasonType" className="form-label">
                                                                Reason Type <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="reasonType"
                                                                name="reasonType"
                                                                className="form-control"
                                                                value={formData.reasonType}
                                                                readOnly
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="pfCode" className="form-label">
                                                                PF Code <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="pfCode"
                                                                name="pfCode"
                                                                className="form-control"
                                                                value={formData.pfCode}
                                                                readOnly
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="esiCode" className="form-label">
                                                                ESI Code <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                id="esiCode"
                                                                name="esiCode"
                                                                className="form-control"
                                                                value={formData.esiCode}
                                                                readOnly
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary custom-submit-button"
                                                disabled={isLoading}
                                                onClick={handleSubmit}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Updating...
                                                    </>
                                                ) : 'Update'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmploerUpdateEmployeeDetails