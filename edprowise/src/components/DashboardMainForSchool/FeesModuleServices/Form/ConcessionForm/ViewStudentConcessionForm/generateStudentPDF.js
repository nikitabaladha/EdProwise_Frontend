import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fetchSchoolData, generateHeader, generateFooter } from "../../../PdfUtlis";

export const generateTCPDF = async (schoolId, formData, classes, sections, feeTypes) => {
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
      section: formData.section
        ? capitalizeWords(sections.find((s) => s._id === formData.section)?.name) || ""
        : "",
      concessionType: formData.concessionType || "",
      castOrIncomeCertificate: formData.castOrIncomeCertificate || "",
      academicYear: formData.academicYear || "",
      concessionDetails: formData.concessionDetails || [],
    };

    const createPageContent = (details, pageIndex, includeStudentInfo) => `
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
                    <label class="pdf-label">Class</label>
                    <div class="pdf-value">${mockFormData.masterDefineClass}</div>
                  </div>
                </div>
                <div class="pdf-col-4">
                  <div class="pdf-field">
                    <label class="pdf-label">Section</label>
                    <div class="pdf-value">${mockFormData.section}</div>
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
                    <label class="pdf-label">Academic Year</label>
                    <div class="pdf-value">${mockFormData.academicYear}</div>
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
            </tbody>
          </table>
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

    const totalItems = mockFormData.concessionDetails.length;
    let currentItemIndex = 0;
    let pageIndex = 0;

    while (currentItemIndex < totalItems) {

      let availableHeight = PAGE_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - SECTION_MARGIN;
      if (pageIndex === 0) {
        availableHeight -= STUDENT_INFO_HEIGHT; 
      }

   
      const rowsThatFit = Math.floor((availableHeight - TABLE_HEADER_HEIGHT) / TABLE_ROW_HEIGHT);
      const rowsToRender = Math.min(rowsThatFit, totalItems - currentItemIndex);

 
      const pageDetails = mockFormData.concessionDetails.slice(
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

    pdf.save(`Concession_Form_${mockFormData.firstName}_${mockFormData.lastName}.pdf`);

    if (blobUrl) URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
};