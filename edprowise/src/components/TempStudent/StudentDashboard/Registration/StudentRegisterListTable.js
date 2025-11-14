import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import getAPI from "../../../../api/getAPI"
import { toast } from "react-toastify"
import PaymentModal from "./PaymentModal"
import { generatePDF } from "./generateStudentPDF"

const StudentRegisterCardView = () => {
  const navigate = useNavigate()
  const [schoolId, setSchoolId] = useState(null)
  const [studentData, setStudentData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [classList, setClassList] = useState([])
  const [shifts, setShifts] = useState([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const academicYear = userDetails?.academicYear;
  const registrationFormId=userDetails?.registrationFormId

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"))
    const id = userDetails?.schoolId
    

    if (!id) {
      toast.error("School ID not found. Please log in again.")
      return
    }

    setSchoolId(id)
  }, [])

  useEffect(() => {
    if (!schoolId || !academicYear || !registrationFormId) return

    const fetchStudents = async () => {
      try {
        const response = await getAPI(`/get-registartion-form-byid/${schoolId}/${academicYear}/${registrationFormId}`)
        const classRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true)
        if (!classRes.hasError) {
          setClassList(classRes.data.data)
        }
        const shiftResponse = await getAPI(`/master-define-shift/${schoolId}`)
        if (!shiftResponse.hasError) {
          const shiftArray = Array.isArray(shiftResponse.data?.data) ? shiftResponse.data.data : []
          setShifts(shiftArray)
        }

        if (!response.hasError) {
          const receiptMap = new Map()
          response.data.receiptData?.forEach((item) => {
            const refundReceipts = item.refundreceiptNumbers?.flat().filter((num) => num && num !== "") || []
            receiptMap.set(item._id, {
              receiptNumbers: item.receiptNumbers || [],
              refundReceiptNumbers: refundReceipts,
              reportStatus: item.reportStatus || [[]],
            })
          })

          const studentArrayWithReceipts = Array.isArray(response.data.students)
            ? response.data.students
              .map((student) => ({
                ...student,
                allReceiptNumbers:
                  receiptMap.get(student._id)?.receiptNumbers || [student.receiptNumber || ""].filter(Boolean),
                refundReceiptNumbers:
                  receiptMap.get(student._id)?.refundReceiptNumbers || student.refundReceiptNumbers || [],
                reportStatus: receiptMap.get(student._id)?.reportStatus || student.reportStatus || [[]],
              }))
              .sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate))
            : []

          setStudentData(studentArrayWithReceipts)
          setCurrentIndex(0)
        } else {
          toast.error(response.message || "Failed to fetch student list.")
        }
      } catch (err) {
        toast.error("Error fetching student data.")
        console.error("Student Fetch Error:", err)
      }
    }

    fetchStudents()
  }, [schoolId, academicYear])

  const getClassNameById = (id) => {
    const found = classList.find((cls) => cls._id === id)
    return found ? found.className : "N/A"
  }

  const getShiftName = (shiftId) => {
    const shift = shifts.find((s) => s._id === shiftId)
    return shift ? shift.masterDefineShiftName : "N/A"
  }

  const getLatestStatus = (reportStatus) => {
    if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
      return "Pending"
    }
    const flatStatus = reportStatus.flat()
    return flatStatus[flatStatus.length - 1] || "Pending"
  }

  const shouldShowPaymentButton = (reportStatus) => {
    if (!reportStatus || !Array.isArray(reportStatus) || reportStatus.length === 0) {
      return true
    }
    const flatStatus = reportStatus.flat()
    const latestStatus = flatStatus[flatStatus.length - 1]
    return ["Cancelled", "Cheque Return", "Refund"].includes(latestStatus)
  }

  const handleDownloadPDF = async (student) => {
    try {
      await generatePDF(schoolId, student, getClassNameById, getShiftName)
    } catch (error) {
      toast.error("Failed to generate PDF.")
    }
  }

  const navigateToUpdateRegisterStudentInfo = (event, student) => {
    event.preventDefault()
    navigate(`/student-dashboard/registration/update`, { state: { student } })
  }

   const navigateToViewRegisterStudentInfo = (event, student) => {
    event.preventDefault()
    navigate(`/student-dashboard/registration/view`, { state: { student } })
  }

  const openPaymentModal = () => {
    setShowPaymentModal(true)
  }

  const filteredStudents = studentData.filter((student) => {
    return (
      (student.registrationNumber || "").toLowerCase() ||
      `${student.firstName} ${student.lastName}` ||
      (student.parentContactNumber || "").toLowerCase()
    )
  })

  const currentStudent = filteredStudents[currentIndex]

  const handlePaymentSuccess = async () => {
    try {
      const response = await getAPI(`/get-registartion-form-byid/${schoolId}/${academicYear}/${registrationFormId}`)
      if (!response.hasError) {
        const studentArray = Array.isArray(response.data.students) ? response.data.students : []
        setStudentData(
          studentArray.sort((a, b) => new Date(b.createdAt || b.paymentDate) - new Date(a.createdAt || a.paymentDate)),
        )
      }
    } catch (err) {
      toast.error("Error refreshing student data.")
    }
  }

  return (
    <>
        <div style={{ backgroundColor: "#d9d9d9" }}>
      <div className="container-fluid py-4">
        {currentStudent ? (
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="card shadow-lg" style={{ borderTop: "4px solid #a8fffe" }}>
                <div className="card-body">
                  <div className="text-center mb-3 border-bottom">
                    <h2 className="fw-bold mt-1">Student Registration Details</h2>
                  </div>

                  <div className="d-flex justify-content-between align-items-start mb-4 pb-3 border-bottom">
                    <div>
                      <h3 className="mb-1 fw-bold">
                        {currentStudent.firstName} {currentStudent.lastName}
                      </h3>
                      <p className="text-muted mb-0">Reg. No: {currentStudent.registrationNumber}</p>
                    </div>
                    <span
                      className={`badge ${getLatestStatus(currentStudent.reportStatus) === "Paid" ? "bg-success" : "bg-danger"
                        }`}
                      style={{ fontSize: "0.9rem", padding: "0.5rem 1rem" }}
                    >
                      {getLatestStatus(currentStudent.reportStatus)}
                    </span>
                  </div>
                  {getLatestStatus(currentStudent.reportStatus) !== "Paid" && (
                    <div className="text-center mb-3">
                      <p className="fw-bold text-danger mb-0">
                        ⚠️ Registration not approved until payment is completed.
                      </p>
                    </div>
                  )}

                  <div className="row  mb-0">
                    <div className="col-md-6">
                      <div className="info-box mb-0">
                        <label className="text-muted small">Gender</label>
                        <p className="fw-semibold">{currentStudent.gender}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <label className="text-muted small">Date of Birth</label>
                        <p className="fw-semibold">
                          {currentStudent.dateOfBirth
                            ? new Date(currentStudent.dateOfBirth).toLocaleDateString("en-GB")
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <label className="text-muted small">Class</label>
                        <p className="fw-semibold">{getClassNameById(currentStudent.masterDefineClass)}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <label className="text-muted small">Shift</label>
                        <p className="fw-semibold">{getShiftName(currentStudent.masterDefineShift)}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <label className="text-muted small">Contact Number</label>
                        <p className="fw-semibold">{currentStudent.parentContactNumber}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <label className="text-muted small">Nationality</label>
                        <p className="fw-semibold">{currentStudent.nationality || "-"}</p>
                      </div>
                    </div>
                  </div>

                  { }
                  <div className="bg-light p-3 rounded mb-1">
                    <h6 className="fw-bold mb-3">Parent Information</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="text-muted small">Father Name</label>
                        <p className="fw-semibold">{currentStudent.fatherName || "-"}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Father Contact</label>
                        <p className="fw-semibold">{currentStudent.fatherContactNo || "-"}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Mother Name</label>
                        <p className="fw-semibold">{currentStudent.motherName || "-"}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Mother Contact</label>
                        <p className="fw-semibold">{currentStudent.motherContactNo || "-"}</p>
                      </div>
                    </div>
                  </div>

                  { }
                  <div className="bg-light p-3 rounded mb-1">
                    <h4 className="fw-bold mb-3">Address</h4>
                    <p className="mb-2">
                      <span className="text-muted">Current Address:</span> {currentStudent.currentAddress || "-"}
                    </p>
                    <p className="mb-2">
                      <span className="text-muted">City:</span> {currentStudent.city || "-"}
                    </p>
                    <p className="mb-2">
                      <span className="text-muted">State:</span> {currentStudent.state || "-"}
                    </p>
                    <p>
                      <span className="text-muted">Pincode:</span> {currentStudent.pincode || "-"}
                    </p>
                  </div>

                  { }
                  <div className="bg-light p-3 rounded mb-2">
                    <h5 className="fw-bold mb-3">Payment Details</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="text-muted small">Registration Fee</label>
                        <p className="fw-semibold">₹ {currentStudent.registrationFee || "0"}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Paid Amount</label>
                        <p className="fw-semibold">₹ {currentStudent.finalAmount || "0"}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Payment Mode</label>
                        <p className="fw-semibold">{currentStudent.paymentMode || "-"}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small">Payment Date</label>
                        <p className="fw-semibold">
                          {currentStudent.paymentDate
                            ? new Date(currentStudent.paymentDate).toLocaleDateString("en-GB")
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  { }
                  <div className="d-flex gap-2 flex-wrap">
                 {shouldShowPaymentButton(currentStudent.reportStatus) ? (
  <button
    className="btn btn-primary flex-grow-1"
    onClick={(e) => navigateToUpdateRegisterStudentInfo(e, currentStudent)}
  >
    <i className="ri-edit-line me-2"></i> Edit
  </button>
) : (
  <button
    className="btn btn-primary flex-grow-1"
    onClick={(e) => navigateToViewRegisterStudentInfo(e, currentStudent)}
  >
    <i className="ri-eye-line me-2"></i> View
  </button>
)}


                    {shouldShowPaymentButton(currentStudent.reportStatus) && (
                      <button className="btn btn-warning flex-grow-1" onClick={openPaymentModal}>
                        <i className="ri-wallet-2-line me-2"></i> Payment
                      </button>
                    )}

                    <button
                      className="btn btn-success flex-grow-1"
                      onClick={() => handleDownloadPDF(currentStudent)}
                    >
                      <i className="ri-download-2-line me-2"></i> Download Student PDF
                    </button>

                    {currentStudent.allReceiptNumbers?.length > 0 && (
                      <div className="dropdown flex-grow-1">
                        <button className="btn btn-info w-100" type="button" data-bs-toggle="dropdown">
                          <i className="ri-file-list-line me-2"></i> Receipts
                        </button>
                        <ul className="dropdown-menu w-100">
                          {currentStudent.allReceiptNumbers.map((receipt, idx) => (
                            <li key={idx}>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault()
                                  navigate(`/student-dashboard/registration/receipts`, {
                                    state: {
                                      receiptNumber: receipt,
                                      schoolId,
                                      studentId: currentStudent._id,
                                      className: getClassNameById(currentStudent.masterDefineClass),
                                    },
                                  })
                                }}
                              >
                                Receipt {receipt}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="alert alert-info text-center" role="alert">
            No students found. 
          </div>
        )}
      </div>
      </div>

      {showPaymentModal && currentStudent && (
        <PaymentModal
          show={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          studentId={currentStudent._id}
          schoolId={schoolId}
          classId={currentStudent.masterDefineClass}
          firstName={currentStudent.firstName || "N/A"}
          lastName={currentStudent.lastName || "N/A"}
          className={getClassNameById(currentStudent.masterDefineClass)}
          parentContactNumber={currentStudent.parentContactNumber || ""}
          academicYear={academicYear}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  )
}

export default StudentRegisterCardView