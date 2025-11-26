import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import putAPI from '../../../../../api/putAPI';

const VerifySupportingSubmittedForTaxList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [declaration, setDeclaration] = useState(null);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);

    if (location.state?.declaration) {
      setDeclaration(location.state.declaration);
    } else {
      toast.error('No declaration data found');
      navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
    }
  }, [navigate, location.state]);

  const handleYearChange = (e) => {
    setAcademicYear(e.target.value);
  };

  const handleRemarkChange = (section, index, value) => {
    setDeclaration((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: prev[section].items.map((item, i) =>
          i === index ? { ...item, adminRemarks: value } : item
        ),
      },
    }));
  };

  const handleStatusChange = async (section, index, status) => {
    try {
      setIsSubmitting(true);
      const updatedItems = declaration[section].items.map((item, i) =>
        i === index ? { ...item, status } : item
      );

      const response = await putAPI(
        `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
        {
          academicYear,
          [section]: {
            ...declaration[section],
            items: updatedItems,
          },
        },
        { 'Content-Type': 'application/json' },
        true
      );

      if (!response.hasError) {
        setDeclaration((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            items: updatedItems,
          },
        }));
        toast.success(`${section} status updated to ${status}`);
      } else {
        toast.error(response.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDocumentPreview = (documentPath) => {
    if (documentPath) {
      const formattedPath = documentPath.startsWith('http')
        ? documentPath
        : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/${documentPath}`;
      setPreviewDocument(formattedPath);
    } else {
      toast.error('No document available for preview');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await putAPI(
        `/it-declaration/update/${schoolId}/${declaration.employeeId}`,
        {
          academicYear,
          section80C: declaration.section80C,
          section80D: declaration.section80D,
          otherSections: declaration.otherSections,
          hraExemption: declaration.hraExemption,
          status: 'Verification Done',
        },
        { 'Content-Type': 'application/json' },
        true
      );

      if (!response.hasError) {
        toast.success('IT Declaration verified successfully');
        navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted');
      } else {
        toast.error(response.message || 'Failed to verify declaration');
      }
    } catch (error) {
      toast.error('Error verifying declaration: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount || 0);
  };

  const getFileName = (documentPath) => {
    if (documentPath) {
      const fullName = documentPath.split('\\').pop().split('/').pop() || 'Document';
      return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
    }
    return 'No file';
  };

  const handleNavigateToLtaDetails = () => {
    navigate(
      '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/lta-list',
      {
        state: {
          ltaExemption: declaration.otherExemption?.ltaExemption,
          employeeId: declaration.employeeId,
          academicYear,
        },
      }
    );
  };

  const handleNavigateToTelephoneDetails = () => {
    navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/telephone-allowance-list');
  };

  const handleNavigateToInternetDetails = () => {
    navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/internet-allowance-list');
  };

  if (!declaration) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Supporting Submitted for Tax
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() =>
                      navigate('/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted')
                    }
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row m-0 mb-2 pt-2 salary-slip-box">
                  <div className="col-md-8">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee Name: </strong>{declaration.employeeName || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Employee ID: </strong>{declaration.employeeId || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>Tax Regime: </strong>{declaration.taxRegime === 'new' ? 'New' : 'Old'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark payroll-box-text">
                      <strong>PAN No: </strong>{declaration.panNumber || 'N/A'}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p className="text-dark">
                      <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">
                        Financial Year:
                      </label>
                      <select
                        id="yearSelect"
                        className="custom-select"
                        aria-label="Select Year"
                        style={{ marginLeft: '5px' }}
                        value={academicYear}
                        onChange={handleYearChange}
                      >
                        <option value="2025-26">2025-26</option>
                        <option value="2026-27">2026-27</option>
                        <option value="2027-28">2027-28</option>
                        <option value="2028-29">2028-29</option>
                        <option value="2029-30">2029-30</option>
                      </select>
                    </p>
                  </div>
                </div>

                <div className="table-responsive mb-4">
                  <table className="table text-dark border border-dark mb-4">
                    <thead>
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark p-2">Investment</th>
                        <th className="text-center align-content-center border border-dark p-2">Limit</th>
                        <th className="text-center align-content-center border border-dark p-2">Proof Submitted</th>
                        <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: '100px' }}>
                          Final Ded.
                        </th>
                        <th className="text-center align-content-center border border-dark p-2">Document</th>
                        <th className="text-center align-content-center border border-dark p-2">Action</th>
                        <th className="text-center align-content-center border border-dark p-2">Admin Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.section80C.sectionLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(
                            declaration.section80C.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
                          )}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.section80C.finalDeduction)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      {declaration.section80C.items.map((item, index) => (
                        <tr key={`80C-${index}`} className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                          <td className="text-end align-content-center border border-dark p-2"></td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.proofSubmitted)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.finalDeduction || 0)}
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(item.proofDocument)}
                              disabled={!item.proofDocument}
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <div className="mt-2">
                              <small>{getFileName(item.proofDocument)}</small>
                            </div>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleStatusChange('section80C', index, 'Approved')}
                                disabled={item.status === 'Approved' || isSubmitting}
                              >
                                Accept
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => handleStatusChange('section80C', index, 'Rejected')}
                                disabled={item.status === 'Rejected' || isSubmitting}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={item.adminRemarks || ''}
                              onChange={(e) => handleRemarkChange('section80C', index, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(
                            declaration.section80D.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
                          )}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.section80D.finalDeduction)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      {declaration.section80D.items.map((item, index) => (
                        <tr key={`80D-${index}`} className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.categoryLimit)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.proofSubmitted)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.categoryFinalDeduction || 0)}
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(item.proofDocument)}
                              disabled={!item.proofDocument}
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <div className="mt-2">
                              <small>{getFileName(item.proofDocument)}</small>
                            </div>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleStatusChange('section80D', index, 'Approved')}
                                disabled={item.status === 'Approved' || isSubmitting}
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleStatusChange('section80D', index, 'Rejected')}
                                disabled={item.status === 'Rejected' || isSubmitting}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={item.adminRemarks || ''}
                              onChange={(e) => handleRemarkChange('section80D', index, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(
                            declaration.otherSections.items.reduce((sum, item) => sum + (item.proofSubmitted || 0), 0)
                          )}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.otherSections.finalDeduction)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      {declaration.otherSections.items.map((item, index) => (
                        <tr key={`other-${index}`} className="payroll-table-body">
                          <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.categoryLimit)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.proofSubmitted)}
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            {formatCurrency(item.categoryFinalDeduction || 0)}
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() => handleDocumentPreview(item.proofDocument)}
                              disabled={!item.proofDocument}
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <div className="mt-2">
                              <small>{getFileName(item.proofDocument)}</small>
                            </div>
                          </td>
                          <td className="text-center align-content-center border border-dark p-2">
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={() => handleStatusChange('otherSections', index, 'Approved')}
                                disabled={item.status === 'Approved' || isSubmitting}
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleStatusChange('otherSections', index, 'Rejected')}
                                disabled={item.status === 'Rejected' || isSubmitting}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                          <td className="text-end align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={item.adminRemarks || ''}
                              onChange={(e) => handleRemarkChange('otherSections', index, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.hraExemption.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          {formatCurrency(declaration.hraExemption.finalDeduction || 0)}
                        </td>
                        <td className="text-center align-content-center border border-dark fw-bold p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() =>
                              navigate(
                                '/school-dashboard/payroll-module/employer/income-tax/supporting-tax-submitted/verify-supporting-submitted-for-Tax/verify-rent-details',
                                {
                                  state: {
                                    rentDetailsId: declaration.hraExemption.rentDetailsId,
                                    rentDetails: declaration.hraExemption.rentDetails,
                                    employeeId: declaration.employeeId,
                                    academicYear,
                                  },
                                }
                              )
                            }
                            style={{
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            Rent Details
                          </button>
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          {declaration.hraExemption.status || 'Pending'}
                        </td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.hraExemption.adminRemarks || ''}
                            onChange={(e) =>
                              setDeclaration((prev) => ({
                                ...prev,
                                hraExemption: { ...prev.hraExemption, adminRemarks: e.target.value },
                              }))
                            }
                          />
                        </td>
                      </tr>
                      <tr className="it-declaration-section-bg payroll-box-text fw-bold">
                        <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                        <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center border border-dark px-3 py-2">LTA Exemption</td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.ltaExemption?.categoryLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.ltaExemption?.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.ltaExemption?.categoryFinalDeduction)}
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={handleNavigateToLtaDetails}
                            style={{
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            LTA Details
                          </button>
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          {declaration.otherExemption?.ltaExemption?.status}
                        </td>
                        <td className="text-start align-content-center border border-dark p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.otherExemption?.ltaExemption?.adminRemarks || ''}
                            onChange={(e) =>
                              setDeclaration((prev) => ({
                                ...prev,
                                otherExemption: {
                                  ...prev.otherExemption,
                                  ltaExemption: {
                                    ...prev.otherExemption.ltaExemption,
                                    adminRemarks: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.telephoneAllowance?.categoryLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.telephoneAllowance?.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.telephoneAllowance?.categoryFinalDeduction)}
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={handleNavigateToTelephoneDetails}
                            style={{
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            Telephone Details
                          </button>
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          {declaration.otherExemption?.telephoneAllowance?.status}
                        </td>
                        <td className="text-start align-content-center border border-dark p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.otherExemption?.telephoneAllowance?.adminRemarks || ''}
                            onChange={(e) =>
                              setDeclaration((prev) => ({
                                ...prev,
                                otherExemption: {
                                  ...prev.otherExemption,
                                  telephoneAllowance: {
                                    ...prev.otherExemption.telephoneAllowance,
                                    adminRemarks: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </td>
                      </tr>
                      <tr className="payroll-table-body">
                        <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.internetAllowance?.categoryLimit)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.internetAllowance?.proofSubmitted)}
                        </td>
                        <td className="text-end align-content-center border border-dark p-2">
                          {formatCurrency(declaration.otherExemption?.internetAllowance?.categoryFinalDeduction)}
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={handleNavigateToInternetDetails}
                            style={{
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                            }}
                          >
                            Internet Details
                          </button>
                        </td>
                        <td className="text-center align-content-center border border-dark p-2">
                          {declaration.otherExemption?.internetAllowance?.status}
                        </td>
                        <td className="text-start align-content-center border border-dark p-2">
                          <input
                            type="text"
                            className="form-control payroll-table-body payroll-input-border text-end"
                            value={declaration.otherExemption?.internetAllowance?.adminRemarks || ''}
                            onChange={(e) =>
                              setDeclaration((prev) => ({
                                ...prev,
                                otherExemption: {
                                  ...prev.otherExemption,
                                  internetAllowance: {
                                    ...prev.otherExemption.internetAllowance,
                                    adminRemarks: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary custom-submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Verifying...' : 'Verified'}
                  </button>
                </div>
              </form>

              {previewDocument && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Document Preview</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setPreviewDocument(null)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        {previewDocument.endsWith('.pdf') ? (
                          <iframe
                            src={`${previewDocument}#toolbar=0`}
                            style={{ width: '100%', height: '500px', border: 'none' }}
                            title="Document Preview"
                          ></iframe>
                        ) : (
                          <img
                            src={previewDocument}
                            alt="Document"
                            style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '10px' }}
                            onError={() => {
                              toast.error('Failed to load document');
                              setPreviewDocument(null);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default VerifySupportingSubmittedForTaxList;