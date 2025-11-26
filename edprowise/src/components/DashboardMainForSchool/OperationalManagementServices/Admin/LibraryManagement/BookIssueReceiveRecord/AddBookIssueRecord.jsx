import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";

const AddBookIssueRecord = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const academicYear = localStorage.getItem("selectedAcademicYear");

  const [formData, setFormData] = useState({
    admissionNumber: "",
    academicYear: academicYear || "",
    studentName: "",
    recordNumber: "", 
    bookName: "",
    issueDate: new Date().toISOString().split("T")[0],
    issueBy: "",
  });

  const [bookOptions, setBookOptions] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
    fetchBookRecords(id);
  }, []);

  // fetch available book records
  const fetchBookRecords = async (id) => {
    try {
      const res = await getAPI(`/book-records/${id}`, true);
      if (!res.data.hasError && res.data.data) {
        const books = res.data.data.flatMap((record) =>
          record.bookDetails.map((book) => ({
            value: book.recordNumber,
            label: `${book.recordNumber} - ${book.bookName}`,
            bookName: book.bookName,
          }))
        );
        setBookOptions(books);
      }
    } catch (error) {
      toast.error("Failed to fetch book records");
    }
  };

  const fetchStudentInfo = async () => {
    if (!formData.admissionNumber) {
      toast.error("Please enter admission number");
      return;
    }

    try {
      const res = await getAPI(
        `/get-student-details?admissionNumber=${formData.admissionNumber}&schoolId=${schoolId}&academicYear=${academicYear}`
      );

      if (!res.data.hasError) {
        const student = res.data.data;
        setFormData((prev) => ({
          ...prev,
          studentName: student.studentName || "",
        }));
        toast.success("Student details fetched successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch student details"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postAPI(
        "/issue-book",
        {
          schoolId,
          ...formData,
        },
        true
      );

      if (!res.hasError) {
        toast.success("Book issue record saved successfully!");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save record");
    }
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
                    Issue Book Form
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
                {/* Admission Number */}
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
                          value={formData.admissionNumber}
                          onChange={handleChange}
                        />
                        <FaArrowAltCircleRight
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
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Info */}
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
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Book Record Number */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="bookRecordNumber" className="form-label">
                        Book Record Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <CreatableSelect
                        isClearable
                        placeholder="Select Book Record Number"
                        className="email-select"
                        options={bookOptions}
                        onChange={(option) => {
                          setFormData((prev) => ({
                            ...prev,
                            recordNumber: option ? option.value : "", // Changed to recordNumber
                            bookName: option ? option.bookName : "",
                          }));
                        }}
                        value={
                          formData.recordNumber // Changed to recordNumber
                            ? {
                                value: formData.recordNumber, // Changed to recordNumber
                                label: `${formData.recordNumber} - ${formData.bookName}`, // Changed to recordNumber
                              }
                            : null
                        }
                      />
                    </div>
                  </div>

                  {/* Book Name */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="bookName" className="form-label">
                        Book Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="bookName"
                        name="bookName"
                        className="form-control"
                        value={formData.bookName}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Issue Date */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="issueDate" className="form-label">
                        Issued Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        className="form-control"
                        value={formData.issueDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Issued By */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="issueBy" className="form-label">
                        Issued by <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="issueBy"
                        name="issueBy"
                        className="form-control"
                        value={formData.issueBy}
                        onChange={handleChange}
                        placeholder="Enter Issued by Name"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
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
  );
};

export default AddBookIssueRecord;
