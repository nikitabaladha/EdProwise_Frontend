import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
import { FiDownload } from "react-icons/fi";
import CreatableSelect from "react-select/creatable";

const ExamTimeTableList = () => {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [schoolId, setSchoolId] = useState("");
    const [records, setRecords] = useState([]);
    const [academicYear, setAcademicYear] = useState(
      localStorage.getItem("selectedAcademicYear") || ""
    );
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [selectedRecord, setSelectedRecord] = useState(null);
      const [classes, setClasses] = useState([]);
      const [sections, setSections] = useState([]);
      const [selectedClass, setSelectedClass] = useState(null);
      const [selectedSection, setSelectedSection] = useState(null);
      
  
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
      if (!schoolId || !academicYear) return;
      fetchData();
       fetchClasses();
    }, [schoolId, academicYear]);
    
    useEffect(() => {
      if (selectedClass) {
        fetchSections();
      }
    }, [selectedClass]);

    useEffect(() => {
      if (schoolId && academicYear) {
        fetchData();
      }
    }, [schoolId, academicYear, selectedClass, selectedSection]);


    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `/get-exam-timetables?schoolId=${schoolId}&academicYear=${academicYear}`;
        if (selectedClass?.value) url += `&className=${selectedClass.value}`;
        if (selectedSection?.value)
          url += `&sectionName=${selectedSection.value}`;

        const res = await getAPI(url, true);

        if (!res.data.hasError) {
          setRecords(res.data.data || []);
        } else {
          toast.error(res.data.message || "Failed to fetch exam timetable");
        }
      } catch (err) {
        console.error("Error fetching exam timetable:", err);
        toast.error("Error fetching exam timetable");
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

  const navigateToAdd = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/other-management/exam-time-table/add-exam-time-table`,
      { state: { schoolId, academicYear } }
    );
  };

  const navigateToView = (event, rec) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/other-management/exam-time-table/view-exam-time-table`,
      { state: rec }
    );
  };

  const navigateToUpdate = (event,rec) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/other-management/exam-time-table/update-exam-time-table`,
      { state: rec }
    );
  };

  const openDeleteDialog = (record) => {
    setSelectedRecord(record);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRecord(null);
  };
  const handleDeleteConfirmed = async () => {
    fetchData();
    handleDeleteCancel();
  };
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center">
        <Link
          onClick={(event) => navigateToAdd(event)}
          className="btn btn-sm btn-primary"
        >
          Add Exam Time Table
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Exam Time Table
                  </h4>
                  <CreatableSelect
                    isClearable
                    name="class"
                    options={classes}
                    placeholder="Select Class"
                    className="email-select form-select-sm text-nowrap"
                    value={selectedClass}
                    onChange={(option) => {
                      setSelectedClass(option);
                      setSelectedSection(null);
                      setSections([]);
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
                      <th className="text-nowrap">Name of Exam</th>
                      <th className="text-nowrap">Start Date</th>
                      <th className="text-nowrap">Class</th>
                      <th className="text-nowrap">Section</th>
                      <th className="text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.length > 0 ? (
                      records.map((rec, index) => (
                        <tr key={rec._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                            </div>
                          </td>
                          <td>{rec.examName}</td>
                          <td>
                            {rec.examDetails?.length
                              // ? new Date(
                              //     rec.examDetails[0].examDate
                              //   ).toLocaleDateString()
                            ?  new Date(
                              rec.examDetails[0].examDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                              : "-"}
                            
                          </td>
                          <td>{rec.className}</td>
                          <td>{rec.sectionName}</td>
                          <td className="text-center">
                            <div className="d-flex gap-2 justify-content-center">
                              <Link
                                className="btn btn-light btn-sm"
                                onClick={(event) => navigateToView(event, rec)}
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                onClick={(event) =>
                                  navigateToUpdate(event, rec)
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(rec)}
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <button className="btn btn-primary btn-sm">
                                <FiDownload className="align-middle fs-18" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
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
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="examTimeTable"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default ExamTimeTableList;
