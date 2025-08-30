import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportToExcel = async (
  filteredData,
  tableFields,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedYears
) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Studentwise Collection Inc Concession Report');


    const headers = tableFields.map((field) => field.label);
    worksheet.addRow(headers);


    filteredData.forEach((record) => {
      const row = tableFields.map((field) => {
        const value = getFieldValue(record, field);
        return field.isNumeric && !isNaN(value) ? Number(value) : value;
      });
      worksheet.addRow(row);
    });


    const nonNumericColumnsCount = tableFields.filter((field) => !field.isNumeric).length;
    const totalsRow = tableFields.map((field, index) => {
      if (index < nonNumericColumnsCount) {
        return index === 0 ? 'Total' : '';
      }
      return totals[field.id] !== undefined ? Number(totals[field.id]).toFixed(2) : '';
    });
    worksheet.addRow(totalsRow);

  
    worksheet.columns.forEach((column, index) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : '';
        if (value.length > maxLength) maxLength = value.length;
      });
      column.width = Math.min(maxLength + 2, 50); 
    });


    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

  
    const lastRow = worksheet.getRow(worksheet.rowCount);
    lastRow.font = { bold: true };
    lastRow.alignment = { horizontal: 'center', vertical: 'middle' };
    lastRow.eachCell((cell) => {
      if (cell.value) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
    });

   
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        if (cell.value && rowNumber !== 1 && rowNumber !== worksheet.rowCount) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        }
      });
    });


    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Studentwise_Collection_Inc_Concession_Report_${formatAcademicYear(selectedYears)}.xlsx`);
  } catch (error) {
    console.error('Excel export failed:', error);
    throw new Error('Failed to export to Excel');
  }
};

export const exportToPDF = async (
  filteredData,
  tableFields,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedYears,
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
    const nonNumericColumnsCount = tableFields.filter((field) => !field.isNumeric).length;


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
      top: -9999px;
      left: -9999px;
      opacity: 0;
      z-index: -1;
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

    // Paginate data
    const rowsPerPage = 15;
    const pageData = [];
    for (let i = 0; i < filteredData.length; i += rowsPerPage) {
      pageData.push(filteredData.slice(i, i + rowsPerPage));
    }
    if (filteredData.length > 0) {
      pageData[pageData.length - 1] = [
        ...pageData[pageData.length - 1],
        { isTotalsRow: true, totals },
      ];
    } else {
      pageData.push([]);
    }

    // Render header and footer canvases
    const headerCanvas = await html2canvas(headerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
    });
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.95);

    const footerCanvas = await html2canvas(footerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
    });
    const footerImg = footerCanvas.toDataURL('image/jpeg', 0.95);

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
        background-color: #ffffff;
      `;

      const tableContent = `
        ${tableStyle}
        <div class="pdf-title">Studentwise Collection Inc Concession Report - ${formatAcademicYear(selectedYears)}</div>
        <table>
          <thead>
            <tr>
              ${tableFields.map((field) => `<th>${field.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${currentPageData.length > 0
              ? currentPageData
                  .map((record) => {
                    if (record.isTotalsRow) {
                      return `
                        <tr>
                          <td colspan="${nonNumericColumnsCount}"><strong>Total</strong></td>
                          ${tableFields
                            .slice(nonNumericColumnsCount)
                            .map((field) => `<td><strong>${(totals[field.id] || 0).toFixed(2)}</strong></td>`)
                            .join('')}
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
              : `<tr><td colspan="${tableFields.length}">No data matches the selected filters for ${formatAcademicYear(selectedYears)}.</td></tr>`
            }
          </tbody>
        </table>
      `;

      tableContainer.innerHTML = tableContent;
      hiddenContainer.appendChild(tableContainer);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const tableCanvas = await html2canvas(tableContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
      });
      const tableImg = tableCanvas.toDataURL('image/jpeg', 0.95);
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
        pdf.text('No content to display', margin, margin + headerHeight + 10);
      }

      pdf.addImage(footerImg, 'JPEG', margin, pageHeight - footerHeight - margin, pageWidth - margin * 2, footerHeight);

      hiddenContainer.removeChild(tableContainer);
    }

 
    document.body.removeChild(hiddenContainer);

 
    const fileName = `Studentwise_Collection_Inc_Concession_Report_${formatAcademicYear(selectedYears)}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF');
  }
};