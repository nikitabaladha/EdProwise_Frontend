
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
    const worksheet = workbook.addWorksheet(`Studentwise Collection EXC Concession (${viewMode.toUpperCase()})`);

    // Add headers
    const headers = tableFields.map(field => headerMapping[field.id] || field.label);
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

    // Group data as in the component
    const groupedData = filteredData.reduce((acc, record) => {
      const isCancellation = record.cancelledDate || Object.values(record.feesBreakdown).some(amount => Number(amount) < 0);
      const key = `${record.paymentDate}_${record.academicYear}_${record.paymentMode}_${record.studentAdmissionNumber}_${record.studentName}_${record.className}_${record.sectionName}_${record.installmentName}_${record.receiptNumber}_${isCancellation ? 'cancel' : 'regular'}`;
      if (!acc[key]) {
        acc[key] = {
          aggregated: {
            paymentDate: record.paymentDate,
            academicYear: record.academicYear,
            paymentMode: record.paymentMode,
            studentAdmissionNumber: record.studentAdmissionNumber,
            studentName: record.studentName,
            className: record.className,
            sectionName: record.sectionName,
            installmentName: record.installmentName,
            receiptNumber: record.receiptNumber,
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

    // Calculate date-wise totals
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

    // Combine grouped data and date-wise totals
    const groupedDataArray = [
      ...Object.entries(groupedData).map(([key, { aggregated }], idx) => ({
        record: aggregated,
        index: idx,
        isTotalRow: false,
      })),
      ...Object.entries(dateWiseTotals).map(([date, total], idx) => ({
        record: {
          ...total,
          paymentDate: `${total.paymentDate}-Total`,
          academicYear: '',
          paymentMode: '',
          studentAdmissionNumber: '',
          studentName: '',
          className: '',
          sectionName: '',
          installmentName: '',
          receiptNumber: '',
        },
        index: idx + Object.keys(groupedData).length,
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

    // Add rows to worksheet
    groupedDataArray.forEach(({ record, isTotalRow }) => {
      const row = tableFields.map(field => {
        const value = getFieldValue(record, field);
        return isNaN(value) || field.id === 'paymentDate' ? value : Number(value);
      });
      const excelRow = worksheet.addRow(row);
      if (isTotalRow) {
        excelRow.font = { bold: true };
      }
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

    // Add grand total row
    const nonNumericFields = tableFields.filter(field => !field.isNumeric).map(field => field.id);
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

    // Auto-size columns
    worksheet.columns.forEach((column, index) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const value = cell.value ? cell.value.toString() : '';
        if (value.length > maxLength) maxLength = value.length;
      });
      column.width = Math.min(maxLength + 2, 50); // Cap max width
    });

    // Save the workbook
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `Studentwise_Collection_EXC_Concession_${viewMode}_${formatAcademicYear(selectedYears)}.xlsx`
    );
  } catch (error) {
    console.error('Excel export failed:', error);
    toast.error('Failed to export to Excel. Please try again.');
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

    // Group data as in the component
    const groupedData = filteredData.reduce((acc, record) => {
      const isCancellation = record.cancelledDate || Object.values(record.feesBreakdown).some(amount => Number(amount) < 0);
      const key = `${record.paymentDate}_${record.academicYear}_${record.paymentMode}_${record.studentAdmissionNumber}_${record.studentName}_${record.className}_${record.sectionName}_${record.installmentName}_${record.receiptNumber}_${isCancellation ? 'cancel' : 'regular'}`;
      if (!acc[key]) {
        acc[key] = {
          aggregated: {
            paymentDate: record.paymentDate,
            academicYear: record.academicYear,
            paymentMode: record.paymentMode,
            studentAdmissionNumber: record.studentAdmissionNumber,
            studentName: record.studentName,
            className: record.className,
            sectionName: record.sectionName,
            installmentName: record.installmentName,
            receiptNumber: record.receiptNumber,
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

    // Calculate date-wise totals
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

    // Combine grouped data and date-wise totals
    const groupedDataArray = [
      ...Object.entries(groupedData).map(([key, { aggregated }], idx) => ({
        record: aggregated,
        index: idx,
        isTotalRow: false,
      })),
      ...Object.entries(dateWiseTotals).map(([date, total], idx) => ({
        record: {
          ...total,
          paymentDate: `${total.paymentDate}-Total`,
          academicYear: '',
          paymentMode: '',
          studentAdmissionNumber: '',
          studentName: '',
          className: '',
          sectionName: '',
          installmentName: '',
          receiptNumber: '',
        },
        index: idx + Object.keys(groupedData).length,
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

    // Add grand total to the array
    if (groupedDataArray.length > 0) {
      groupedDataArray.push({
        record: {
          paymentDate: 'Grand Total',
          academicYear: '',
          paymentMode: '',
          studentAdmissionNumber: '',
          studentName: '',
          className: '',
          sectionName: '',
          installmentName: '',
          receiptNumber: '',
          feesBreakdown: tableFields
            .filter(field => !['paymentDate', 'academicYear', 'paymentMode', 'studentAdmissionNumber', 'studentName', 'className', 'sectionName', 'installmentName', 'receiptNumber'].includes(field.id))
            .reduce((acc, field) => {
              acc[field.id] = totals[field.id] || 0;
              return acc;
            }, {}),
          fineAmount: totals.fineAmount || 0,
          excessAmount: totals.excessAmount || 0,
          totalPaidFee: totals.totalPaidFee || 0,
        },
        index: groupedDataArray.length,
        isTotalRow: true,
      });
    }

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

    // Create hidden container for rendering
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

    // Render header
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

    // Render footer
    const footerContainer = document.createElement('div');
    footerContainer.style.cssText = `
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      height: ${footerHeight * mmToPx}px;
      font-family: Arial, sans-serif;
      background-color: #ffffff;
    `;
    footerContainer.innerHTML = generateFooter(school);
    hiddenContainer.appendChild(footerContainer);

    // Define table styles
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
        .total-row {
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

    // Paginate data
    const rowsPerPage = 15;
    const pageData = [];
    for (let i = 0; i < groupedDataArray.length; i += rowsPerPage) {
      pageData.push(groupedDataArray.slice(i, i + rowsPerPage));
    }
    if (groupedDataArray.length === 0) {
      pageData.push([]);
    }

    // Render header and footer canvases
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

    // Render each page
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
        <div class="pdf-title">StudentWise Collection EXC Concession (${viewMode.toUpperCase()}) - ${formatAcademicYear(selectedYears)}</div>
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
                    const nonNumericCount = nonNumericFields.length;
                    if (item.isTotalRow) {
                      return `
                        <tr class="total-row">
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
    const fileName = `Studentwise_Collection_EXC_Concession_${viewMode}_${formatAcademicYear(selectedYears)}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    toast.error('Failed to generate PDF. Please try again.');
  }
};
