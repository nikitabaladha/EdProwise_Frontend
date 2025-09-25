import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ViewStudentHealthRecord = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const record = location.state;

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
                   Student Health Record 
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
              <form>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <div className="position-relative">
                        <label htmlFor="admissionNumber" className="form-label">
                          Admission Number{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="admissionNumber"
                          name="admissionNumber"
                          className="form-control pe-5"
                          placeholder="Enter Admission No"
                          value={record.admissionNumber}
                        />
                        {/* <FaArrowAltCircleRight
                              size={20}
                              onClick={fetchStudentInfo}
                              className="position-absolute custom-arraow-icon"
                              style={{
                                top: "71%",
                                right: "10px",
                                transform: "translateY(-50%)",
                                color: "#000000",
                                cursor: "pointer",
                              }}
                              title="Fetch Student Info"
                            /> */}
                      </div>
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
                        value={record.studentName}
                        placeholder="Enter Student Name"
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
                        value={record.class}
                        placeholder="Enter Class"
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
                        value={record.section}
                        placeholder="Enter Section"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="dateOfBirth" className="form-label">
                        Date of Birth <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="form-control"
                        value={record.dateOfBirth.split("T")[0] || ""}
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
                        value={record.age}
                        placeholder="Enter Student Age"
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
                      <input
                        type="text"
                        id="height"
                        name="height"
                        className="form-control"
                        value={record.height}
                        placeholder="Enter Student Age"
                      />
                      {/* <CreatableSelect
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
                          /> */}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="weight" className="form-label">
                        Weight (kg)<span className="text-danger">*</span>
                      </label>
                      {/* <CreatableSelect
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
                      /> */}
                      <input
                        type="text"
                        id="weight"
                        name="weight"
                        className="form-control"
                        value={record.weight}
                        // onChange={handleChange}
                        placeholder="Enter Student weight"
                      />
                    </div>
                  </div>

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
                        value={record.bmi}
                        // onChange={handleChange}
                        placeholder="Enter Student BMI"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="bloodGroup" className="form-label">
                        Blood Group <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="bloodGroup"
                        name="bloodGroup"
                        className="form-control"
                        value={record.bloodGroup}
                        // onChange={handleChange}
                        placeholder="Enter Student Blood Group"
                      />
                      {/* <CreatableSelect
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
                      /> */}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="chronic" className="form-label">
                        Chronic illnesses
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="chronic"
                        name="chronic"
                        className="form-control"
                        value={record.chronic}
                        // onChange={handleChange}
                        placeholder="Enter Chronic Illnesses"
                      />
                    </div>
                  </div>

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
                        value={record.physicalDisability}
                        // onChange={handleChange}
                        placeholder="Enter Physical Disabilities"
                      />
                    </div>
                  </div>

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
                        value={record.surgery}
                        // onChange={handleChange}
                        placeholder="Enter Past Surgery Details"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudentHealthRecord