import React, { useState, useEffect } from 'react';
import putAPI from "../../../../../api/putAPI";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';
 
const UpdateEmployeeIdSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolId, setSchoolId] = useState(null);
  const [prefixId, setPrefixId] = useState(null);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [loading, setLoading] = useState(false);

  // Get data from route state
  useEffect(() => {
    const stateData = location.state;
    if (!stateData?.schoolId || !stateData?.prefixId) {
      toast.error("Missing schoolId or prefixId in navigation.");
      return;
    }
    setSchoolId(stateData.schoolId);
    setPrefixId(stateData.prefixId);
  }, [location.state]);

  // Fetch current data from server
  useEffect(() => {
    const fetchPrefixData = async () => {
      try {
        const res = await getAPI(`/getall-employeeid-setting/${location.state.schoolId}`, {}, true);
        const categories = res?.data?.data?.categories;
        const found = categories.find(item => item._id === location.state.prefixId);
        if (found) {
          setPrefix(found.prefix);
          const padded = '0'.repeat(found.suffixLength);
          setSuffix(padded);
        } else {
          toast.error("Prefix data not found.");
        }
      } catch (err) {
        toast.error("Failed to load prefix data.");
      }
    };

    if (schoolId && prefixId) {
      fetchPrefixData();
    }
  }, [schoolId, prefixId]);

  useEffect(() => {
    const prefixLength = prefix.length;
    if (prefixLength >= 2 && prefixLength <= 5) {
      const remaining = 8 - prefixLength;
      const padded = '0'.repeat(remaining);
      setSuffix(padded);
    } else {
      setSuffix('');
    }
  }, [prefix]);

  const handlePrefixChange = (e) => {
    const val = e.target.value;
    if (/^[a-zA-Z0-9]{0,5}$/.test(val)) {
      setPrefix(val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (prefix.length < 2 || prefix.length > 5) {
      toast.error("Prefix must be between 2 and 5 characters.");
      return;
    }

    if (!schoolId || !prefixId) {
      toast.error("Missing school ID or prefix ID.");
      return;
    }

    const payload = {
      schoolId,
      type: "employeeId",
      prefix,
      suffixLength: 8 - prefix.length,
    };

    setLoading(true);
    try {
      const response = await putAPI(`/update-employee-id-prefix/${prefixId}`, payload, true);
      if (!response.hasError) {
        toast.success("Employee ID prefix updated successfully!");
        navigate(-1); // Go back
      } else {
        toast.error(response.message || "Update failed.");
      }
    } catch (err) {
      toast.error("Error occurred during update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header text-center">
          <h4>Update Employee ID Prefix Settings</h4>
        </div>
        <div className="card-body">
          <p className="text-muted mb-3">
            The employee ID will always be 8 characters long. Provide a prefix (min 2, max 5 characters).
            The remaining part will be automatically padded with zeros.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Enter Prefix (2–5 characters)</label>
                <input
                  type="text"
                  className="form-control"
                  value={prefix}
                  onChange={handlePrefixChange}
                  placeholder="e.g. EMP01"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Auto Generated Format</label>
                <input
                  type="text"
                  className="form-control"
                  value={suffix}
                  disabled
                  placeholder="e.g. 000"
                />
              </div>
            </div>

            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeIdSettings;
