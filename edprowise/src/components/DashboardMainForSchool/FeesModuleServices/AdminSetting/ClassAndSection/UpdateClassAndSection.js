import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getAPI from "../../../../../api/getAPI";
import putAPI from "../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateClassAndSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.classandsection;
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(data?.className || "");
  const [numberOfSections, setNumberOfSections] = useState(data?.sections?.length?.toString() || "1");
  const [sections, setSections] = useState(data?.sections || []);
  const [shifts, setShifts] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
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

  useEffect(() => {
    if (!schoolId) return;

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift-year/${schoolId}/year/${academicYear}`);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data) ? response.data.data : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || "Failed to fetch shifts.");
        }
      } catch (err) {
        toast.error("Error fetching shift data.");
        console.error("Shift Fetch Error:", err);
      }
    };

    fetchShifts();
  }, [schoolId, academicYear]);

  useEffect(() => {
    const numSections = parseInt(numberOfSections) || 1;
    if (numSections < 1) {
      setNumberOfSections("1");
      setSections([{ name: "", shiftId: "" }]);
      return;
    }

    setSections((prevSections) => {
      const newSections = Array.from({ length: numSections }, (_, i) => ({
        name: prevSections[i]?.name || "",
        shiftId: prevSections[i]?.shiftId || "",
      }));
      return newSections;
    });
  }, [numberOfSections]);

  const handleSectionChange = (index, field, value) => {
    value = value.replace(/[^a-zA-Z0-9\s]/g, '');
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleRemoveSection = (index) => {
    if (sections.length === 1) {
      toast.error("At least one section is required.");
      return;
    }
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
    setNumberOfSections(updatedSections.length.toString());
  };

  const handleAddSection = () => {
    const newSection = { name: "", shiftId: "" };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    setNumberOfSections(updatedSections.length.toString());
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!academicYear) {
      toast.error("Academic year is missing. Please select an academic year.");
      setLoading(false);
      return;
    }

    if (!/^\d{4}-\d{4}$/.test(academicYear)) {
      toast.error("Invalid academic year format. Please use YYYY-YYYY (e.g., 2025-2026).");
      setLoading(false);
      return;
    }

    if (!className.trim()) {
      toast.error("Class name is required.");
      setLoading(false);
      return;
    }

    if (sections.some(sec => !sec.name.trim() || !sec.shiftId)) {
      toast.error("All sections must have a name and shift selected.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        className,
        sections,
        academicYear
      };

      const response = await putAPI(`/update-class-and-section/${data._id}`, payload, {}, true);

      if (!response.hasError) {
        toast.success("Class and sections updated successfully!");
        navigate(-1);
        setClassName("");
        setNumberOfSections("1");
        setSections([]);
      } else {
        toast.error(response.message || "Failed to update class.");
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "An error occurred while updating class and sections.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="card-header mb-2">
                <h4 className="card-title text-center custom-heading-font">
                  {data ? "Edit Class & Section" : "Add Class & Section"}
                </h4>
              </div>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="class" className="form-label">Class</label>
                    <input
                      type="text"
                      id="class"
                      className="form-control"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      required
                      disabled={!!data}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="numberOfSection" className="form-label">Number Of Sections</label>
                    <input
                      type="number"
                      id="numberOfSection"
                      className="form-control"
                      value={numberOfSections}
                      onChange={(e) => setNumberOfSections(e.target.value)}
                      required
                      disabled={!!data}
                    />
                  </div>
                </div>
              </form>

              {sections.length > 0 && (
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-center flex-grow-1">Sections for {className} Class</h5>

                  </div>
                  <form onSubmit={handleSave}>
                    {sections.map((section, index) => (
                      <div className="row mb-3 align-items-end" key={index}>
                        <div className="col-md-5">
                          <label className="form-label">Section {index + 1} Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={section.name}
                            onChange={(e) => handleSectionChange(index, "name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-md-5">
                          <label className="form-label">Section Shift</label>
                          <select
                            className="form-control"
                            value={section.shiftId}
                            onChange={(e) => handleSectionChange(index, "shiftId", e.target.value)}
                            required
                          >
                            <option value="">Select Shift</option>
                            {shifts.map((shift) => (
                              <option key={shift._id} value={shift._id}>
                                {shift.masterDefineShiftName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveSection(index)}
                            disabled={sections.length === 1}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddSection}
                      >
                        Add Section
                      </button>

                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Update"}
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateClassAndSection;