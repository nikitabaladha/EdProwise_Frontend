import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import putAPI from "../../../../../../api/putAPI";
import { toast } from "react-toastify";

const ViewOvertimeAllowance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employee, entry } = location.state || {};
 
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
    
    setFormData({
      overtimeDate: entry.overtimeDate,
      fromTime: entry.fromTime,
      toTime: entry.toTime,
      totalHours: parseFloat(entry.totalHours).toFixed(2),
      rate: parseFloat(entry.rate).toFixed(2),
      calculatedAmount: parseFloat(entry.calculatedAmount).toFixed(2),
    });
  }, [employee, entry]);

 

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="card-header d-flex align-items-center">
                <h4 className="card-title flex-grow-1 text-center">View Overtime Details</h4>
                <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
              </div>

              <form >
                <div className="row mb-3">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      name="overtimeDate"
                      className="form-control"
                      value={formData.overtimeDate}
                     
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

               
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOvertimeAllowance;
