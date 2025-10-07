import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';

export const exportToExcel = async (
  filteredData,
  tableFields,
  headerMapping,
  grandTotal,
  formatAcademicYear,
  selectedAcademicYear
) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Fees Structure Report');

    // Add headers
    const headers = tableFields.map(field => headerMapping[field.id] || field.label);
    worksheet.addRow(headers);

    // Generate enhanced data with class/section-wise totals
    const enhancedRows = (() => {
      const result = [];
      let currentClass = null;
      let currentSection = null;
      let currentSum = 0;

      filteredData.forEach((row) => {
        if (row.className !== currentClass || row.sectionName !== currentSection) {
          if (currentClass !== null && currentSection !== null) {
            result.push({
              type: 'total',
              className: currentClass,
              sectionName: currentSection,
              sum: currentSum.toFixed(2),
            });
          }
          currentClass = row.className;
          currentSection = row.sectionName;
          currentSum = 0;
        }
        result.push({ type: 'data', row });
        currentSum += parseFloat(row.amount || 0);
      });

      if (currentClass !== null && currentSection !== null) {
        result.push({
          type: 'total',
          className: currentClass,
          sectionName: currentSection,
          sum: currentSum.toFixed(2),
        });
      }

      return result;
    })();

    // Add data and total rows
    enhancedRows.forEach((item) => {
      if (item.type === 'data') {
        const row = tableFields.map((field) => {
          const value = item.row[field.id] || '-';
          return field.id === 'amount' && !isNaN(value) ? Number(value) : value;
        });
        worksheet.addRow(row);
      } else {
        // Class/Section total row
        const row = tableFields.map((field) => {
          if (field.id === 'feeTypeName') return 'Total';
          if (field.id === 'amount') return Number(item.sum);
          return '';
        });
        worksheet.addRow(row);
      }
    });

    // Add grand total row
    const grandTotalRow = tableFields.map((field) => {
      if (field.id === 'feeTypeName') return 'Grand Total';
      if (field.id === 'amount') return Number(grandTotal);
      return '';
    });
    worksheet.addRow(grandTotalRow);

    // Adjust column widths
    worksheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : '';
        if (value.length > maxLength) maxLength = value.length;
      });
      column.width = maxLength + 2;
    });

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };

    // Style total rows (class/section and grand total)
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      if (row.getCell(tableFields.findIndex(f => f.id === 'feeTypeName') + 1).value === 'Total' ||
          row.getCell(tableFields.findIndex(f => f.id === 'feeTypeName') + 1).value === 'Grand Total') {
        row.font = { bold: true };
        row.alignment = { horizontal: 'center' };
      }
      for (let j = 1; j <= row.cellCount; j++) {
        const cell = row.getCell(j);
        if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        }
      }
    }

    // Save the file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `Fees_Structure_Report_${formatAcademicYear(selectedAcademicYear)}.xlsx`
    );
  } catch (error) {
    console.error('Error generating Excel file:', error);
    throw error;
  }
};

export const exportToPDF = async (
  filteredData,
  tableFields,
  headerMapping,
  grandTotal,
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

    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: -1;
      pointer-events: none;
    `;
    document.body.appendChild(hiddenContainer);

    const headerContainer = document.createElement('div');
    headerContainer.style.cssText = `
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      height: ${headerHeight * mmToPx}px;
      font-family: Arial, sans-serif;
      padding: 5px;
      background-color: #ffffff;
    `;
    headerContainer.innerHTML = generateHeader(school, logoImg ? logoSrc : '');
    hiddenContainer.appendChild(headerContainer);

    const footerContainer = document.createElement('div');
    footerContainer.style.cssText = `
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      height: ${footerHeight * mmToPx}px;
      font-family: Arial, sans-serif;
      background-color: #ffffff;
    `;
    footerContainer.innerHTML = generateFooter(school);
    hiddenContainer.appendChild(footerContainer);

    // Generate enhanced data with class/section-wise totals
    const enhancedRows = (() => {
      const result = [];
      let currentClass = null;
      let currentSection = null;
      let currentSum = 0;

      filteredData.forEach((row) => {
        if (row.className !== currentClass || row.sectionName !== currentSection) {
          if (currentClass !== null && currentSection !== null) {
            result.push({
              type: 'total',
              className: currentClass,
              sectionName: currentSection,
              sum: currentSum.toFixed(2),
            });
          }
          currentClass = row.className;
          currentSection = row.sectionName;
          currentSum = 0;
        }
        result.push({ type: 'data', row });
        currentSum += parseFloat(row.amount || 0);
      });

      if (currentClass !== null && currentSection !== null) {
        result.push({
          type: 'total',
          className: currentClass,
          sectionName: currentSection,
          sum: currentSum.toFixed(2),
        });
      }

      return result;
    })();

    const rowsPerPage = 15;
    const pageData = [];
    for (let i = 0; i < enhancedRows.length; i += rowsPerPage) {
      pageData.push(enhancedRows.slice(i, i + rowsPerPage));
    }
    if (enhancedRows.length > 0) {
      pageData[pageData.length - 1] = [
        ...pageData[pageData.length - 1],
        { type: 'grandTotal', grandTotal },
      ];
    } else {
      pageData.push([]);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    const headerCanvas = await html2canvas(headerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: headerHeight * mmToPx,
    });
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

    const footerCanvas = await html2canvas(footerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: footerHeight * mmToPx,
    });
    const footerImg = footerCanvas.toDataURL('image/jpeg', 0.98);

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

    const tableStyle = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          page-break-inside: auto;
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
        .total-row {
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
      </style>
    `;

    for (let page = 0; page < pageData.length; page++) {
      if (page > 0) pdf.addPage();

      const currentPageData = pageData[page];
      const tableContent = `
        ${tableStyle}
        <div class="pdf-title">Fees Structure Report - ${formatAcademicYear(selectedAcademicYear)}</div>
        <table>
          <thead>
            <tr>
              ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${currentPageData.length > 0
              ? currentPageData
                  .map((item) => {
                    if (item.type === 'data') {
                      return `
                        <tr>
                          ${tableFields
                            .map((field) => `<td>${item.row[field.id] || '-'}</td>`)
                            .join('')}
                        </tr>
                      `;
                    } else if (item.type === 'total') {
                      return `
                        <tr class="total-row">
                          <td colspan="5"><strong>Total</strong></td>
                          <td><strong>${item.sum}</strong></td>
                        </tr>
                      `;
                    } else if (item.type === 'grandTotal') {
                      return `
                        <tr class="total-row">
                          <td colspan="5"><strong>Grand Total</strong></td>
                          <td><strong>${item.grandTotal}</strong></td>
                        </tr>
                      `;
                    }
                    return '';
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
        logging: true,
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
    const fileName = `Fees_Structure_Report_${formatAcademicYear(selectedAcademicYear)}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF. Please check the console for details.');
  }
};