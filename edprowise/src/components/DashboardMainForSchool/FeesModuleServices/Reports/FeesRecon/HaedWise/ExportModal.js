import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';
import { toast } from 'react-toastify';

export const exportToExcel = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  _calculateBalance, 
  totals,
  formatAcademicYear,
  selectedAcademicYear
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Recon Fees Headwise');


  const headers = tableFields.map(field => headerMapping[field.id] || field.label);
  worksheet.addRow(headers);


  filteredData.forEach(record => {
    const row = tableFields.map(field => {
      const value = getFieldValue(record, field);
      return isNaN(value) ? value : Number(value);
    });
    worksheet.addRow(row);
  });


  const totalsRow = tableFields.map(field => {
    if (field.id === 'class' || field.id === 'section') return 'Total';
    if (field.id === 'existingStudents') return totals.existingStudents;
    if (field.id === 'newAdmission') return totals.newAdmission;
    if (field.id === 'totalStudents') return totals.totalStudents;
    if (field.id === 'schoolFees') return totals.schoolFees;
    if (field.id === 'admFees') return totals.admFees;
    if (field.id === 'yearlyDues') return totals.yearlyDues;
    return '';
  });
  worksheet.addRow(totalsRow);


  worksheet.addRow(['', '', '', '', '', '', 'Less: Loss of fees due to left students', totals.lossDueToLeft]);
  worksheet.addRow(['', '', '', '', '', '', 'Less: Loss of fees due to late Admission', totals.lossDueToLateAdmission]);
  worksheet.addRow(['', '', '', '', '', '', 'Less: Defaulter Fees', totals.defaulterFees]);
  worksheet.addRow(['', '', '', '', '', '', 'Net Fees Due', totals.netFeesDue]);
  worksheet.addRow(['', '', '', '', '', '', 'Add: Late Fee & Excess Fees', totals.lateAndExcessFees]);
  worksheet.addRow(['', '', '', '', '', '', 'Add: Registration Fees', totals.registrationFees]);
  worksheet.addRow(['', '', '', '', '', '', 'Add: TC Fees', totals.tcFees]);
  worksheet.addRow(['', '', '', '', '', '', 'Add: Board Registration Fees', totals.boardRegistrationFees]);
  worksheet.addRow(['', '', '', '', '', '', 'Add: Board Examination Fees', totals.boardExaminationFees]);
  worksheet.addRow(['', '', '', '', '', '', 'Add: Arrear Fees Received', totals.arrearFeesReceived]);
  worksheet.addRow(['', '', '', '', '', '', 'Final Fees', totals.finalFees]);


  worksheet.columns.forEach((column, index) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value ? cell.value.toString() : '';
      if (cellValue.length > maxLength) {
        maxLength = cellValue.length;
      }
    });
    column.width = maxLength + 2;
  });

  // Style header row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

  // Style totals and additional rows
  for (let i = filteredData.length + 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    row.font = { bold: true };
    row.alignment = { horizontal: 'right', vertical: 'middle' };
  }

  // Add borders to all cells
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    });
  });

  // Save the file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `Recon_Fees_Headwise_${formatAcademicYear(selectedAcademicYear)}.xlsx`
  );
};



export const exportToPDF = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  _calculateBalance, 
  totals,
  formatAcademicYear,
  selectedAcademicYear,
  school,
  logoSrc
) => {
  try {
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape',
    });

    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 5;
    const headerHeight = 30;
    const footerHeight = 30;
    const contentHeight = pageHeight - margin * 2 - headerHeight - footerHeight;
    const mmToPx = 3.779;

    // Preload logo image
    const preloadImage = (src) => {
      return new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}. Using fallback.`);
          resolve(null);
        };
      });
    };

    const logoImg = await preloadImage(logoSrc);

    // Create a hidden container for rendering
    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.cssText = `
      position: absolute;
      top: -9999px;
      left: -9999px;
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      font-family: Arial, sans-serif;
      background-color: #ffffff;
    `;
    document.body.appendChild(hiddenContainer);

    // Render header
    const headerContainer = document.createElement('div');
    headerContainer.style.cssText = `
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      height: ${headerHeight * mmToPx}px;
      padding: 5px;
    `;
    headerContainer.innerHTML = generateHeader(school, logoImg ? logoSrc : '');
    hiddenContainer.appendChild(headerContainer);

    // Render footer
    const footerContainer = document.createElement('div');
    footerContainer.style.cssText = `
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      height: ${footerHeight * mmToPx}px;
    `;
    footerContainer.innerHTML = generateFooter(school);
    hiddenContainer.appendChild(footerContainer);

    // Table styles
    const tableStyle = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          page-break-inside: auto;
          font-size: 11px;
        }
        th, td {
          border: 1px solid #4b5563;
          padding: 6px;
          text-align: center;
          font-size: 11px;
          line-height: 1.2;
        }
        thead {
          background-color: #e5e7eb;
          font-weight: bold;
        }
        tfoot {
          background-color: #e5e7eb;
          font-weight: bold;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        .pdf-title {
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 8mm;
          color: #000000;
        }
        .right-align {
          text-align: right;
        }
      </style>
    `;

    // Prepare data with totals and additional rows
    const allData = [
      ...filteredData,
      { isTotalsRow: true, totals },
      { isDeductionRow: true, label: 'Less: Loss of fees due to left students', value: totals.lossDueToLeft },
      { isDeductionRow: true, label: 'Less: Loss of fees due to late Admission', value: totals.lossDueToLateAdmission },
      { isDeductionRow: true, label: 'Less: Defaulter Fees', value: totals.defaulterFees },
      { isDeductionRow: true, label: 'Net Fees Due', value: totals.netFeesDue },
      { isDeductionRow: true, label: 'Add: Late Fee & Excess Fees', value: totals.lateAndExcessFees },
      { isDeductionRow: true, label: 'Add: Registration Fees', value: totals.registrationFees },
      { isDeductionRow: true, label: 'Add: TC Fees', value: totals.tcFees },
      { isDeductionRow: true, label: 'Add: Board Registration Fees', value: totals.boardRegistrationFees },
      { isDeductionRow: true, label: 'Add: Board Examination Fees', value: totals.boardExaminationFees },
      { isDeductionRow: true, label: 'Add: Arrear Fees Received', value: totals.arrearFeesReceived },
      { isDeductionRow: true, label: 'Final Fees', value: totals.finalFees },
    ];

    // Paginate data
    const rowsPerPage = 15;
    const pageData = [];
    for (let i = 0; i < allData.length; i += rowsPerPage) {
      pageData.push(allData.slice(i, i + rowsPerPage));
    }

    // Render header and footer canvases
    const headerCanvas = await html2canvas(headerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: headerHeight * mmToPx,
    });
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

    const footerCanvas = await html2canvas(footerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: footerHeight * mmToPx,
    });
    const footerImg = footerCanvas.toDataURL('image/jpeg', 0.98);

    // Render each page
    for (let page = 0; page < pageData.length; page++) {
      if (page > 0) pdf.addPage();

      const currentPageData = pageData[page];
      const tableContainer = document.createElement('div');
      tableContainer.style.cssText = `
        width: ${(pageWidth - margin * 2) * mmToPx}px;
        max-height: ${contentHeight * mmToPx}px;
        font-family: Arial, sans-serif;
        font-size: 11px;
        line-height: 1.2;
        color: #000000;
        overflow: hidden;
        background-color: #ffffff;
      `;

      const tableContent = `
        ${tableStyle}
        <div class="pdf-title">Recon Fees Headwise Report - ${formatAcademicYear(selectedAcademicYear)}</div>
        <table>
          <thead>
            <tr>
              ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${currentPageData.length > 0
              ? currentPageData
                  .map((record) => {
                    if (record.isTotalsRow) {
                      return `
                        <tr>
                          <td colspan="2"><strong>Total</strong></td>
                          <td><strong>${record.totals.existingStudents}</strong></td>
                          <td><strong>${record.totals.newAdmission}</strong></td>
                          <td><strong>${record.totals.totalStudents}</strong></td>
                          <td><strong>${record.totals.schoolFees.toLocaleString()}</strong></td>
                          <td><strong>${record.totals.admFees.toLocaleString()}</strong></td>
                          <td><strong>${record.totals.yearlyDues.toLocaleString()}</strong></td>
                        </tr>
                      `;
                    } else if (record.isDeductionRow) {
                      return `
                        <tr>
                          <td colspan="7" class="right-align"><strong>${record.label}</strong></td>
                          <td><strong>${record.value.toLocaleString()}</strong></td>
                        </tr>
                      `;
                    }
                    return `
                      <tr>
                        ${tableFields
                          .map((field) => `<td>${getFieldValue(record, field)}</td>`)
                          .join('')}
                      </tr>
                    `;
                  })
                  .join('')
              : `<tr><td colspan="${tableFields.length}">No data matches the selected filters for ${formatAcademicYear(selectedAcademicYear)}.</td></tr>`
            }
          </tbody>
        </table>
      `;

      tableContainer.innerHTML = tableContent;
      hiddenContainer.appendChild(tableContainer);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const tableCanvas = await html2canvas(tableContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        windowWidth: (pageWidth - margin * 2) * mmToPx,
      });
      const tableImg = tableCanvas.toDataURL('image/jpeg', 0.98);
      const tableImgHeight = (tableCanvas.height / mmToPx) * (pageWidth - margin * 2) / (tableCanvas.width / mmToPx);

      pdf.addImage(headerImg, 'JPEG', margin, margin, pageWidth - margin * 2, headerHeight);

      const destHeight = Math.min(contentHeight, tableImgHeight);
      if (destHeight > 0) {
        pdf.addImage(
          tableImg,
          'JPEG',
          margin,
          margin + headerHeight,
          pageWidth - margin * 2,
          destHeight
        );
      } else {
        console.warn(`Page ${page + 1} - Table height is 0, skipping table rendering.`);
        pdf.text('No content to display', margin, margin + headerHeight + 10);
      }

      pdf.addImage(footerImg, 'JPEG', margin, pageHeight - footerHeight - margin, pageWidth - margin * 2, footerHeight);

      hiddenContainer.removeChild(tableContainer);
    }

    document.body.removeChild(hiddenContainer);
    pdf.save(`Recon_Fees_Headwise_${formatAcademicYear(selectedAcademicYear)}.pdf`);
  } catch (error) {
    console.error('PDF generation failed:', error);
    toast.error('Failed to generate PDF. Please check the console for details.');
  }
};