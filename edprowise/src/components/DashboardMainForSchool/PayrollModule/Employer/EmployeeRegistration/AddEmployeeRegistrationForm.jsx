import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import { toast } from "react-toastify";

const AddEmployeeRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sending, setSending] = useState(false);
  //   const [academicYear, setAcademicYear] = useState("");
  const [formData, setFormData] = useState({
    employeeName: '',
    emailId: '',
    contactNumber: '',
    dateOfBirth: '',
    gender: '',
    categoryOfEmployees: '',
    grade: '',
    jobDesignation: '',
    securityDepositAmount: '',
    joiningDate: '',
  });
  const [dropdowns, setDropdowns] = useState({
    grades: [],
    categories: [],
    designations: [],
  });
  const [schoolId, setSchoolId] = useState(location.state?.schoolId || null);
  //   const [academicYear, setAcademicYear] = useState(location.state?.academicYear || null);
  const academicYear = localStorage.getItem("selectedAcademicYear");
  useEffect(() => {
    if (!schoolId) {
      toast.error("School ID not found");
      navigate(-1);
      return;
    }

    const fetchSettings = async () => {
      try {
        const [grades, categories, designations] = await Promise.all([
          getAPI(`/getall-employee-grade/${schoolId}?academicYear=${academicYear}`, {}, true),
          getAPI(`/getall-employee-category/${schoolId}?academicYear=${academicYear}`, {}, true),
          getAPI(`/getall-employee-job-designation/${schoolId}?academicYear=${academicYear}`, {}, true),
        ]);

        if (!grades.data?.grade || grades.data.grade.length === 0) {
          toast.error(`Grades not found for ${academicYear}`);
        }

        if (!categories.data?.categories || categories.data.categories.length === 0) {
          toast.error(`Categories not found ${academicYear}`);
        }

        if (!designations.data?.designation || designations.data.designation.length === 0) {
          toast.error(`Designations not found ${academicYear}`);
        }

        setDropdowns({
          grades: grades.data?.grade || [],
          categories: categories.data?.categories || [],
          designations: designations.data?.designation || [],
        });


      } catch (err) {
        toast.error("Error fetching data");
      }
    };

    fetchSettings();
  }, [schoolId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFormData({ ...formData, [name]: selectedOption?.value || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        schoolId,
      };
      setSending(true);
      const res = await postAPI(`/create-employee-registration/${academicYear}`, payload, {}, true);
      console.log(res);

      if (res && !res.hasError) {
        toast.success(res.message || "Employee registered successfully");
        navigate(-1);
      } else {
        toast.error(res.message || "Failed to register employee");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        console.error(err);
        toast.error(err || "Something went wrong during registration");
      }
    } finally {
      setSending(false);
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Registration Form
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
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="mb-6">
                      <label htmlFor="employeeName" className="form-label">
                        Name of Teacher (As per Aadhar) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="employeeName"
                        name="employeeName"
                        className="form-control"
                        value={formData.employeeName}
                        onChange={handleChange}
                        required
                        placeholder='Enter Employee Name'
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="emailId"
                        className="form-label"
                      >
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
                        placeholder='Example : xyz@gmail.com'
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
                        placeholder='Example : 1234567890'
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
                        placeholder='Date Of Birth'
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
                        <option value="Female">
                          Female
                        </option>
                        <option value="Transgender">
                          Transgender
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="categoryOfEmployee"
                        className="form-label"
                      >
                        Category of Employees <span className="text-danger">*</span>
                      </label>

                      <CreatableSelect
                        isClearable
                        name="categoryOfEmployees"
                        options={dropdowns.categories.map(item => ({
                          value: item.categoryName,
                          label: item.categoryName
                        }))}
                        onChange={handleSelectChange}
                        placeholder="Select Category"
                        className="email-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">
                        Grade <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="grade"
                        options={dropdowns.grades.map(item => ({
                          value: item.gradeName,
                          label: item.gradeName
                        }))}
                        onChange={handleSelectChange}
                        placeholder="Select Grade"
                        className="email-select"
                      />

                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="jobDesignation" className="form-label">
                        Job Designation <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="jobDesignation"
                        options={dropdowns.designations.map(item => ({
                          value: item.designationName,
                          label: item.designationName
                        }))}
                        onChange={handleSelectChange}
                        placeholder="Select Designation"
                        className="email-select"
                      />

                    </div>
                  </div>

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
                        placeholder='joiningDate'
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployeeRegistrationForm