import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import putAPI from "../../../../../../api/putAPI";

const UpdateBookRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recordId, book } = location.state || {}; // ✅ from BookRecord.jsx

  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState({
    bookName: "",
    authorName: "",
    publicationYear: "",
    entryDate: "",
    bookLocation: "",
  });

  useEffect(() => {
    if (!recordId || !book) {
      toast.error("Invalid book record. Please try again.");
      navigate(-1);
      return;
    }
    setBookData({
      bookName: book.bookName,
      authorName: book.authorName,
      publicationYear: book.publicationYear,
      entryDate: book.entryDate?.split("T")[0], // keep only yyyy-mm-dd
      bookLocation: book.bookLocation,
    });
  }, [recordId, book, navigate]);

  const handleChange = (field, value) => {
    setBookData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await putAPI(
        `/update-book-record/${recordId}/${book._id}`, // pass both IDs
        bookData,
        true
      );

      if (response?.data) {
        toast.success("Book record updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating book record:", error);
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
                    Update Book Record
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

              {/* ✅ Form */}
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Book Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={bookData.bookName}
                        onChange={(e) =>
                          handleChange("bookName", e.target.value)
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
                        value={bookData.authorName}
                        onChange={(e) =>
                          handleChange("authorName", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Publication Year <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        value={bookData.publicationYear}
                        onChange={(e) =>
                          handleChange("publicationYear", e.target.value)
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
                        value={bookData.entryDate}
                        onChange={(e) =>
                          handleChange("entryDate", e.target.value)
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
                        value={bookData.bookLocation}
                        onChange={(e) =>
                          handleChange("bookLocation", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="text-end card-header">
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

export default UpdateBookRecord;
