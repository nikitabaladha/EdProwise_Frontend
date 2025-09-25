
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import deleteAPI from "../../../../../../api/deleteAPI";
import ConfirmationDialog from "../../../../../ConfirmationDialog";

const BookRecord = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookRecords, setBookRecords] = useState([]);

  // delete state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  const fetchBookRecords = async (id) => {
    try {
      setLoading(true);
      const response = await getAPI(`/book-records/${id}`, true);
      if (response?.data.data) {
        setBookRecords(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching book records:", error);
      toast.error("Failed to fetch book records");
    } finally {
      setLoading(false);
    }
  };

  const navigateToAdd = () => {
    navigate(
      `/school-dashboard/operational-service/library-management/book-record/add-book`
    );
  };

  const navigateToUpdate = (event, record, book) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/library-management/book-record/update-book`,
      {
        state: { recordId: record._id, book },
      }
    );
  };

  const openDeleteDialog = (record, book) => {
    setSelectedBook({ recordId: record._id, bookId: book._id });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await deleteAPI(
        `/delete-book/${selectedBook.recordId}/${selectedBook.bookId}`,
        {},
        true
      );
      if (!res.data.hasError) {
        toast.success("Book deleted successfully");
        fetchBookRecords(schoolId);
      } else {
        toast.error(res.data.message || "Failed to delete book");
      }
    } catch (error) {
      toast.error("Error deleting book");
      console.error("Delete error:", error);
    } finally {
      handleDeleteCancel();
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Book Records
                  </h4>
                  <button
                    onClick={navigateToAdd}
                    className="btn btn-sm btn-primary"
                  >
                    Add Record
                  </button>
                </div>
              </div>

              {bookRecords.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No book records found</h5>
                  <p>Click "Add Record" to add your first book record.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th></th>
                        <th className="text-nowrap">Book Record Number</th>
                        <th className="text-nowrap">Book Name</th>
                        <th className="text-nowrap">Author Name</th>
                        <th className="text-nowrap">Publication Year</th>
                        <th className="text-nowrap">Date of Entry</th>
                        <th className="text-nowrap">Book Location</th>
                        <th className="text-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookRecords.map((record) =>
                        record.bookDetails.map((book, idx) => (
                          <tr key={`${record._id}-${book._id}-${idx}`}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                              </div>
                            </td>
                            <td>{book.recordNumber}</td>
                            <td>{book.bookName}</td>
                            <td>{book.authorName}</td>
                            <td>{book.publicationYear}</td>
                            <td>{formatDate(book.entryDate)}</td>
                            <td>{book.bookLocation}</td>
                            <td className="text-center">
                              <div className="d-flex gap-2 justify-content-center">
                                <button className="btn btn-soft-primary btn-sm">
                                  <iconify-icon
                                    icon="solar:pen-2-broken"
                                    className="align-middle fs-18"
                                    onClick={(event) =>
                                      navigateToUpdate(event, record, book)
                                    }
                                  />
                                </button>
                                <button
                                  className="btn btn-soft-danger btn-sm"
                                  onClick={() => openDeleteDialog(record, book)}
                                >
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && selectedBook && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="bookRecord"
          id={selectedBook.bookId}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default BookRecord;

