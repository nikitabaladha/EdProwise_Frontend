import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateHeader, generateFooter } from '../../../../PdfUtlisReport';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';

export const exportToExcel = async (
  filteredData,
  tableFields,
  getFieldValue,
  totals,
  formatAcademicYear,
  selectedYears,
  viewMode
) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`School Fees EXC Concession (${viewMode.toUpperCase()})`);


    const headers = tableFields.map(field => field.label);
    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
    headerRow.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });


    const groupedByAdmissionNumber = filteredData.reduce((acc, row) => {
      const adm = row.studentAdmissionNumber;
      if (!acc[adm]) {
        acc[adm] = {
          studentName: row.studentName,
          className: row.className,
          sectionName: row.sectionName,
          academicYear: row.academicYear,
          rows: [],
        };
      }
      acc[adm].rows.push(row);
      return acc;
    }, {});

    const studentDataArray = Object.keys(groupedByAdmissionNumber).map(adm => ({
      admissionNumber: adm,
      ...groupedByAdmissionNumber[adm],
      rows: groupedByAdmissionNumber[adm].rows.sort((a, b) => {
        if (!a.paymentDate || a.paymentDate === '-') return 1;
        if (!b.paymentDate || b.paymentDate === '-') return -1;
        const da = new Date(a.paymentDate.split('-').reverse().join('-'));
        const db = new Date(b.paymentDate.split('-').reverse().join('-'));
        return da.getTime() - db.getTime();
      }),
    })).sort((a, b) => a.admissionNumber.localeCompare(b.admissionNumber));

    const nonNumericFields = tableFields.filter(field => !field.isNumeric).map(field => field.id);


    studentDataArray.forEach(student => {
   
      student.rows.forEach(record => {
        const row = tableFields.map(field => {
          const value = getFieldValue(record, field);
          return field.isNumeric ? Number(value) : value;
        });
        const excelRow = worksheet.addRow(row);
        excelRow.eachCell(cell => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
        });
      });


      const studentTotals = student.rows.reduce((acc, row) => {
        tableFields.forEach(field => {
          if (field.isNumeric) {
            const value = field.id === 'totalPaidFee' || field.id === 'fineAmount' || field.id === 'excessAmount'
              ? (row[field.id] || 0)
              : (row.feesBreakdown[field.id] || 0);
            acc[field.id] = (acc[field.id] || 0) + value;
          }
        });
        return acc;
      }, {});
      const subtotalRow = tableFields.map(field => {
        if (nonNumericFields.includes(field.id)) {
          return field.id === 'paymentDate' ? 'Total' : '';
        }
        return Number(studentTotals[field.id] || 0).toFixed(2);
      });
      const excelSubtotalRow = worksheet.addRow(subtotalRow);
      excelSubtotalRow.font = { bold: true };
      excelSubtotalRow.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      });
    });


    const totalsRow = tableFields.map(field => {
      if (nonNumericFields.includes(field.id)) {
        return field.id === 'paymentDate' ? 'Grand Total' : '';
      }
      return Number(totals[field.id] || 0).toFixed(2);
    });
    const grandTotalRow = worksheet.addRow(totalsRow);
    grandTotalRow.font = { bold: true };
    grandTotalRow.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });


    worksheet.columns.forEach((column, index) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : '';
        if (value.length > maxLength) maxLength = value.length;
      });
      column.width = Math.min(maxLength + 2, 50);
    });


    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `School_Fees_EXC_Concession_${viewMode}_${formatAcademicYear(selectedYears)}.xlsx`
    );
    toast.success('Exported to Excel successfully');
  } catch (error) {
    console.error('Excel export failed:', error);
    toast.error('Failed to export to Excel. Please try again.');
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

    const groupedByAdmissionNumber = filteredData.reduce((acc, row) => {
      const adm = row.studentAdmissionNumber;
      if (!acc[adm]) {
        acc[adm] = {
          studentName: row.studentName,
          className: row.className,
          sectionName: row.sectionName,
          academicYear: row.academicYear,
          rows: [],
        };
      }
      acc[adm].rows.push(row);
      return acc;
    }, {});

    const studentDataArray = Object.keys(groupedByAdmissionNumber).map(adm => ({
      admissionNumber: adm,
      ...groupedByAdmissionNumber[adm],
      rows: groupedByAdmissionNumber[adm].rows.sort((a, b) => {
        if (!a.paymentDate || a.paymentDate === '-') return 1;
        if (!b.paymentDate || b.paymentDate === '-') return -1;
        const da = new Date(a.paymentDate.split('-').reverse().join('-'));
        const db = new Date(b.paymentDate.split('-').reverse().join('-'));
        return da.getTime() - db.getTime();
      }),
    })).sort((a, b) => a.admissionNumber.localeCompare(b.admissionNumber));


    const dataWithTotals = [];
    studentDataArray.forEach(student => {
      student.rows.forEach(row => {
        dataWithTotals.push({ record: row, isSubtotal: false, isGrandTotal: false });
      });
      const studentTotals = student.rows.reduce((acc, row) => {
        tableFields.forEach(field => {
          if (field.isNumeric) {
            const value = field.id === 'totalPaidFee' || field.id === 'fineAmount' || field.id === 'excessAmount'
              ? (row[field.id] || 0)
              : (row.feesBreakdown[field.id] || 0);
            acc[field.id] = (acc[field.id] || 0) + value;
          }
        });
        return acc;
      }, {});
      dataWithTotals.push({
        record: {
          paymentDate: 'Total',
          academicYear: '',
          studentAdmissionNumber: '',
          studentName: '',
          className: '',
          sectionName: '',
          installmentName: '',
          paymentMode: '',
          receiptNumber: '',
          feesBreakdown: tableFields
            .filter(field => field.isNumeric && field.id !== 'totalPaidFee' && field.id !== 'fineAmount' && field.id !== 'excessAmount')
            .reduce((acc, field) => {
              acc[field.id] = studentTotals[field.id] || 0;
              return acc;
            }, {}),
          fineAmount: studentTotals.fineAmount || 0,
          excessAmount: studentTotals.excessAmount || 0,
          totalPaidFee: studentTotals.totalPaidFee || 0,
        },
        isSubtotal: true,
        isGrandTotal: false,
      });
    });


    if (dataWithTotals.length > 0) {
      dataWithTotals.push({
        record: {
          paymentDate: 'Grand Total',
          academicYear: '',
          studentAdmissionNumber: '',
          studentName: '',
          className: '',
          sectionName: '',
          installmentName: '',
          paymentMode: '',
          receiptNumber: '',
          feesBreakdown: tableFields
            .filter(field => field.isNumeric && field.id !== 'totalPaidFee' && field.id !== 'fineAmount' && field.id !== 'excessAmount')
            .reduce((acc, field) => {
              acc[field.id] = totals[field.id] || 0;
              return acc;
            }, {}),
          fineAmount: totals.fineAmount || 0,
          excessAmount: totals.excessAmount || 0,
          totalPaidFee: totals.totalPaidFee || 0,
        },
        isSubtotal: false,
        isGrandTotal: true,
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
          padding: 4px;
          text-align: center;
          font-size: 10px;
          line-height: 1.2;
        }
        thead {
          background-color: #e5e7eb;
          font-weight: bold;
        }
        .subtotal-row, .grand-total-row {
          background-color: #f3f4f6;
          font-weight: bold;
        }
        tr {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        .pdf-title {
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 8mm;
          color: #000000;
        }
      </style>
    `;

 
    const rowsPerPage = 15;
    const pageData = [];
    let currentRows = [];
    let rowCount = 0;
    let currentStudentRows = [];
    let currentStudent = null;

    dataWithTotals.forEach(item => {
      if (!item.isSubtotal && !item.isGrandTotal) {
    
        if (currentStudent !== item.record.studentAdmissionNumber && currentStudent !== null) {
          currentRows.push(...currentStudentRows, { ...dataWithTotals.find(t => t.isSubtotal && t.record.studentAdmissionNumber === '') });
          rowCount += currentStudentRows.length + 1;
          currentStudentRows = [];
        }
        currentStudent = item.record.studentAdmissionNumber;
        currentStudentRows.push(item);
      } else if (item.isSubtotal) {

        currentStudentRows.push(item);
        currentRows.push(...currentStudentRows);
        rowCount += currentStudentRows.length;
        currentStudentRows = [];
        currentStudent = null;
      } else if (item.isGrandTotal) {

        currentRows.push(item);
        rowCount++;
      }


      if (rowCount >= rowsPerPage || item.isGrandTotal) {
        pageData.push(currentRows);
        currentRows = [];
        rowCount = 0;
      }
    });

    if (currentRows.length > 0) {
      pageData.push(currentRows);
    }
    if (dataWithTotals.length === 0) {
      pageData.push([]);
    }


    await new Promise(resolve => setTimeout(resolve, 300));
    const headerCanvas = await html2canvas(headerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: headerHeight * mmToPx,
    });
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

    const footerCanvas = await html2canvas(footerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: footerHeight * mmToPx,
    });
    const footerImg = footerCanvas.toDataURL('image/jpeg', 0.98);


    const nonNumericFields = tableFields.filter(field => !field.isNumeric).map(field => field.id);
    for (let page = 0; page < pageData.length; page++) {
      if (page > 0) pdf.addPage();

      const currentPageData = pageData[page];
      const tableContainer = document.createElement('div');
      tableContainer.style.cssText = `
        width: ${(pageWidth - margin * 2) * mmToPx}px;
        max-height: ${contentHeight * mmToPx}px;
        font-family: Arial, sans-serif;
        font-size: 10px;
        line-height: 1.2;
        color: #000000;
        overflow: hidden;
        background-color: #ffffff;
      `;

      const tableContent = `
        ${tableStyle}
        <div class="pdf-title">School Fees EXC Concession (${viewMode.toUpperCase()}) - ${formatAcademicYear(selectedYears)}</div>
        <table>
          <thead>
            <tr>
              ${tableFields.map((field) => `<th>${field.label}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${currentPageData.length > 0
              ? currentPageData
                  .map((item) => {
                    const nonNumericCount = nonNumericFields.length;
                    if (item.isGrandTotal) {
                      return `
                        <tr class="grand-total-row">
                          <td colspan="${nonNumericCount}"><strong>${item.record.paymentDate}</strong></td>
                          ${tableFields
                            .slice(nonNumericCount)
                            .map((field) => `<td><strong>${(item.record.feesBreakdown[field.id] || item.record[field.id] || 0).toFixed(2)}</strong></td>`)
                            .join('')}
                        </tr>
                      `;
                    } else if (item.isSubtotal) {
                      return `
                        <tr class="subtotal-row">
                          <td colspan="${nonNumericCount}"><strong>${item.record.paymentDate}</strong></td>
                          ${tableFields
                            .slice(nonNumericCount)
                            .map((field) => `<td><strong>${(item.record.feesBreakdown[field.id] || item.record[field.id] || 0).toFixed(2)}</strong></td>`)
                            .join('')}
                        </tr>
                      `;
                    }
                    return `
                      <tr>
                        ${tableFields
                          .map((field) => `<td>${getFieldValue(item.record, field)}</td>`)
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

      await new Promise(resolve => setTimeout(resolve, 300));

      const tableCanvas = await html2canvas(tableContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
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
    const fileName = `School_Fees_EXC_Concession_${viewMode}_${formatAcademicYear(selectedYears)}.pdf`;
    pdf.save(fileName);
    toast.success('Exported to PDF successfully');
  } catch (error) {
    console.error('PDF generation failed:', error);
    toast.error('Failed to generate PDF. Please try again.');
  }
};