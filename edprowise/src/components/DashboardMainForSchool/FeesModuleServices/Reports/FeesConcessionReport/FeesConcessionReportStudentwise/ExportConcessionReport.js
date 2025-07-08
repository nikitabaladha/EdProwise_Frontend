
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { generateHeader, generateFooter } from '../../../PdfUtlisReport';


export const exportToExcel = async (
  studentDataArray,
  tableFields,
  headerMapping,
  getFieldValue,
  school
) => {
  try {
    console.log('Exporting to Excel with data:', studentDataArray);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Concession Report');


    const headers = tableFields.map((field) => headerMapping[field.id] || field.label);
    const headerRow = worksheet.addRow(headers);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, size: 12 };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' }

      };
    });

    // Add data rows
    studentDataArray.forEach((student) => {
      student.transactions
        .filter((record) => record.installmentName !== 'Total')
        .forEach((record) => {
          const row = tableFields.map((field) => {
            const value = getFieldValue(record, field, student);
            return isNaN(value) ? value : Number(value);
          });
          worksheet.addRow(row);
        });
    });


    const totals = tableFields.reduce((acc, field) => {
      if (field.id === 'installmentName') {
        acc[field.id] = 'Total';
      } else if (
        field.id === 'academicYear' ||
        field.id === 'admissionNumber' ||
        field.id === 'studentName' ||
        field.id === 'className' ||
        field.id === 'sectionName' ||
        field.id === 'concessionType'
      ) {
        acc[field.id] = '';
      } else {
        const sum = studentDataArray
          .flatMap((student) => student.transactions)
          .filter((record) => record.installmentName !== 'Total')
          .reduce((sum, record) => sum + (Number(record[field.id]) || 0));
        acc[field.id] = sum || '-';
      }
      return acc;
    }, {});
    
    const totalRow = tableFields.map((field) => {
      const value = totals[field.id];
      return isNaN(value) ? value : Number(value);
    });
    const addedTotalRow = worksheet.addRow(totalRow);


    addedTotalRow.font = { bold: true, size: 12 };
    addedTotalRow.alignment = { horizontal: 'center', vertical: 'middle' };


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
    for (let i = 1; i <= totalRows; i++) {
      const row = worksheet.getRow(i);
      for (let j = 1; j <= totalCols; j++) {
        const cell = row.getCell(j);
        if (cell.value !== null && cell.value !== undefined && cell.value !== '') {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        }
      }
    }

    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    const fileName = `Concession_Report_StudentWise${school?.schoolName?.replace(/\s+/g, '_') || 'School'}_${new Date().toISOString().split('T')[0]}.xlsx`;
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), fileName);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
};


export const exportToPDF = async (studentDataArray, tableFields, headerMapping, getFieldValue, school, logoSrc) => {
  try {
    console.log('Exporting to PDF with data:', studentDataArray);
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'landscape',
    });

    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 5;
    const headerHeight = 40;
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

    const rowsPerPage = 15;
    let currentPage = 0;

    for (const [index, student] of studentDataArray.entries()) {
      const studentData = [
        ...student.transactions
          .filter((record) => record.installmentName !== 'Total')
          .map((transaction) => ({ type: 'transaction', content: transaction, student })),
        {
          type: 'total',
          content: tableFields.reduce((acc, field) => {
            if (field.id === 'installmentName') {
              acc[field.id] = 'Total';
            } else if (
              field.id === 'academicYear' ||
              field.id === 'admissionNumber' ||
              field.id === 'studentName' ||
              field.id === 'className' ||
              field.id === 'sectionName' ||
              field.id === 'concessionType'
            ) {
              acc[field.id] = '';
            } else {
              const sum = student.transactions
                .filter((record) => record.installmentName !== 'Total')
                .reduce((sum, record) => sum + (Number(record[field.id]) || 0), 0);
              acc[field.id] = sum || '-';
            }
            return acc;
          }, {}),
          student,
        },
      ];

      const pageData = [];
      for (let i = 0; i < studentData.length; i += rowsPerPage) {
        pageData.push(studentData.slice(i, i + rowsPerPage));
      }

      for (const [pageIndex, data] of pageData.entries()) {
        if (currentPage > 0 || pageIndex > 0) pdf.addPage();
        currentPage++;

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
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
            .pdf-title {
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              margin: 2mm 0;
              color: #000000;
            }
            .total-row {
              font-weight: bold;
            }
          </style>
        `;

        const tableContent = `
          ${tableStyle}
          <div class="pdf-title">Concession Report</div>
          <table>
            <thead>
              <tr>
                ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map((item) => `
                <tr ${item.type === 'total' ? 'class="total-row"' : ''}>
                  ${tableFields.map((field) => `
                    <td>${
                      item.type === 'transaction'
                        ? getFieldValue(item.content, field, item.student)
                        : item.content[field.id] || '-'
                    }</td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;

        tableContainer.innerHTML = tableContent;
        hiddenContainer.appendChild(tableContainer);

        const tableCanvas = await html2canvas(tableContainer, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: true,
          backgroundColor: '#ffffff',
          windowWidth: (pageWidth - margin * 2) * mmToPx,
          windowHeight: contentHeight * mmToPx,
        });

        pdf.addImage(
          headerImg,
          'JPEG',
          margin,
          margin,
          pageWidth - margin * 2,
          headerHeight,
          undefined,
          'FAST'
        );

        pdf.addImage(
          tableCanvas.toDataURL('image/jpeg', 0.98),
          'JPEG',
          margin,
          margin + headerHeight,
          pageWidth - margin * 2,
          contentHeight,
          undefined,
          'FAST'
        );

        pdf.addImage(
          footerImg,
          'JPEG',
          margin,
          pageHeight - margin - footerHeight,
          pageWidth - margin * 2,
          footerHeight,
          undefined,
          'FAST'
        );

        hiddenContainer.removeChild(tableContainer);
      }
    }

    document.body.removeChild(hiddenContainer);

    const fileName = `Concession_Report_StudentWise${school?.schoolName?.replace(/\s+/g, '_') || 'School'}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};
