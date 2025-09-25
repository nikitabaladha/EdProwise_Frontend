import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import getAPI from "../../../../../api/getAPI";
import deleteAPI from "../../../../../api/deleteAPI";
import ConfirmationDialog from "../../../../ConfirmationDialog";
const StudentHealthRecord = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const academicYear = localStorage.getItem("selectedAcademicYear");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
  }, []);

  // Fetch classes when component mounts
  useEffect(() => {
    if (schoolId && academicYear) {
      fetchClasses();
    }
  }, [schoolId, academicYear]);

  // Fetch sections when a class is selected
  useEffect(() => {
    if (selectedClass && schoolId && academicYear) {
      fetchSections();
    } else {
      setSections([]);
      setSelectedSection(null);
    }
  }, [selectedClass, schoolId, academicYear]);

  // Fetch health records when filters change
  useEffect(() => {
    if (schoolId && academicYear) {
      fetchHealthRecords();
    }
  }, [selectedClass, selectedSection, schoolId, academicYear]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getAPI(
        `/get-class-and-section-by-year/${schoolId}/${academicYear}`
      );

      if (!res.data.hasError) {
        const classOptions = res.data.data.map((classItem) => ({
          value: classItem.className,
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

  const fetchSections = () => {
    if (selectedClass) {
      const selectedClassData = classes.find(
        (c) => c.value === selectedClass.value
      );
      if (selectedClassData && selectedClassData.sections) {
        const sectionOptions = selectedClassData.sections.map((section) => ({
          value: section.name,
          label: section.name,
        }));
        setSections(sectionOptions);
      }
    }
  };

  const fetchHealthRecords = async () => {
    try {
      setLoading(true);
      let url = `/get-student-health-records/${schoolId}/${academicYear}`;

      const params = new URLSearchParams();
      if (selectedClass) params.append("class", selectedClass.value);
      if (selectedSection) params.append("section", selectedSection.value);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await getAPI(url, true);
      console.log("response", res);

      if (!res.data.hasError) {
        setHealthRecords(res.data.data || []);
      } else {
        toast.error("Failed to fetch health records");
        setHealthRecords([]);
      }
    } catch (error) {
      toast.error("Error fetching health records");
      console.error("Error fetching health records:", error);
      setHealthRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (record) => {
    setSelectedRecord(record);
    setIsDeleteDialogOpen(true);
  };

  // Cancel
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRecord(null);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await deleteAPI(
        `/delete-student-health-record/${selectedRecord._id}`,
        {},
        true
      );
      if (!res.data.hasError) {
        toast.success("Record deleted successfully");
        // Refresh list
        fetchHealthRecords();
      } else {
        toast.error(res.data.message || "Failed to delete record");
      }
    } catch (error) {
      toast.error("Error deleting record");
      console.error("Delete error:", error);
    } finally {
      handleDeleteCancel();
    }
  };

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/operational-service/student-health-record/add`);
  };

  const navigateToView = (event, record) => {
    event.preventDefault();
    navigate(
      "/school-dashboard/operational-service/student-health-record/view",
      { state: record }
    );
  };

  const navigateToUpdate = (event, record) => {
    event.preventDefault();
    navigate(
      "/school-dashboard/operational-service/student-health-record/update",
      { state: record }
    );
  };
  
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Add Record
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Student Health Records
                  </h4>
                  <div className="d-flex gap-2">
                    <CreatableSelect
                      isClearable
                      name="class"
                      options={classes}
                      placeholder="Select Class"
                      className="email-select form-select-sm me-2"
                      value={selectedClass}
                      onChange={(option) => {
                        setSelectedClass(option);
                        setSelectedSection(null);
                      }}
                      isLoading={loading}
                    />

                    <CreatableSelect
                      isClearable
                      name="section"
                      options={sections}
                      placeholder="Select Section"
                      className="email-select form-select-sm"
                      value={selectedSection}
                      onChange={setSelectedSection}
                      isDisabled={!selectedClass}
                      isLoading={loading}
                    />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th
                          style={{
                            position: "sticky",
                            left: "0px",
                            zIndex: 1,
                          }}
                        >
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
                        <th
                          className="text-nowrap"
                          style={{
                            position: "sticky",
                            left: "63px",
                            zIndex: 1,
                            backgroundColor: "white",
                          }}
                        >
                          Admission No
                        </th>
                        <th
                          className="text-nowrap"
                          style={{
                            position: "sticky",
                            left: "205px",
                            zIndex: 1,
                            backgroundColor: "white",
                          }}
                        >
                          Student Name
                        </th>
                        <th className="text-nowrap ">Academic Year</th>
                        <th className="text-nowrap ">Height</th>
                        <th className="text-nowrap ">Weight</th>
                        <th className="text-nowrap">BMI</th>
                        <th className="text-nowrap">Blood Group</th>
                        <th className="text-nowrap">Chronic illnesses</th>
                        <th className="text-nowrap">Physical Disabilities</th>
                        <th className="text-nowrap">Past Surgery</th>
                        <th className="text-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {healthRecords.length > 0 ? (
                        healthRecords.map((record, index) => (
                          <tr key={record._id || index}>
                            <td
                              style={{
                                position: "sticky",
                                left: "0px",
                                zIndex: 1,
                                backgroundColor: "white",
                              }}
                            >
                              <div className="form-check ms-1">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`check-${index}`}
                                />
                              </div>
                            </td>
                            <td
                              style={{
                                position: "sticky",
                                left: "63px",
                                zIndex: 1,
                                backgroundColor: "white",
                              }}
                            >
                              {record.admissionNumber || "N/A"}
                            </td>
                            <td
                              style={{
                                position: "sticky",
                                left: "205px",
                                zIndex: 1,
                                backgroundColor: "white",
                              }}
                            >
                              {record.studentName || "N/A"}
                            </td>
                            <td>{record.academicYear || "N/A"}</td>
                            <td>{record.height || "N/A"}</td>
                            <td>{record.weight || "N/A"}</td>
                            <td>{record.bmi || "N/A"}</td>
                            <td>{record.bloodGroup || "N/A"}</td>
                            <td>{record.chronic || "N/A"}</td>
                            <td>{record.physicalDisability || "N/A"}</td>
                            <td>{record.surgery || "N/A"}</td>
                            <td className="text-center">
                              <div className="d-flex gap-2 justify-content-center">
                                <Link
                                  className="btn btn-light btn-sm"
                                  onClick={(event) =>
                                    navigateToView(event, record)
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
                                    navigateToUpdate(event, record)
                                  }
                                >
                                  <iconify-icon
                                    icon="solar:pen-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                                <Link
                                  className="btn btn-soft-danger btn-sm"
                                  onClick={() => openDeleteDialog(record)}
                                >
                                  <iconify-icon
                                    icon="solar:trash-bin-minimalistic-2-broken"
                                    className="align-middle fs-18"
                                  />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="11" className="text-center py-4">
                            No health records found.{" "}
                            {selectedClass || selectedSection
                              ? "Try changing your filters."
                              : ""}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="studentHealthRecord"
          id={selectedRecord.mainId}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default StudentHealthRecord;
