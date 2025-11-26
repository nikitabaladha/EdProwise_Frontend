import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import postAPI from "../../../../../../api/postAPI";
import putAPI from "../../../../../../api/putAPI";
import getAPI from "../../../../../../api/getAPI";

const UpdateBookIssueRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookOptions, setBookOptions] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    admissionNumber: "",
    academicYear: "",
    studentName: "",
    recordNumber: "",
    bookName: "",
    issueDate: "",
    issueBy: "",
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);

    if (location.state) {
      setFormData({
        _id: location.state._id || "",
        admissionNumber: location.state.admissionNumber || "",
        academicYear: location.state.academicYear || "",
        studentName: location.state.studentName || "",
        recordNumber: location.state.recordNumber || "",
        bookName: location.state.bookName || "",
        issueDate: location.state.issueDate
          ? new Date(location.state.issueDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        issueBy: location.state.issueBy || "",
      });
      fetchBookRecords(id);
    } else {
      toast.error("No book issue data provided");
      navigate(-1);
    }
  }, [location, navigate]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await putAPI(
        "/update-issue-book",
        {
          schoolId,
          ...formData,
        },
        true
      );

      if (!res.data.hasError) {
        toast.success("Book issue record updated successfully!");
        navigate(-1);
      } else {
        toast.error(res.data.message || "Failed to update record");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update record");
    } finally {
      setLoading(false);
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
                    Update Issue Book Details
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
                  {/* Admission Number */}
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="admissionNumber" className="form-label">
                        Admission Number
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="admissionNumber"
                        name="admissionNumber"
                        className="form-control"
                        value={formData.admissionNumber}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Student Name */}
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
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Book Record Number - Now using CreatableSelect */}
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
                            recordNumber: option ? option.value : "",
                            bookName: option ? option.bookName : "",
                          }));
                        }}
                        value={
                          formData.recordNumber
                            ? {
                                value: formData.recordNumber,
                                label: `${formData.recordNumber} - ${formData.bookName}`,
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
                        onChange={handleChange}
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

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
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

export default UpdateBookIssueRecord;
