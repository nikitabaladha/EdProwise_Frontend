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

    // Add data rows
    filteredData.forEach(record => {
      const row = tableFields.map(field => {
        const value = record[field.id] || '-';
        return isNaN(value) ? value : Number(value);
      });
      worksheet.addRow(row);
    });

    // Add total row
    const totalsRow = tableFields.map(field => {
      if (field.id === 'amount') return Number(grandTotal);
      return field.id === 'feeTypeName' ? 'Total' : '';
    });
    worksheet.addRow(totalsRow);

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

    // Style total row
    const totalRows = worksheet.rowCount;
    const lastRow = worksheet.getRow(totalRows);
    lastRow.font = { bold: true };
    lastRow.alignment = { horizontal: 'center' };

    // Add borders to all cells
    for (let i = 1; i <= totalRows; i++) {
      const row = worksheet.getRow(i);
      for (let j = 1; j <= worksheet.getRow(1).cellCount; j++) {
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
      </style>
    `;

    const rowsPerPage = 15;
    const pageData = [];
    for (let i = 0; i < filteredData.length; i += rowsPerPage) {
      pageData.push(filteredData.slice(i, i + rowsPerPage));
    }
    if (filteredData.length > 0) {
      pageData[pageData.length - 1] = [
        ...pageData[pageData.length - 1],
        { isTotalsRow: true, grandTotal },
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
                  .map((record) => {
                    if (record.isTotalsRow) {
                      return `
                        <tr>
                          <td colspan="5"><strong>Total</strong></td>
                          <td><strong>${grandTotal}</strong></td>
                        </tr>
                      `;
                    }
                    return `
                      <tr>
                        ${tableFields
                          .map((field) => `<td>${record[field.id] || '-'}</td>`)
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