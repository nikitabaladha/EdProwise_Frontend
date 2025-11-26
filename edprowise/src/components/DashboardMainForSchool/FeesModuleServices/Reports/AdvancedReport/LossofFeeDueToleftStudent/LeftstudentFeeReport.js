
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const exportToExcel = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  grandTotals,
  formatAcademicYear,
  selectedYears
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Loss of Fee Due to Left Student');


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
    if (field.id === 'academicYear') return 'Total';
    if (field.id === 'feesDue') return Number(grandTotals.totalFeesDue);
    if (field.id === 'feesPaid') return Number(grandTotals.totalFeesPaid);
    if (field.id === 'concession') return Number(grandTotals.totalConcession);
    if (field.id === 'balance') return Number(grandTotals.totalBalance);
    return '';
  });
  worksheet.addRow(totalsRow);


  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value ? cell.value.toString() : '';
      if (value.length > maxLength) maxLength = value.length;
    });
    column.width = maxLength + 2;
  });


  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: 'center' };


  const totalRows = worksheet.rowCount;
  const lastRow = worksheet.getRow(totalRows);
  lastRow.font = { bold: true };
  lastRow.alignment = { horizontal: 'center' };

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


  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `Loss_of_Fee_Due_to_Left_Student_${formatAcademicYear(selectedYears)}.xlsx`
  );
};

export const exportToPDF = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  grandTotals,
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
        { isTotalsRow: true, grandTotals },
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
        <div class="pdf-title">Loss of Fee Due to Left Student - ${formatAcademicYear(selectedYears)}</div>
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
                          <td colspan="6"><strong>Total</strong></td>
                          ${tableFields
                            .slice(6)
                            .map((field) =>
                              field.id === 'feesDue'
                                ? `<td><strong>${grandTotals.totalFeesDue}</strong></td>`
                                : field.id === 'feesPaid'
                                ? `<td><strong>${grandTotals.totalFeesPaid}</strong></td>`
                                : field.id === 'concession'
                                ? `<td><strong>${grandTotals.totalConcession}</strong></td>`
                                : field.id === 'balance'
                                ? `<td><strong>${grandTotals.totalBalance}</strong></td>`
                                : `<td><strong>-</strong></td>`
                            )
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
    const fileName = `Loss_of_Fee_Due_to_Left_Student_${formatAcademicYear(selectedYears)}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF. Please check the console for details.');
  }
};
