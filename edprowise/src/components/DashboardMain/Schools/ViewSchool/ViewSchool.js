import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import getAPI from "../../../../api/getAPI";
import { Link } from "react-router-dom";

import AddConfirmationDialog from "../AddConfirmationDialog";

const ViewSchool = () => {
  const location = useLocation();
  const school = location.state?.school;

  const [users, setUsers] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const fetchUserData = async () => {
    if (!school?._id) {
      console.error("School ID is missing.");
      return;
    }
    try {
      const response = await getAPI(
        `/get-all-user-by-school-Id/${school._id}`,
        {},
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setUsers(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching User:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [school]);

  if (!school) {
    return <p>No school selected.</p>;
  }

  const openAddDialog = (event) => {
    event.preventDefault();
    setSelectedSchool(school);
    setIsAddDialogOpen(true);
  };

  const handleAddCancel = (event) => {
    event.preventDefault();
    setIsAddDialogOpen(false);
    setSelectedSchool(null);
  };

  const handleAddConfirmed = (_id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font card-title,">
                      School Details
                    </h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded bg-light d-flex align-items-center justify-content-center">
                        <img
                          src={`http://localhost:3001${school.profileImage}`}
                          alt={`${school.schoolName} Profile`}
                          className="avatar-md"
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            height: "200px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="schoolName" className="form-label">
                        School Name
                      </label>
                      <p className="form-control">{school.schoolName}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        School Address
                      </label>
                      <p className="form-control">{school.schoolAddress}</p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cityStateCountry" className="form-label">
                        City-State-Country
                      </label>
                      <p className="form-control">{school.schoolLocation}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="mobileNo" className="form-label">
                        School Mobile Number
                      </label>
                      <p className="form-control">{school.schoolMobileNo}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        School Email
                      </label>
                      <p className="form-control">{school.schoolEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="affiliationUpto" className="form-label">
                        Affiliation Upto
                      </label>
                      <p className="form-control">{school.affiliationUpto}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="panNumber" className="form-label">
                        PAN Number
                      </label>
                      <p className="form-control">{school.panNo}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="affiliationCertificate"
                        className="form-label"
                      >
                        Affiliation Certificate (PDF)
                      </label>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <div
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                          }}
                        >
                          <Viewer
                            fileUrl={`http://localhost:3001${school.affiliationCertificate}`}
                          />
                        </div>
                      </Worker>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="panFile" className="form-label">
                        PAN File(PDF)
                      </label>
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <div
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                          }}
                        >
                          <Viewer
                            fileUrl={`http://localhost:3001${school.panFile}`}
                          />
                        </div>
                      </Worker>
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row p-2">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  Users of {school.schoolName}{" "}
                </h4>
                <Link
                  onClick={openAddDialog}
                  className="btn btn-sm btn-primary"
                >
                  Add User
                </Link>
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
                        <th>Role</th>
                        <th>User Id</th>
                        <th>Password</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td style={{ width: 20 }}>
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
                          </td>
                          <td>{user.role}</td>
                          <td>{user.userId}</td>
                          <td>******</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Link className="btn btn-light btn-sm">
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link className="btn btn-soft-primary btn-sm">
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link className="btn btn-soft-danger btn-sm">
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
            </div>
          </div>
        </div>
      </div>
      {isAddDialogOpen && (
        <AddConfirmationDialog
          isOpen={isAddDialogOpen}
          onClose={handleAddCancel}
          onConfirm={handleAddConfirmed}
          school={selectedSchool}
        />
      )}
    </>
  );
};

export default ViewSchool;
