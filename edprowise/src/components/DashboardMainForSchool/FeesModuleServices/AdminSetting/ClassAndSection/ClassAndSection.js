import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from '../../../../../api/getAPI';
import { toast } from "react-toastify";


const ClassAndSection = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const [requestPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);


  const [schoolId, setSchoolId] = useState("");


  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!schoolId) return;
        const response = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        console.log("my data", response);

        setRequests(response?.data?.data || []);

      } catch (error) {
        toast.error("Error fetching class and section data.");
      }
    };

    fetchData();
  }, [schoolId]);





  // Pagination logic
  const indexOfLastRequest = currentPage * requestPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  const totalPages = Math.ceil(requests.length / requestPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageRange = 1;
  const startPage = Math.max(1, currentPage - pageRange);
  const endPage = Math.min(totalPages, currentPage + pageRange);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const openDeleteDialog = (request) => {
    setSelectedRequest(request);
    setIsDeleteDialogOpen(true);
    setDeleteType("classandsection");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteConfirmed = (_id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== _id)
    );
  };
  // const navigateToViewRequestInfo = (event, request) => {
  //   event.preventDefault();
  //   navigate(`/school-dashboard/enquiry/enquity-details`, {
  //     state: { request }, // Pass student data through state
  //   });
  // };
  // fees-module/admin-setting/class-section/create-class-section

  const navigateToAddNewClass = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/admin-setting/class-section/create-class-section`);
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Class & Section</h4>
                <Link
                  onClick={(event) => navigateToAddNewClass(event)}
                  className="btn btn-sm btn-primary"
                >
                  Create Class & Section
                </Link>

                <div className="text-end">
                  <Link className="btn btn-sm btn-outline-light">
                    Export
                  </Link>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1" />
                        </div>
                      </th>
                      <th>Class</th>
                      <th>Section</th>

                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map((classandsection, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check ms-1">
                            <input type="checkbox" className="form-check-input" />
                          </div>
                        </td>

                        <td>{classandsection.className}</td>
                        <td>{classandsection.sections.map(section => section.name).join(", ")}</td>


                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() =>
                                navigate("/school-dashboard/fees-module/admin-setting/class-section/view-class-section", {
                                  state: { classandsection }
                                })
                              }
                              className="btn btn-light btn-sm"
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate("/school-dashboard/fees-module/admin-setting/class-section/update-class-section", {
                                  state: { classandsection }
                                })
                              }
                            >
                         
                              <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </button>
                            <Link
                              onClick={(e) => { e.preventDefault(); openDeleteDialog(classandsection); }}
                              className="btn btn-soft-danger btn-sm"
                            >
                              <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                        <button
                          className={`page-link pagination-button ${currentPage === page ? "active" : ""}`}
                          onClick={() => handlePageClick(page)}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedRequest._id}
          onDeleted={() => handleDeleteConfirmed(selectedRequest._id)}
        />
      )}
    </>
  )
}
export default ClassAndSection;
