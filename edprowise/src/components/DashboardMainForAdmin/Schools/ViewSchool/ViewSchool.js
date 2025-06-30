import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { useNavigate } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import getAPI from "../../../../api/getAPI";
import { Link } from "react-router-dom";
import putAPI from "../../../../api/putAPI";
import postAPI from "../../../../api/postAPI";
import AddConfirmationDialog from "../AddConfirmationDialog";
import ConfirmationDialog from "../../../ConfirmationDialog";
import { toast } from "react-toastify";

const ViewSchool = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedSubscription, setSelectedsubscription] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubscriptionDeleteDialogOpen, setIsSubscriptionDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [subscription, setSubscription] = useState([]);

  const [schoolRoles, setSchoolRoles] = useState([]);
  const schoolId = location.state?.schoolId;
  const [school, setSchool] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newRoleInput, setNewRoleInput] = useState("");
  const [editRoleId, setEditRoleId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");
  const [error, setError] = useState("");
  const [selectedSchoolRole, setSelectedSchoolRole] = useState(null);
  const [isSchoolRoleDeleteDialogOpen, setIsSchoolRoleDeleteDialogOpen] = useState(false);
  

  const handleAddClick = () => {
    if (!isAdding && !editRoleId) {
      setIsAdding(true);
      setNewRoleInput("");
      setError("");
    }
  };

  const handleAddSave = async () => {
    if (newRoleInput.trim() === "") {
      setError("Role name cannot be empty.");
      return;
    }

    const newRole = {
      name: newRoleInput.trim(),
      schoolId: schoolId,
    };

    try {
      const response = await postAPI(`/add-school-roles`, newRole, true);
      if (!response.hasError && response.data && response.data.data) {
        setSchoolRoles([...schoolRoles, response.data.data]);
        setNewRoleInput("");
        setIsAdding(false);
        toast.success("School role added!");
      } else {
       toast.error("Failed to add role. Please try again.");
      }
    } catch (err) {
      toast.error("Error in adding role. Please try again.");
    }
  };

  const handleAddRoleCancel = () => {
    setIsAdding(false);
    setNewRoleInput("");
    setError("");
  };

  const handleEditClick = (role) => {
    if (!isAdding && !editRoleId) {
      setEditRoleId(role._id);
      setEditInputValue(role.name);
      setError("");
    }
  };

  const handleEditSave = async (id) => {
    if (editInputValue.trim() === "") {
      setError("Role name cannot be empty.");
      return;
    }

    const updatedRole = {
      name: editInputValue.trim(),
    };

    try {
      const response = await putAPI(`/put-school-roles/${id}`, updatedRole, true);
      if (!response.hasError && response.data && response.data.data) {
        const updatedRoles = schoolRoles.map((role) =>
          role._id === id ? { ...role, name: editInputValue.trim() } : role
        );
        setSchoolRoles(updatedRoles);
        setEditRoleId(null);
        setEditInputValue("");
       toast.success("School role updated!");
      } else {
        toast.error("Failed to update role. Please try again.");
      }
    } catch (err) {
      toast.error("Error updating role. Please try again.");
    }
  };

  const handleEditCancel = () => {
    setEditRoleId(null);
    setEditInputValue("");
    setError("");
  };


  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSchool(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getAPI(
        `/get-all-user-by-school-id/${schoolId}`,
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

  const fetchSubscriptionData = async () => {
    try {
      const response = await getAPI(`/subscription/${schoolId}`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSubscription(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching User:", err);
    }
  };

  const fetchSchoolRolesData = async () => {
    try {
      const response = await getAPI(`/get-school-roles/${schoolId}`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSchoolRoles(response.data.data);
        
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching User:", err);
    }
  };

  useEffect(() => {
    if (schoolId) {
      fetchSchoolData();
      fetchUserData();
      fetchSubscriptionData();
      fetchSchoolRolesData();
    } else {
      console.error("No school ID provided");
    }
  }, [schoolId]);

  const openAddDialog = (school) => {
    setSelectedSchool(school);
    setIsAddDialogOpen(true);
  };

  const handleAddCancel = () => {
    setIsAddDialogOpen(false);
    setSelectedSchool(null);
  };

  const handleAddConfirmed = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
    setDeleteType("user");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
  };

  const navigateToAddNewSubscription = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/subscriptions/add-new-subscriptions`);
  };

  const navigateToViewSubscription = async (event, subscriptions) => {
    event.preventDefault();

    try {
      const response = await getAPI(
        `/subscription-by-id/${subscriptions.id}`,
        {},
        true
      );
      if (!response.hasError && response.data) {
        navigate(`/admin-dashboard/subscriptions/view-subscriptions`, {
          state: { subscriptions: response.data.data },
        });
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching subscription:", err);
    }
  };

  const navigateToUpdateSubscription = (event, subscriptions) => {
    event.preventDefault();
    navigate(`/admin-dashboard/subscriptions/update-subscriptions`, {
      state: { subscriptions },
    });
  };

  const navigateToSchoolEmployeeList = (event, schoolId) => {
    event.preventDefault();
    navigate(`/admin-dashboard/schools/view-school/school-employee`, {
      state: { schoolId },
    });
  };
// schools/view-school/school-employee
  const openDeleteSubscriptionDialog = (subscription) => {
    setSelectedsubscription(subscription);
    setIsSubscriptionDeleteDialogOpen(true);
    setDeleteType("subscription");
  };

  const handleDeleteSubscriptionConfirmed = (id) => {
    setSubscription((prevSubscription) =>
      prevSubscription.filter((subscription) => subscription.id !== id)
    );
  };

  const handleDeleteSubscriptionCancel = () => {
    setIsSubscriptionDeleteDialogOpen(false);
    setSelectedsubscription(null);
  };

  const openDeleteSchoolRoleDialog = (role) => {
    setSelectedSchoolRole(role);
    setIsSchoolRoleDeleteDialogOpen(true);
    setDeleteType("schoolRole");
  };

  const handleDeleteSchoolRoleConfirmed = (_id) => {
    setSchoolRoles((prevSchoolRole) =>
      prevSchoolRole.filter((role) => role._id !== _id)
    );
  };

  const handleDeleteSchoolRoleCancel = () => {
    setIsSchoolRoleDeleteDialogOpen(false);
    setSelectedSchoolRole(null);
  };

  return (
    <>
      <div className="container custom-font-size">
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
                    <div className="mb-3 d-flex justify-content-center">
                      <div className="rounded bg-light d-flex align-items-center justify-content-center">
                        <img
                          src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.profileImage}`}
                          alt={`${school?.schoolName} Profile`}
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
                      <p className="form-control" aria-placeholder="ABC XYZ">
                        {school?.schoolName}
                      </p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="mobileNo" className="form-label">
                        School Mobile Number
                      </label>
                      <p className="form-control">{school?.schoolMobileNo}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      {/* This schoolId  */}
                      <label htmlFor="schoolId" className="form-label">
                        School Id
                      </label>
                      <p className="form-control">{school?.schoolId}</p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        School Email
                      </label>
                      <p className="form-control">{school?.schoolEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        School Address
                      </label>
                      <p className="form-control">{school?.schoolAddress}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <p className="form-control">{school?.country}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <p className="form-control">{school?.state}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <p className="form-control">{school?.city}</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="affiliationUpto" className="form-label">
                        Affiliation Upto
                      </label>
                      <p className="form-control">{school?.affiliationUpto}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="panNumber" className="form-label">
                        PAN Number
                      </label>
                      <p className="form-control">{school?.panNo}</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="affiliationCertificate"
                        className="form-label"
                      >
                        Affiliation Certificate
                      </label>
                      {school?.affiliationCertificate ? (
                        school?.affiliationCertificate.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.affiliationCertificate}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.affiliationCertificate}`}
                              alt="Affiliation Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <p>No affiliation certificate available</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="panFile" className="form-lsabel">
                        PAN File
                      </label>
                      {school?.panFile ? (
                        school?.panFile.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.panFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school?.panFile}`}
                              alt="Affiliation Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <p>No PAN File available</p>
                      )}
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
                  Users of {school?.schoolName}{" "}
                </h4>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    openAddDialog(school);
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Add User
                </Link>
              </div>

              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
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
                        <th className="text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user) => (
                        <tr key={user?._id}>
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
                          <td>{user?.role}</td>
                          <td>{user?.userId}</td>
                          <td>******</td>
                          <td>
                            <div className="d-flex gap-2">
                              {/* <Link
                                className="btn btn-light btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link> */}

                              <Link className="btn btn-soft-danger btn-sm">
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openDeleteDialog(user);
                                  }}
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

        {subscription?.length > 0 ? (
          <div className="row p-2">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h4 className="card-title flex-grow-1">
                    All Subscription List
                  </h4>
                  <Link
                    onClick={(event) => navigateToAddNewSubscription(event)}
                    className="btn btn-sm btn-primary"
                  >
                    Add Subscription
                  </Link>
                </div>
                <div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 table-hover table-centered text-center">
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
                          <th>Subscription Module</th>
                          <th>Subscription Start Date</th>
                          <th>No. Of Months</th>
                          <th>Monthly Rate</th>
                          <th className="text-start">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscription?.map((subscriptions) => (
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
                            <td>{subscriptions?.subscriptionFor}</td>
                            <td>
                              {new Date(
                                subscriptions?.subscriptionStartDate
                              ).toLocaleDateString()}
                            </td>
                            <td>{subscriptions?.subscriptionNoOfMonth}</td>
                            <td>{subscriptions?.monthlyRate}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  className="btn btn-light btn-sm"
                                  onClick={(event) =>
                                    navigateToViewSubscription(
                                      event,
                                      subscriptions
                                    )
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
                                    navigateToUpdateSubscription(
                                      event,
                                      subscriptions
                                    )
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:pen-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <Link
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openDeleteSubscriptionDialog(subscriptions);
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
              </div>
            </div>
          </div>
        ) : (
          <div className="row"></div>
        )}

        <div className="row p-2">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All School Role
                </h4>
                <button
                  onClick={handleAddClick}
                  disabled={isAdding || editRoleId}
                  className="btn btn-sm btn-primary"
                >
                  Add Role
                </button>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
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
                        <th className="text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schoolRoles?.map((role) => (
                        <tr key={role._id}>
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
                          <td>
                            {editRoleId === role._id ? (
                              <>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editInputValue}
                                  onChange={(e) => setEditInputValue(e.target.value)}
                                  placeholder="Enter role name"
                                />
                                {error && (
                                  <div
                                    className="text-danger mt-1"
                                    style={{ fontSize: "13px" }}
                                  >
                                    {error}
                                  </div>
                                )}
                              </>
                            ) : (
                              role.name
                            )}
                          </td>
                          <td>
                            {editRoleId === role._id ? (
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => handleEditSave(role._id)}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={handleEditCancel}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="d-flex gap-2">
                                <Link className="btn btn-light btn-sm"
                                onClick={(event) =>
                                    navigateToSchoolEmployeeList(
                                      event,
                                      schoolId
                                    )
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:eye-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <button
                                  className="btn btn-soft-primary btn-sm"
                                  onClick={() => handleEditClick(role)}
                                  disabled={isAdding || editRoleId}
                                >
                                  <iconify-icon
                                    icon="solar:pen-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </button>
                                <Link className="btn btn-soft-danger btn-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openDeleteSchoolRoleDialog(role);
                                  }}
                                >
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                              </div>
                            )}

                          </td>
                        </tr>
                      ))}
                      {isAdding && (
                        <tr>
                          <td></td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={newRoleInput}
                              onChange={(e) => setNewRoleInput(e.target.value)}
                              placeholder="Enter role name"
                            />
                            {error && (
                              <div
                                className="text-danger mt-1"
                                style={{ fontSize: "13px" }}
                              >
                                {error}
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-success btn-sm"
                                onClick={handleAddSave}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={handleAddRoleCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
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
          onClose={handleAddCancel}
          id={selectedSchool.schoolId}
          onAdd={handleAddConfirmed}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedUser._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

      {isSubscriptionDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteSubscriptionCancel}
          deleteType={deleteType}
          id={selectedSubscription.id}
          onDeleted={() =>
            handleDeleteSubscriptionConfirmed(selectedSubscription.id)
          }
        />
      )}

      {isSchoolRoleDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteSchoolRoleCancel}
          deleteType={deleteType}
          id={selectedSchoolRole._id}
          onDeleted={() =>
            handleDeleteSchoolRoleConfirmed(selectedSchoolRole._id)
          }
        />
      )}
    </>
  );
};

export default ViewSchool;
