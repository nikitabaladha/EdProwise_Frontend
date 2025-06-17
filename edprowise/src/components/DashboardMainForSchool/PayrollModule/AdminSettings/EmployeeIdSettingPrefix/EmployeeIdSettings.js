import React, { useState, useEffect } from 'react';
import postAPI from "../../../../../api/postAPI";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';

const EmployeeIdSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolId, setSchoolId] = useState(null);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [loading, setLoading] = useState(false);

  // Get schoolId from navigation state
  useEffect(() => {
    const passedSchoolId = location.state?.schoolId;
    if (!passedSchoolId) {
      toast.error("School ID not found in navigation.");
    }
    setSchoolId(passedSchoolId);
  }, [location.state]);

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

    if (!schoolId) {
      toast.error("Missing school ID.");
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
      const response = await postAPI("/create-employee-id-prefix", payload, {}, true);
      if (!response.hasError) {
        toast.success("Employee ID prefix saved successfully!");
        navigate(-1);
      } else {
        toast.error(response.message || "Failed to save Employee ID prefix.");
      }
    } catch (err) {
      toast.error("Error occurred while saving prefix.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header text-center">
          <h4>Employee ID Prefix Settings</h4>
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
                {loading ? "Submitting..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeIdSettings;
