import React from 'react'
import { useNavigate } from 'react-router-dom';

const ViewTeacherNotesDetails = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container mt-2">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">Notes</h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 ">
                  <div className="card border border-dark">
                    <div className="card-body overflow-hidden position-relative">
                      <div>
                        <h3>Check the Classroom equipments and maintenance</h3>
                      </div>
                      <span
                        className="badge text-dark me-2 p-1 mb-2"
                        style={{ cursor: "pointer", background: "#ffbf00" }}
                      >
                        Safety
                      </span>
                      <div>
                        <ul className="note-info">
                          <li>
                            Inspect projectors, smart boards, and screens for
                            proper functioning.
                          </li>
                          <li>
                            Verify microphones, speakers, and sound systems are
                            working.
                          </li>
                          <li>
                            Record any issues and assign them to the maintenance
                            team.
                          </li>
                        </ul>
                      </div>
                      <div className="d-flex flex-wrap justify-content-end align-items-center">
                        <span style={{ fontSize: "0.8rem", color: "gray" }}>
                          12-06-2025, 06:31AM
                        </span>
                      </div>
                    </div>{" "}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacherNotesDetails;