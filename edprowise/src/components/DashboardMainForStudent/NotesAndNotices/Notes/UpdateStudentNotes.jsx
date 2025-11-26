import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
// import { ChromePicker } from "react-color";
import { CompactPicker } from "react-color";
// import TimePicker from "react-time-picker";
import TimePicker from "react-time-picker";

const UpdateStudentNotes = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [time, setTime] = useState("10:00");

  const handleChange = (newColor) => {
    setColor(newColor.hex);
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
                    Update Note
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
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Note Title"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <ReactQuill
                        theme="snow"
                        className="bg-white"
                        style={{ height: "100px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Tag <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Note Tag"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Attachment
                      </label>

                      <input
                        type="file"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Note Tag"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Pick a Background Color {color}
                      </label>

                      <CompactPicker
                        color={color}
                        onChangeComplete={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label className="form-label">
                        Set Reminder <span className="text-danger">*</span>{" "}
                        <span className="fs-6 text-dark">
                          {isActive ? "Yes" : "No"}
                        </span>
                      </label>
                      <div
                        className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1"
                        style={{ maxWidth: "fit-content" }}
                      >
                        {/* Active Button */}
                        <button
                          type="button"
                          className={`btn rounded-pill ${
                            isActive
                              ? "btn-light border border-dark text-dark"
                              : "btn-dark text-white"
                          }`}
                          onClick={() => setIsActive(true)}
                        >
                          Yes
                        </button>

                        {/* Inactive Button */}
                        <button
                          type="button"
                          className={`btn rounded-pill ${
                            !isActive
                              ? "btn-light border border-dark text-dark"
                              : "btn-dark text-white"
                          }`}
                          onClick={() => setIsActive(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>

                  {isActive ? (
                    <>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="studentName" className="form-label">
                            Date
                          </label>

                          <input
                            type="date"
                            id="studentName"
                            name="studentName"
                            className="form-control"
                            required
                            placeholder="Enter Note Tag"
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="studentName" className="form-label">
                            Time
                          </label>

                          <input
                            type="time"
                            id="studentName"
                            name="studentName"
                            className="form-control"
                            required
                            placeholder="Enter Note Tag"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button me-2"
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

export default UpdateStudentNotes;