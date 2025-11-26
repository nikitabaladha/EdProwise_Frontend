import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import putAPI from "../../../../../api/putAPI";

const UpdateStudentHealthRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const record = location.state; 
  const academicYear = localStorage.getItem("selectedAcademicYear");
    console.log("records",record);
    
  const [schoolId, setSchoolId] = useState("");

  const [formData, setFormData] = useState({
    admissionNumber: record?.admissionNumber || "",
    academicYear: academicYear || record?.academicYear || "",
    studentName: record?.studentName || "",
    dateOfBirth: record?.dateOfBirth?.split("T")[0] || "",
    class: record?.class || "",
    section: record?.section || "",
    age: record?.age || "",
    height: record?.height || "",
    weight: record?.weight || "",
    bmi: record?.bmi || "",
    bloodGroup: record?.bloodGroup || "",
    chronic: record?.chronic || "",
    physicalDisability: record?.physicalDisability || "",
    surgery: record?.surgery || "",
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  const studentHeight = Array.from({ length: 61 }, (_, i) => {
    const height = (1 + i * 0.1).toFixed(1);
    return { value: `${height} ft`, label: `${height} ft` };
  });

  const studentWeight = Array.from({ length: 141 }, (_, i) => {
    const weight = 10 + i;
    return { value: `${weight} kg`, label: `${weight} kg` };
  });

  const bloodGroup = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await putAPI(
        `/update-student-health-record/${record.mainId}/${record._id}`,
        { schoolId, ...formData },
        true
      );

      if (!res.data.hasError) {
        toast.success("Health record updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update record");
    }
  };



  if (!record) {
    return <p className="text-center mt-4">No record data provided</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Update Health Record
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
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="admissionNumber" className="form-label">
                        Admission Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="admissionNumber"
                        name="admissionNumber"
                        className="form-control pe-5"
                        value={formData.admissionNumber}
                        onChange={handleChange}
                        readOnly 
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Name of Student <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        value={formData.studentName}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="class" className="form-label">
                        Class <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="class"
                        name="class"
                        className="form-control"
                        value={formData.class}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Section <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        value={formData.section}
                        // onChange={handleChange}
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
                        // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Age <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Height */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="height" className="form-label">
                        Height (feet/inch){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="height"
                        options={studentHeight}
                        placeholder="Select Height"
                        className="email-select"
                        onChange={(option) =>
                          setFormData((prev) => ({
                            ...prev,
                            height: option ? option.value : "",
                          }))
                        }
                        value={
                          formData.height
                            ? { value: formData.height, label: formData.height }
                            : null
                        }
                      />
                    </div>
                  </div>

                  {/* Weight */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="weight" className="form-label">
                        Weight (kg) <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="weight"
                        options={studentWeight}
                        placeholder="Select Weight"
                        className="email-select"
                        onChange={(option) =>
                          setFormData((prev) => ({
                            ...prev,
                            weight: option ? option.value : "",
                          }))
                        }
                        value={
                          formData.weight
                            ? { value: formData.weight, label: formData.weight }
                            : null
                        }
                      />
                    </div>
                  </div>

                  {/* BMI */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="bmi" className="form-label">
                        BMI <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="bmi"
                        name="bmi"
                        className="form-control"
                        value={formData.bmi}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Blood Group */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="bloodGroup" className="form-label">
                        Blood Group <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        name="bloodGroup"
                        options={bloodGroup}
                        placeholder="Select Blood Group"
                        className="email-select"
                        onChange={(option) =>
                          setFormData((prev) => ({
                            ...prev,
                            bloodGroup: option ? option.value : "",
                          }))
                        }
                        value={
                          formData.bloodGroup
                            ? {
                                value: formData.bloodGroup,
                                label: formData.bloodGroup,
                              }
                            : null
                        }
                      />
                    </div>
                  </div>

                  {/* Chronic */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="chronic" className="form-label">
                        Chronic illnesses <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="chronic"
                        name="chronic"
                        className="form-control"
                        value={formData.chronic}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Disability */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="physicalDisability"
                        className="form-label"
                      >
                        Physical Disabilities{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="physicalDisability"
                        name="physicalDisability"
                        className="form-control"
                        value={formData.physicalDisability}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Surgery */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="surgery" className="form-label">
                        Past Surgery <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="surgery"
                        name="surgery"
                        className="form-control"
                        value={formData.surgery}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update
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

export default UpdateStudentHealthRecord;
