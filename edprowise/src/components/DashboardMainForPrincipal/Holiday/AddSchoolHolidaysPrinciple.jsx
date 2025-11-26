import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
const AddSchoolHolidaysPrinciple = () => {
  const navigate = useNavigate();

  const [schoolHoliday, setSchoolHoliday] = useState([
    {
      holidayName: "",
      holidayDate: "",
      shortDescription: "",
      remarks: "",
    },
  ]);

  const addSchoolHoliday = () => {
    setSchoolHoliday([
      ...schoolHoliday,
      {
        holidayName: "",
        holidayDate: "",
        shortDescription: "",
        remarks: "",
      },
    ]);
  };

  const removeSchoolHoliday = (index) => {
    setSchoolHoliday(schoolHoliday.filter((_, ind) => ind !== index));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Add School Holiday
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
                {schoolHoliday.map((book, index) => (
                  <div key={index} className="row mb-3">
                    <div
                      className="d-flex justify-content-between"
                      style={{ padding: "0" }}
                    >
                      <div
                        className="card-header mt-0"
                        style={{ padding: "0.50rem", borderBottom: "none" }}
                      >
                        <h4 className="card-title text-center">
                          Holiday {index + 1}
                        </h4>
                      </div>
                      {index !== 0 && (
                        <div className="card-header p-0">
                          <Link
                            className="btn btn-soft-danger me-md-2 btn-sm"
                            onClick={() => removeSchoolHoliday(index)}
                          >
                            <iconify-icon
                              icon="solar:trash-bin-minimalistic-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="studentName" className="form-label">
                            Holiday Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="studentName"
                            name="studentName"
                            className="form-control"
                            required
                            placeholder="Enter Holiday Name"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="className" className="form-label">
                            Holiday Date <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            id="className"
                            name="className"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label htmlFor="section" className="form-label">
                            Short Description
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="section"
                            name="section"
                            className="form-control"
                            required
                            placeholder="Enter Short Description"
                          />
                        </div>
                      </div>

                      <div className="col-md-7">
                        <div className="mb-3">
                          <label htmlFor="age" className="form-label">
                            Remarks
                          </label>
                          <TextareaAutosize
                            className="form-control"
                            minRows={1}
                            maxRows={12}
                            placeholder="Enter Remarks"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-danger me-2 custom-submit-button"
                    onClick={addSchoolHoliday}
                  >
                    Add Book Record
                  </button>
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
  );
};

export default AddSchoolHolidaysPrinciple;
