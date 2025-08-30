import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlisReportFrom";

export const generateTCPDF = async (schoolId,student,getClassNameById) => {
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getImageDataUrl = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to fetch image:", error);
      return "/path/to/placeholder-image.jpg"; 
    }
  };

  try {
    const { school, logoSrc } = await fetchSchoolData(schoolId);
    let photoSrc = "";
    let blobUrl = null;

    if (student.studentPhoto) {
      if (typeof student.studentPhoto === "string") {
        const imageUrl = student.studentPhoto.startsWith("http")
          ? student.studentPhoto
          : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${student.studentPhoto}`;
        photoSrc = await getImageDataUrl(imageUrl);
      } else if (student.studentPhoto instanceof Blob) {
        blobUrl = URL.createObjectURL(student.studentPhoto);
        photoSrc = blobUrl;
      }
    }
    if (!photoSrc) {
      photoSrc = "/path/to/placeholder-image.jpg"; 
      console.warn("Using placeholder image for student photo");
    }

    const ensureImageLoaded = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous";
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    };

    if (photoSrc) {
      await ensureImageLoaded(photoSrc);
    }

    const pageContainer = document.createElement("div");
    pageContainer.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 10mm 20mm 22mm 20mm;
      background: white;
      font-family: 'Arial', sans-serif;
      position: absolute;
      left: -9999px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1.4;
    `;

   const mockstudent = {
  AdmissionNumber: student.AdmissionNumber || "",
  firstName: capitalizeWords(student.firstName) || "",
  middleName: capitalizeWords(student.middleName) || "",
  lastName: capitalizeWords(student.lastName) || "",
  dateOfBirth: formatDate(student.dateOfBirth ? student.dateOfBirth.substring(0, 10) : ""),
  age: student.age || "",
  nationality: capitalizeWords(student.nationality) || "",
  fatherName: capitalizeWords(student.fatherName) || "",
  motherName: capitalizeWords(student.motherName) || "",
  dateOfIssue: formatDate(student.dateOfIssue ? student.dateOfIssue.substring(0, 10) : ""),
  dateOfAdmission: formatDate(student.dateOfAdmission ? student.dateOfAdmission.substring(0, 10) : ""),
  masterDefineClass: getClassNameById(student.masterDefineClass) || "",
  percentageObtainInLastExam: student.percentageObtainInLastExam || "",
  qualifiedPromotionInHigherClass: capitalizeWords(student.qualifiedPromotionInHigherClass) || "",
  whetherFaildInAnyClass: capitalizeWords(student.whetherFaildInAnyClass) || "",
  anyOutstandingDues: capitalizeWords(student.anyOutstandingDues) || "",
  moralBehaviour: capitalizeWords(student.moralBehaviour) || "",
  dateOfLastAttendanceAtSchool: formatDate(student.dateOfLastAttendanceAtSchool ? student.dateOfLastAttendanceAtSchool.substring(0, 10) : ""),
  reasonForLeaving: capitalizeWords(student.reasonForLeaving) || "",
  anyRemarks: capitalizeWords(student.anyRemarks) || "",
  agreementChecked: student.agreementChecked || false,
  TCfees: student.TCfees || "0",
  concessionType: student.concessionType || "",
  concessionAmount: student.concessionAmount || "0",
  finalAmount: student.finalAmount || "0",
  name: capitalizeWords(student.name) || "",
  paymentMode: capitalizeWords(student.paymentMode) || "",
  chequeNumber: student.chequeNumber || "",
  bankName: capitalizeWords(student.bankName) || "",
  ApplicationReceivedOn: formatDate(student.ApplicationReceivedOn ? student.ApplicationReceivedOn.substring(0, 10) : ""),
  receiptNumber: student.receiptNumber || "",
  certificateNumber: student.certificateNumber || "",
  paymentDate: formatDate(student.paymentDate || "")
};

    const createPDFContent = () => `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .pdf-container {
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.4;
          color: #000000;
        }
        .pdf-section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        .pdf-section-title {
          background: #f8fafc;
          padding: 12px 15px;
          margin-bottom: 15px;
          border-left: 4px solid #2563eb;
          font-size: 18px;
          font-weight: bold;
          color: #000000;
          text-transform: capitalize;
        }
        .pdf-row {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 15px;
          gap: 15px;
        }
        .pdf-col {
          flex: 1;
          min-width: 200px;
        }
        .pdf-col-3 {
          flex: 0 0 calc(33.333% - 10px);
          min-width: 150px;
        }
        .pdf-col-4 {
          flex: 0 0 calc(25% - 12px);
          min-width: 120px;
        }
        .pdf-col-6 {
          flex: 0 0 calc(50% - 8px);
          min-width: 200px;
        }
        .pdf-field {
          margin-bottom: 12px;
        }
        .pdf-label {
          display: block;
          font-weight: bold;
          color: #000000;
          margin-bottom: 4px;
          font-size: 13px;
          text-transform: capitalize;
        }
        .pdf-value {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          background: #f9fafb;
          border-radius: 4px;
          height: 36px;
          word-wrap: break-word;
          color: #000000;
          text-transform: capitalize;
          display: flex;
          align-items: center;
        }
        .pdf-photo {
          width: 120px;
          height: 150px;
          border: 2px solid #d1d5db;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          margin: 0 auto 15px;
        }
        .pdf-heading {
          font-size: 24px;
          font-weight: bold;
          color: #000000;
          text-align: center;
          margin-bottom: 10px;
          text-transform: capitalize;
        }
        .pdf-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }
        .pdf-checkbox-box {
          width: 16px;
          height: 16px;
          border: 2px solid #000000;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #000000;
        }
      </style>
      <div class="pdf-container">
        <div class="pdf-heading">Transfer Certificate</div>
        <!-- Student Photo and Basic Info -->
        <div class="pdf-section">
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-photo">
                ${photoSrc ? `<img src="${photoSrc}" style="width: 100%; height: 100%; object-fit: cover;" crossOrigin="anonymous" />` : '<span style="color: #000000;">No Photo</span>'}
              </div>
            </div>
            <div class="pdf-col">
              <div class="pdf-row">
                <div class="pdf-col-6">
                  <div class="pdf-field">
                    <label class="pdf-label">Admission Number</label>
                    <div class="pdf-value">${mockstudent.AdmissionNumber}</div>
                  </div>
                </div>
              </div>
              <div class="pdf-row">
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">First Name</label>
                    <div class="pdf-value">${mockstudent.firstName}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Middle Name</label>
                    <div class="pdf-value">${mockstudent.middleName}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Last Name</label>
                    <div class="pdf-value">${mockstudent.lastName}</div>
                  </div>
                </div>
              </div>
              <div class="pdf-row">
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Date Of Birth</label>
                    <div class="pdf-value">${mockstudent.dateOfBirth}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Age</label>
                    <div class="pdf-value">${mockstudent.age}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Nationality</label>
                    <div class="pdf-value">${mockstudent.nationality}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Parent and School Information -->
        <div class="pdf-section">
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Father Name</label>
                <div class="pdf-value">${mockstudent.fatherName}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Mother Name</label>
                <div class="pdf-value">${mockstudent.motherName}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Date Of Issue</label>
                <div class="pdf-value">${mockstudent.dateOfIssue}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Date Of Admission</label>
                <div class="pdf-value">${mockstudent.dateOfAdmission}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Class Last Studied</label>
                <div class="pdf-value">${mockstudent.masterDefineClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Percentage/Grade in Last Exam</label>
                <div class="pdf-value">${mockstudent.percentageObtainInLastExam}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Academic and Behavioral Information -->
        <div class="pdf-section">
          <div class="pdf-section-title">Academic and Behavioral Information</div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Qualified for Higher Class</label>
                <div class="pdf-value">${mockstudent.qualifiedPromotionInHigherClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Failed in Any Class</label>
                <div class="pdf-value">${mockstudent.whetherFaildInAnyClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Outstanding Dues</label>
                <div class="pdf-value">${mockstudent.anyOutstandingDues}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Moral Behaviour</label>
                <div class="pdf-value">${mockstudent.moralBehaviour}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Date of Last Attendance</label>
                <div class="pdf-value">${mockstudent.dateOfLastAttendanceAtSchool}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Reason for Leaving</label>
                <div class="pdf-value">${mockstudent.reasonForLeaving}</div>
              </div>
            </div>
          </div>
          <div class="pdf-field">
            <label class="pdf-label">Remarks</label>
            <div class="pdf-value">${mockstudent.anyRemarks}</div>
          </div>
        </div>
        <!-- Understanding and Payment -->
        <div class="pdf-section">
          <div class="pdf-section-title">Understanding and Payment</div>
          <div class="pdf-checkbox">
            <div class="pdf-checkbox-box">${mockstudent.agreementChecked ? "✓" : ""}</div>
            <span style="color: #000000; text-transform: capitalize;">
              The certificate is issued for the purpose of admission to another school.
            </span>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">TC Fees</label>
                <div class="pdf-value">₹${mockstudent.TCfees}</div>
              </div>
            </div>
               <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Concession Type</label>
                <div class="pdf-value">${mockstudent.concessionType}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Concession</label>
                <div class="pdf-value">₹${mockstudent.concessionAmount}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Final Amount</label>
                <div class="pdf-value">₹${mockstudent.finalAmount}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Name of Person Filling Form</label>
                <div class="pdf-value">${mockstudent.name}</div>
              </div>
            </div>
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Payment Mode</label>
                <div class="pdf-value">${mockstudent.paymentMode}</div>
              </div>
            </div>
          </div>
          ${mockstudent.paymentMode === "Cheque" ? `
            <div class="pdf-row">
              <div class="pdf-col-6">
                <div class="pdf-field">
                  <label class="pdf-label">Cheque Number</label>
                  <div class="pdf-value">${mockstudent.chequeNumber}</div>
                </div>
              </div>
              <div class="pdf-col-6">
                <div class="pdf-field">
                  <label class="pdf-label">Bank Name</label>
                  <div class="pdf-value">${mockstudent.bankName}</div>
                </div>
              </div>
            </div>
          ` : ""}
        </div>
         <!-- For Official Use Only -->
        <div class="pdf-section">
          <div class="pdf-section-title">For Official Use Only</div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Application Received On</label>
                <div class="pdf-value">${mockstudent.paymentDate}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Receipt No.</label>
                <div class="pdf-value">${mockstudent.receiptNumber}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Registration No.</label>
                <div class="pdf-value">${mockstudent.AdmissionNumber}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Payment Mode</label>
                <div class="pdf-value">${mockstudent.paymentMode}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Payment Date</label>
                <div class="pdf-value">${mockstudent.paymentDate}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Transaction/Cheque No.</label>
                <div class="pdf-value">${mockstudent.chequeNumber ||mockstudent.transactionNumber || ""}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    pageContainer.innerHTML = generateHeader(school, logoSrc) + createPDFContent() + generateFooter(school);
    document.body.appendChild(pageContainer);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(pageContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 794,
      windowHeight: 1123,
    });

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, canvasHeight);

    pdf.save(`Transfer_Certificate_${mockstudent.firstName}_${mockstudent.lastName}.pdf`);

    document.body.removeChild(pageContainer);
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
};