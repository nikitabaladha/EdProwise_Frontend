import { fetchSchoolData, generateHeader, generateFooter } from "../../../PdfUtlis";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (formData, student, classes, shifts, sections, schoolId) => {

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };


  const mockFormData = {
    registrationNumber: formData.registrationNumber || "", 
    firstName: capitalizeWords(formData.firstName) || "",
    middleName: capitalizeWords(formData.middleName) || "",
    lastName: capitalizeWords(formData.lastName) || "",
    dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.substring(0, 10) : "",
    age: formData.age || "",
    nationality: capitalizeWords(formData.nationality) || "",
    gender: capitalizeWords(formData.gender) || "",
    bloodGroup: capitalizeWords(formData.bloodGroup) || "",
    parentContactNumber: formData.parentContactNumber || "",
    motherTongue: capitalizeWords(formData.motherTongue) || "",
    masterDefineClass: formData.masterDefineClass
      ? capitalizeWords(classes.find((c) => c._id === formData.masterDefineClass)?.className) || ""
      : "",
    masterDefineShift: formData.masterDefineShift
      ? capitalizeWords(shifts.find((s) => s._id === formData.masterDefineShift)?.masterDefineShiftName) || ""
      : "",
    section: formData.section
      ? capitalizeWords(sections.find((s) => s._id === formData.section)?.name) || ""
      : "",
    currentAddress: capitalizeWords(formData.currentAddress) || "",
    country: capitalizeWords(formData.country) || "",
    state: capitalizeWords(formData.state) || "",
    city: capitalizeWords(formData.city) || "",
    pincode: formData.pincode || "",
    previousSchoolName: capitalizeWords(formData.previousSchoolName) || "",
    addressOfPreviousSchool: capitalizeWords(formData.addressOfPreviousSchool) || "",
    previousSchoolBoard: capitalizeWords(formData.previousSchoolBoard) || "",
    studentCategory: capitalizeWords(formData.studentCategory) || "",
    aadharPassportNumber: formData.aadharPassportNumber || "",
    howReachUs: capitalizeWords(formData.howReachUs) || "",
    siblingInfoChecked: formData.siblingInfoChecked || false,
    relationType: capitalizeWords(formData.relationType) || "",
    siblingName: capitalizeWords(formData.siblingName) || "",
    parentalStatus: capitalizeWords(formData.parentalStatus) || "",
    fatherName: capitalizeWords(formData.fatherName) || "",
    fatherContactNo: formData.fatherContactNo || "",
    fatherQualification: capitalizeWords(formData.fatherQualification) || "",
    fatherProfession: capitalizeWords(formData.fatherProfession) || "",
    motherName: capitalizeWords(formData.motherName) || "",
    motherContactNo: formData.motherContactNo || "",
    motherQualification: capitalizeWords(formData.motherQualification) || "",
    motherProfession: capitalizeWords(formData.motherProfession) || "",
    agreementChecked: formData.agreementChecked || true,
    admissionFees: formData.admissionFees|| "",
      concessionType: formData.concessionType || "",
    concessionAmount: formData.concessionAmount || "",
    finalAmount: formData.finalAmount || "",
    name: capitalizeWords(formData.name) || "",
    paymentMode: capitalizeWords(formData.paymentMode) || "",
    chequeNumber: formData.chequeNumber || "",
    bankName: capitalizeWords(formData.bankName) || "",
  };

  const getImageDataUrl = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      return "/path/to/placeholder-image.jpg"; 
    }
  };

  const { school, logoSrc } = await fetchSchoolData(schoolId);
  if (!logoSrc) {
  }

  try {
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
        img.onerror = () => {
          resolve(); 
        };
      });
    };

    if (photoSrc) {
      await ensureImageLoaded(photoSrc);
    }

    const page1Container = document.createElement("div");
    const page2Container = document.createElement("div");

    const containerStyle = `
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

    page1Container.style.cssText = containerStyle;
    page2Container.style.cssText = containerStyle;

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
          background: rgb(255, 255, 255);
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
          font-size: 16px;
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
        .pdf-address {
          min-height: 60px;
        }
        @media print {
          .pdf-container {
            font-size: 12px;
          }
        }
      </style>
      <div class="pdf-container">
        <div class="pdf-heading">Admission Form</div>
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
        <!-- Personal Information -->
        <div class="pdf-section">
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Gender</label>
                <div class="pdf-value">${mockFormData.gender}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Blood Group</label>
                <div class="pdf-value">${mockFormData.bloodGroup}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Parent Contact</label>
                <div class="pdf-value">${mockFormData.parentContactNumber}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Mother Tongue</label>
                <div class="pdf-value">${mockFormData.motherTongue}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Class</label>
                <div class="pdf-value">${mockFormData.masterDefineClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Shift</label>
                <div class="pdf-value">${mockFormData.masterDefineShift}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Section</label>
                <div class="pdf-value">${mockFormData.section}</div>
              </div>
            </div>
          </div>
          <div class="pdf-field">
            <label class="pdf-label">Current Address</label>
            <div class="pdf-value pdf-address">${mockFormData.currentAddress}</div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Country</label>
                <div class="pdf-value">${mockFormData.country}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">State</label>
                <div class="pdf-value">${mockFormData.state}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">City</label>
                <div class="pdf-value">${mockFormData.city}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Pincode</label>
                <div class="pdf-value">${mockFormData.pincode}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Previous School Information -->
        <div class="pdf-section">
          <div class="pdf-section-title">Previous School Information</div>
          <div class="pdf-row">
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Previous School Name</label>
                <div class="pdf-value">${mockFormData.previousSchoolName}</div>
              </div>
            </div>
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">School Address</label>
                <div class="pdf-value">${mockFormData.addressOfPreviousSchool}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">School Board</label>
                <div class="pdf-value">${mockFormData.previousSchoolBoard}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Category</label>
                <div class="pdf-value">${mockFormData.studentCategory}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">How Did You Reach Us</label>
                <div class="pdf-value">${mockFormData.howReachUs}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Documents -->
        <div class="pdf-section">
          <div class="pdf-section-title">Document Information</div>
          <div class="pdf-row">
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Aadhar/Passport Number</label>
                <div class="pdf-value">${mockFormData.aadharPassportNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

      const createPage2Content = () => `
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
          min-height: 20px;
          word-wrap: break-word;
          color: #000000;
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
        .pdf-address {
          min-height: 60px;
        }
        @media print {
          .pdf-container {
            font-size: 12px;
          }
        }
      </style>
      <div class="pdf-container">
        <!-- Sibling Information -->
        <div class="pdf-section">
          <div class="pdf-section-title">Sibling Information Study In Same School</div>
          ${mockFormData.siblingInfoChecked
        ? '<div class="pdf-value">No Sibling Information Provided</div>'
        : `<div class="pdf-row">
                <div class="pdf-col-6">
                  <div class="pdf-field">
                    <label class="pdf-label">Relation Type</label>
                    <div class="pdf-value">${mockFormData.relationType}</div>
                  </div>
                </div>
                <div class="pdf-col-6">
                  <div class="pdf-field">
                    <label class="pdf-label">Sibling Name</label>
                    <div class="pdf-value">${mockFormData.siblingName}</div>
                  </div>
                </div>
              </div>`
      }
        </div>

        <!-- Family Information -->
        <div class="pdf-section">
          <div class="pdf-section-title">Family Information</div>
          <div class="pdf-field">
            <label class="pdf-label">Parental Status</label>
            <div class="pdf-value">${mockFormData.parentalStatus}</div>
          </div>
          ${mockFormData.parentalStatus !== "Single Mother"
        ? `
          <div class="pdf-row">
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Father Name</label>
                <div class="pdf-value">${mockFormData.fatherName}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Father Contact</label>
                <div class="pdf-value">${mockFormData.fatherContactNo}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Father Qualification</label>
                <div class="pdf-value">${mockFormData.fatherQualification}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Father Profession</label>
                <div class="pdf-value">${mockFormData.fatherProfession}</div>
              </div>
            </div>
          </div>
          `
        : ""
      }
          ${mockFormData.parentalStatus !== "Single Father"
        ? `
          <div class="pdf-row">
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Mother Name</label>
                <div class="pdf-value">${mockFormData.motherName}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Mother Contact</label>
                <div class="pdf-value">${mockFormData.motherContactNo}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Mother Qualification</label>
                <div class="pdf-value">${mockFormData.motherQualification}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Mother Profession</label>
                <div class="pdf-value">${mockFormData.motherProfession}</div>
              </div>
            </div>
          </div>
          `
        : ""
      }
        </div>

        <!-- Understanding & Payment -->
        <div class="pdf-section">
          <div class="pdf-section-title">Understanding And Payment</div>
          <div class="pdf-checkbox">
            <div class="pdf-checkbox-box">${mockFormData.agreementChecked ? "✓" : ""}</div>
            <span style="color: #000000; text-transform: capitalize;">I Understand And Agree That The Registration Of My Ward Does Not Guarantee Admission To The School And The Registration Fee Is Neither Transferable Nor Refundable.</span>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Registration Fees</label>
                <div class="pdf-value">₹${mockFormData.admissionFees}</div>
              </div>
            </div>
               <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Concession Type</label>
                <div class="pdf-value">${mockFormData.concessionType}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Concession</label>
                <div class="pdf-value">₹${mockFormData.concessionAmount}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Final Amount</label>
                <div class="pdf-value">₹${mockFormData.finalAmount}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Name Of Person Filling Form</label>
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
          ${mockFormData.paymentMode === "Cheque"
        ? `
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
          </div>`
        : ""
      }
        </div>
      </div>
    `;

    page1Container.innerHTML = generateHeader(school, logoSrc) + createPDFContent() + generateFooter(school);
    page2Container.innerHTML = generateHeader(school, logoSrc) + createPage2Content() + generateFooter(school);

    document.body.appendChild(page1Container);
    document.body.appendChild(page2Container);

    // Wait for content to render
    await new Promise((resolve) => setTimeout(resolve, 500)); // Increased timeout

    const page1Canvas = await html2canvas(page1Container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 794,
      windowHeight: 1123,
    });

    const page2Canvas = await html2canvas(page2Container, {
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

    const page1Height = Math.min((page1Canvas.height * imgWidth) / page1Canvas.width, pageHeight);
    pdf.addImage(page1Canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, page1Height);

    pdf.addPage();
    const page2Height = Math.min((page2Canvas.height * imgWidth) / page2Canvas.width, pageHeight);
    pdf.addImage(page2Canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, page2Height);

    pdf.save(`Student_Admission_${mockFormData.firstName}_${mockFormData.lastName}.pdf`);

    document.body.removeChild(page1Container);
    document.body.removeChild(page2Container);
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
};