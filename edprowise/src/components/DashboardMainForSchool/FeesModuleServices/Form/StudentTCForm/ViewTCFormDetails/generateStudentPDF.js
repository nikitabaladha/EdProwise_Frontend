import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../../PdfUtlis";

export const generateTCPDF = async (formData, student, classes, schoolId) => {
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
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

    if (formData.studentPhoto) {
      if (typeof formData.studentPhoto === "string") {
        const imageUrl = formData.studentPhoto.startsWith("http")
          ? formData.studentPhoto
          : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.studentPhoto}`;
        photoSrc = await getImageDataUrl(imageUrl);
      } else if (formData.studentPhoto instanceof Blob) {
        blobUrl = URL.createObjectURL(formData.studentPhoto);
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

    const mockFormData = {
      AdmissionNumber: formData.AdmissionNumber || "",
      firstName: capitalizeWords(formData.firstName) || "",
      middleName: capitalizeWords(formData.middleName) || "",
      lastName: capitalizeWords(formData.lastName) || "",
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.substring(0, 10) : "",
      age: formData.age || "",
      nationality: capitalizeWords(formData.nationality) || "",
      fatherName: capitalizeWords(formData.fatherName) || "",
      motherName: capitalizeWords(formData.motherName) || "",
      dateOfIssue: formData.dateOfIssue ? formData.dateOfIssue.substring(0, 10) : "",
      dateOfAdmission: formData.dateOfAdmission ? formData.dateOfAdmission.substring(0, 10) : "",
      masterDefineClass: formData.masterDefineClass
        ? capitalizeWords(classes.find((c) => c._id === formData.masterDefineClass)?.className) || ""
        : "",
      percentageObtainInLastExam: formData.percentageObtainInLastExam || "",
      qualifiedPromotionInHigherClass: capitalizeWords(formData.qualifiedPromotionInHigherClass) || "",
      whetherFaildInAnyClass: capitalizeWords(formData.whetherFaildInAnyClass) || "",
      anyOutstandingDues: capitalizeWords(formData.anyOutstandingDues) || "",
      moralBehaviour: capitalizeWords(formData.moralBehaviour) || "",
      dateOfLastAttendanceAtSchool: formData.dateOfLastAttendanceAtSchool ? formData.dateOfLastAttendanceAtSchool.substring(0, 10) : "",
      reasonForLeaving: capitalizeWords(formData.reasonForLeaving) || "",
      anyRemarks: capitalizeWords(formData.anyRemarks) || "",
      agreementChecked: formData.agreementChecked || false,
      TCfees: formData.TCfees || "0",
      concessionAmount: formData.concessionAmount || "0",
      finalAmount: formData.finalAmount || "0",
      name: capitalizeWords(formData.name) || "",
      paymentMode: capitalizeWords(formData.paymentMode) || "",
      chequeNumber: formData.chequeNumber || "",
      bankName: capitalizeWords(formData.bankName) || "",
      ApplicationReceivedOn: formData.ApplicationReceivedOn ? formData.ApplicationReceivedOn.substring(0, 10) : "",
      receiptNumber: formData.receiptNumber || "",
      certificateNumber: formData.certificateNumber || "",
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
                    <div class="pdf-value">${mockFormData.AdmissionNumber}</div>
                  </div>
                </div>
              </div>
              <div class="pdf-row">
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">First Name</label>
                    <div class="pdf-value">${mockFormData.firstName}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Middle Name</label>
                    <div class="pdf-value">${mockFormData.middleName}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Last Name</label>
                    <div class="pdf-value">${mockFormData.lastName}</div>
                  </div>
                </div>
              </div>
              <div class="pdf-row">
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Date Of Birth</label>
                    <div class="pdf-value">${mockFormData.dateOfBirth}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Age</label>
                    <div class="pdf-value">${mockFormData.age}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Nationality</label>
                    <div class="pdf-value">${mockFormData.nationality}</div>
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
                <div class="pdf-value">${mockFormData.fatherName}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Mother Name</label>
                <div class="pdf-value">${mockFormData.motherName}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Date Of Issue</label>
                <div class="pdf-value">${mockFormData.dateOfIssue}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Date Of Admission</label>
                <div class="pdf-value">${mockFormData.dateOfAdmission}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Class Last Studied</label>
                <div class="pdf-value">${mockFormData.masterDefineClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Percentage/Grade in Last Exam</label>
                <div class="pdf-value">${mockFormData.percentageObtainInLastExam}</div>
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
                <div class="pdf-value">${mockFormData.qualifiedPromotionInHigherClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Failed in Any Class</label>
                <div class="pdf-value">${mockFormData.whetherFaildInAnyClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Outstanding Dues</label>
                <div class="pdf-value">${mockFormData.anyOutstandingDues}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Moral Behaviour</label>
                <div class="pdf-value">${mockFormData.moralBehaviour}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Date of Last Attendance</label>
                <div class="pdf-value">${mockFormData.dateOfLastAttendanceAtSchool}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Reason for Leaving</label>
                <div class="pdf-value">${mockFormData.reasonForLeaving}</div>
              </div>
            </div>
          </div>
          <div class="pdf-field">
            <label class="pdf-label">Remarks</label>
            <div class="pdf-value">${mockFormData.anyRemarks}</div>
          </div>
        </div>
        <!-- Understanding and Payment -->
        <div class="pdf-section">
          <div class="pdf-section-title">Understanding and Payment</div>
          <div class="pdf-checkbox">
            <div class="pdf-checkbox-box">${mockFormData.agreementChecked ? "✓" : ""}</div>
            <span style="color: #000000; text-transform: capitalize;">
              The certificate is issued for the purpose of admission to another school.
            </span>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">TC Fees</label>
                <div class="pdf-value">₹${mockFormData.TCfees}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Concession</label>
                <div class="pdf-value">₹${mockFormData.concessionAmount}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Final Amount</label>
                <div class="pdf-value">₹${mockFormData.finalAmount}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Name of Person Filling Form</label>
                <div class="pdf-value">${mockFormData.name}</div>
              </div>
            </div>
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Payment Mode</label>
                <div class="pdf-value">${mockFormData.paymentMode}</div>
              </div>
            </div>
          </div>
          ${mockFormData.paymentMode === "Cheque" ? `
            <div class="pdf-row">
              <div class="pdf-col-6">
                <div class="pdf-field">
                  <label class="pdf-label">Cheque Number</label>
                  <div class="pdf-value">${mockFormData.chequeNumber}</div>
                </div>
              </div>
              <div class="pdf-col-6">
                <div class="pdf-field">
                  <label class="pdf-label">Bank Name</label>
                  <div class="pdf-value">${mockFormData.bankName}</div>
                </div>
              </div>
            </div>
          ` : ""}
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

    pdf.save(`Transfer_Certificate_${mockFormData.firstName}_${mockFormData.lastName}.pdf`);

    document.body.removeChild(pageContainer);
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
};