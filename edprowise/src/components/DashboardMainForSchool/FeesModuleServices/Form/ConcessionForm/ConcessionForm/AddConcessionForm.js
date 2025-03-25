import React, { useState ,useRef} from 'react';

const ConcessionForm = () => {
    
    const [formData, setFormData] = useState({
        admissionNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        class: '',
        section: '',
        concessionType: '',
        castOrIncomeCertificate: null,
        applicableAcademicYear: '',
        concessionDetails: Array(4).fill({
            installmentName: '',
            feesType: '',
            totalFees: '',
            concessionPercentage: '',
            concessionAmount: '',
            balancePayable: ''
        })
    });

    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'castOrIncomeCertificate') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    
    const handleConcessionDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedConcessionDetails = [...formData.concessionDetails];
        updatedConcessionDetails[index] = {
            ...updatedConcessionDetails[index],
            [name]: value
        };

        setFormData({
            ...formData,
            concessionDetails: updatedConcessionDetails
        });
    };

   const fileInputRef = useRef(null);

    const cancelSubmittingForm=()=>{
        setFormData({
            admissionNumber: '',
        firstName: '',
        middleName: '',
        lastName: '',
        class: '',
        section: '',
        concessionType: '',
        castOrIncomeCertificate: null,
        applicableAcademicYear: '',
        concessionDetails: Array(4).fill({
            installmentName: '',
            feesType: '',
            totalFees: '',
            concessionPercentage: '',
            concessionAmount: '',
            balancePayable: ''
        })
        })
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
        }
    }

    
    const addConcessionDetailRow = () => {
        setFormData({
            ...formData,
            concessionDetails: [
                ...formData.concessionDetails,
                {
                    installmentName: '',
                    feesType: '',
                    totalFees: '',
                    concessionPercentage: '',
                    concessionAmount: '',
                    balancePayable: ''
                }
            ]
        });
    };

    
    const removeConcessionDetailRow = (index) => {
        if (index >= 4) { 
            const updatedConcessionDetails = formData.concessionDetails.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                concessionDetails: updatedConcessionDetails
            });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); 
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="card-title text-center custom-heading-font">
                                        Concession Form
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="admissionNumber" className="form-label">
                                                Admission No
                                            </label>
                                            <input
                                                type="text"
                                                id="admissionNumber"
                                                name="admissionNumber"
                                                className="form-control"
                                                value={formData.admissionNumber}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="form-control"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
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
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className="form-control"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="class" className="form-label">
                                                Class
                                            </label>
                                            <input
                                                type="text"
                                                id="class"
                                                name="class"
                                                className="form-control"
                                                value={formData.class}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="section" className="form-label">
                                                Section
                                            </label>
                                            <input
                                                type="text"
                                                id="section"
                                                name="section"
                                                className="form-control"
                                                value={formData.section}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="concessionType" className="form-label">
                                                Concession Type
                                            </label>
                                            <select
                                                id="concessionType"
                                                name="concessionType"
                                                className="form-control"
                                                value={formData.concessionType}
                                                onChange={handleChange}
                                                required
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
                                                Caste/Income Certificate
                                            </label>
                                            <input
                                                type="file"
                                                id="castOrIncomeCertificate"
                                                name="castOrIncomeCertificate"
                                                className="form-control"
                                                accept="image/*,application/pdf"
                                                onChange={handleChange}
                                                ref={fileInputRef} 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="applicableAcademicYear" className="form-label">
                                                Applicable Academic Year
                                            </label>
                                            <input
                                                type="text"
                                                id="applicableAcademicYear"
                                                name="applicableAcademicYear"
                                                className="form-control"
                                                value={formData.applicableAcademicYear}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
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
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.concessionDetails.map((detail, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="form-check ms-1">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`customCheck${index}`}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={`customCheck${index}`}
                                                                >
                                                                    &nbsp;
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="installmentName"
                                                                className="form-control"
                                                                value={detail.installmentName}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="feesType"
                                                                className="form-control"
                                                                value={detail.feesType}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="totalFees"
                                                                className="form-control"
                                                                value={detail.totalFees}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="concessionPercentage"
                                                                className="form-control"
                                                                value={detail.concessionPercentage}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="concessionAmount"
                                                                className="form-control"
                                                                value={detail.concessionAmount}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="balancePayable"
                                                                className="form-control"
                                                                value={detail.balancePayable}
                                                                onChange={(e) => handleConcessionDetailChange(index, e)}
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            {index >= 4 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-soft-danger btn-sm"
                                                                    onClick={() => removeConcessionDetailRow(index)}
                                                                >
                                                                    <iconify-icon
                                                                        icon="solar:trash-bin-minimalistic-2-broken"
                                                                        className="align-middle fs-18"
                                                                    />
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
                                            onClick={addConcessionDetailRow}
                                        >
                                            Add Row
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div className="mr-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary custom-submit-button"
                                        >
                                            Submit For Principal Approval
                                        </button>
                                    </div>
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