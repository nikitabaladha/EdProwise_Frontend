import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployerAwardsAndAchievement = () => {
  const navigate = useNavigate();
  const [awards, setAwards] = useState([
    {
      id: 1,
      award: "Best Teacher of the Month",
      frequency: "Monthly",
      selection: "Based on Management Feedback",
      description: "Recognizes overall excellence in teaching, student engagement, and contribution to academics."
    },
    {
      id: 2,
      award: "Support Star",
      frequency: "Monthly",
      selection: "Based on Management Feedback",
      description: "For non-teaching staff (admin/support) showing exceptional performance and reliability."
    },
    {
      id: 3,
      award: "Best Teacher of the Year",
      frequency: "Yearly",
      selection: "Based on Feedback from Students",
      description: "Recognizes overall excellence in teaching, student engagement, and contribution to academics."
    },
    {
      id: 4,
      award: "Innovative Teaching",
      frequency: "Yearly",
      selection: "Based on Feedback from Students",
      description: "Acknowledges creative use of teaching methods, tech, or classroom engagement tools."
    },
    {
      id: 5,
      award: "Subject Excellence",
      frequency: "Yearly",
      selection: "Based on Feedback from Students",
      description: "Awarded to teachers delivering the best results or innovation in a specific subject."
    },
    {
      id: 6,
      award: "Excellence Class Management",
      frequency: "Yearly",
      selection: "Based on Feedback from Students",
      description: "Award that recognizes teachers who maintain discipline, engagement, and a positive learning environment consistently."
    },
    {
      id: 7,
      award: "Punctuality & Discipline",
      frequency: "Yearly",
      selection: "Based on Feedback from Students",
      description: "Recognizes those who consistently model discipline and time management."
    },
    {
      id: 8,
      award: "Inspiring Teacher",
      frequency: "Yearly",
      selection: "Based on Result",
      description: ""
    },
    {
      id: 9,
      award: "Top Result Contributor	",
      frequency: "Yearly",
      selection: "Based on Result",
      description: "Excellent way to recognize teachers who have made a measurable impact on student academic performance."
    },
    {
      id: 10,
      award: "Attendance Excellence",
      frequency: "Yearly",
      selection: "Based on Attendance",
      description: "Given to staff with perfect or outstanding attendance records in a term/month."
    },
    {
      id: 11,
      award: "Leadership in Action",
      frequency: "Yearly",
      selection: "Based on Management Feedback",
      description: "For teachers or staff who successfully lead school initiatives or manage teams/projects.	"
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newAward, setNewAward] = useState({
    award: "",
    frequency: "",
    selection: "",
    description: ""
  });

  const handleAwardClick = (awardId) => {
    navigate(`/admin-dashboard/payroll-module/employer/awards-and-achievement/awards-and-achievement-certificate`);
  };

  const handleAddAward = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewAward({
      award: "",
      frequency: "",
      selection: "",
      description: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAward(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAward = () => {
    if (newAward.award && newAward.frequency && newAward.selection && newAward.description) {
      const newId = awards.length > 0 ? Math.max(...awards.map(a => a.id)) + 1 : 1;
      setAwards([...awards, { ...newAward, id: newId }]);
      setIsAdding(false);
      setNewAward({
        award: "",
        frequency: "",
        selection: "",
        description: ""
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Awards and Achievement
                  </h4>
                  <div>
                    <select id="yearSelect" className="custom-select" aria-label="Select Year">
                      <option selected>2025-26</option>
                      <option>2026-27</option>
                      <option>2027-28</option>
                      <option>2028-29</option>
                      <option>2029-30</option>
                    </select>
                  </div>
                </div>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="table-responsive mb-2">
                  <table className="table border border-dark text-dark mb-2">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center w-75 border border-dark text-nowrap p-2">
                          Awards
                        </th>
                        <th className="text-center align-content-center w-25 border border-dark text-nowrap p-2">
                          Frequency
                        </th>
                        <th className="text-center align-content-center w-25 border border-dark text-nowrap p-2">
                          Award Selection
                        </th>
                        <th className="text-center align-content-center w-25 border border-dark text-nowrap p-2">
                          Description
                        </th>
                        <th className="text-center align-content-center w-25 border border-dark text-nowrap p-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {awards.map((item) => (
                        <tr key={item.id} className='payroll-table-body'>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            {item.award}
                          </td>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            {item.frequency}
                          </td>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            {item.selection}
                          </td>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            {item.description}
                          </td>
                          <td className="align-content-center text-center p-2 border border-dark text-nowrap">
                            <button
                              onClick={() => handleAwardClick(item.id)}
                              className="btn btn-primary"
                            >
                              Award
                            </button>
                          </td>
                        </tr>
                      ))}

                      {isAdding && (
                        <tr className='payroll-table-body'>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            <input
                              type="text"
                              name="award"
                              value={newAward.award}
                              onChange={handleInputChange}
                              className="form-control"
                              required
                            />
                          </td>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            <input
                              type="text"
                              name="frequency"
                              value={newAward.frequency}
                              onChange={handleInputChange}
                              className="form-control"
                              required
                            />
                          </td>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            <input
                              type="text"
                              name="selection"
                              value={newAward.selection}
                              onChange={handleInputChange}
                              className="form-control"
                              required
                            />
                          </td>
                          <td className="align-content-center p-2 border border-dark text-nowrap">
                            <input
                              type="text"
                              name="description"
                              value={newAward.description}
                              onChange={handleInputChange}
                              className="form-control"
                              required
                            />
                          </td>
                          <td className="align-content-center text-center p-2 border border-dark text-nowrap">
                            <button
                              type="button"
                              onClick={handleSaveAward}
                              className="btn btn-success me-2"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelAdd}
                              className="btn btn-danger"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      )}
                      
                    </tbody>
                  </table>
                </div>
                <div className="text-end">
                  <button
                    type="button"
                    onClick={handleAddAward}
                    className="btn btn-secondary me-2"
                  >
                    Add Award
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="container mt-3">
                <div className="card-header mb-2 d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    History of Awards and Achievement
                  </h4>
                  <div>
                    <select id="yearSelect" className="custom-select" aria-label="Select Year">
                      <option selected>2025-26</option>
                      <option>2026-27</option>
                      <option>2027-28</option>
                      <option>2028-29</option>
                      <option>2029-30</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="table-responsive pb-4">
                                <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                    <thead className="bg-light-subtle">
                                        <tr className="payroll-table-header">
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
                                            <th>Employee ID</th>
                                            <th>Employee Name</th>
                                            <th>Certificate Name</th>
                                            <th>Date of Certificate</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='payroll-table-body'>
                                            <td>
                                                <div className="form-check ms-1">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id={"customCheck"}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor={"customCheck"}
                                                    >
                                                        &nbsp;
                                                    </label>
                                                </div>
                                            </td>
                                            <td> EMP-001</td>
                                            <td>Umesh Jadhav</td>
                                            <td>
                                                Best Teacher of the Month
                                            </td>
                                            <td>
                                                14-05-2025
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer border-top">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-end mb-0">
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                            // onClick={handlePreviousPage}
                                            // disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        <li
                                            className={`page-item`}
                                        >
                                            <button
                                                className={`page-link pagination-button `}
                                            //   onClick={() => handlePageClick(page)}
                                            >
                                                1
                                            </button>
                                        </li>

                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                            // onClick={handleNextPage}
                                            // disabled={currentPage === totalPages}
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
    </div>
  );
};

export default EmployerAwardsAndAchievement;