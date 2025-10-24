// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { generateHeader, generateFooter } from '../../../PdfUtlisReport';

// export const exportToExcel = async (
//   studentDataArray,
//   tableFields,
//   headerMapping,
//   getFieldValue,
//   school
// ) => {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('Concession Report');

 
//   const headerRow = worksheet.addRow(
//     tableFields.map(field => headerMapping[field.id] || field.label)
//   );
//   headerRow.font = { bold: true, size: 12 };
//   headerRow.alignment = { horizontal: 'center', vertical: 'middle' };


//   let colIndex = 1;
//   tableFields.forEach((field, index) => {
//     if (field.colSpan > 1) {
//       worksheet.mergeCells(1, colIndex, 1, colIndex + field.colSpan - 1);
//     }
//     colIndex += field.colSpan;
//   });


//   studentDataArray.forEach(record => {
//     const row = tableFields.map(field => {
//       const value = getFieldValue(record, field);
//       return isNaN(value) ? value : Number(value);
//     });
//     const dataRow = worksheet.addRow(row);
//     dataRow.alignment = { horizontal: 'center', vertical: 'middle' };
//   });


//   const totals = tableFields.reduce((acc, field) => {
//     if (field.id !== 'academicYear' && field.id !== 'date') {
//       acc[field.id] = studentDataArray.reduce((sum, record) => sum + (Number(record[field.id]) || 0), 0).toFixed(2);
//     }
//     return acc;
//   }, {});


//   const totalRowData = ['Total','', ...tableFields.slice(2).map(field => totals[field.id] || '0.00')];
//   const totalRow = worksheet.addRow(totalRowData);
//   totalRow.font = { bold: true, size: 12 };
//   totalRow.alignment = { horizontal: 'center', vertical: 'middle' };
//   worksheet.mergeCells(worksheet.rowCount, 1, worksheet.rowCount, 2); 


//   worksheet.columns.forEach((column, index) => {
//     let maxLength = 10;
//     column.eachCell({ includeEmpty: true }, (cell) => {
//       const value = cell.value ? cell.value.toString() : '';
//       if (value.length > maxLength) maxLength = value.length;
//     });
//     column.width = maxLength + 2;
//   });


//   const totalRows = worksheet.rowCount;
//   const totalCols = colIndex - 1; 
//   for (let i = 1; i <= totalRows; i++) {
//     const row = worksheet.getRow(i);
//     for (let j = 1; j <= totalCols; j++) {
//       const cell = row.getCell(j);
//       if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
//         cell.border = {
//           top: { style: 'thin' },
//           left: { style: 'thin' },
//           bottom: { style: 'thin' },
//           right: { style: 'thin' },
//         };
//       }
//     }
//   }

//   worksheet.views = [{ state: 'frozen', ySplit: 1 }];

//   const fileName = `Concession_Report_${school?.schoolName?.replace(/\s+/g, '_') || 'School'}_${new Date().toISOString().split('T')[0]}.xlsx`;
//   const buffer = await workbook.xlsx.writeBuffer();
//   saveAs(
//     new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
//     fileName
//   );
// };

// export const exportToPDF = async (
//   studentDataArray,
//   tableFields,
//   headerMapping,
//   getFieldValue,
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
//     const headerHeight = 40;
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

//     // Calculate totals
//     const totals = tableFields.reduce((acc, field) => {
//       if (field.id !== 'academicYear' && field.id !== 'date') {
//         acc[field.id] = studentDataArray.reduce((sum, record) => sum + (Number(record[field.id]) || 0), 0).toFixed(2);
//       }
//       return acc;
//     }, {});

//     const rowsPerPage = 15;
//     const pageData = [];
//     for (let i = 0; i < studentDataArray.length; i += rowsPerPage) {
//       pageData.push(studentDataArray.slice(i, i + rowsPerPage));
//     }

//     for (const [pageIndex, data] of pageData.entries()) {
//       if (pageIndex > 0) pdf.addPage();

//       const tableContainer = document.createElement('div');
//       tableContainer.style.cssText = `
//         width: ${(pageWidth - margin * 2) * mmToPx}px;
//         max-height: ${contentHeight * mmToPx}px;
//         font-family: Arial, sans-serif;
//         font-size: 11px;
//         line-height: 1.2;
//         color: #000000;
//         overflow: hidden;
//         background-color: #ffffff;
//       `;

//       const tableStyle = `
//         <style>
//           table {
//             width: 100%;
//             border-collapse: collapse;
//             page-break-inside: auto;
//           }
//           th, td {
//             border: 1px solid #4b5563;
//             padding: 6px;
//             text-align: center;
//             font-size: 11px;
//             line-height: 1.2;
//           }
//           thead {
//             background-color: #e5e7eb;
//             font-weight: bold;
//           }
//           tfoot {
//             font-weight: bold;
//             background-color: #e5e7eb;
//           }
//           tr {
//             page-break-inside: avoid;
//             page-break-after: auto;
//           }
//           .pdf-title {
//             font-size: 16px;
//             font-weight: bold;
//             text-align: center;
//             margin: 2mm 0;
//             color: #000000;
//           }
//           .total-cell {
//             text-align: right;
//           }
//         </style>
//       `;

//       const tableContent = `
//         ${tableStyle}
//         <div class="pdf-title">Concession Report</div>
//         <table>
//           <thead>
//             <tr>
//               ${tableFields.map(field => `<th colspan="${field.colSpan}">${headerMapping[field.id] || field.label}</th>`).join('')}
//             </tr>
//           </thead>
//           <tbody>
//             ${data.map(item => `
//               <tr>
//                 ${tableFields.map(field => `<td colspan="${field.colSpan}">${getFieldValue(item, field)}</td>`).join('')}
//               </tr>
//             `).join('')}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colspan="4" class="total-cell">Total</td>
//               ${tableFields.slice(2).map(field => `<td colspan="${field.colSpan}">${totals[field.id] || '0.00'}</td>`).join('')}
//             </tr>
//           </tfoot>
//         </table>
//       `;

//       tableContainer.innerHTML = tableContent;
//       hiddenContainer.appendChild(tableContainer);

//       const tableCanvas = await html2canvas(tableContainer, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: false,
//         logging: true,
//         backgroundColor: '#ffffff',
//         windowWidth: (pageWidth - margin * 2) * mmToPx,
//         windowHeight: contentHeight * mmToPx,
//       });

//       pdf.addImage(
//         headerImg,
//         'JPEG',
//         margin,
//         margin,
//         pageWidth - margin * 2,
//         headerHeight,
//         undefined,
//         'FAST'
//       );

//       pdf.addImage(
//         tableCanvas.toDataURL('image/jpeg', 0.98),
//         'JPEG',
//         margin,
//         margin + headerHeight,
//         pageWidth - margin * 2,
//         contentHeight,
//         undefined,
//         'FAST'
//       );

//       pdf.addImage(
//         footerImg,
//         'JPEG',
//         margin,
//         pageHeight - margin - footerHeight,
//         pageWidth - margin * 2,
//         footerHeight,
//         undefined,
//         'FAST'
//       );

//       hiddenContainer.removeChild(tableContainer);
//     }

//     document.body.removeChild(hiddenContainer);

//     const fileName = `Concession_Report_${school?.schoolName?.replace(/\s+/g, '_') || 'School'}_${new Date().toISOString().split('T')[0]}.pdf`;
//     pdf.save(fileName);
//   } catch (error) {
//     console.error('Error exporting to PDF:', error);
//     throw error;
//   }
// };

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

export const exportToExcel = async (
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedYears,
  viewMode 
) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`Datewise Concession (${viewMode})`);


    const headers = tableFields.map(field => headerMapping[field.id] || field.label);
    worksheet.addRow(headers);

    const groupedData = filteredData.reduce((acc, record, index) => {
      const isCancellation = record.cancelledDate || Object.values(record.feesBreakdown).some(amount => Number(amount) < 0);
      const key = `${record.paymentDate}_${record.academicYear}_${record.paymentMode}_${isCancellation ? 'cancel' : 'regular'}`;
      if (!acc[key]) {
        acc[key] = {
          aggregated: {
            paymentDate: record.paymentDate,
            academicYear: record.academicYear,
            paymentMode: record.paymentMode,
            feesBreakdown: {},
            fineAmount: 0,
            excessAmount: 0,
            totalPaidFee: 0,
            status: isCancellation ? 'Cancelled' : 'Regular',
          },
          count: 0,
        };
      }
      Object.keys(record.feesBreakdown).forEach((type) => {
        acc[key].aggregated.feesBreakdown[type] =
          (acc[key].aggregated.feesBreakdown[type] || 0) + (Number(record.feesBreakdown[type]) || 0);
      });
      acc[key].aggregated.fineAmount += Number(record.fineAmount) || 0;
      acc[key].aggregated.excessAmount += Number(record.excessAmount) || 0;
      acc[key].aggregated.totalPaidFee += Number(record.totalPaidFee) || 0;
      acc[key].count += 1;
      return acc;
    }, {});


    const dateWiseTotals = filteredData.reduce((acc, record) => {
      const dateKey = record.paymentDate;
      if (!acc[dateKey]) {
        acc[dateKey] = {
          paymentDate: record.paymentDate,
          feesBreakdown: {},
          fineAmount: 0,
          excessAmount: 0,
          totalPaidFee: 0,
        };
      }
      Object.keys(record.feesBreakdown).forEach((type) => {
        acc[dateKey].feesBreakdown[type] =
          (acc[dateKey].feesBreakdown[type] || 0) + (Number(record.feesBreakdown[type]) || 0);
      });
      acc[dateKey].fineAmount += Number(record.fineAmount) || 0;
      acc[dateKey].excessAmount += Number(record.excessAmount) || 0;
      acc[dateKey].totalPaidFee += Number(record.totalPaidFee) || 0;
      return acc;
    }, {});


    const groupedDataArray = [
      ...Object.entries(groupedData).map(([key, { aggregated, count }], idx) => ({
        record: aggregated,
        index: idx,
        isFirstInGroup: true,
        rowspan: 1,
        isTotalRow: false,
      })),
      ...Object.entries(dateWiseTotals).map(([date, total], idx) => ({
        record: {
          ...total,
          paymentDate: `${total.paymentDate}-Total`,
          academicYear: '',
          paymentMode: '',
        },
        index: idx + Object.keys(groupedData).length,
        isFirstInGroup: true,
        rowspan: 1,
        isTotalRow: true,
      })),
    ].sort((a, b) => {
      const dateA = a.record.paymentDate.includes('-Total')
        ? a.record.paymentDate.replace('-Total', '')
        : a.record.paymentDate;
      const dateB = b.record.paymentDate.includes('-Total')
        ? b.record.paymentDate.replace('-Total', '')
        : b.record.paymentDate;
      const dateComparison = new Date(dateA.split('-').reverse().join('-')) - new Date(dateB.split('-').reverse().join('-'));
      if (dateComparison !== 0) return dateComparison;
      if (a.isTotalRow !== b.isTotalRow) return a.isTotalRow ? 1 : -1;
      return a.index - b.index;
    });


    groupedDataArray.forEach(({ record, isTotalRow }) => {
      const row = tableFields.map(field => {
        if (isTotalRow && (field.id === 'paymentDate' || field.id === 'academicYear' || field.id === 'paymentMode')) {
          return field.id === 'paymentDate' ? record.paymentDate : '';
        }
        const value = getFieldValue(record, field);
        return isNaN(value) ? value : Number(value);
      });
      worksheet.addRow(row);
    });


    const totalsRow = tableFields.map(field => {
      if (field.id === 'paymentDate') return 'Total';
      if (field.id === 'academicYear' || field.id === 'paymentMode') return '';
      if (field.id === 'totalPaidFee') return Number(totals.totalPaidFee || 0).toFixed(2);
      if (totals[field.id] !== undefined) return Number(totals[field.id] || 0).toFixed(2);
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
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

  
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        if (i === worksheet.rowCount || row.getCell(1).value.includes('Total')) {
          cell.font = { bold: true };
        }
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    }

  
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `Datewise_Concession_${viewMode}_${formatAcademicYear(selectedYears)}.xlsx`
    );
  } catch (error) {
    console.error('Excel export failed:', error);
    toast.error('Failed to export to Excel. Please check the console for details.');
  }
};






export const exportToPDF = async (
  filteredData,
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

 
    const groupedData = filteredData.reduce((acc, record) => {
      const isCancellation = record.cancelledDate || Object.values(record.feesBreakdown).some(amount => Number(amount) < 0);
      const key = `${record.paymentDate}_${record.academicYear}_${record.paymentMode}_${isCancellation ? 'cancel' : 'regular'}`;
      if (!acc[key]) {
        acc[key] = {
          aggregated: {
            paymentDate: record.paymentDate,
            academicYear: record.academicYear,
            paymentMode: record.paymentMode,
            feesBreakdown: {},
            fineAmount: 0,
            excessAmount: 0,
            totalPaidFee: 0,
            status: isCancellation ? 'Cancelled' : 'Regular',
          },
          count: 0,
        };
      }
      Object.keys(record.feesBreakdown).forEach((type) => {
        acc[key].aggregated.feesBreakdown[type] =
          (acc[key].aggregated.feesBreakdown[type] || 0) + (Number(record.feesBreakdown[type]) || 0);
      });
      acc[key].aggregated.fineAmount += Number(record.fineAmount) || 0;
      acc[key].aggregated.excessAmount += Number(record.excessAmount) || 0;
      acc[key].aggregated.totalPaidFee += Number(record.totalPaidFee) || 0;
      acc[key].count += 1;
      return acc;
    }, {});

    const dateWiseTotals = filteredData.reduce((acc, record) => {
      const dateKey = record.paymentDate;
      if (!acc[dateKey]) {
        acc[dateKey] = {
          paymentDate: record.paymentDate,
          feesBreakdown: {},
          fineAmount: 0,
          excessAmount: 0,
          totalPaidFee: 0,
        };
      }
      Object.keys(record.feesBreakdown).forEach((type) => {
        acc[dateKey].feesBreakdown[type] =
          (acc[dateKey].feesBreakdown[type] || 0) + (Number(record.feesBreakdown[type]) || 0);
      });
      acc[dateKey].fineAmount += Number(record.fineAmount) || 0;
      acc[dateKey].excessAmount += Number(record.excessAmount) || 0;
      acc[dateKey].totalPaidFee += Number(record.totalPaidFee) || 0;
      return acc;
    }, {});


    const groupedDataArray = [];
    const dates = [...new Set(filteredData.map(record => record.paymentDate))].sort(
      (a, b) => new Date(a.split('-').reverse().join('-')) - new Date(b.split('-').reverse().join('-'))
    );

    dates.forEach(date => {
  
      const dateRecords = Object.entries(groupedData)
        .filter(([key]) => key.startsWith(date))
        .map(([key, { aggregated, count }], idx) => ({
          record: aggregated,
          index: idx,
          isFirstInGroup: true,
          rowspan: 1,
          isTotalRow: false,
        }));
      groupedDataArray.push(...dateRecords);

      
      if (dateWiseTotals[date]) {
        groupedDataArray.push({
          record: {
            ...dateWiseTotals[date],
            paymentDate: `${date}-Total`,
            academicYear: '',
            paymentMode: '',
          },
          index: groupedDataArray.length,
          isFirstInGroup: true,
          rowspan: 1,
          isTotalRow: true,
        });
      }
    });

  
    if (groupedDataArray.length > 0) {
      groupedDataArray.push({
        record: {
          paymentDate: 'Grand Total',
          academicYear: '',
          paymentMode: '',
          feesBreakdown: tableFields
            .filter(field => field.id !== 'paymentDate' && field.id !== 'academicYear' && field.id !== 'paymentMode')
            .reduce((acc, field) => {
              acc[field.id] = totals[field.id] || 0;
              return acc;
            }, {}),
          fineAmount: totals.fineAmount || 0,
          excessAmount: totals.excessAmount || 0,
          totalPaidFee: totals.totalPaidFee || 0,
        },
        index: groupedDataArray.length,
        isFirstInGroup: true,
        rowspan: 1,
        isTotalRow: true,
      });
    }


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
          background-color: #f3f4f6;
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
    for (let i = 0; i < groupedDataArray.length; i += rowsPerPage) {
      pageData.push(groupedDataArray.slice(i, i + rowsPerPage));
    }
    if (groupedDataArray.length === 0) {
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
        <div class="pdf-title">Datewise Concession (${viewMode.toUpperCase()}) - ${formatAcademicYear(selectedYears)}</div>
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
                    if (item.isTotalRow) {
                      return `
                        <tr class="total-row">
                          <td colspan="3"><strong>${item.record.paymentDate}</strong></td>
                          ${tableFields
                            .slice(3)
                            .map((field) => `<td><strong>${(item.record.feesBreakdown[field.id] || item.record[field.id] || 0).toFixed(2)}</strong></td>`)
                            .join('')}
                        </tr>
                      `;
                    }
                    return `
                      <tr>
                        ${tableFields
                          .map((field) => {
                            if (
                              (field.id === 'paymentDate' ||
                                field.id === 'academicYear' ||
                                field.id === 'paymentMode') &&
                              !item.isFirstInGroup
                            ) {
                              return '';
                            }
                            const rowspanAttr =
                              (field.id === 'paymentDate' ||
                                field.id === 'academicYear' ||
                                field.id === 'paymentMode') &&
                              item.isFirstInGroup &&
                              item.rowspan > 1
                                ? `rowspan="${item.rowspan}"`
                                : '';
                            return `<td ${rowspanAttr}>${getFieldValue(item.record, field)}</td>`;
                          })
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
    const fileName = `Datewise_Concession_${viewMode}_${formatAcademicYear(selectedYears)}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    toast.error('Failed to generate PDF. Please check the console for details.');
  }
};