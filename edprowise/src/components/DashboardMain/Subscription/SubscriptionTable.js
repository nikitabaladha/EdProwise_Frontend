import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ConfirmationDialogs from "../../ConfirmationDialogs";
const SubscriptionTable = ({
  subscription,
  setSubscription,
  selectedSubscription,
  setSelectedsubscription
}) => {
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (subscriptions) => {
    setSelectedsubscription(subscriptions);
    setIsDeleteDialogOpen(true);
    setDeleteType("subscription");
  };

  console.log(deleteType);
  

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedsubscription(null);
  };

  const handleDeleteConfirmed = (id) => {
    setSubscription((prevSubscription) =>
      prevSubscription.filter((subscription) => subscription.id !== id)
    );
  };

  const navigateToAddNewSchool = (event) => {
    event.preventDefault();
    navigate(`/dashboard/subscriptions/add-new-subscriptions`);
  };

  const navigateToViewSubscription = (event, subscriptions) => {
    event.preventDefault();
    navigate(`/dashboard/subscriptions/view-subscriptions`, { state: { subscriptions } });
  };

  const navigateToUpdateSubscription = (event, subscriptions) => {
    event.preventDefault();
    navigate(`/dashboard/subscriptions/update-subscriptions`, { state: { subscriptions } });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionPerPage] = useState(5);

  const indexOfLastSubscription = currentPage * subscriptionPerPage;
  const indexOfFirstSubscription = indexOfLastSubscription - subscriptionPerPage;
  const currentSubscription = subscription.slice(indexOfFirstSubscription, indexOfLastSubscription);

  const totalPages = Math.ceil(subscription.length / subscriptionPerPage);

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

  return (
    <>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All SUbscription List</h4>
                <Link
                  onClick={(event) => navigateToAddNewSchool(event)}
                  className="btn btn-sm btn-primary"
                >
                  Add Subscription
                </Link>
                <div className="dropdown">
                  <Link
                    to=""
                    className="dropdown-toggle btn btn-sm btn-outline-light"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    This Month
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    {/* item*/}
                    <Link to="" className="dropdown-item">
                      Download
                    </Link>
                    {/* item*/}
                    <Link to="" className="dropdown-item">
                      Export
                    </Link>
                    {/* item*/}
                    <Link to="" className="dropdown-item">
                      Import
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheck1"
                            />
                          </div>
                        </th>
                        <th>School Id</th>
                        <th>School Name</th>
                        <th>School Mobile No</th>
                        <th>Subscription Module</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSubscription.map((subscriptions) => (
                        <tr key={subscriptions.id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheck2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheck2"
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{subscriptions.schoolId}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="rounded bg-light d-flex align-items-center justify-content-center">
                                <img
                                  src={`http://localhost:3001${subscriptions.profileImage}`}
                                  alt={`${subscriptions.schoolName} Profile`}
                                  className="avatar-md"
                                  style={{
                                    objectFit: "cover",
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                              <div>{subscriptions.schoolName}</div>
                            </div>
                          </td>
                          <td>{subscriptions.schoolMobileNo}</td>
                          <td>{subscriptions.subscriptionFor}</td>
                          {/* <td>{school.panNo}</td> */}
                          
                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                onClick={(event) =>
                                  navigateToViewSubscription(event, subscriptions)
                                }
                                className="btn btn-light btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                onClick={(event) =>
                                  navigateToUpdateSubscription(event, subscriptions)
                                }
                                className="btn btn-soft-primary btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                 onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(subscriptions);
                                }}
                                className="btn btn-soft-danger btn-sm"
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"    
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        style={{ color: "#424e5a" }}
                      >
                        Previous
                      </button>
                    </li>
                    {pagesToShow.map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(page)}
                          style={{
                            backgroundColor:
                              currentPage === page ? "#ff947d" : "",
                            color: currentPage === page ? "#fff" : "#424e5a",
                          }}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        style={{ color: "#424e5a" }}
                      >
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
        <ConfirmationDialogs
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedSubscription.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default SubscriptionTable;
