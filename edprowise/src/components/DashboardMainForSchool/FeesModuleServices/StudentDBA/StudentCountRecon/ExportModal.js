import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { generateHeader, generateFooter } from '../../PdfUtlisReport';

export const exportToExcel = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedAcademicYear
) => {
  if (!filteredData || filteredData.length === 0) {
    throw new Error('No data available to export');
  }
  if (!tableFields || tableFields.length === 0) {
    throw new Error('No table fields defined');
  }

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Student Count Recon Report');

    const headers = tableFields.map(field => headerMapping[field.id] || field.label);
    worksheet.addRow(headers);

    const classGroups = filteredData.reduce((acc, record) => {
      const className = record.className;
      if (!acc[className]) {
        acc[className] = [];
      }
      acc[className].push(record);
      return acc;
    }, {});

    Object.keys(classGroups).forEach(className => {
      const classData = classGroups[className];
      classData.forEach(record => {
        const row = tableFields.map(field => getFieldValue(record, field));
        worksheet.addRow(row);
      });

      const classTotal = classData.reduce(
        (acc, record) => ({
          maleCount: acc.maleCount + record.maleCount,
          femaleCount: acc.femaleCount + record.femaleCount,
          totalCount: acc.totalCount + record.totalCount,
        }),
        { maleCount: 0, femaleCount: 0, totalCount: 0 }
      );
      worksheet.addRow(['Total', '', classTotal.maleCount.toFixed(2), classTotal.femaleCount.toFixed(2), classTotal.totalCount.toFixed(2)]);
    });

    worksheet.addRow(['Grand Total', '', totals.maleCount.toFixed(2), totals.femaleCount.toFixed(2), totals.totalCount.toFixed(2)]);

    worksheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 2;
    });

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };

    const totalRows = worksheet.rowCount;
    for (let i = 2; i <= totalRows; i++) {
      const row = worksheet.getRow(i);
      if (row.getCell(1).value === 'Total' || row.getCell(1).value === 'Grand Total') {
        row.font = { bold: true };
        row.alignment = { horizontal: 'center' };
      }
      for (let j = 1; j <= headers.length; j++) {
        const cell = row.getCell(j);
        if (cell.value !== null && cell.value !== undefined) {
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
    if (!buffer) {
      throw new Error('Failed to generate Excel buffer');
    }
    saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `Student_Count_Recon_${formatAcademicYear(selectedAcademicYear)}.xlsx`
    );
  } catch (error) {
    console.error('Excel export failed:', error);
    throw new Error(`Excel export failed: ${error.message}`);
  }
};

export const exportToPDF = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedAcademicYear,
  school,
  logoSrc
) => {
  if (!tableFields || tableFields.length === 0) {
    throw new Error('No table fields defined');
  }

  try {
    console.log('Starting exportToPDF with filteredData:', filteredData);
    console.log('School:', school, 'LogoSrc:', logoSrc);
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape',
    });

    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 10;
    const headerHeight = 30;
    const footerHeight = 20;
    const contentHeight = pageHeight - margin * 2 - headerHeight - footerHeight;
    const mmToPx = 3.779;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        if (!src) {
          console.warn('No logoSrc provided, skipping image load');
          return resolve(null);
        }
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = src;
        img.onload = () => {
          console.log('Logo loaded successfully:', src);
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}. Using fallback.`);
          resolve(null);
        };
      });
    };

    const logoImg = await preloadImage(logoSrc);

    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.cssText = `
      position: fixed;
      top: -10000px;
      left: -10000px;
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      background-color: #ffffff;
      padding: 10px;
      box-sizing: border-box;
    `;
    document.body.appendChild(hiddenContainer);

    const headerContainer = document.createElement('div');
    headerContainer.style.cssText = `
      width: 100%;
      height: ${headerHeight * mmToPx}px;
      font-family: Arial, sans-serif;
      padding: 5px;
      background-color: #ffffff;
      text-align: center;
    `;
    const headerContent = generateHeader(school, logoImg ? logoSrc : '') || '<h2>School Header</h2>';
    headerContainer.innerHTML = headerContent;
    hiddenContainer.appendChild(headerContainer);

    const footerContainer = document.createElement('div');
    footerContainer.style.cssText = `
      width: 100%;
      height: ${footerHeight * mmToPx}px;
      font-family: Arial, sans-serif;
      padding: 5px;
      background-color: #ffffff;
      text-align: center;
    `;
    const footerContent = generateFooter(school) || '<p>School Footer</p>';
    footerContainer.innerHTML = footerContent;
    hiddenContainer.appendChild(footerContainer);

    const tableStyle = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          font-family: Arial, sans-serif;
          font-size: 12px;
        }
        th, td {
          border: 1px solid #4b5563;
          padding: 8px;
          text-align: center;
          vertical-align: middle;
        }
        thead {
          background-color: #e5e7eb;
          font-weight: bold;
        }
        .total-row, .grand-total-row {
          background-color: #e5e7eb;
          font-weight: bold;
        }
        .pdf-title {
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          margin: 10px 0;
          color: #000000;
        }
      </style>
    `;

    const classGroups = filteredData.reduce((acc, record) => {
      const className = record.className || 'Unknown';
      if (!acc[className]) {
        acc[className] = [];
      }
      acc[className].push(record);
      return acc;
    }, {});

    const rowsPerPage = 15;
    const pageData = [];
    const allRows = [];
    Object.keys(classGroups).forEach(className => {
      const classData = classGroups[className];
      classData.forEach(record => allRows.push({ record }));
      const classTotal = classData.reduce(
        (acc, record) => ({
          maleCount: acc.maleCount + (record.maleCount || 0),
          femaleCount: acc.femaleCount + (record.femaleCount || 0),
          totalCount: acc.totalCount + (record.totalCount || 0),
        }),
        { maleCount: 0, femaleCount: 0, totalCount: 0 }
      );
      allRows.push({ isTotalRow: true, className, totals: classTotal });
    });
    allRows.push({ isGrandTotalRow: true, totals });

    for (let i = 0; i < allRows.length; i += rowsPerPage) {
      pageData.push(allRows.slice(i, i + rowsPerPage));
    }
    if (allRows.length === 0) {
      pageData.push([]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const headerCanvas = await html2canvas(headerContainer, {
      scale: 3,
      useCORS: true,
      allowTaint: false,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: headerHeight * mmToPx,
    });
    console.log('Header Canvas:', headerCanvas.toDataURL('image/jpeg', 0.98));
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

    const footerCanvas = await html2canvas(footerContainer, {
      scale: 3,
      useCORS: true,
      allowTaint: false,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: footerHeight * mmToPx,
    });
    console.log('Footer Canvas:', footerCanvas.toDataURL('image/jpeg', 0.98));
    const footerImg = footerCanvas.toDataURL('image/jpeg', 0.98);

    for (let page = 0; page < pageData.length; page++) {
      if (page > 0) pdf.addPage();

      const currentPageData = pageData[page];
      const tableContainer = document.createElement('div');
      tableContainer.style.cssText = `
        width: 100%;
        max-height: ${contentHeight * mmToPx}px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        line-height: 1.4;
        color: #000000;
        background-color: #ffffff;
        padding: 5px;
        overflow: hidden;
      `;

      const tableContent = `
        ${tableStyle}
        <div class="pdf-title">Student Count Recon Report - ${formatAcademicYear(selectedAcademicYear)}</div>
        <table>
          <thead>
            <tr>
              ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${currentPageData.length > 0
              ? currentPageData
                  .map((row) => {
                    if (row.isTotalRow) {
                      return `
                        <tr class="total-row">
                          <td colspan="2"><strong>Total</strong></td>
                          <td><strong>${(row.totals.maleCount || 0).toFixed(2)}</strong></td>
                          <td><strong>${(row.totals.femaleCount || 0).toFixed(2)}</strong></td>
                          <td><strong>${(row.totals.totalCount || 0).toFixed(2)}</strong></td>
                        </tr>
                      `;
                    } else if (row.isGrandTotalRow) {
                      return `
                        <tr class="grand-total-row">
                          <td colspan="2"><strong>Grand Total</strong></td>
                          <td><strong>${(row.totals.maleCount || 0).toFixed(2)}</strong></td>
                          <td><strong>${(row.totals.femaleCount || 0).toFixed(2)}</strong></td>
                          <td><strong>${(row.totals.totalCount || 0).toFixed(2)}</strong></td>
                        </tr>
                      `;
                    }
                    return `
                      <tr>
                        ${tableFields
                          .map((field) => `<td>${getFieldValue(row.record, field)}</td>`)
                          .join('')}
                      </tr>
                    `;
                  })
                  .join('')
              : `<tr><td colspan="${tableFields.length}">No data available for ${formatAcademicYear(selectedAcademicYear)}.</td></tr>`
            }
          </tbody>
        </table>
      `;

      tableContainer.innerHTML = tableContent;
      hiddenContainer.appendChild(tableContainer);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const tableCanvas = await html2canvas(tableContainer, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: true,
        backgroundColor: '#ffffff',
        windowWidth: (pageWidth - margin * 2) * mmToPx,
      });
      console.log('Table Canvas:', tableCanvas.toDataURL('image/jpeg', 0.98));
      const tableImg = tableCanvas.toDataURL('image/jpeg', 0.98);
      const tableImgHeight = (tableCanvas.height / mmToPx) * (pageWidth - margin * 2) / (tableCanvas.width / mmToPx);
      const destHeight = Math.min(contentHeight, tableImgHeight > 0 ? tableImgHeight : contentHeight / 2);

      pdf.addImage(headerImg, 'JPEG', margin, margin, pageWidth - margin * 2, headerHeight);

      if (tableCanvas.width > 0 && tableCanvas.height > 0) {
        pdf.addImage(
          tableImg,
          'JPEG',
          margin,
          margin + headerHeight,
          pageWidth - margin * 2,
          destHeight
        );
      } else {
        console.warn(`Page ${page + 1} - Empty table canvas, rendering fallback text`);
        pdf.setFontSize(12);
        pdf.text('No content to display', margin, margin + headerHeight + 10);
      }

      pdf.addImage(footerImg, 'JPEG', margin, pageHeight - footerHeight - margin, pageWidth - margin * 2, footerHeight);

      hiddenContainer.removeChild(tableContainer);
    }

    document.body.removeChild(hiddenContainer);
    pdf.save(`Student_Count_Recon_${formatAcademicYear(selectedAcademicYear)}.pdf`);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error(`PDF export failed: ${error.message}`);
  }
};