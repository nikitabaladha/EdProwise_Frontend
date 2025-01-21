import React, { useState, useEffect } from "react";

import getAPI from "../../../api/getAPI";

import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";

import "react-toastify/dist/ReactToastify.css";

const ViewSchoolProfile = () => {
  const location = useLocation();
  const schoolId = location.state?._id;

  const navigate = useNavigate();

  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (schoolId) {
      fetchSchoolData();
    } else {
      console.error("No school ID provided");
    }
  }, [schoolId]);

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSchool(response.data.data);

        console.log(
          "school data from view school profile page",
          response.data.data
        );
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

  const navigateToUpdateSchoolProfile = (event, _id) => {
    event.preventDefault();
    navigate(`/school-dashboard/update-school-profile`, { state: { _id } });
  };

  return (
    <>
      {school && (
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card m-2">
                <div className="card-body custom-heading-padding">
                  <div className="container">
                    <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                      <h4 className="card-title text-center custom-heading-font card-title">
                        Your Profile Details
                      </h4>
                      <Link
                        onClick={(event) =>
                          navigateToUpdateSchoolProfile(event, school?._id)
                        }
                        className="btn btn-soft-primary btn-sm"
                      >
                        <iconify-icon
                          icon="solar:pen-2-broken"
                          className="align-middle fs-18"
                        />
                      </Link>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font mb-3">
                    School Details
                  </h4>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <div className="rounded bg-light d-flex align-items-center justify-content-center">
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
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

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="schoolId" className="form-label">
                          School ID
                        </label>
                        <p className="form-control">{school.schoolId}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="principalName" className="form-label">
                          Principal Name
                        </label>
                        <p className="form-control">{school.principalName}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="schoolMobileNo" className="form-label">
                          School Mobile Number
                        </label>
                        <p className="form-control">{school.schoolMobileNo}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="schoolEmail" className="form-label">
                          School Email
                        </label>
                        <p className="form-control">{school.schoolEmail}</p>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">
                          School Name
                        </label>
                        <p className="form-control">{school.schoolName}</p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="contactPersonName"
                          className="form-label"
                        >
                          Contact Person Name
                        </label>
                        <p className="form-control">
                          {school.contactPersonName}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="schoolAlternateContactNo"
                          className="form-label"
                        >
                          School Alter Nate Contact Number
                        </label>
                        <p className="form-control">
                          {school.schoolAlternateContactNo}
                        </p>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="numberOfStudents"
                          className="form-label"
                        >
                          Number Of Students
                        </label>
                        <p className="form-control">
                          {school.numberOfStudents}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    School Address Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="schoolAddress" className="form-label">
                        School Address
                      </label>
                      <p className="form-control">{school.schoolAddress}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="schoolLocation" className="form-label">
                          City-State-Country
                        </label>
                        <p className="form-control">{school.schoolLocation}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="landMark" className="form-label">
                          School Land Mark
                        </label>
                        <p className="form-control">{school.landMark}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="schoolPincode" className="form-label">
                          School Pin Code
                        </label>
                        <p className="form-control">{school.schoolPincode}</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    Delivery Address Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="deliveryAddress" className="form-label">
                        School Delivery Address
                      </label>
                      <p className="form-control">{school.deliveryAddress}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLocation"
                          className="form-label"
                        >
                          School Delivery Location
                        </label>
                        <p className="form-control">
                          {school.deliveryLocation}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLandMark"
                          className="form-label"
                        >
                          Delivery Land Mark
                        </label>
                        <p className="form-control">
                          {school.deliveryLandMark}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryPincode" className="form-label">
                          Delivery Pin Code
                        </label>
                        <p className="form-control">{school.deliveryPincode}</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    School Certificate Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="col-md-3">
                      <div className="mb-3">
                        <label htmlFor="affiliationUpto" className="form-label">
                          Affiliation Upto
                        </label>
                        <p className="form-control">{school.affiliationUpto}</p>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="panNo" className="form-label">
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
                          Affiliation Certificate
                        </label>
                        {school.affiliationCertificate ? (
                          school.affiliationCertificate.endsWith(".pdf") ? (
                            <Worker
                              workerUrl={process.env.REACT_APP_WORKER_URL}
                            >
                              <div
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "10px",
                                }}
                              >
                                <Viewer
                                  fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.affiliationCertificate}`}
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
                                src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.affiliationCertificate}`}
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
                        {school.panFile ? (
                          school.panFile.endsWith(".pdf") ? (
                            <Worker
                              workerUrl={process.env.REACT_APP_WORKER_URL}
                            >
                              <div
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "10px",
                                }}
                              >
                                <Viewer
                                  fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.panFile}`}
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
                                src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.panFile}`}
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
        </div>
      )}
    </>
  );
};

export default ViewSchoolProfile;
