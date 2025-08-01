import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlis";

export const generatePDF = async (schoolId, student, getClassNameById, getShiftName) => {
  console.log(schoolId)

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

  const mockstudentData = {
    firstName: capitalizeWords(student.firstName) || "",
    middleName: capitalizeWords(student.middleName) || "",
    lastName: capitalizeWords(student.lastName) || "",
    dateOfBirth: formatDate(student.dateOfBirth),
    age: student.age || "",
    nationality: capitalizeWords(student.nationality) || "",
    gender: capitalizeWords(student.gender) || "",
    bloodGroup: capitalizeWords(student.bloodGroup) || "",
    parentContactNumber: student.parentContactNumber || "",
    motherTongue: capitalizeWords(student.motherTongue) || "",
    masterDefineClass: (() => {
      try {
        const className = getClassNameById(student.masterDefineClass) || "N/A";
        return className;
      } catch (error) {
        console.error("Error in getClassNameById:", error.message, error.stack);
        return "N/A";
      }
    })(),
    masterDefineShift: (() => {
      try {
        const shiftName = getShiftName(student.masterDefineShift) || "N/A";
        return shiftName;
      } catch (error) {
        console.error("Error in getShiftName:", error.message, error.stack);
        return "N/A";
      }
    })(),
    currentAddress: capitalizeWords(student.currentAddress) || "",
    country: capitalizeWords(student.country) || "",
    state: capitalizeWords(student.state) || "",
    city: capitalizeWords(student.city) || "",
    pincode: student.pincode || "",
    previousSchoolName: capitalizeWords(student.previousSchoolName) || "",
    addressOfPreviousSchool: capitalizeWords(student.addressOfPreviousSchool) || "",
    previousSchoolBoard: capitalizeWords(student.previousSchoolBoard) || "",
    studentCategory: capitalizeWords(student.studentCategory) || "",
    aadharPassportNumber: student.aadharPassportNumber || "",
    howReachUs: capitalizeWords(student.howReachUs) || "",
    siblingInfoChecked: student.siblingInfoChecked || false,
    relationType: capitalizeWords(student.relationType) || "",
    siblingName: capitalizeWords(student.siblingName) || "",
    parentalStatus: capitalizeWords(student.parentalStatus) || "",
    fatherName: capitalizeWords(student.fatherName) || "",
    fatherContactNo: student.fatherContactNo || "",
    fatherQualification: capitalizeWords(student.fatherQualification) || "",
    fatherProfession: capitalizeWords(student.fatherProfession) || "",
    motherName: capitalizeWords(student.motherName) || "",
    motherContactNo: student.motherContactNo || "",
    motherQualification: capitalizeWords(student.motherQualification) || "",
    motherProfession: capitalizeWords(student.motherProfession) || "",
    agreementChecked: student.agreementChecked || true,
    registrationFee: student.registrationFee || "",
    concessionType: student.concessionType || "",
    concessionAmount: student.concessionAmount || "",
    finalAmount: student.finalAmount || "",
    name: capitalizeWords(student.name) || "",
    paymentMode: capitalizeWords(student.paymentMode) || "",
    chequeNumber: student.chequeNumber || "",
    bankName: capitalizeWords(student.bankName) || "",
    createdAt: formatDate(student.createdAt),
    paymentDate: formatDate(student.paymentDate),
    receiptNumber: student.receiptNumber || "",
    registrationNumber: student.registrationNumber || "",
    transactionNumber: student.transactionNumber || "",
  };

  const getImageDataUrl = async (url) => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL_FOR_IMAGE || "";
      const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;

      const response = await fetch(fullUrl, { mode: "cors" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);


      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error(`Expected an image, but received content-type: ${contentType}`);
      }

      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      return "";
    }
  };

  const { school, logoSrc } = await fetchSchoolData(schoolId);

  try {
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    let photoSrc = "";
    let blobUrl = null;
    if (student.studentPhoto) {
      if (typeof student.studentPhoto === "string") {
        photoSrc = await getImageDataUrl(student.studentPhoto);
      } else if (student.studentPhoto) {
        blobUrl = URL.createObjectURL(student.studentPhoto);
        photoSrc = blobUrl;
      } else {
        photoSrc = await getImageDataUrl(`${process.env.REACT_APP_API_URL_FOR_IMAGE}${student.studentPhoto}`);
      }
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
        <div class="pdf-heading">Registration Form</div>
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
                    <div class="pdf-value">${mockstudentData.firstName}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Middle Name</label>
                    <div class="pdf-value">${mockstudentData.middleName}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Last Name</label>
                    <div class="pdf-value">${mockstudentData.lastName}</div>
                  </div>
                </div>
              </div>
              <div class="pdf-row">
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Date Of Birth</label>
                    <div class="pdf-value">${mockstudentData.dateOfBirth}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Age</label>
                    <div class="pdf-value">${mockstudentData.age}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Nationality</label>
                    <div class="pdf-value">${mockstudentData.nationality}</div>
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
                <div class="pdf-value">${mockstudentData.gender}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Blood Group</label>
                <div class="pdf-value">${mockstudentData.bloodGroup}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Parent Contact</label>
                <div class="pdf-value">${mockstudentData.parentContactNumber}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Mother Tongue</label>
                <div class="pdf-value">${mockstudentData.motherTongue}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Class</label>
                <div class="pdf-value">${mockstudentData.masterDefineClass}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Shift</label>
                <div class="pdf-value">${mockstudentData.masterDefineShift}</div>
              </div>
            </div>
          </div>
          <div class="pdf-field">
            <label class="pdf-label">Current Address</label>
            <div class="pdf-value pdf-address">${mockstudentData.currentAddress}</div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Country</label>
                <div class="pdf-value">${mockstudentData.country}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">State</label>
                <div class="pdf-value">${mockstudentData.state}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">City</label>
                <div class="pdf-value">${mockstudentData.city}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Pincode</label>
                <div class="pdf-value">${mockstudentData.pincode}</div>
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
                <div class="pdf-value">${mockstudentData.previousSchoolName}</div>
              </div>
            </div>
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">School Address</label>
                <div class="pdf-value">${mockstudentData.addressOfPreviousSchool}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">School Board</label>
                <div class="pdf-value">${mockstudentData.previousSchoolBoard}</div>
              </div>
            </div>
           
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">How Did You Reach Us</label>
                <div class="pdf-value">${mockstudentData.howReachUs}</div>
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
                <label class="pdf-label">Category</label>
                <div class="pdf-value">${mockstudentData.studentCategory}</div>
              </div>
            </div>
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Aadhar/Passport Number</label>
                <div class="pdf-value">${mockstudentData.aadharPassportNumber}</div>
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
          ${mockstudentData.siblingInfoChecked
        ? '<div class="pdf-value">No Sibling Information Provided</div>'
        : `<div class="pdf-row">
                  <div class="pdf-col-6">
                    <div class="pdf-field">
                      <label class="pdf-label">Relation Type</label>
                      <div class="pdf-value">${mockstudentData.relationType}</div>
                    </div>
                  </div>
                  <div class="pdf-col-6">
                    <div class="pdf-field">
                      <label class="pdf-label">Sibling Name</label>
                      <div class="pdf-value">${mockstudentData.siblingName}</div>
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
            <div class="pdf-value">${mockstudentData.parentalStatus}</div>
          </div>
          ${mockstudentData.parentalStatus !== "Single Mother"
        ? `
                <div class="pdf-row">
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Father Name</label>
                      <div class="pdf-value">${mockstudentData.fatherName}</div>
                    </div>
                  </div>
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Father Contact</label>
                      <div class="pdf-value">${mockstudentData.fatherContactNo}</div>
                    </div>
                  </div>
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Father Qualification</label>
                      <div class="pdf-value">${mockstudentData.fatherQualification}</div>
                    </div>
                  </div>
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Father Profession</label>
                      <div class="pdf-value">${mockstudentData.fatherProfession}</div>
                    </div>
                  </div>
                </div>
                `
        : ""
      }
          ${mockstudentData.parentalStatus !== "Single Father"
        ? `
                <div class="pdf-row">
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Mother Name</label>
                      <div class="pdf-value">${mockstudentData.motherName}</div>
                    </div>
                  </div>
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Mother Contact</label>
                      <div class="pdf-value">${mockstudentData.motherContactNo}</div>
                    </div>
                  </div>
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Mother Qualification</label>
                      <div class="pdf-value">${mockstudentData.motherQualification}</div>
                    </div>
                  </div>
                  <div class="pdf-col-4">
                    <div class="pdf-field">
                      <label class="pdf-label">Mother Profession</label>
                      <div class="pdf-value">${mockstudentData.motherProfession}</div>
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
            <div class="pdf-checkbox-box">${mockstudentData.agreementChecked ? "✓" : ""}</div>
            <span style="color: #000000; text-transform: capitalize;">I Understand And Agree That The Registration Of My Ward Does Not Guarantee Admission To The School And The Registration Fee Is Neither Transferable Nor Refundable.</span>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Registration Fees</label>
                <div class="pdf-value">₹${mockstudentData.registrationFee}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Concession Type</label>
                <div class="pdf-value">${mockstudentData.concessionType}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Concession</label>
                <div class="pdf-value">₹${mockstudentData.concessionAmount}</div>
              </div>
            </div>
            <div class="pdf-col-4">
              <div class="pdf-field">
                <label class="pdf-label">Final Amount</label>
                <div class="pdf-value">₹${mockstudentData.finalAmount}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Name Of Person Filling Form</label>
                <div class="pdf-value">${mockstudentData.name}</div>
              </div>
            </div>
            <div class="pdf-col-6">
              <div class="pdf-field">
                <label class="pdf-label">Payment Mode</label>
                <div class="pdf-value">${mockstudentData.paymentMode}</div>
              </div>
            </div>
          </div>
          ${mockstudentData.paymentMode === "Cheque"
        ? `
                <div class="pdf-row">
                  <div class="pdf-col-6">
                    <div class="pdf-field">
                      <label class="pdf-label">Cheque Number</label>
                      <div class="pdf-value">${mockstudentData.chequeNumber}</div>
                    </div>
                  </div>
                  <div class="pdf-col-6">
                    <div class="pdf-field">
                      <label class="pdf-label">Bank Name</label>
                      <div class="pdf-value">${mockstudentData.bankName}</div>
                    </div>
                  </div>
                </div>`
        : ""
      }
        </div>

        <!-- For Official Use Only -->
        <div class="pdf-section">
          <div class="pdf-section-title">For Official Use Only</div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Application Received On</label>
                <div class="pdf-value">${mockstudentData.paymentDate}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Receipt No.</label>
                <div class="pdf-value">${mockstudentData.receiptNumber}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Registration No.</label>
                <div class="pdf-value">${mockstudentData.registrationNumber}</div>
              </div>
            </div>
          </div>
          <div class="pdf-row">
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Payment Mode</label>
                <div class="pdf-value">${mockstudentData.paymentMode}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Payment Date</label>
                <div class="pdf-value">${mockstudentData.paymentDate}</div>
              </div>
            </div>
            <div class="pdf-col-3">
              <div class="pdf-field">
                <label class="pdf-label">Transaction/Cheque No.</label>
                <div class="pdf-value">${mockstudentData.chequeNumber || mockstudentData.transactionNumber || ""}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    page1Container.innerHTML = generateHeader(school, logoSrc) + createPDFContent() + generateFooter(school);
    page2Container.innerHTML = generateHeader(school, logoSrc) + createPage2Content() + generateFooter(school);

    document.body.appendChild(page1Container);
    document.body.appendChild(page2Container);

    const page1Canvas = await html2canvas(page1Container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const page2Canvas = await html2canvas(page2Container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
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

    pdf.save(`Student_Registration_${mockstudentData.firstName}_${mockstudentData.lastName}.pdf`);

    document.body.removeChild(page1Container);
    document.body.removeChild(page2Container);
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
};