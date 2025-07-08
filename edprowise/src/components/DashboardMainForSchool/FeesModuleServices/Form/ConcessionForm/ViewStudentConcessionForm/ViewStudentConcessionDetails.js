import React from 'react';
import { useConcessionForm } from '../UpdateConcessionForm/useConcessionForm';
import { generateTCPDF } from "./generateStudentPDF";
import { toast } from 'react-toastify';


const ConcessionForm = () => {
    const {
        formData,
        classes,
        sections,
        feeTypes,
        fileInputRef,
        handleChange,
        handleConcessionDetailChange,
        handleSubmit,
        cancelSubmittingForm,
        toggleRowSelection,
        getFileNameFromPath,
        academicYears,
        schoolId
    } = useConcessionForm();

      const renderFileViewButton = (filePath, altText) => {
    if (!filePath) return <div className="text-secondary small mt-1">No file</div>;

    const fileUrl = `${process.env.REACT_APP_API_URL_FOR_IMAGE}${filePath}`;

    return (
      <div className="mt-1">
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-primary"
        >
          View {altText}
        </a>
      </div>
    );
  };

    const handleDownloadPDF = async () => {
        console.log("SchoolId",schoolId)
        try {
            await generateTCPDF(schoolId,formData, classes, sections, feeTypes, getFileNameFromPath);
            toast.success("TC PDF downloaded successfully.");
        } catch (error) {
            toast.error("Failed to generate PDF. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                                    <h4 className="card-title text-center custom-heading-font">
                                        View Concession Form
                                    </h4>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleDownloadPDF}
                                        title="Download TC Form as PDF"
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-4 d-flex flex-column align-items-center">
                                        <div className="border rounded d-flex justify-content-center align-items-center mb-2"
                                            style={{ width: "150px", height: "180px", overflow: "hidden" }}>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.studentPhoto}`}
                                                alt="Student"
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="mb-3">
                                                <label htmlFor="AdmissionNumber" className="form-label">
                                                    Admission No
                                                </label>
                                                <input
                                                    type="text"
                                                    id="AdmissionNumber"
                                                    name="AdmissionNumber"
                                                    className="form-control"
                                                    value={formData.AdmissionNumber}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="firstName" className="form-label">
                                                        First Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        className="form-control"
                                                        value={formData.firstName}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="middleName" className="form-label">
                                                        Middle Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="middleName"
                                                        name="middleName"
                                                        className="form-control"
                                                        value={formData.middleName}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="lastName" className="form-label">
                                                        Last Name <span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        className="form-control"
                                                        value={formData.lastName}
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="masterDefineClass" className="form-label">
                                                Class<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="masterDefineClass"
                                                name="masterDefineClass"
                                                className="form-control"
                                                value={formData.masterDefineClass}
                                                disabled

                                            >
                                                <option value="">Select Class</option>
                                                {classes.map((classItem) => (
                                                    <option key={classItem._id} value={classItem._id}>
                                                        {classItem.className}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="section" className="form-label">
                                                Section<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="section"
                                                name="section"
                                                className="form-control"
                                                value={formData.section}
                                                disabled

                                            >
                                                <option value="">Select Section</option>
                                                {sections.map((section) => (
                                                    <option key={section._id} value={section._id}>
                                                        {section.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="concessionType" className="form-label">
                                                Concession Type<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="concessionType"
                                                name="concessionType"
                                                className="form-control"
                                                value={formData.concessionType}
                                                disabled
                                            >
                                                <option value="">Select</option>
                                                <option value="EWS">EWS</option>
                                                <option value="SC">SC</option>
                                                <option value="ST">ST</option>
                                                <option value="OBC">OBC</option>
                                                <option value="Staff Children">Staff Children</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="castOrIncomeCertificate" className="form-label">
                                                Caste/Income Certificate<span className="text-danger">*</span>
                                            </label>
                                           {typeof formData.castOrIncomeCertificate === 'string' && (
                            <div className="mt-2">
                              {renderFileViewButton(formData.castOrIncomeCertificate, " Caste/Income Certificate")}
                            </div>
                          )}

                                        </div>
                                    </div>

                                    {/* <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="academicYear" className="form-label">
                                                Applicable Academic Year <span className="text-danger">*</span>
                                            </label>
                                            <select
                                                id="academicYear"
                                                name="academicYear"
                                                className="form-control"
                                                value={formData.academicYear}
                                                // onChange={handleChange}
                                                required
                                                disabled
                                            >
                                                <option value="" disabled>Select Year</option>
                                                {academicYears.map((year) => (
                                                    <option key={year._id} value={year.academicYear}>
                                                        {year.academicYear}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div> */}
                                </div>


                                <div className='row'>
                                    <div className="card-header mb-2">
                                        <h4 className="card-title text-center custom-heading-font">
                                            Concession Details
                                        </h4>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table align-middle mb-0 table-hover table-centered text-center">
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
                                                    <th>Installment</th>
                                                    <th>Fees Type</th>
                                                    <th>Total Fees</th>
                                                    <th>Concession %</th>
                                                    <th>Concession Amt.</th>
                                                    <th>Balance Payable</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.concessionDetails.map((detail, index) => (
                                                    <tr key={index} className={detail.selected ? 'table-primary' : ''}>
                                                        <td>
                                                            <div className="form-check ms-1">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={detail.selected || false}
                                                                    onChange={() => toggleRowSelection(index)}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="installmentName"
                                                                className="form-control"
                                                                value={detail.installmentName}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <select
                                                                name="feesType"
                                                                className="form-control"
                                                                value={detail.feesType || ""}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                disabled
                                                            >
                                                                <option value="">Select Fee Type</option>
                                                                {feeTypes.map((type) => (
                                                                    <option key={type._id} value={type._id}>
                                                                        {type.feesTypeName}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input
                                                              
                                                                name="totalFees"
                                                                className="form-control text-end"
                                                                value={detail.totalFees}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                min="0"
                                                                step="0.01"
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <div className="input-group">
                                                                <input
                                                                  
                                                                    name="concessionPercentage"
                                                                    className="form-control text-end"
                                                                    value={detail.concessionPercentage}
                                                                    onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                    min="0"
                                                                    max="100"
                                                                    step="0.01"
                                                                    disabled
                                                                />
                                                                <span className="input-group-text">%</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input
                                                              
                                                                name="concessionAmount"
                                                                className="form-control text-end"
                                                                value={detail.concessionAmount}
                                                                readOnly
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                              
                                                                name="balancePayable"
                                                                className="form-control text-end"
                                                                value={detail.balancePayable}
                                                                readOnly
                                                                disabled
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div className="text" style={{ marginLeft: "2px" }}>
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
                                            onClick={cancelSubmittingForm}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConcessionForm;