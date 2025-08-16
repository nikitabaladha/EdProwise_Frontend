import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import getAPI from '../../../../api/getAPI';
import postAPI from '../../../../api/postAPI';
import { toast } from "react-toastify";

const AddEmployeeRegistrati = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    contactNumber: '',
    dateOfBirth: '',
    gender: '',
    categoryOfEmployees: '',
    grade: '',
    jobDesignation: '',
    joiningDate: '',
  });
  const [dropdowns, setDropdowns] = useState({
    grades: [],
    categories: [],
    designations: [],
  });
  const [schoolId, setSchoolId] = useState(location.state?.schoolId || null);
  const [employeePrefix, setEmployeePrefix] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    if (!schoolId) {
      toast.error("School ID not found");
      navigate(-1);
      return;
    }

    const fetchSettings = async () => {
      try {
        const [grades, categories, designations, prefixData, employees] = await Promise.all([
          getAPI(`/getall-grade/${schoolId}`),
          getAPI(`/getall-category/${schoolId}`),
          getAPI(`/getall-designation/${schoolId}`),
          getAPI(`/getall-employeeid-setting/${schoolId}`),
          getAPI(`/getall-employees/${schoolId}`),
        ]);

        setDropdowns({
          grades: grades.data.data || [],
          categories: categories.data.data || [],
          designations: designations.data.data || [],
        });

        const prefix = prefixData?.data?.data[0]?.prefix || 'EMP';
        const suffixLength = prefixData?.data?.data[0]?.suffixLength || 4;
        setEmployeePrefix(prefix);

        const latest = employees?.data?.data || [];
        const count = latest.length + 1;
        const padded = count.toString().padStart(suffixLength, '0');
        setEmployeeId(`${prefix}${padded}`);
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
        employeeId,
        password: employeeId,
        schoolId,
      };

      const res = await postAPI('/register-employee', payload, {}, true);
      if (!res.hasError) {
        toast.success("Employee registered successfully");
        navigate(-1);
      } else {
        toast.error(res.message || "Failed to register");
      }
    } catch (err) {
      toast.error("Error while submitting employee data");
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
                    <label className="form-label">Employee ID (Auto)</label>
                    <input type="text" className="form-control" value={employeeId} readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Name of Teacher</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email ID</label>
                    <input type="email" name="emailId" value={formData.emailId} onChange={handleChange} required className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Contact Number</label>
                    <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required className="form-control">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Category</label>
                    <CreatableSelect
                      isClearable
                      name="categoryOfEmployees"
                      options={dropdowns.categories.map(item => ({ value: item.name, label: item.name }))}
                      onChange={handleSelectChange}
                      placeholder="Select Category"
                      className="email-select"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Grade</label>
                    <CreatableSelect
                      isClearable
                      name="grade"
                      options={dropdowns.grades.map(item => ({ value: item.name, label: item.name }))}
                      onChange={handleSelectChange}
                      placeholder="Select Grade"
                      className="email-select"
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Designation</label>
                    <CreatableSelect
                      isClearable
                      name="jobDesignation"
                      options={dropdowns.designations.map(item => ({ value: item.name, label: item.name }))}
                      onChange={handleSelectChange}
                      placeholder="Select Designation"
                      className="email-select"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Joining Date</label>
                    <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required className="form-control" />
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary custom-submit-button">
                    Submit
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

export default AddEmployeeRegistratio;
