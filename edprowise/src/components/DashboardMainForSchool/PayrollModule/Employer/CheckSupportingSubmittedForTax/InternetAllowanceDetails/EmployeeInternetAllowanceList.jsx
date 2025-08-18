import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../../api/getAPI';

const EmployeeInternetAllowanceList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employeeId, setEmployeeId] = useState(null);
  const [academicYear, setAcademicYear] = useState('');
  const [schoolId, setSchoolId] = useState(null);
  const [employeeInternetDetails, setEmployeeInternetDetails] = useState([]);
 
  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);
    if (location.state?.employeeId) {
      setEmployeeId(location.state.employeeId);
      setAcademicYear(location.state.academicYear );
      fetchInternetDetails(userDetails.schoolId, location.state.employeeId);
    } else {
      toast.error('No internet allowance data found');
      navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
    }
  }, [navigate, location.state]);

  const fetchInternetDetails = async (schoolId, employeeId) => {
    try {
      const response = await getAPI(
        `/get-internet-allowance/${schoolId}/${employeeId}?academicYear=${academicYear}`,
        { 'Content-Type': 'application/json' },
        true
      );
      const data = Array.isArray(response.data.data) ? response.data.data : [];
      const validData = data.filter((record) => record._id && typeof record._id === 'string');
      if (data.length !== validData.length) {
        console.warn('Some records have invalid or missing _id:', data);
      }
      // Sort by createdAt if available, fallback to billDate
      const sortedData = validData.sort((a, b) =>
        a.createdAt
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(b.billDate) - new Date(a.billDate)
      );
      setEmployeeInternetDetails(sortedData);
    } catch (err) {
      console.error('Error fetching internet allowance details:', err);
      toast.error(err.message || 'Failed to fetch internet allowance details');
      setEmployeeInternetDetails([]);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount || 0);
  };

  const handleNavigateToInternetDetails = (internetRecord) => {
    navigate(
      '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/internet-allowance-list/verify-internet-allowance-details',
      {
        state: {
          internetRecord,
          employeeId,
          academicYear,
        },
      }
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">Internet Allowance List</h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() =>
                      navigate(
                        '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax'
                      )
                    }
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1" />
                        </div>
                      </th>
                      <th>Employee ID</th>
                      <th>Bill No</th>
                      <th>Bill Date</th>
                      <th>Supplier Name</th>
                      <th>GST No.</th>
                      <th>Gross Amt.</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeInternetDetails.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No Internet Allowance records found
                        </td>
                      </tr>
                    ) : (
                      employeeInternetDetails.map((internet, index) => (
                        <tr key={internet._id || index}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`check-${index}`}
                              />
                              <label className="form-check-label" htmlFor={`check-${index}`} />
                            </div>
                          </td>
                          <td>{employeeId}</td>
                          <td>{internet.billNumber || 'N/A'}</td>
                          <td>{formatDate(internet.billDate)}</td>
                          <td>{internet.supplierName || 'N/A'}</td>
                          <td>{internet.gstNumber || 'N/A'}</td>
                          <td>{formatCurrency(internet.grossAmount)}</td>
                          <td>{internet.billStatus}</td>
                          <td>
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-light btn-sm"
                                onClick={() => handleNavigateToInternetDetails(internet)}
                              >
                                <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
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

export default EmployeeInternetAllowanceList;