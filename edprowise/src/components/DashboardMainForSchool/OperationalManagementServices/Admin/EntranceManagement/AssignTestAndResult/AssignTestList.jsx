import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
import CreatableSelect from "react-select/creatable";

const AssignTestList = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [academicYear, setAcademicYear] = useState(
    localStorage.getItem("selectedAcademicYear") || ""
  );
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (schoolId && academicYear) {
      fetchClasses();
    }
  }, [schoolId, academicYear]);

  useEffect(() => {
    if (schoolId && academicYear) {
      fetchRecords();
    }
  }, [schoolId, academicYear, selectedClass, result]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      let url = `/get-assign-tests?schoolId=${schoolId}&academicYear=${academicYear}`;
      if (selectedClass?.value)
        url += `&classId=${encodeURIComponent(selectedClass.value)}`;
      if (result && result !== "Pending")
        url += `&result=${encodeURIComponent(result)}`;

      const res = await getAPI(url, true);
       console.log("Get the Assign test",res);
       
      if (!res.data.hasError) {
        setRecords(res.data.data || []);
      } else {
        toast.error(res.data.message || "Failed to fetch assign test records");
      }
    } catch (err) {
      console.error("Error fetching assign test records:", err);
      toast.error("Error fetching assign test records");
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-class-and-section-by-year/${schoolId}/${academicYear}`
      );
      if (!res.data.hasError) {
        const classOptions = res.data.data.map((classItem) => ({
          value: classItem._id,
          label: classItem.className,
          sections: classItem.sections,
        }));
        setClasses(classOptions);
      } else {
        toast.error("Failed to fetch classes");
      }
    } catch (error) {
      toast.error("Error fetching classes");
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultChange = (e) => {
    setResult(e.target.value);
  };

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/entrance-management/test-list/assign-test`,
      { state: { schoolId, academicYear } }
    );
  };

   const navigateToView = (event, record) => {
     event.preventDefault();
     navigate(
       `/school-dashboard/operational-service/entrance-management/test-list/view-assign-test`,
       { state: { record } }
     );
   };
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Assign Test
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Test Records
                  </h4>
                  <select
                    className="form-select form-select-sm me-2 w-auto"
                    value={academicYear}
                    onChange={(e) => {
                      setAcademicYear(e.target.value);
                    }}
                  >
                    <option disabled>Select Academic Year</option>
                    <option value="2025-2026">2025-2026 </option>
                    <option value="2026-2027">2026-2027 </option>
                  </select>
                  <CreatableSelect
                    isClearable
                    name="class"
                    options={classes}
                    placeholder="Select Class"
                    className="email-select me-2 form-select-sm text-nowrap"
                    value={selectedClass}
                    onChange={(option) => {
                      setSelectedClass(option);
                    }}
                    isLoading={loading}
                  />
                  <select
                    className="form-select form-select-sm me-2 w-auto"
                    value={result}
                    onChange={(e) => {
                      setResult(e.target.value);
                    }}
                  >
                    <option disabled>Select Result</option>
                    <option value="Pass">Pass </option>
                    <option value="Fail">Fail </option>
                    <option value="Awaited">Await </option>
                  </select>
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
                      <th className="text-nowrap ">Registrtion No. </th>
                      <th className="text-nowrap ">Date of Registration</th>
                      <th className="text-nowrap">Academic Year</th>
                      <th className="text-nowrap">Name of Student</th>
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  {/* <tbody>
                    <tr>
                      <td className="">
                        <div className="form-check ms-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            // id={`check-${index}`}
                          />
                        </div>
                      </td>
                      <td className="">1234</td>
                      <td className="">15-10-2025</td>
                      <td>2025-2026</td>
                      <td>Kunal Shah</td>
                      <td>1</td>
                      <td>Yes</td>
                      <td>{result}</td>
                      <td>
                        <select
                          className="form-control"
                          value={result === "Pending" ? "" : result}
                          onChange={handleResultChange}
                          required
                        >
                          <option disabled>Select </option>
                          <option value="Awaited">Awaited</option>
                          <option value="Passed">Passed</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </td>
                    </tr>
                  </tbody> */}
                  <tbody>
                    {records.length > 0 ? (
                      records.map((record, index) => (
                        <tr key={record._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`check-${index}`}
                              />
                            </div>
                          </td>
                          <td>{record.registrationNumber}</td>
                          <td>
                            {new Date(
                              record.registrationDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td>{record.academicYear}</td>
                          <td>{record.studentName || "N/A"}</td>
                          <td>{record.className}</td>
                          <td>
                            {/* <select
                              className="form-control"
                              value={record.result}
                              onChange={(e) =>
                                handleResultChange(e, record._id)
                              }
                            >
                              <option disabled>Select</option>
                              <option value="Awaited">Awaited</option>
                              <option value="Pass">Pass</option>
                              <option value="Fail">Fail</option>
                            </select> */}
<div className="d-flex gap-2 justify-content-center">
                            <Link
                              className="btn btn-light btn-sm"
                              onClick={(e) => navigateToView(e, record)}
                            >
                              <iconify-icon
                                icon="solar:eye-broken"
                                className="align-middle fs-18"
                              />
                            </Link>
                            
                            
                          </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No records found
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
  );
};

export default AssignTestList;
