import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import getAPI from '../../../../../../api/getAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import putAPI from '../../../../../../api/putAPI';

const UpdateTCForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state?.student;
  const [classes, setClasses] = useState([]);
  const [schoolId, setSchoolId] = useState('');

  const [formData, setFormData] = useState({
    AdmissionNumber: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    nationality: '',
    fatherName: '',
    motherName: '',
    dateOfIssue: '',
    dateOfAdmission: '',
    masterDefineClass: '',
    percentageObtainInLastExam: '',
    qualifiedPromotionInHigherClass: '',
    whetherFaildInAnyClass: '',
    anyOutstandingDues: '',
    moralBehaviour: '',
    dateOfLastAttendanceAtSchool: '',
    reasonForLeaving: '',
    anyRemarks: '',
    agreementChecked: false,
    name: '',
    paymentMode: '',
    chequeNumber: '',
    bankName: ''
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error('School ID not found. Please log in again.');
      return;
    }

    setSchoolId(id);
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!schoolId) return;
        const response = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        setClasses(response?.data?.data || []);
      } catch (error) {
        toast.error('Error fetching class and section data.');
      }
    };

    fetchData();
  }, [schoolId]);

  useEffect(() => {
    if (student) {
      setFormData({
        AdmissionNumber: student.AdmissionNumber || '',
        firstName: student.firstName || '',
        middleName: student.middleName || '',
        lastName: student.lastName || '',
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        age: student.age || '',
        nationality: student.nationality || '',
        fatherName: student.fatherName || '',
        motherName: student.motherName || '',
        dateOfIssue: student.dateOfIssue ? student.dateOfIssue.split('T')[0] : '',
        dateOfAdmission: student.dateOfAdmission ? student.dateOfAdmission.split('T')[0] : '',
        masterDefineClass: student.masterDefineClass || '',
        percentageObtainInLastExam: student.percentageObtainInLastExam || '',
        qualifiedPromotionInHigherClass: student.qualifiedPromotionInHigherClass || '',
        whetherFaildInAnyClass: student.whetherFaildInAnyClass || '',
        anyOutstandingDues: student.anyOutstandingDues || '',
        moralBehaviour: student.moralBehaviour || '',
        dateOfLastAttendanceAtSchool: student.dateOfLastAttendanceAtSchool ? student.dateOfLastAttendanceAtSchool.split('T')[0] : '',
        agreementChecked: student.agreementChecked || '',
        reasonForLeaving: student.reasonForLeaving || '',
        anyRemarks: student.anyRemarks || '',
        name: student.name || '',
        paymentMode: student.paymentMode || '',
        ApplicationReceivedOn: student.ApplicationReceivedOn ? student.ApplicationReceivedOn.split('T')[0] : '',
        transactionNumber: student.transactionNumber || '',
        receiptNumber: student.receiptNumber || '',
        certificateNumber: student.certificateNumber || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreementChecked) {
      toast.error("You must agree to the certificate purpose statement");
      return;
    }

    const payload = {
      ...formData,
      schoolId,
    };

    try {
      const response = await putAPI(`/update-TC-form/${student._id}`, payload);

      if (!response.hasError) {
        toast.success("Transfer Certificate update and submitted successfully!");
        navigate(-1);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      const backendMessage = error?.response?.data?.message;

      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error('An error occurred during registration');
      }
    }
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Transfer Certificate Form
                  </h4>
                </div>
              </div>
              <form onSubmit={""}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="AdmissionNumber" className="form-label">
                        Admission No
                      </label>
                      <input
                        type="text"
                        id="AdmissionNumber"
                        name="AdmissionNumber"
                        className="form-control"
                        value={formData.AdmissionNumber}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="middleName" className="form-label">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        id="middleName"
                        name="middleName"
                        className="form-control"
                        value={formData.middleName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>


                  <div className="col-md-2">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfBirth"
                        className="form-label"
                      >
                        Date Of Birth<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        className="form-control"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Age<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-2">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="nationality" className="form-label">
                        Nationality<span className="text-danger">*</span>
                      </label>
                      <select
                        id="nationality"
                        name="nationality"
                        className="form-control"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Nationality</option>
                        <option value="India">India</option>
                        <option value="International">
                          International
                        </option>
                        <option value="SAARC Countries">
                          SAARC Countries
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="fatherName" className="form-label">
                        Father Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        className="form-control"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="motherName" className="form-label">
                        Mother Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        className="form-control"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfIssue"
                        className="form-label"
                      >
                        Date Of Issue<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfIssue"
                        name="dateOfIssue"
                        className="form-control"
                        value={formData.dateOfIssue}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfAdmission"
                        className="form-label"
                      >
                        Date Of Admission In School<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfAdmission"
                        name="dateOfAdmission"
                        className="form-control"
                        value={formData.dateOfAdmission}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="studentLastClass" className="form-label">
                        Class in Which Student Studied Last<span className="text-danger">*</span>
                      </label>
                      <select
                        id="masterDefineClass"
                        name="masterDefineClass"
                        className="form-control"
                        value={formData.masterDefineClass}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Class</option>
                        {classes.map((classItem) => (
                          <option key={classItem._id} value={classItem._id}>
                            {classItem.className}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-3">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="percentageObtainInLastExam" className="form-label">
                        Percentage/Gradem Obtain In Last Exam<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="percentageObtainInLastExam"
                        name="percentageObtainInLastExam"
                        className="form-control"
                        value={formData.percentageObtainInLastExam}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="qualifiedPromotionInHigherClass" className="form-label">
                        Whether Qualified For Promotion In Higher Class<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="qualifiedPromotionInHigherClass"
                        name="qualifiedPromotionInHigherClass"
                        className="form-control"
                        value={formData.qualifiedPromotionInHigherClass}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="whetherFaildInAnyClass" className="form-label">
                        Whether Failed In Any Class<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="whetherFaildInAnyClass"
                        name="whetherFaildInAnyClass"
                        className="form-control"
                        value={formData.whetherFaildInAnyClass}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="anyOutstandingDues" className="form-label">
                        Any Outstanding Dues<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="anyOutstandingDues"
                        name="anyOutstandingDues"
                        className="form-control"
                        value={formData.anyOutstandingDues}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="moralBehaviour" className="form-label">
                        Moral Behaviour<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="moralBehaviour"
                        name="moralBehaviour"
                        className="form-control"
                        value={formData.moralBehaviour}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfLastAttendanceAtSchool"
                        className="form-label"
                      >
                        Date Of Last Attendance At School<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfLastAttendanceAtSchool"
                        name="dateOfLastAttendanceAtSchool"
                        className="form-control"
                        value={formData.dateOfLastAttendanceAtSchool}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-7">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="reasonForLeaving" className="form-label">
                        Reason For Leaving
                      </label>
                      <input
                        type="text"
                        id="reasonForLeaving"
                        name="reasonForLeaving"
                        className="form-control"
                        value={formData.reasonForLeaving}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="anyRemarks" className="form-label">
                        Any Other Remarks
                      </label>
                      <input
                        type="text"
                        id="anyRemarks"
                        name="anyRemarks"
                        className="form-control"
                        value={formData.anyRemarks}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Understanding
                    </h4>
                  </div>
                  <div className="form-check ms-1 mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreementCheck"
                      name="agreementChecked"
                      checked={formData.agreementChecked}
                      onChange={handleChange}

                    />
                    <label
                      className="form-check-label"
                      htmlFor="agreementCheck"
                    >
                      The certificate is issued for the purpose of admission to another School.
                    </label>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="paymentMode" className="form-label">
                        Payment Option <span className="text-danger">*</span>
                      </label>
                      <select
                        id="paymentMode"
                        name="paymentMode"
                        className="form-control"
                        value={formData.paymentMode}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                  </div>
                </div>

                {formData.paymentMode === 'Cheque' && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="chequeNumber" className="form-label">
                          Cheque Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="chequeNumber"
                          name="chequeNumber"
                          className="form-control"
                          value={formData.chequeNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="bankName" className="form-label">
                          Bank Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="bankName"
                          name="bankName"
                          className="form-control"
                          value={formData.bankName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    For Official Use Only
                  </h4>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="dateOfApplicationReceived"
                        className="form-label"
                      >
                        Application Received On
                      </label>
                      <input
                        type="date"
                        id="dateOfApplicationReceived"
                        name="dateOfApplicationReceived"
                        className="form-control"
                        value={formData.ApplicationReceivedOn}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label htmlFor="feesReceivedBy" className="form-label">
                        Payment Mode
                      </label>
                      <input
                        type="text"
                        id="feesReceivedBy"
                        name="feesReceivedBy"
                        className="form-control"
                        required
                        value={formData.paymentMode}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="transationOrChequetNumber" className="form-label">
                        Transaction No
                      </label>
                      <input
                        type="text"
                        id="transationOrChequetNumber"
                        name="transationOrChequetNumber"
                        className="form-control"
                        value={formData.transactionNumber}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="receiptNumber" className="form-label">
                        Receipts No.
                      </label>
                      <input
                        type="text"
                        id="receiptNumber"
                        name="receiptNumber"
                        className="form-control"
                        value={formData.receiptNumber}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="certificateNumber" className="form-label">
                        Certificate No.
                      </label>
                      <input
                        type="text"
                        id="certificateNumber"
                        name="certificateNumber"
                        className="form-control"
                        value={formData.certificateNumber}
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>
                </div>


                <div className="d-flex justify-content-end">
                  <div className="mr-2">
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleSubmit}
                    >
                      Update & Submit For Principal Approval
                    </button>
                  </div>
                  <div className="text" style={{ marginLeft: "2px" }}
                  >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UpdateTCForm;
