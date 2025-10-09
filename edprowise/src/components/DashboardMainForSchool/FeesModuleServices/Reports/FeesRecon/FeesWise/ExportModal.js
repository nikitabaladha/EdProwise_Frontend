import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';
import { toast } from 'react-toastify';



export const exportToExcel = async (
  reconciliationRows,
  dynamicColumns,
  headerMapping,
  getFieldValue,
  _calculateBalance, 
  totals,
  formatAcademicYear,
  selectedAcademicYear
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Recon Fees Feeswise');

  const headers = [
    'Particulars',
    ...dynamicColumns.map(col => col.label),
    'Total'
  ];
  worksheet.addRow(headers);


  reconciliationRows.forEach(record => {
    const rowData = [
      record.particulars,
      ...dynamicColumns.map(col => {
        const value = getFieldValue(record, col);
        return isNaN(value) ? value : Number(value);
      }),
      totals[record.particulars] || 0
    ];
    worksheet.addRow(rowData);
  });


 
  worksheet.columns.forEach((column, index) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value ? cell.value.toString() : '';
      if (cellValue.length > maxLength) {
        maxLength = cellValue.length;
      }
    });
    column.width = maxLength + 2;
  });


  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };


  reconciliationRows.forEach((row, index) => {
    const rowNumber = index + 2; 
    if (['Total (A)', 'Total (B)', 'Difference (A-B)'].includes(row.particulars)) {
      const worksheetRow = worksheet.getRow(rowNumber);
      worksheetRow.font = { bold: true };
      worksheetRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE6F3FF' } 
      };
    }
  });

  worksheet.eachRow({ includeEmpty: true }, (row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    });
  });

  // Save the file
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
    `Recon_Fees_Feeswise_${formatAcademicYear(selectedAcademicYear)}.xlsx`
  );
};



export const exportToPDF = async (
  reconciliationRows,
  dynamicColumns,
  headerMapping,
  getFieldValue,
  _calculateBalance, 
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
      top: -9999px;
      left: -9999px;
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      font-family: Arial, sans-serif;
      background-color: #ffffff;
    `;
    document.body.appendChild(hiddenContainer);

    const headerContainer = document.createElement('div');
    headerContainer.style.cssText = `
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      height: ${headerHeight * mmToPx}px;
      padding: 5px;
    `;
    headerContainer.innerHTML = generateHeader(school, logoImg ? logoSrc : '');
    hiddenContainer.appendChild(headerContainer);

    const footerContainer = document.createElement('div');
    footerContainer.style.cssText = `
      width: ${(pageWidth - margin * 2) * mmToPx}px;
      height: ${footerHeight * mmToPx}px;
    `;
    footerContainer.innerHTML = generateFooter(school);
    hiddenContainer.appendChild(footerContainer);

    const tableStyle = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          page-break-inside: auto;
          font-size: 10px;
          font-family: Arial, sans-serif;
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
          font-weight: 700;
        }
        .total-row td {
          font-weight: 700 !important;
          font-family: Arial, sans-serif;
        }
        .difference-row td {
          font-weight: 700 !important;
          font-family: Arial, sans-serif;
        }
        .pdf-title {
          font-size: 16px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 8px;
          color: #000000;
        }
      </style>
    `;

    const rowsPerPage = 12;
    const pageData = [];
    for (let i = 0; i < reconciliationRows.length; i += rowsPerPage) {
      pageData.push(reconciliationRows.slice(i, i + rowsPerPage));
    }

    const headerCanvas = await html2canvas(headerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      windowWidth: (pageWidth - margin * 2) * mmToPx,
      windowHeight: headerHeight * mmToPx,
    });
    const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);

    const footerCanvas = await html2canvas(footerContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
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
        font-size: 10px;
        line-height: 1.2;
        color: #000000;
        overflow: hidden;
        background-color: #ffffff;
      `;

      let tableHTML = `
        ${tableStyle}
        <div class="pdf-title">Recon Fees Feeswise Report - ${formatAcademicYear(selectedAcademicYear)}</div>
        <table>
          <thead>
            <tr>
              <th>Particulars</th>
              ${dynamicColumns.map(col => `<th>${col.label}</th>`).join('')}
              <th><strong>Total</strong></th>
            </tr>
          </thead>
          <tbody>
      `;

      currentPageData.forEach(record => {
        const isTotalRow = ['Total (A)', 'Total (B)'].includes(record.particulars);
        const isDifferenceRow = record.particulars === 'Difference (A-B)';
        
        let rowClass = '';
        if (isTotalRow) rowClass = 'class="total-row"';
        if (isDifferenceRow) rowClass = 'class="difference-row"';

        tableHTML += `
          <tr ${rowClass}>
            <td style="font-weight: ${isTotalRow || isDifferenceRow ? '700' : 'normal'}">${record.particulars}</td>
            ${dynamicColumns.map(col => {
              const value = getFieldValue(record, col);
              return `<td style="font-weight: ${isTotalRow || isDifferenceRow ? '700' : 'normal'}">${value}</td>`;
            }).join('')}
            <td style="font-weight: ${isTotalRow || isDifferenceRow ? '700' : 'normal'}"><strong>${totals[record.particulars] || '0.00'}</strong></td>
          </tr>
        `;
      });

      tableHTML += `
          </tbody>
        </table>
      `;

      tableContainer.innerHTML = tableHTML;
      hiddenContainer.appendChild(tableContainer);

      await new Promise((resolve) => setTimeout(resolve, 300));

      const tableCanvas = await html2canvas(tableContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
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
    pdf.save(`Recon_Fees_Feeswise_${formatAcademicYear(selectedAcademicYear)}.pdf`);
  } catch (error) {
    console.error('PDF generation failed:', error);
    toast.error('Failed to generate PDF. Please check the console for details.');
  }
};