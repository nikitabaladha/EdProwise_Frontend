import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookReceiveModal from "./BookReceiveModal";
import { MdAssignmentReturned } from "react-icons/md";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import putAPI from "../../../../../../api/putAPI"; // ✅ import PUT helper

const BookIssueReceiveRecordList = () => {
  const navigate = useNavigate();
  const [bookIssues, setBookIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schoolId, setSchoolId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [receiveData, setReceiveData] = useState({
    receiveDate: new Date().toISOString().split("T")[0],
    receiveBy: "",
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
    fetchBookIssues(id);
  }, []);

  const fetchBookIssues = async (id) => {
    try {
      setLoading(true);
      const res = await getAPI(`/get-issue-book-record/${id}`, true);

      if (!res.data.hasError && res.data.data) {
        setBookIssues(res.data.data);
      } else {
        toast.error("Failed to fetch book issue records");
      }
    } catch (error) {
      toast.error("Error fetching book issue records");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (issue) => {
    setSelectedIssue(issue);
    setReceiveData({
      receiveDate: new Date().toISOString().split("T")[0],
      receiveBy: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIssue(null);
  };

  const handleReceiveSubmit = async () => {
    if (!receiveData.receiveBy) {
      toast.error("Please enter who received the book");
      return;
    }

    try {
      const res = await putAPI(
        `/update-issue-book-status/${selectedIssue._id}`,
        {
          ...receiveData,
          status: "returned",
        },
        true
      );

      if (!res.data.hasError) {
        toast.success("Book marked as returned");
        handleCloseModal();
        fetchBookIssues(schoolId);
      } else {
        toast.error("Failed to update book status");
      }
    } catch (error) {
      toast.error("Error updating book status");
      console.error("Error:", error);
    }
  };

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/library-management/book-issue-record/issue-book`
    );
  };

  const navigateToView = (event, issue) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/library-management/book-issue-record/view-record-details`,
      { state: issue }
    );
  };

  const navigateToUpdate = (event, issue) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/library-management/book-issue-record/update-record-details`,
      { state: issue }
    );
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Book Issue Records
                  </h4>
                  <Link
                    onClick={(event) => navigateToAdd(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Issue Book
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th></th>
                        <th className="text-nowrap">Admission No</th>
                        <th className="text-nowrap">Student Name</th>
                        <th className="text-nowrap">Book Record No.</th>
                        <th className="text-nowrap">Book Name</th>
                        <th className="text-nowrap">Issued Date</th>
                        <th className="text-nowrap">Issued by</th>
                        <th className="text-nowrap">Status</th>
                        <th className="text-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookIssues.length > 0 ? (
                        bookIssues.map((issue, index) => (
                          <tr key={issue._id || index}>
                            <td>
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                              </div>
                            </td>
                            <td>{issue.admissionNumber}</td>
                            <td>{issue.studentName}</td>
                            <td>{issue.recordNumber}</td>
                            <td>{issue.bookName}</td>
                            <td>
                              {new Date(issue.issueDate).toLocaleDateString()}
                            </td>
                            <td>{issue.issueBy}</td>
                            <td>
                              <span
                                className={`badge ${
                                  issue.status === "returned"
                                    ? "bg-success"
                                    : "bg-warning"
                                }`}
                              >
                                {issue.status === "returned"
                                  ? "Returned"
                                  : "Issued"}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2 justify-content-center">
                                <Link
                                  className="btn btn-light btn-sm"
                                  onClick={(event) =>
                                    navigateToView(event, issue)
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <Link
                                  className="btn btn-soft-primary btn-sm"
                                  onClick={(event) =>
                                    navigateToUpdate(event, issue)
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:pen-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                {issue.status !== "returned" && (
                                  <Link
                                    className="btn btn-soft-danger btn-sm"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleOpenModal(issue);
                                    }}
                                  >
                                    <MdAssignmentReturned className="align-middle fs-18" />
                                  </Link>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-4">
                            No book issue records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedIssue && (
        <BookReceiveModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          receiveData={receiveData}
          setReceiveData={setReceiveData}
          onSubmit={handleReceiveSubmit}
        />
      )}
    </div>
  );
};

export default BookIssueReceiveRecordList;
