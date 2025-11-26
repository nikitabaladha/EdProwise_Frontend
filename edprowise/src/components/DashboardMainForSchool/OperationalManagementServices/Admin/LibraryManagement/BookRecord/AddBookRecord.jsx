
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import postAPI from "../../../../../../api/postAPI";

const AddBookRecord = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  const [bookRecord, setBookRecord] = useState([
    {
      bookName: "",
      authorName: "",
      publicationYear: "",
      entryDate: new Date().toISOString().split("T")[0],
      bookLocation: "",
    },
  ]);

  //  Add more records
  const addBookRecordRow = () => {
    setBookRecord([
      ...bookRecord,
      {
        bookName: "",
        authorName: "",
        publicationYear: "",
        entryDate: "",
        bookLocation: "",
      },
    ]);
  };

  //  Remove record
  const removeBookRecord = (index) => {
    setBookRecord(bookRecord.filter((_, ind) => ind !== index));
  };

  //  Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...bookRecord];
    updated[index][field] = value;
    setBookRecord(updated);
  };

  //  Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!schoolId) {
      toast.error("School ID missing");
      return;
    }

    setLoading(true);
    try {
      const response = await postAPI("/add-book-record", {
        schoolId,
        bookDetails: bookRecord,
      }, true);

      if (response?.data) {
        toast.success("Book record(s) added successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error submitting book record:", error);
      toast.error(error.response?.data?.message || "Failed to add record");
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
                    Add Book Record
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
                {bookRecord.map((book, index) => (
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
                          Book {index + 1}
                        </h4>
                      </div>
                      {index !== 0 && (
                        <div className="card-header p-0">
                          <Link
                            className="btn btn-soft-danger me-md-2 btn-sm"
                            onClick={() => removeBookRecord(index)}
                          >
                            <iconify-icon
                              icon="solar:trash-bin-minimalistic-2-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="row ">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Book Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Enter Book Name"
                            value={book.bookName}
                            onChange={(e) =>
                              handleChange(index, "bookName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Author Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Enter Author Name"
                            value={book.authorName}
                            onChange={(e) =>
                              handleChange(index, "authorName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Publication Year{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            required
                            placeholder="Enter Publication Year"
                            value={book.publicationYear}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "publicationYear",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Date of Entry <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            required
                            value={book.entryDate}
                            onChange={(e) =>
                              handleChange(index, "entryDate", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Book Location <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="Enter Book Location"
                            value={book.bookLocation}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "bookLocation",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-end card-header">
                  <button
                    type="button"
                    className="btn btn-danger me-2 custom-submit-button"
                    onClick={addBookRecordRow}
                  >
                    Add Book Record
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
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

export default AddBookRecord;

