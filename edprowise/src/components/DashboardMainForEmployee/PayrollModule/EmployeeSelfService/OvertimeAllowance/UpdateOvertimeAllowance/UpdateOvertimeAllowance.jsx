import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import putAPI from "../../../../../../api/putAPI";
import { toast } from "react-toastify";

const UpdateOvertimeAllowance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee, entry } = location.state || {};
  console.log("entry", entry);
  
  const [formData, setFormData] = useState({
    overtimeDate: "",
    fromTime: "",
    toTime: "",
    totalHours: 0,
    rate: 0,
    calculatedAmount: 0,
  });

  useEffect(() => {
    if (!employee || !entry) {
      toast.error("Missing employee or entry data");
      navigate(-1);
      return;
    }

    if (entry.status !== "pending") {
      toast.warning("Only pending requests can be updated");
      navigate(-1);
      return;
    }

    setFormData({
      overtimeDate: entry.overtimeDate,
      fromTime: entry.fromTime,
      toTime: entry.toTime,
      totalHours: parseFloat(entry.totalHours).toFixed(2),
      rate: parseFloat(entry.rate).toFixed(2),
      calculatedAmount: parseFloat(entry.calculatedAmount).toFixed(2),
    });
  }, [employee, entry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (name === "fromTime" || name === "toTime" || name === "overtimeDate") {
      if (updated.fromTime && updated.toTime && updated.overtimeDate) {
        const start = new Date(`${updated.overtimeDate}T${updated.fromTime}`);
        const end = new Date(`${updated.overtimeDate}T${updated.toTime}`);
        const diffInHours = (end - start) / (1000 * 60 * 60);
        updated.totalHours = Math.max(diffInHours, 0).toFixed(2);
        updated.calculatedAmount = (
          updated.totalHours * parseFloat(updated.rate)
        ).toFixed(2);
      }
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        overtimeDate: formData.overtimeDate,
        fromTime: formData.fromTime,
        toTime: formData.toTime,
        totalHours: parseFloat(formData.totalHours),
        rate: parseFloat(formData.rate),
        calculatedAmount: parseFloat(formData.calculatedAmount),
      };

      await putAPI(`/update-overtime/${entry._id}`, payload,{},true);
      toast.success("Overtime request updated!");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to update overtime");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex align-items-center">
                <h4 className="card-title flex-grow-1 text-center">Update Overtime</h4>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      name="overtimeDate"
                      className="form-control"
                      value={formData.overtimeDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">From Time</label>
                    <input
                      type="time"
                      name="fromTime"
                      className="form-control"
                      value={formData.fromTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">To Time</label>
                    <input
                      type="time"
                      name="toTime"
                      className="form-control"
                      value={formData.toTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Total Hours</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.totalHours}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Rate (₹ per hour)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.rate}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Total Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.calculatedAmount}
                      readOnly
                    />
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOvertimeAllowance;
