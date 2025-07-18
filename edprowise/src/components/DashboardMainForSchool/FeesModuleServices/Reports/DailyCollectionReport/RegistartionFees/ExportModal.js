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
  calculateBalance,
  totals,
  formatAcademicYear,
  selectedAcademicYear
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Registration Fees');

  const headers = tableFields.map(field => headerMapping[field.id] || field.label);
  headers.push('Balance');
  worksheet.addRow(headers);

  filteredData.forEach(record => {
    const row = tableFields.map(field => {
      const value = getFieldValue(record, field);
      return isNaN(value) ? value : Number(value);
    });
    row.push(Number(calculateBalance(record)));
    worksheet.addRow(row);
  });

  const totalsRow = tableFields.map(field => {
    if (field.id === 'regFeesDue') return Number(totals.feesDue);
    else if (field.id === 'regFeesPaid') return Number(totals.feesPaid);
    else if (field.id === 'regFeesConcession') return Number(totals.concession);
    return '';
  });
  totalsRow.push(Number(totals.balance));
  worksheet.addRow(totalsRow);

  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const value = cell.value ? cell.value.toString() : '';
      if (value.length > maxLength) maxLength = value.length;
    });
    column.width = maxLength + 2;
  });

  const totalRows = worksheet.rowCount;
  const totalCols = worksheet.getRow(1).cellCount;

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: 'center' };

  const lastRow = worksheet.getRow(totalRows);
  lastRow.font = { bold: true };
  lastRow.alignment = { horizontal: 'center' };

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

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `Registration_Fees_${formatAcademicYear(selectedAcademicYear)}.xlsx`
  );
};


export const exportToPDF = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  calculateBalance,
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
      opacity: 0; /* Invisible but renderable */
      z-index: -1; /* Ensure it's behind other elements */
      pointer-events: none; /* Prevent interaction */
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
        { isTotalsRow: true, totals },
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
        <div class="pdf-title">Registration Fees Report - ${formatAcademicYear(selectedAcademicYear)}</div>
        <table>
          <thead>
            <tr>
              ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            ${currentPageData.length > 0
              ? currentPageData
                  .map((record) => {
                    if (record.isTotalsRow) {
                      return `
                        <tr>
                          <td colspan="${tableFields.length - 3}"><strong>Total</strong></td>
                          <td><strong>${totals.feesDue}</strong></td>
                          <td><strong>${totals.feesPaid}</strong></td>
                          <td><strong>${totals.concession}</strong></td>
                          <td><strong>${totals.balance}</strong></td>
                        </tr>
                      `;
                    }
                    return `
                      <tr>
                        ${tableFields
                          .map((field) => `<td>${getFieldValue(record, field)}</td>`)
                          .join('')}
                        <td>${calculateBalance(record)}</td>
                      </tr>
                    `;
                  })
                  .join('')
              : `<tr><td colspan="${tableFields.length + 1}">No data matches the selected filters for ${formatAcademicYear(selectedAcademicYear)}.</td></tr>`
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
    pdf.save(`Registration_Fees_${formatAcademicYear(selectedAcademicYear)}.pdf`);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF. Please check the console for details.');
  }
};

// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { generateHeader, generateFooter } from '../../../PdfUtlisReport';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';

// export const exportToExcel = async (
//   filteredData,
//   tableFields,
//   headerMapping,
//   getFieldValue,
//   calculateBalance,
//   totals,
//   formatAcademicYear,
//   selectedAcademicYear
// ) => {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('Registration Fees');

//   // Add headers
//   const headers = tableFields.map(field => headerMapping[field.id] || field.label);
//   headers.push('Balance');
//   worksheet.addRow(headers);

//   // Group data by date
//   const groupedByDate = filteredData.reduce((acc, record) => {
//     const date = ['Cancelled', 'Cheque Return'].includes(record.student?.reportStatus)
//       ? record.student.regFeesCancelledDate
//       : record.student.regFeesDate;
//     if (!acc[date]) acc[date] = [];
//     acc[date].push(record);
//     return acc;
//   }, {});

//   // Calculate totals per date (Paid - Cancelled/Cheque Return)
//   const dateTotals = Object.keys(groupedByDate).reduce((acc, date) => {
//     acc[date] = groupedByDate[date].reduce(
//       (totals, record) => {
//         const due = parseInt(record.student?.regFeesDue || 0, 10);
//         const paid = parseInt(record.student?.regFeesPaid || 0, 10);
//         const concession = parseInt(record.student?.regFeesConcession || 0, 10);
//         const balance = due - concession - paid;
//         const multiplier = ['Cancelled', 'Cheque Return'].includes(record.student?.reportStatus) ? -1 : 1;
//         return {
//           feesDue: totals.feesDue + due * multiplier,
//           feesPaid: totals.feesPaid + paid * multiplier,
//           concession: totals.concession + concession * multiplier,
//           balance: totals.balance + balance * multiplier,
//         };
//       },
//       { feesDue: 0, feesPaid: 0, concession: 0, balance: 0 }
//     );
//     return acc;
//   }, {});

//   // Add data rows and per-date totals
//   Object.keys(groupedByDate).sort().forEach((date) => {
//     groupedByDate[date].forEach((record) => {
//       const row = tableFields.map(field => {
//         const value = getFieldValue(record, field);
//         return isNaN(value) ? value : Number(value);
//       });
//       row.push(Number(calculateBalance(record)));
//       worksheet.addRow(row);
//     });
//     // Add total row for the date
//     const totalRow = tableFields.map(field => {
//       if (field.id === 'regFeesDate') return `Total for ${date}`;
//       if (field.id === 'regFeesDue') return dateTotals[date].feesDue;
//       if (field.id === 'regFeesPaid') return dateTotals[date].feesPaid;
//       if (field.id === 'regFeesConcession') return dateTotals[date].concession;
//       return '';
//     });
//     totalRow.push(dateTotals[date].balance);
//     worksheet.addRow(totalRow);
//   });

//   // Add main total row
//   const mainTotalRow = tableFields.map(field => {
//     if (field.id === 'regFeesDate') return 'Total';
//     if (field.id === 'regFeesDue') return totals.feesDue;
//     if (field.id === 'regFeesPaid') return totals.feesPaid;
//     if (field.id === 'regFeesConcession') return totals.concession;
//     return '';
//   });
//   mainTotalRow.push(totals.balance);
//   worksheet.addRow(mainTotalRow);

//   // Auto-size columns
//   worksheet.columns.forEach((column) => {
//     let maxLength = 10;
//     column.eachCell({ includeEmpty: true }, (cell) => {
//       const value = cell.value ? cell.value.toString() : '';
//       if (value.length > maxLength) maxLength = value.length;
//     });
//     column.width = maxLength + 2;
//   });

//   // Style header row
//   const headerRow = worksheet.getRow(1);
//   headerRow.font = { bold: true };
//   headerRow.alignment = { horizontal: 'center' };

//   // Style total rows (per-date and main total)
//   for (let i = 1; i <= worksheet.rowCount; i++) {
//     const row = worksheet.getRow(i);
//     if (row.getCell(1).value && row.getCell(1).value.toString().startsWith('Total')) {
//       row.font = { bold: true };
//       row.alignment = { horizontal: 'center' };
//     }
//     for (let j = 1; j <= row.cellCount; j++) {
//       const cell = row.getCell(j);
//       if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
//         cell.border = {
//           top: { style: 'thin' },
//           left: { style: 'thin' },
//           bottom: { style: 'thin' },
//           right: { style: 'thin' }
//         };
//       }
//     }
//   }

//   const buffer = await workbook.xlsx.writeBuffer();
//   saveAs(
//     new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
//     `Registration_Fees_${formatAcademicYear(selectedAcademicYear)}.xlsx`
//   );
// };

// export const exportToPDF = async (
//   filteredData,
//   tableFields,
//   headerMapping,
//   getFieldValue,
//   calculateBalance,
//   totals,
//   formatAcademicYear,
//   selectedAcademicYear,
//   school,
//   logoSrc
// ) => {
//   try {
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
//         img.onerror = () => {
//           console.warn(`Failed to load image: ${src}. Using fallback.`);
//           resolve(null);
//         };
//       });
//     };

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

//     // Group data by date
//     const groupedByDate = filteredData.reduce((acc, record) => {
//       const date = ['Cancelled', 'Cheque Return'].includes(record.student?.reportStatus)
//         ? record.student.regFeesCancelledDate
//         : record.student.regFeesDate;
//       if (!acc[date]) acc[date] = [];
//       acc[date].push(record);
//       return acc;
//     }, {});

//     // Calculate totals per date (Paid - Cancelled/Cheque Return)
//     const dateTotals = Object.keys(groupedByDate).reduce((acc, date) => {
//       acc[date] = groupedByDate[date].reduce(
//         (totals, record) => {
//           const due = parseInt(record.student?.regFeesDue || 0, 10);
//           const paid = parseInt(record.student?.regFeesPaid || 0, 10);
//           const concession = parseInt(record.student?.regFeesConcession || 0, 10);
//           const balance = due - concession - paid;
//           const multiplier = ['Cancelled', 'Cheque Return'].includes(record.student?.reportStatus) ? -1 : 1;
//           return {
//             feesDue: totals.feesDue + due * multiplier,
//             feesPaid: totals.feesPaid + paid * multiplier,
//             concession: totals.concession + concession * multiplier,
//             balance: totals.balance + balance * multiplier,
//           };
//         },
//         { feesDue: 0, feesPaid: 0, concession: 0, balance: 0 }
//       );
//       return acc;
//     }, {});

//     // Prepare data for pagination
//     const rowsPerPage = 10; // Reduced to account for per-date totals
//     const pageData = [];
//     let currentPage = [];
//     let currentRowCount = 0;

//     Object.keys(groupedByDate).sort().forEach((date) => {
//       const records = groupedByDate[date];
//       const totalRows = records.length + 1; // Records + total row
//       if (currentRowCount + totalRows > rowsPerPage) {
//         if (currentPage.length > 0) pageData.push(currentPage);
//         currentPage = [];
//         currentRowCount = 0;
//       }
//       currentPage.push(...records, { isTotalRow: true, date });
//       currentRowCount += totalRows;
//     });

//     if (currentPage.length > 0) {
//       pageData.push([...currentPage, { isTotalsRow: true }]);
//     } else if (filteredData.length === 0) {
//       pageData.push([]);
//     }

//     await new Promise((resolve) => setTimeout(resolve, 300));

//     const headerCanvas = await html2canvas(headerContainer, {
//       scale: 2,
//       useCORS: true,
//       allowTaint: false,
//       logging: true,
//       backgroundColor: '#ffffff',
//       windowWidth: (pageWidth - margin * 2) * mmToPx,
//       windowHeight: headerHeight * mmToPx,
//     });
//     const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

//     const footerCanvas = await html2canvas(footerContainer, {
//       scale: 2,
//       useCORS: true,
//       allowTaint: false,
//       logging: true,
//       backgroundColor: '#ffffff',
//       windowWidth: (pageWidth - margin * 2) * mmToPx,
//       windowHeight: footerHeight * mmToPx,
//     });
//     const footerImg = footerCanvas.toDataURL('image/jpeg', 0.98);

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
//         .total-row {
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

//     for (let page = 0; page < pageData.length; page++) {
//       if (page > 0) pdf.addPage();

//       const currentPageData = pageData[page];
//       const tableContent = `
//         ${tableStyle}
//         <div class="pdf-title">Registration Fees Report - ${formatAcademicYear(selectedAcademicYear)}</div>
//         <table>
//           <thead>
//             <tr>
//               ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
//               <th>Balance</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${currentPageData.length > 0
//               ? currentPageData
//                   .map((record) => {
//                     if (record.isTotalRow) {
//                       return `
//                         <tr class="total-row">
//                           <td colspan="${tableFields.length - 3}"><strong>Total for ${record.date}</strong></td>
//                           <td><strong>${dateTotals[record.date].feesDue}</strong></td>
//                           <td><strong>${dateTotals[record.date].feesPaid}</strong></td>
//                           <td><strong>${dateTotals[record.date].concession}</strong></td>
//                           <td><strong>${dateTotals[record.date].balance}</strong></td>
//                         </tr>
//                       `;
//                     } else if (record.isTotalsRow) {
//                       return `
//                         <tr class="total-row">
//                           <td colspan="${tableFields.length - 3}"><strong>Total</strong></td>
//                           <td><strong>${totals.feesDue}</strong></td>
//                           <td><strong>${totals.feesPaid}</strong></td>
//                           <td><strong>${totals.concession}</strong></td>
//                           <td><strong>${totals.balance}</strong></td>
//                         </tr>
//                       `;
//                     }
//                     return `
//                       <tr>
//                         ${tableFields
//                           .map((field) => `<td>${getFieldValue(record, field)}</td>`)
//                           .join('')}
//                         <td>${calculateBalance(record)}</td>
//                       </tr>
//                     `;
//                   })
//                   .join('')
//               : `<tr><td colspan="${tableFields.length + 1}">No data matches the selected filters for ${formatAcademicYear(selectedAcademicYear)}.</td></tr>`
//             }
//           </tbody>
//         </table>
//       `;

//       tableContainer.innerHTML = tableContent;
//       hiddenContainer.appendChild(tableContainer);

//       await new Promise((resolve) => setTimeout(resolve, 300));

//       const tableCanvas = await html2canvas(tableContainer, {
//         scale: 2,
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
//     pdf.save(`Registration_Fees_${formatAcademicYear(selectedAcademicYear)}.pdf`);
//   } catch (error) {
//     console.error('PDF generation failed:', error);
//     alert('Failed to generate PDF. Please check the console for details.');
//   }
// };