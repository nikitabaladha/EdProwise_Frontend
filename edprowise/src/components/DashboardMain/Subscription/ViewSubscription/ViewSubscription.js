import React from "react";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ViewSubscriptions = () => {
  const location = useLocation();
  const subscription = location.state?.subscriptions;
// console.log(subscription);

  if (!subscription) {
    return <p>No school selected.</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Subscription Details
                  </h4>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <div className="d-flex align-items-center">
                    <div className="rounded bg-light d-flex align-items-center justify-content-center">
                      <img
                        src={`http://localhost:3001${subscription.profileImage}`}
                        alt={`${subscription.schoolName} Profile`}
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
                    <p className="form-control">{subscription.schoolName}</p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                    Subscription Module
                    </label>
                    <p className="form-control">{subscription.subscriptionFor}</p>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cityStateCountry" className="form-label">
                      Subscription Start Date
                    </label>
                    <p className="form-control">{subscription.subscriptionStartDate}</p>
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="cityStateCountry" className="form-label">
                      Subscription Start Date
                    </label>
                    <p className="form-control">{subscription.subscriptionStartDate}</p>
                  </div> */}
                </div>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="mobileNo" className="form-label">
                      School Mobile Number
                    </label>
                    <p className="form-control">{subscription.schoolMobileNo}</p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      School Email
                    </label>
                    <p className="form-control">{subscription.schoolEmail}</p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      subscription No.Month
                    </label>
                    <p className="form-control">{subscription.subscriptionNoOfMonth}</p>
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
  );
};

export default ViewSubscriptions;
