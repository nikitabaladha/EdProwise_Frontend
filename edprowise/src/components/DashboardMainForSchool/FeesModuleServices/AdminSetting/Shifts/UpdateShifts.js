import React, { useState, useEffect } from 'react';
import putAPI from '../../../../../api/putAPI';
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';

const UpdateShift = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.shift;
<<<<<<< HEAD

=======
  const [loading, setLoading] = useState(false);
>>>>>>> 5c437d67c3bae2a8477ca8109767aa304e7f90d6
  const [shift, setShift] = useState({
    shiftName: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    if (data) {
      const extractTime = (isoTime) =>
        isoTime ? new Date(isoTime).toISOString().substring(11, 16) : '';
<<<<<<< HEAD
  
=======

>>>>>>> 5c437d67c3bae2a8477ca8109767aa304e7f90d6
      setShift({
        shiftName: data.masterDefineShiftName || '',
        startTime: extractTime(data.startTime),
        endTime: extractTime(data.endTime),
      });
    }
  }, [data]);
<<<<<<< HEAD
  
=======

>>>>>>> 5c437d67c3bae2a8477ca8109767aa304e7f90d6

  const handleInputChange = (field, value) => {
    setShift((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

=======
    setLoading(true);

    const academicYear = localStorage.getItem("selectedAcademicYear");

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
>>>>>>> 5c437d67c3bae2a8477ca8109767aa304e7f90d6
    if (!shift.shiftName || !shift.startTime || !shift.endTime) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const payload = {
      masterDefineShiftName: shift.shiftName,
      startTime: shift.startTime,
      endTime: shift.endTime,
<<<<<<< HEAD
=======
      academicYear
>>>>>>> 5c437d67c3bae2a8477ca8109767aa304e7f90d6
    };

    try {
      const response = await putAPI(`/master-define-shift/${data._id}`, payload, {}, true, 'PUT');

      if (response.hasError) {
        toast.error(response.message || 'Failed to update shift');
      } else {
        toast.success("Shift updated successfully!");
        navigate(-1);
      }
    } catch (err) {
      const errorText = err.response?.data?.message || err.message || 'Something went wrong!';
      toast.error(errorText);
<<<<<<< HEAD
=======
    } finally {
      setLoading(false);
>>>>>>> 5c437d67c3bae2a8477ca8109767aa304e7f90d6
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Update Shift
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row align-items-end mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Shift Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={shift.shiftName}
                      onChange={(e) => handleInputChange('shiftName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={shift.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={shift.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
<<<<<<< HEAD
                  >
                    Update Shift
=======
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
>>>>>>> 5c437d67c3bae2a8477ca8109767aa304e7f90d6
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateShift;
