// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { generateHeader, generateFooter } from '../../../PdfUtlisReport';

// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import { toast } from 'react-toastify';

// export const exportToExcel = async (
//   filteredData,
//   tableFields,
//   headerMapping,
//   getFieldValue,
//   totals,
//   formatAcademicYear,
//   selectedYears
// ) => {
//   try {
//     console.log('Starting Excel export...');
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Monthwise Collection INC Concession');

//     // Add headers
//     const headers = tableFields.map(field => headerMapping[field.id] || field.label);
//     worksheet.addRow(headers);

//     // Add data rows
//     filteredData.forEach(record => {
//       const row = tableFields.map(field => {
//         const value = getFieldValue(record, field);
//         return isNaN(value) || value === undefined ? (value || '') : Number(value);
//       });
//       worksheet.addRow(row);
//     });

//     // Add totals row
//     const totalsRow = tableFields.map(field => {
//       if (field.id === 'totalPaidFee') {
//         return Number(totals.totalPaidFee || 0);
//       } else if (totals[field.id] !== undefined) {
//         return Number(totals[field.id] || 0);
//       }
//       return '';
//     });
//     worksheet.addRow(totalsRow);

//     // Set column widths
//     worksheet.columns.forEach((column) => {
//       let maxLength = 10;
//       column.eachCell({ includeEmpty: true }, (cell) => {
//         const value = cell.value ? cell.value.toString() : '';
//         if (value.length > maxLength) maxLength = value.length;
//       });
//       column.width = maxLength + 2;
//     });

//     // Style header and totals rows
//     const totalRows = worksheet.rowCount;
//     const totalCols = worksheet.getRow(1).cellCount;
//     const headerRow = worksheet.getRow(1);
//     headerRow.font = { bold: true };
//     headerRow.alignment = { horizontal: 'center' };

//     const lastRow = worksheet.getRow(totalRows);
//     lastRow.font = { bold: true };
//     lastRow.alignment = { horizontal: 'center' };

//     // Add borders
//     for (let i = 1; i <= totalRows; i++) {
//       const row = worksheet.getRow(i);
//       for (let j = 1; j <= totalCols; j++) {
//         const cell = row.getCell(j);
//         if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
//           cell.border = {
//             top: { style: 'thin' },
//             left: { style: 'thin' },
//             bottom: { style: 'thin' },
//             right: { style: 'thin' }
//           };
//         }
//       }
//     }

//     console.log('Generating Excel buffer...');
//     const buffer = await workbook.xlsx.writeBuffer();
//     console.log('Saving Excel file...');
//     saveAs(
//       new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
//       `Monthwise_Collection_INC_Concession_${formatAcademicYear(selectedYears || '')}.xlsx`
//     );
//     console.log('Excel export completed.');
//   } catch (error) {
//     console.error('Excel export failed:', error);
//     toast.error(`Export to Excel failed: ${error.message}`);
//   }
// };


// export const exportToPDF = async (
//   groupedDataArray,
//   tableFields,
//   headerMapping,
//   getFieldValue,
//   totals,
//   formatAcademicYear,
//   selectedYears,
//   school,
//   logoSrc
// ) => {
//   try {
//     console.log('Starting PDF export...');
//     const pdf = new jsPDF({
//       unit: 'mm',
//       format: 'a4',
//       orientation: 'landscape',
//     });

//     const pageWidth = 297;
//     const pageHeight = 210;
//     const margin = 5;
//     const headerHeight = 30;
//     const footerHeight = 30;
//     const contentHeight = pageHeight - margin * 2 - headerHeight - footerHeight;
//     const mmToPx = 3.779;

//     const preloadImage = (src) => {
//       return new Promise((resolve) => {
//         if (!src) return resolve(null);
//         const img = new Image();
//         img.crossOrigin = 'Anonymous';
//         img.src = src;
//         img.onload = () => resolve(img);
//         img.onerror = (error) => {
//           console.error(`Failed to load image: ${src}`, error);
//           resolve(null);
//         };
//       });
//     };

//     console.log('Preloading logo image...');
//     const logoImg = await preloadImage(logoSrc);

//     const hiddenContainer = document.createElement('div');
//     hiddenContainer.style.cssText = `
//       position: absolute;
//       top: 0;
//       left: 0;
//       opacity: 0;
//       z-index: -1;
//       pointer-events: none;
//     `;
//     document.body.appendChild(hiddenContainer);

//     const headerContainer = document.createElement('div');
//     headerContainer.style.cssText = `
//       width: ${(pageWidth - margin * 2) * mmToPx}px;
//       height: ${headerHeight * mmToPx}px;
//       font-family: Arial, sans-serif;
//       padding: 5px;
//       background-color: #ffffff;
//     `;
//     headerContainer.innerHTML = generateHeader(school, logoImg ? logoSrc : '');
//     hiddenContainer.appendChild(headerContainer);

//     const footerContainer = document.createElement('div');
//     footerContainer.style.cssText = `
//       width: ${(pageWidth - margin * 2) * mmToPx}px;
//       height: ${footerHeight * mmToPx}px;
//       font-family: Arial, sans-serif;
//       background-color: #ffffff;
//     `;
//     footerContainer.innerHTML = generateFooter(school);
//     hiddenContainer.appendChild(footerContainer);

//     const tableContainer = document.createElement('div');
//     tableContainer.style.cssText = `
//       width: ${(pageWidth - margin * 2) * mmToPx}px;
//       max-height: ${contentHeight * mmToPx}px;
//       font-family: Arial, sans-serif;
//       font-size: 11px;
//       line-height: 1.2;
//       color: #000000;
//       overflow: hidden;
//       background-color: #ffffff;
//     `;

//     const tableStyle = `
//       <style>
//         table {
//           width: 100%;
//           border-collapse: collapse;
//           page-break-inside: auto;
//         }
//         th, td {
//           border: 1px solid #4b5563;
//           padding: 6px;
//           text-align: center;
//           font-size: 11px;
//           line-height: 1.2;
//         }
//         thead {
//           background-color: #e5e7eb;
//           font-weight: bold;
//         }
//         tfoot {
//           background-color: #e5e7eb;
//           font-weight: bold;
//         }
//         tr {
//           page-break-inside: avoid;
//           page-break-after: auto;
//         }
//         .pdf-title {
//           font-size: 16px;
//           font-weight: bold;
//           text-align: center;
//           margin-bottom: 8mm;
//           color: #000000;
//         }
//       </style>
//     `;

//     const rowsPerPage = 15;
//     const pageData = [];
//     for (let i = 0; i < groupedDataArray.length; i += rowsPerPage) {
//       pageData.push(groupedDataArray.slice(i, i + rowsPerPage));
//     }
//     if (groupedDataArray.length > 0) {
//       pageData[pageData.length - 1] = [
//         ...pageData[pageData.length - 1],
//         { isTotalsRow: true, totals },
//       ];
//     } else {
//       pageData.push([]);
//     }

//     console.log('Rendering header canvas...');
//     const headerCanvas = await html2canvas(headerContainer, {
//       scale: 1, // Reduced scale to avoid memory issues
//       useCORS: true,
//       allowTaint: false,
//       logging: true,
//       backgroundColor: '#ffffff',
//       windowWidth: (pageWidth - margin * 2) * mmToPx,
//       windowHeight: headerHeight * mmToPx,
//     });
//     const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

//     console.log('Rendering footer canvas...');
//     const footerCanvas = await html2canvas(footerContainer, {
//       scale: 1,
//       useCORS: true,
//       allowTaint: false,
//       logging: true,
//       backgroundColor: '#ffffff',
//       windowWidth: (pageWidth - margin * 2) * mmToPx,
//       windowHeight: footerHeight * mmToPx,
//     });
//     const footerImg = footerCanvas.toDataURL('image/jpeg', 0.98);

//     for (let page = 0; page < pageData.length; page++) {
//       if (page > 0) pdf.addPage();

//       const currentPageData = pageData[page];
//       const tableContent = `
//         ${tableStyle}
//         <div class="pdf-title">Monthwise Collection INC Concession - ${formatAcademicYear(selectedYears)}</div>
//         <table>
//           <thead>
//             <tr>
//               ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
//             </tr>
//           </thead>
//           <tbody>
//             ${currentPageData.length > 0
//               ? currentPageData
//                   .map((record) => {
//                     if (record.isTotalsRow) {
//                       return `
//                         <tr>
//                           <td colspan="3"><strong>Total</strong></td>
//                           ${tableFields
//                             .slice(3)
//                             .map((field) =>
//                               field.id === 'totalPaidFee'
//                                 ? `<td><strong>${(totals.totalPaidFee || 0).toFixed(2)}</strong></td>`
//                                 : `<td><strong>${(totals[field.id] || 0).toFixed(2)}</strong></td>`
//                             )
//                             .join('')}
//                         </tr>
//                       `;
//                     }
//                     return `
//                       <tr>
//                         ${tableFields
//                           .map((field, idx) => {
//                             if (
//                               (field.id === 'month' ||
//                                 field.id === 'paymentDate' ||
//                                 field.id === 'academicYear' ||
//                                 field.id === 'paymentMode') &&
//                               !record.isFirstInGroup
//                             ) {
//                               return '';
//                             }
//                             const rowspanAttr =
//                               (field.id === 'month' ||
//                                 field.id === 'paymentDate' ||
//                                 field.id === 'academicYear' ||
//                                 field.id === 'paymentMode') &&
//                               record.isFirstInGroup &&
//                               record.rowspan > 1
//                                 ? `rowspan="${record.rowspan}"`
//                                 : '';
//                             return `<td ${rowspanAttr}>${getFieldValue(record, field)}</td>`;
//                           })
//                           .join('')}
//                       </tr>
//                     `;
//                   })
//                   .join('')
//               : `<tr><td colspan="${tableFields.length}">No data matches the selected filters for ${formatAcademicYear(selectedYears)}.</td></tr>`
//             }
//           </tbody>
//         </table>
//       `;

//       console.log('Rendering table for page', page + 1);
//       tableContainer.innerHTML = tableContent;
//       hiddenContainer.appendChild(tableContainer);

//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const tableCanvas = await html2canvas(tableContainer, {
//         scale: 1,
//         useCORS: true,
//         allowTaint: false,
//         logging: true,
//         backgroundColor: '#ffffff',
//         windowWidth: (pageWidth - margin * 2) * mmToPx,
//       });
//       const tableImg = tableCanvas.toDataURL('image/jpeg', 0.98);
//       const tableImgHeight = (tableCanvas.height / mmToPx) * (pageWidth - margin * 2) / (tableCanvas.width / mmToPx);

//       pdf.addImage(headerImg, 'JPEG', margin, margin, pageWidth - margin * 2, headerHeight);

//       const destHeight = Math.min(contentHeight, tableImgHeight);
//       if (destHeight > 0) {
//         pdf.addImage(
//           tableImg,
//           'JPEG',
//           margin,
//           margin + headerHeight,
//           pageWidth - margin * 2,
//           destHeight
//         );
//       } else {
//         console.warn(`Page ${page + 1} - Table height is 0, skipping table rendering.`);
//         pdf.text('No content to display', margin, margin + headerHeight + 10);
//       }

//       pdf.addImage(footerImg, 'JPEG', margin, pageHeight - footerHeight - margin, pageWidth - margin * 2, footerHeight);

//       hiddenContainer.removeChild(tableContainer);
//     }

//     document.body.removeChild(hiddenContainer);
//     const fileName = `Monthwise_Collection_INC_Concession_${formatAcademicYear(selectedYears || '')}.pdf`;
//     console.log('Saving PDF:', fileName);
//     pdf.save(fileName);
//     console.log('PDF export completed.');
//   } catch (error) {
//     console.error('PDF export failed:', error);
//     toast.error(`Export to PDF failed: ${error.message}`);
//   }
// };

// ExportModalMonthWiseFeesCollection.jsx

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

export const exportToExcel = async (
  groupedDataArray,
  tableFields,
  headerMapping,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedYears,
  viewMode
) => {
  try {
    console.log('Starting Excel export...');
    console.log('Export to Excel - Grouped Data Array:', groupedDataArray);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Monthwise Collection EXC Concession');


    const headers = tableFields.map(field => headerMapping[field.id] || field.label);
    worksheet.addRow(headers);


    groupedDataArray.forEach(item => {
      const record = item.record;
      const isTotalRow = item.isTotalRow || false;
      const row = tableFields.map(field => {
        if (isTotalRow && (field.id === 'month' || field.id === 'paymentDate')) {
          return record.month || record.paymentDate || '';
        } else if (isTotalRow && (field.id === 'academicYear' || field.id === 'paymentMode')) {
          return '';
        }
        const value = getFieldValue(record, field);
        return isNaN(value) || value === undefined ? (value || '') : Number(value);
      });
      const excelRow = worksheet.addRow(row);
      if (isTotalRow) {
        excelRow.font = { bold: true };
        excelRow.alignment = { horizontal: 'center' };
        if (tableFields.some(field => field.id === 'month' || field.id === 'paymentDate')) {
          excelRow.getCell(1).value = record.month;
          excelRow.getCell(1).numFmt = '@';
          excelRow.getCell(2).value = '';
          excelRow.getCell(3).value = '';
        }
      }
    });

    // Add grand totals row
    const totalsRow = tableFields.map(field => {
      if (field.id === 'month' || field.id === 'paymentDate') {
        return 'Grand Total';
      } else if (field.id === 'academicYear' || field.id === 'paymentMode') {
        return '';
      } else if (field.id === 'totalPaidFee') {
        return Number(totals.totalPaidFee || 0);
      } else if (totals[field.id] !== undefined) {
        return Number(totals[field.id] || 0);
      }
      return '';
    });
    const grandTotalRow = worksheet.addRow(totalsRow);
    grandTotalRow.font = { bold: true };
    grandTotalRow.alignment = { horizontal: 'center' };

 
    worksheet.columns.forEach((column, colIndex) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : '';
        if (value.length > maxLength) maxLength = value.length;
      });
      column.width = maxLength + 2;
      column.numFmt = colIndex >= 3 ? '#,##0.00' : '@';
    });


    const totalRows = worksheet.rowCount;
    const totalCols = worksheet.getRow(1).cellCount;
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };

   
    for (let i = 1; i <= totalRows; i++) {
      const row = worksheet.getRow(i);
      for (let j = 1; j <= totalCols; j++) {
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

    console.log('Generating Excel buffer...');
    const buffer = await workbook.xlsx.writeBuffer();
    console.log('Saving Excel file...');
    const fileName = `Monthwise_Collection_EXC_Concession_${formatAcademicYear(selectedYears || '')}_${viewMode}.xlsx`;
    saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      fileName
    );
    console.log('Excel export completed.');
  } catch (error) {
    console.error('Excel export failed:', error);
    toast.error(`Export to Excel failed: ${error.message}`);
  }
};

export const exportToPDF = async (
  groupedDataArray,
  tableFields,
  headerMapping,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedYears,
  school,
  logoSrc,
  viewMode
) => {
  try {
    console.log('Starting PDF export...');
    console.log('Export to PDF - Grouped Data Array:', groupedDataArray);
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
        img.onerror = (error) => {
          console.error(`Failed to load image: ${src}`, error);
          resolve(null);
        };
      });
    };

    console.log('Preloading logo image...');
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
        .total-row {
          font-weight: bold;
          background-color: #f3f4f6;
        }
        .grand-total-row {
          font-weight: bold;
          background-color: #e5e7eb;
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
    let pageData = [];
    for (let i = 0; i < groupedDataArray.length; i += rowsPerPage) {
      pageData.push(groupedDataArray.slice(i, i + rowsPerPage));
    }

    console.log('Rendering header canvas...');
    const headerCanvas = await html2canvas(headerContainer, {
      scale: 1,
      useCORS: true,
      allowTaint: false,
      logging: true,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: headerHeight * mmToPx,
    });
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

    console.log('Rendering footer canvas...');
    const footerCanvas = await html2canvas(footerContainer, {
      scale: 1,
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

      let currentPageData = pageData[page];
      if (page === pageData.length - 1) {
        currentPageData = [...currentPageData, { isTotalsRow: true, totals }];
      }

      const tableContent = `
        ${tableStyle}
        <div class="pdf-title">Monthwise Collection EXC Concession - ${formatAcademicYear(selectedYears)} (${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)})</div>
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
                    if (item.isTotalsRow) {
                      return `
                        <tr class="grand-total-row">
                          <td colspan="3"><strong>Grand Total</strong></td>
                          ${tableFields
                            .slice(3)
                            .map((field) =>
                              field.id === 'totalPaidFee'
                                ? `<td><strong>${(item.totals.totalPaidFee || 0).toFixed(2)}</strong></td>`
                                : `<td><strong>${(item.totals[field.id] || 0).toFixed(2)}</strong></td>`
                            )
                            .join('')}
                        </tr>
                      `;
                    }
                    const record = item.record;
                    const isTotalRow = item.isTotalRow || false;
                    return `
                      <tr${isTotalRow ? ' class="total-row"' : ''}>
                        ${tableFields
                          .map((field, index) => {
                            if (isTotalRow && index < 3) {
                              return index === 0
                                ? `<td colspan="3"><strong>${record.month}</strong></td>`
                                : '';
                            }
                            if (
                              (field.id === 'month' ||
                                field.id === 'paymentDate' ||
                                field.id === 'academicYear' ||
                                field.id === 'paymentMode') &&
                              !item.isFirstInGroup
                            ) {
                              return '';
                            }
                            const rowspanAttr =
                              (field.id === 'month' ||
                                field.id === 'paymentDate' ||
                                field.id === 'academicYear' ||
                                field.id === 'paymentMode') &&
                              item.isFirstInGroup &&
                              item.rowspan > 1
                                ? `rowspan="${item.rowspan}"`
                                : '';
                            const value = getFieldValue(record, field);
                            return `<td ${rowspanAttr}${isTotalRow && index >= 3 ? ' style="font-weight: bold;"' : ''}>${value}</td>`;
                          })
                          .filter(cell => cell !== '')
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

      console.log('Rendering table for page', page + 1);
      tableContainer.innerHTML = tableContent;
      hiddenContainer.appendChild(tableContainer);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const tableCanvas = await html2canvas(tableContainer, {
        scale: 1,
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
    const fileName = `Monthwise_Collection_EXC_Concession_${formatAcademicYear(selectedYears || '')}_${viewMode}.pdf`;
    console.log('Saving PDF:', fileName);
    pdf.save(fileName);
    console.log('PDF export completed.');
  } catch (error) {
    console.error('PDF export failed:', error);
    toast.error(`Export to PDF failed: ${error.message}`);
  }
};