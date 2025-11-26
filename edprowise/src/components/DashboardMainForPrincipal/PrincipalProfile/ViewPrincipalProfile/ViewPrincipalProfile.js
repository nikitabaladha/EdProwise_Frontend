import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
 
import "react-toastify/dist/ReactToastify.css";

const ViewPrincipalProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const schoolId = location.state?.schoolId;
  const [school, setSchool] = useState(null);
  
  const navigateToUpdateSchoolProfile = (event, _id, schoolId) => {
    event.preventDefault();
    navigate(`/principal-dashboard/update-principal-profile`, {
      // state: { _id, schoolId },
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Your Profile Details
                    </h4>
                    <Link
                      onClick={(event) =>
                        navigateToUpdateSchoolProfile(
                          event
                          // school?._id,
                          // school?.schoolId
                        )
                      }
                      className="btn btn-soft-primary btn-sm"
                    >
                      <iconify-icon
                        icon="solar:pen-2-broken"
                        className="align-middle fs-18"
                      />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={() => window.history.back()}
                    >
                      Back
                    </button>
                  </div>
                </div>

                {/* <h4 className="card-title text-center custom-heading-font mb-3">
                    Principal Details
                  </h4> */}

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3 d-flex justify-content-center">
                      <div className="rounded bg-light d-flex align-items-center justify-content-center">
                        <img
                          // src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`}
                          // alt={`${school.schoolName} Profile`}
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
                        Employee ID
                      </label>
                      <p className="form-control">EMP-001</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="schoolName" className="form-label">
                        School ID
                      </label>
                      <p className="form-control">SCH-001</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="schoolMobileNo" className="form-label">
                        Mobile Number
                      </label>
                      <p className="form-control">1234567890</p>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="userId" className="form-label">
                        Name
                      </label>
                      <p className="form-control">Adit Mehra</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="schoolName" className="form-label">
                        School Name
                      </label>
                      <p className="form-control">SchoolJNK</p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="contactPersonName" className="form-label">
                        Email
                      </label>
                      <p className="form-control">XYZ@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="schoolEmail" className="form-label">
                        School Email
                      </label>
                      <p className="form-control">school@gmail.com</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="numberOfStudents" className="form-label">
                        joining Date
                      </label>
                      <p className="form-control">25-08-2020</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="schoolAlternateContactNo"
                        className="form-label"
                      >
                        Emargency Contact Number
                      </label>
                      <p className="form-control">9874563210</p>
                    </div>
                  </div>
                </div>

                <h4 className="card-title text-center custom-heading-font">
                  Address Details
                </h4>
                <hr></hr>

                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="schoolAddress" className="form-label">
                        Address
                      </label>
                      <p className="form-control">Pune</p>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <p className="form-control">India</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <p className="form-control">Maharashtra</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <p className="form-control">Pune</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="schoolPincode" className="form-label">
                        Pin Code
                      </label>
                      <p className="form-control">411111</p>
                    </div>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="deliveryLandMark" className="form-label">
                        Delivery Land Mark
                      </label>
                      <p className="form-control">
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="deliveryPincode" className="form-label">
                        Delivery Pin Code
                      </label>
                      <p className="form-control"></p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPrincipalProfile;