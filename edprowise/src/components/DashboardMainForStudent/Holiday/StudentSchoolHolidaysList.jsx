import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import CreatableSelect from "react-select/creatable";
const StudentSchoolHolidaysList = () => {
  const navigate = useNavigate();

  const navigateToView = (event) => {
    event.preventDefault();
    navigate(`/student-dashboard/holiday/view-holiday`);
  };

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const [selectedMonth, setSelectedMonth] = useState(null);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    School Holidays Records
                  </h4>
                  <select className="form-select form-select-sm me-2 w-auto">
                    <option disabled>Select Academic Year</option>
                    <option value="2025-26">2025-26 </option>
                    <option value="2026-27">2026-27 </option>
                  </select>

                  <CreatableSelect
                    isClearable
                    options={months}
                    value={selectedMonth}
                    onChange={(newValue) => setSelectedMonth(newValue)}
                    placeholder="Select Month"
                    className="email-select form-select-sm me-2 w-auto"
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="">
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
                      <th className="text-nowrap">Academic Year</th>
                      <th className="text-nowrap">Name of Holiday</th>
                      <th className="text-nowrap">Date of Holiday</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </td>
                      <td>2025-26</td>
                      <td>Holiday Name</td>
                      <td>20-05-2025</td>
                      <td className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <Link
                            className="btn btn-light btn-sm"
                            onClick={(event) => navigateToView(event)}
                          >
                            <iconify-icon
                              icon="solar:eye-broken"
                              className="align-middle fs-18"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSchoolHolidaysList;
