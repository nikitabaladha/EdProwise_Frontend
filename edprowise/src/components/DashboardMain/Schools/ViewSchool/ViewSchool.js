import React from "react";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ViewSchool = () => {
  const location = useLocation();
  const school = location.state?.school;

  if (!school) {
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
    </div>
  );
};

export default ViewSchool;
