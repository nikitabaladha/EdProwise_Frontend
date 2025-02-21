import React,{useState} from 'react'

export const AddConcessionForm = () => {
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
        installments: [],
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'castOrIncomeCertificate') {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle changes in the installments array
    const handleInstallmentChange = (index, field, value) => {
        setFormData((prev) => {
            const updatedInstallments = [...prev.installments];
            updatedInstallments[index][field] = value;
            return { ...prev, installments: updatedInstallments };
        });
    };

    // Handle removing an installment
    const removeInstallment = (index) => {
        setFormData((prev) => ({
            ...prev,
            installments: prev.installments.filter((_, i) => i !== index),
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (
            !formData.admissionNumber ||
            !formData.firstName ||
            !formData.lastName ||
            !formData.class ||
            !formData.section ||
            !formData.concessionType ||
            !formData.castOrIncomeCertificate ||
            !formData.applicableAcademicYear
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate concession details
        if (formData.installments.length === 0) {
            alert('Please add at least one concession detail.');
            return;
        }

        console.log('Form Data:', formData);
    };

    // Handle adding concession details
    const addConcessionDetail = () => {
        const newInstallment = {
            installment: '',
            feesType: '',
            totalFees: '',
            concessionPercentage: '',
            concessionAmount: '',
            balancePayable: '',
        };

        setFormData((prev) => ({
            ...prev,
            installments: [...prev.installments, newInstallment],
        }));
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
                                        {" "}
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
                                        {" "}
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
                                        {" "}
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
                                        {" "}
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
                                        {" "}
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
                                                <option value="SC">
                                                    SC
                                                </option>
                                                <option value="ST">
                                                    ST
                                                </option>
                                                <option value="OBC">
                                                    OBC
                                                </option>
                                                <option value="Staff Children">
                                                    Staff Children
                                                </option>
                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        {" "}
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
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        {" "}
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
                                            <tr>
                                                <td>
                                                    <div className="form-check ms-1">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="customCheck2"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="customCheck2"
                                                        >
                                                            &nbsp;
                                                        </label>
                                                    </div>
                                                </td>
                                                <td><input
                                                type="text"
                                                id="installmentName"
                                                name="installmentName"
                                                className="form-control"
                                                value={formData.installmentName}
                                                onChange={handleChange}
                                                required
                                            /></td>
                                                <td><input
                                                type="text"
                                                id="feesType"
                                                name="feesType"
                                                className="form-control"
                                                value={formData.feesType}
                                                onChange={handleChange}
                                                required
                                            /></td>
                                                <td><input
                                                type="text"
                                                id="totalFees"
                                                name="feesType"
                                                className="form-control"
                                                value={formData.feesType}
                                                onChange={handleChange}
                                                required
                                            /></td>
                                                <td><input
                                                type="text"
                                                id="feesType"
                                                name="feesType"
                                                className="form-control"
                                                value={formData.feesType}
                                                onChange={handleChange}
                                                required
                                            /></td>
                                                <td><input
                                                type="text"
                                                id="feesType"
                                                name="feesType"
                                                className="form-control"
                                                value={formData.feesType}
                                                onChange={handleChange}
                                                required
                                            /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div className="mr-2">
                                        {" "}
                                        <button
                                            type="submit"
                                            className="btn btn-primary custom-submit-button"
                                        >
                                            Submit For Principal Approval
                                        </button>
                                    </div>
                                    <div className="text" style={{ marginLeft: "2px" }}
                                    >
                                        {" "}
                                        <button
                                            type="button"
                                            className="btn btn-primary custom-submit-button"
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
    )
}
export default AddConcessionForm;
