import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../PdfUtlisReportFrom";

export const generatePDF = async (schoolId, student, getClassName, getSectionName, feeTypes) => {
  console.log("student", student);
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getImageDataUrl = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors", cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      if (blob.type.includes("pdf")) {
        console.warn("PDF file detected; cannot be used as an image.");
        return null;
      }
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Failed to fetch image:", error);
      return null;
    }
  };

  try {
    const { school, logoSrc } = await fetchSchoolData(schoolId);
    let photoSrc = "";
    let certificateSrc = "";
    let photoBlobUrl = null;
    let certificateBlobUrl = null;


    if (student.studentPhoto) {
      if (typeof student.studentPhoto === "string") {
        const imageUrl = student.studentPhoto.startsWith("http")
          ? student.studentPhoto
          : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${student.studentPhoto}`;
        photoSrc = await getImageDataUrl(imageUrl);
      } else if (student.studentPhoto instanceof Blob) {
        if (!student.studentPhoto.type.includes("pdf")) {
          photoBlobUrl = URL.createObjectURL(student.studentPhoto);
          photoSrc = photoBlobUrl;
        } else {
          console.warn("Student photo is a PDF; using placeholder.");
        }
      }
    }
    if (!photoSrc) {
      photoSrc = "/path/to/placeholder-image.jpg";
      console.warn("Using placeholder image for student photo");
    }

    if (student.castOrIncomeCertificate) {
      if (typeof student.castOrIncomeCertificate === "string") {
        const certificateUrl = student.castOrIncomeCertificate.startsWith("http")
          ? student.castOrIncomeCertificate
          : `${process.env.REACT_APP_API_URL_FOR_IMAGE}${student.castOrIncomeCertificate}`;
        certificateSrc = await getImageDataUrl(certificateUrl);
      } else if (student.castOrIncomeCertificate instanceof Blob) {
        if (!student.castOrIncomeCertificate.type.includes("pdf")) {
          certificateBlobUrl = URL.createObjectURL(student.castOrIncomeCertificate);
          certificateSrc = certificateBlobUrl;
        } else {
          console.warn("Cast/income certificate is a PDF; cannot display as image.");
        }
      }
    }
    if (!certificateSrc && student.castOrIncomeCertificate) {
      console.warn("Using fallback message for cast/income certificate (PDF or unavailable)");
    }

    const ensureImageLoaded = (src) => {
      if (!src || src === "/path/to/placeholder-image.jpg") return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "anonymous";
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          resolve();
        };
      });
    };

    await Promise.all([photoSrc && ensureImageLoaded(photoSrc), certificateSrc && ensureImageLoaded(certificateSrc)]);

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
      dateOfBirth: student.dateOfBirth ? student.dateOfBirth.substring(0, 10) : "",
      age: student.age || "",
      nationality: capitalizeWords(student.nationality) || "",
      fatherName: capitalizeWords(student.fatherName) || "",
      motherName: capitalizeWords(student.motherName) || "",
      dateOfIssue: student.dateOfIssue ? student.dateOfIssue.substring(0, 10) : "",
      dateOfAdmission: student.dateOfAdmission ? student.dateOfAdmission.substring(0, 10) : "",
      masterDefineClass: getClassName(student.masterDefineClass),
      section: getSectionName(student.masterDefineClass, student.section),
      concessionType: student.concessionType || "",
      castOrIncomeCertificate: student.castOrIncomeCertificate || "",
      academicYear: student.academicYear || "",
      concessionDetails: student.concessionDetails || [],
    };

    const createPageContent = (details, pageIndex, includeStudentInfo) => {
      const totals = details.reduce(
        (acc, detail) => ({
          totalFees: acc.totalFees + (detail.totalFees || 0),
          concessionAmount: acc.concessionAmount + (detail.concessionAmount || 0),
          balancePayable: acc.balancePayable + (detail.balancePayable || 0),
          concessionPercentage: acc.concessionPercentage + (detail.concessionPercentage || 0),
          count: acc.count + 1,
        }),
        { totalFees: 0, concessionAmount: 0, balancePayable: 0, concessionPercentage: 0, count: 0 }
      );
      const avgConcessionPercentage =
        totals.count > 0 ? (totals.concessionPercentage / totals.count).toFixed(2) : 0;

      return `
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
        .pdf-col-full {
          flex: 0 0 100%;
          min-width: 10%;
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
        .pdf-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .pdf-table th, .pdf-table td {
          border: 1px solid #d1d5db;
          padding: 8px;
          text-align: center;
          font-size: 12px;
        }
        .pdf-table th {
          background: #f8fafc;
          font-weight: bold;
        }
        .pdf-table td {
          background: #f9fafb;
        }
        .pdf-table-total td {
          font-weight: 900;
          background: #e5e7eb;
          font-family: Arial, sans-serif;
        }
      </style>
      <div class="pdf-container">
        ${pageIndex === 0 ? '<div class="pdf-heading">Concession Form</div>' : ''}
        ${includeStudentInfo ? `
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
                    <label class="pdf-label">Class</label>
                    <div class="pdf-value">${mockstudent.masterDefineClass}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Section</label>
                    <div class="pdf-value">${mockstudent.section}</div>
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
                    <label class="pdf-label">Academic Year</label>
                    <div class="pdf-value">${mockstudent.academicYear}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ` : ''}
        <div class="pdf-section">
          <div class="pdf-section-title">Concession Details</div>
          <table class="pdf-table">
            <thead>
              <tr>
                <th>Installment</th>
                <th>Fees Type</th>
                <th>Total Fees</th>
                <th>Concession %</th>
                <th>Concession Amt.</th>
                <th>Balance Payable</th>
              </tr>
            </thead>
            <tbody>
              ${details.map((detail) => `
                <tr>
                  <td>${detail.installmentName || ''}</td>
                  <td>${feeTypes.find((type) => type._id === detail.feesType)?.feesTypeName || ''}</td>
                  <td>₹${detail.totalFees || 0}</td>
                  <td>${detail.concessionPercentage || 0}%</td>
                  <td>₹${detail.concessionAmount || 0}</td>
                  <td>₹${detail.balancePayable || 0}</td>
                </tr>
              `).join('')}
              <tr class="pdf-table-total">
                <td colspan="2">Total</td>
                <td>₹${totals.totalFees.toFixed(2)}</td>
                <td>${avgConcessionPercentage}%</td>
                <td>₹${totals.concessionAmount.toFixed(2)}</td>
                <td>₹${totals.balancePayable.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
    };

    const createCertificatePageContent = () => `
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
          margin: 10mm 0;
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
        .pdf-certificate-container {
          width: 170mm; /* Full width minus padding (210mm - 20mm - 20mm) */
          height: 237mm; /* Full height minus header, footer, and margins (297mm - 30mm - 20mm - 10mm top - 10mm bottom) */
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border: 2px solid #d1d5db;
          overflow: hidden;
        }
        .pdf-certificate-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .pdf-certificate-message {
          font-size: 16px;
          font-weight: bold;
          color: #000000;
          text-align: center;
          padding: 20px;
        }
      </style>
      <div class="pdf-container">
        <div class="pdf-section">
          <div class="pdf-section-title">Cast/Income Certificate</div>
          <div class="pdf-certificate-container">
            ${certificateSrc && certificateSrc !== "/path/to/placeholder-image.jpg" 
              ? `<img src="${certificateSrc}" class="pdf-certificate-img" crossOrigin="anonymous" />` 
              : '<span class="pdf-certificate-message">PDF certificate not supported for display</span>'}
          </div>
        </div>
      </div>
    `;

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const PAGE_HEIGHT = 297;
    const HEADER_HEIGHT = 30;
    const FOOTER_HEIGHT = 20;
    const STUDENT_INFO_HEIGHT = 100;
    const TABLE_HEADER_HEIGHT = 20;
    const TABLE_ROW_HEIGHT = 10;
    const SECTION_MARGIN = 25;

    const totalItems = mockstudent.concessionDetails.length;
    let currentItemIndex = 0;
    let pageIndex = 0;

    
    while (currentItemIndex < totalItems) {
      let availableHeight = PAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - SECTION_MARGIN;
      if (pageIndex === 0) {
        availableHeight -= STUDENT_INFO_HEIGHT;
      }

      const rowsThatFit = Math.floor((availableHeight - TABLE_HEADER_HEIGHT) / TABLE_ROW_HEIGHT);
      const rowsToRender = Math.min(rowsThatFit, totalItems - currentItemIndex);

      const pageDetails = mockstudent.concessionDetails.slice(
        currentItemIndex,
        currentItemIndex + rowsToRender
      );

      const pageContent =
        generateHeader(school, logoSrc) +
        createPageContent(pageDetails, pageIndex, pageIndex === 0) +
        generateFooter(school);

      pageContainer.innerHTML = pageContent;
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

      const imgWidth = 210;
      const pageHeight = 297;
      const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);
      if (pageIndex > 0) {
        pdf.addPage();
      }
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, canvasHeight);

      document.body.removeChild(pageContainer);
      currentItemIndex += rowsToRender;
      pageIndex++;
    }

   
    if (mockstudent.castOrIncomeCertificate) {
      pdf.addPage();
      const certificateContent = generateHeader(school, logoSrc) + createCertificatePageContent() + generateFooter(school);
      pageContainer.innerHTML = certificateContent;
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

      const imgWidth = 210;
      const pageHeight = 297;
      const canvasHeight = Math.min((canvas.height * imgWidth) / canvas.width, pageHeight);
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, imgWidth, canvasHeight);

      document.body.removeChild(pageContainer);
    }

    pdf.save(`Concession_Form_${mockstudent.firstName}_${mockstudent.lastName}.pdf`);

    if (photoBlobUrl) URL.revokeObjectURL(photoBlobUrl);
    if (certificateBlobUrl) URL.revokeObjectURL(certificateBlobUrl);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
};