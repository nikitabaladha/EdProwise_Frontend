// import React, { useEffect, useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import * as XLSX from 'xlsx';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import { fetchSchoolData, generateHeader, generateFooter } from '../../../PdfUtlis';

// const ExportModal = ({
//   isOpen,
//   onClose,
//   filteredData,
//   tableFields,
//   headerMapping,
//   getFieldValue,
//   calculateBalance,
//   totals,
//   formatAcademicYear,
//   selectedAcademicYear,
//   schoolId,
// }) => {
//   const [school, setSchool] = useState(null);
//   const [logoSrc, setLogoSrc] = useState('');

//   useEffect(() => {
//     if (isOpen && schoolId) {
//       const loadSchoolData = async () => {
//         try {
//           const { school, logoSrc } = await fetchSchoolData(schoolId);
//           setSchool(school);
//           setLogoSrc(logoSrc);
//         } catch (error) {
//           console.error('Failed to fetch school data:', error);
//         }
//       };
//       loadSchoolData();
//     }
//   }, [isOpen, schoolId]);

//   const handleExportExcel = () => {
//     const data = filteredData.map((record) => {
//       const row = {};
//       tableFields.forEach((field) => {
//         row[headerMapping[field.id] || field.label] = getFieldValue(record, field);
//       });
//       row['Balance'] = calculateBalance(record);
//       return row;
//     });

//     const totalsRow = {};
//     tableFields.forEach((field) => {
//       if (field.id === 'admFeesDue') totalsRow[headerMapping[field.id]] = totals.feesDue;
//       else if (field.id === 'admFeesPaid') totalsRow[headerMapping[field.id]] = totals.feesPaid;
//       else if (field.id === 'admFeesConcession') totalsRow[headerMapping[field.id]] = totals.concession;
//       else totalsRow[headerMapping[field.id]] = '';
//     });
//     totalsRow['Balance'] = totals.balance;

//     data.push(totalsRow);

//     const ws = XLSX.utils.json_to_sheet(data, { header: Object.keys(data[0]) });

//     // Define styles
//     const headerStyle = {
//       font: { bold: true, sz: 12 },
//       alignment: { horizontal: 'center', vertical: 'center' },
//       border: {
//         top: { style: 'thin', color: { rgb: '000000' } },
//         bottom: { style: 'thin', color: { rgb: '000000' } },
//         left: { style: 'thin', color: { rgb: '000000' } },
//         right: { style: 'thin', color: { rgb: '000000' } },
//       },
//     };

//     const cellStyle = {
//       border: {
//         top: { style: 'thin', color: { rgb: '000000' } },
//         bottom: { style: 'thin', color: { rgb: '000000' } },
//         left: { style: 'thin', color: { rgb: '000000' } },
//         right: { style: 'thin', color: { rgb: '000000' } },
//       },
//     };

//     const totalsStyle = {
//       font: { bold: true, sz: 12 },
//       alignment: { horizontal: 'center', vertical: 'center' },
//       border: {
//         top: { style: 'thin', color: { rgb: '000000' } },
//         bottom: { style: 'thin', color: { rgb: '000000' } },
//         left: { style: 'thin', color: { rgb: '000000' } },
//         right: { style: 'thin', color: { rgb: '000000' } },
//       },
//     };

//     // Apply styles to cells
//     const range = XLSX.utils.decode_range(ws['!ref']);
//     for (let R = range.s.r; R <= range.e.r; ++R) {
//       for (let C = range.s.c; C <= range.e.c; ++C) {
//         const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
//         if (!ws[cellAddress]) {
//           ws[cellAddress] = { t: 's', v: '' }; // Ensure cell exists
//         }
//         if (R === 0) {
//           // Header row
//           ws[cellAddress].s = headerStyle;
//         } else if (R === range.e.r) {
//           // Totals row
//           ws[cellAddress].s = totalsStyle;
//         } else {
//           // Data rows
//           ws[cellAddress].s = cellStyle;
//         }
//       }
//     }

//     // Set column widths for better readability
//     const colWidths = tableFields.map(() => ({ wch: 15 }));
//     colWidths.push({ wch: 15 }); // For Balance column
//     ws['!cols'] = colWidths;

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Admission Fees');
//     XLSX.writeFile(wb, `Admission_Fees_${formatAcademicYear(selectedAcademicYear)}.xlsx`);
//     onClose();
//   };

//   const generatePDF = async () => {
//     try {
//       const pdf = new jsPDF({
//         unit: 'mm',
//         format: 'a4',
//         orientation: 'landscape',
//       });

//       const pageWidth = 297;
//       const pageHeight = 210;
//       const margin = 20;
//       const headerHeight = 50;
//       const footerHeight = 30;
//       const contentHeight = pageHeight - margin * 2 - headerHeight - footerHeight;
//       const mmToPx = 3.779;

//       const preloadImage = (src) => {
//         return new Promise((resolve) => {
//           if (!src) return resolve(null);
//           const img = new Image();
//           img.crossOrigin = 'Anonymous';
//           img.src = src;
//           img.onload = () => resolve(img);
//           img.onerror = () => {
//             console.warn(`Failed to load image: ${src}. Using fallback.`);
//             resolve(null);
//           };
//         });
//       };

//       const logoImg = await preloadImage(logoSrc);

//       const headerContainer = document.createElement('div');
//       headerContainer.style.cssText = `
//         width: ${(pageWidth - margin * 2) * mmToPx}px;
//         height: ${headerHeight * mmToPx}px;
//         position: fixed;
//         top: 0;
//         left: 0;
//         font-family: Arial, sans-serif;
//         z-index: 9999;
//       `;
//       headerContainer.innerHTML = generateHeader(school, logoImg ? logoSrc : '');
//       document.body.appendChild(headerContainer);

//       const footerContainer = document.createElement('div');
//       footerContainer.style.cssText = `
//         width: ${(pageWidth - margin * 2) * mmToPx}px;
//         height: ${footerHeight * mmToPx}px;
//         position: fixed;
//         top: 0;
//         left: 0;
//         font-family: Arial, sans-serif;
//         z-index: 9999;
//       `;
//       footerContainer.innerHTML = generateFooter(school);
//       document.body.appendChild(footerContainer);

//       const tableContainer = document.createElement('div');
//       tableContainer.style.cssText = `
//         width: ${(pageWidth - margin * 2) * mmToPx}px;
//         max-height: ${contentHeight * mmToPx}px;
//         position: fixed;
//         top: 0;
//         left: 0;
//         font-family: Arial, sans-serif;
//         font-size: 11px;
//         line-height: 1.2;
//         color: #000000;
//         overflow: hidden;
//         z-index: 9999;
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
//             background-color: #e5e7eb;
//             font-weight: bold;
//           }
//           tr {
//             page-break-inside: avoid;
//             page-break-after: auto;
//           }
//           .pdf-title {
//             font-size: 16px;
//             font-weight: bold;
//             text-align: center;
//             margin-bottom: 8mm;
//             color: #000000;
//           }
//         </style>
//       `;

//       const rowsPerPage = 15;
//       const pageData = [];
//       for (let i = 0; i < filteredData.length; i += rowsPerPage) {
//         pageData.push(filteredData.slice(i, i + rowsPerPage));
//       }
//       if (filteredData.length > 0) {
//         pageData[pageData.length - 1] = [
//           ...pageData[pageData.length - 1],
//           { isTotalsRow: true, totals },
//         ];
//       } else {
//         pageData.push([]);
//       }

//       await new Promise((resolve) => setTimeout(resolve, 200));
//       const headerCanvas = await html2canvas(headerContainer, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: false,
//         logging: true,
//         backgroundColor: '#ffffff',
//         windowWidth: (pageWidth - margin * 2) * mmToPx,
//         windowHeight: headerHeight * mmToPx,
//       });
//       const headerImg = headerCanvas.toDataURL('image/jpeg', 0.98);
//       document.body.removeChild(headerContainer);
//       const footerCanvas = await html2canvas(footerContainer, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: false,
//         logging: true,
//         backgroundColor: '#ffffff',
//         windowWidth: (pageWidth - margin * 2) * mmToPx,
//         windowHeight: footerHeight * mmToPx,
//       });
//       const footerImg = footerCanvas.toDataURL('image/jpeg', 0.98);
//       document.body.removeChild(footerContainer);

//       for (let page = 0; page < pageData.length; page++) {
//         if (page > 0) pdf.addPage();

//         const currentPageData = pageData[page];
//         const tableContent = `
//           ${tableStyle}
//           <div class="pdf-title">Admission Fees Report - ${formatAcademicYear(selectedAcademicYear)}</div>
//           <table>
//             <thead>
//               <tr>
//                 ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join('')}
//                 <th>Balance</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${currentPageData.length > 0
//                 ? currentPageData
//                     .map((record) => {
//                       if (record.isTotalsRow) {
//                         return `
//                           <tr>
//                             <td colspan="${tableFields.length - 3}"><strong>Total</strong></td>
//                             <td><strong>${totals.feesDue}</strong></td>
//                             <td><strong>${totals.feesPaid}</strong></td>
//                             <td><strong>${totals.concession}</strong></td>
//                             <td><strong>${totals.balance}</strong></td>
//                           </tr>
//                         `;
//                       }
//                       return `
//                         <tr>
//                           ${tableFields
//                             .map((field) => `<td>${getFieldValue(record, field)}</td>`)
//                             .join('')}
//                           <td>${calculateBalance(record)}</td>
//                         </tr>
//                       `;
//                     })
//                     .join('')
//                 : `<tr><td colspan="${tableFields.length + 1}">No data matches the selected filters for ${formatAcademicYear(selectedAcademicYear)}.</td></tr>`
//               }
//             </tbody>
//           </table>
//         `;

//         tableContainer.innerHTML = tableContent;
//         document.body.appendChild(tableContainer);

//         await new Promise((resolve) => setTimeout(resolve, 200));

//         const tableCanvas = await html2canvas(tableContainer, {
//           scale: 2,
//           useCORS: true,
//           allowTaint: false,
//           logging: true,
//           backgroundColor: '#ffffff',
//           windowWidth: (pageWidth - margin * 2) * mmToPx,
//         });
//         const tableImg = tableCanvas.toDataURL('image/jpeg', 0.98);
//         const tableImgHeight = (tableCanvas.height / mmToPx) * (pageWidth - margin * 2) / (tableCanvas.width / mmToPx);

//         pdf.addImage(headerImg, 'JPEG', margin, margin, pageWidth - margin * 2, headerHeight);

//         const destHeight = Math.min(contentHeight, tableImgHeight);
//         if (destHeight > 0) {
//           pdf.addImage(
//             tableImg,
//             'JPEG',
//             margin,
//             margin + headerHeight,
//             pageWidth - margin * 2,
//             destHeight
//           );
//         } else {
//           console.warn(`Page ${page + 1} - Table height is 0, skipping table rendering.`);
//           pdf.text('No content to display', margin, margin + headerHeight + 10);
//         }

//         pdf.addImage(footerImg, 'JPEG', margin, pageHeight - footerHeight - margin, pageWidth - margin * 2, footerHeight);

//         document.body.removeChild(tableContainer);
//       }

//       pdf.save(`Admission_Fees_${formatAcademicYear(selectedAcademicYear)}.pdf`);
//       onClose();
//     } catch (error) {
//       console.error('PDF generation failed:', error);
//       alert('Failed to generate PDF. Please check the console for details.');
//     }
//   };

//   return (
//     <Modal
//       show={isOpen}
//       onHide={onClose}
//       centered
//       size="md"
//       dialogClassName="responsive-modal"
//       backdropClassName="bg-black bg-opacity-50"
//       style={{ backdropFilter: 'blur(5px)' }}
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Export Options</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="d-flex flex-column gap-3">
//           <Button variant="primary" onClick={handleExportExcel}>
//             Export to Excel
//           </Button>
//           <Button variant="primary" onClick={generatePDF}>
//             Export to PDF
//           </Button>
//         </div>
//       </Modal.Body>
//       <Modal.Footer className="d-flex flex-wrap gap-2 justify-content-end">
//         <Button variant="secondary" onClick={onClose}>
//           Cancel
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ExportModal;
"use client"

import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import * as XLSX from "xlsx"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import { fetchSchoolData, generateHeader, generateFooter } from "../../../PdfUtlis"

const ExportModal = ({
  isOpen,
  onClose,
  filteredData,
  tableFields,
  headerMapping,
  getFieldValue,
  calculateBalance,
  totals,
  formatAcademicYear,
  selectedAcademicYear,
  schoolId,
}) => {
  const [school, setSchool] = useState(null)
  const [logoSrc, setLogoSrc] = useState("")

  useEffect(() => {
    if (isOpen && schoolId) {
      const loadSchoolData = async () => {
        try {
          const { school, logoSrc } = await fetchSchoolData(schoolId)
          setSchool(school)
          setLogoSrc(logoSrc)
        } catch (error) {
          console.error("Failed to fetch school data:", error)
        }
      }
      loadSchoolData()
    }
  }, [isOpen, schoolId])

  const handleExportExcel = () => {
    // Prepare data
    const data = filteredData.map((record) => {
      const row = {}
      tableFields.forEach((field) => {
        row[headerMapping[field.id] || field.label] = getFieldValue(record, field)
      })
      row["Balance"] = calculateBalance(record)
      return row
    })

    // Prepare totals row
    const totalsRow = {}
    tableFields.forEach((field) => {
      if (field.id === "admFeesDue") totalsRow[headerMapping[field.id]] = totals.feesDue
      else if (field.id === "admFeesPaid") totalsRow[headerMapping[field.id]] = totals.feesPaid
      else if (field.id === "admFeesConcession") totalsRow[headerMapping[field.id]] = totals.concession
      else totalsRow[headerMapping[field.id]] = ""
    })
    totalsRow["Balance"] = totals.balance
    data.push(totalsRow)

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data, { header: Object.keys(data[0]) })

    // Define styles with bold fonts and thick borders
    const headerStyle = {
      font: { bold: true, sz: 14, color: { rgb: "000000" } },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "E5E7EB" } },
      border: {
        top: { style: "thick", color: { rgb: "000000" } },
        bottom: { style: "thick", color: { rgb: "000000" } },
        left: { style: "thick", color: { rgb: "000000" } },
        right: { style: "thick", color: { rgb: "000000" } },
      },
    }

    const cellStyle = {
      font: { sz: 11 },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "medium", color: { rgb: "000000" } },
        bottom: { style: "medium", color: { rgb: "000000" } },
        left: { style: "medium", color: { rgb: "000000" } },
        right: { style: "medium", color: { rgb: "000000" } },
      },
    }

    const totalsStyle = {
      font: { bold: true, sz: 14, color: { rgb: "000000" } },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "F3F4F6" } },
      border: {
        top: { style: "thick", color: { rgb: "000000" } },
        bottom: { style: "thick", color: { rgb: "000000" } },
        left: { style: "thick", color: { rgb: "000000" } },
        right: { style: "thick", color: { rgb: "000000" } },
      },
    }


    const range = XLSX.utils.decode_range(ws["!ref"])
    const dataRowCount = data.length
    const dataColCount = Object.keys(data[0]).length


    for (let R = 0; R < dataRowCount + 1; ++R) {

      for (let C = 0; C < dataColCount; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C })

  
        if (!ws[cellAddress]) {
          ws[cellAddress] = { t: "s", v: "" }
        }

   
        if (R === 0) {
     
          ws[cellAddress].s = headerStyle
        } else if (R === dataRowCount) {
          // Totals row (last row)
          ws[cellAddress].s = totalsStyle
        } else {
          // Data rows
          ws[cellAddress].s = cellStyle
        }
      }
    }

    // Set column widths for better readability
    const colWidths = []
    Object.keys(data[0]).forEach((key) => {
      // Calculate optimal width based on content
      let maxLength = key.length // Header length
      data.forEach((row) => {
        const cellValue = String(row[key] || "")
        if (cellValue.length > maxLength) {
          maxLength = cellValue.length
        }
      })
      // Set minimum width of 10 and maximum of 25
      colWidths.push({ wch: Math.min(Math.max(maxLength + 2, 10), 25) })
    })
    ws["!cols"] = colWidths

    // Update the range to only include cells with data
    ws["!ref"] = XLSX.utils.encode_range({
      s: { c: 0, r: 0 },
      e: { c: dataColCount - 1, r: dataRowCount },
    })

    // Create workbook and add worksheet
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Admission Fees")

    // Save file
    XLSX.writeFile(wb, `Admission_Fees_${formatAcademicYear(selectedAcademicYear)}.xlsx`)
    onClose()
  }

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "landscape",
      })

      const pageWidth = 297
      const pageHeight = 210
      const margin = 20
      const headerHeight = 50
      const footerHeight = 30
      const contentHeight = pageHeight - margin * 2 - headerHeight - footerHeight
      const mmToPx = 3.779

      const preloadImage = (src) => {
        return new Promise((resolve) => {
          if (!src) return resolve(null)
          const img = new Image()
          img.crossOrigin = "Anonymous"
          img.src = src
          img.onload = () => resolve(img)
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}. Using fallback.`)
            resolve(null)
          }
        })
      }

      const logoImg = await preloadImage(logoSrc)

      const headerContainer = document.createElement("div")
      headerContainer.style.cssText = `
        width: ${(pageWidth - margin * 2) * mmToPx}px;
        height: ${headerHeight * mmToPx}px;
        position: fixed;
        top: 0;
        left: 0;
        font-family: Arial, sans-serif;
        z-index: 9999;
      `
      headerContainer.innerHTML = generateHeader(school, logoImg ? logoSrc : "")
      document.body.appendChild(headerContainer)

      const footerContainer = document.createElement("div")
      footerContainer.style.cssText = `
        width: ${(pageWidth - margin * 2) * mmToPx}px;
        height: ${footerHeight * mmToPx}px;
        position: fixed;
        top: 0;
        left: 0;
        font-family: Arial, sans-serif;
        z-index: 9999;
      `
      footerContainer.innerHTML = generateFooter(school)
      document.body.appendChild(footerContainer)

      const tableContainer = document.createElement("div")
      tableContainer.style.cssText = `
        width: ${(pageWidth - margin * 2) * mmToPx}px;
        max-height: ${contentHeight * mmToPx}px;
        position: fixed;
        top: 0;
        left: 0;
        font-family: Arial, sans-serif;
        font-size: 11px;
        line-height: 1.2;
        color: #000000;
        overflow: hidden;
        z-index: 9999;
      `

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
      `

      const rowsPerPage = 15
      const pageData = []
      for (let i = 0; i < filteredData.length; i += rowsPerPage) {
        pageData.push(filteredData.slice(i, i + rowsPerPage))
      }

      if (filteredData.length > 0) {
        pageData[pageData.length - 1] = [...pageData[pageData.length - 1], { isTotalsRow: true, totals }]
      } else {
        pageData.push([])
      }

      await new Promise((resolve) => setTimeout(resolve, 200))

      const headerCanvas = await html2canvas(headerContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: true,
        backgroundColor: "#ffffff",
        windowWidth: (pageWidth - margin * 2) * mmToPx,
        windowHeight: headerHeight * mmToPx,
      })

      const headerImg = headerCanvas.toDataURL("image/jpeg", 0.98)
      document.body.removeChild(headerContainer)

      const footerCanvas = await html2canvas(footerContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: true,
        backgroundColor: "#ffffff",
        windowWidth: (pageWidth - margin * 2) * mmToPx,
        windowHeight: footerHeight * mmToPx,
      })

      const footerImg = footerCanvas.toDataURL("image/jpeg", 0.98)
      document.body.removeChild(footerContainer)

      for (let page = 0; page < pageData.length; page++) {
        if (page > 0) pdf.addPage()

        const currentPageData = pageData[page]

        const tableContent = `
          ${tableStyle}
          <div class="pdf-title">Admission Fees Report - ${formatAcademicYear(selectedAcademicYear)}</div>
          <table>
            <thead>
              <tr>
                ${tableFields.map((field) => `<th>${headerMapping[field.id] || field.label}</th>`).join("")}
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${
                currentPageData.length > 0
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
                        `
                        }
                        return `
                        <tr>
                          ${tableFields.map((field) => `<td>${getFieldValue(record, field)}</td>`).join("")}
                          <td>${calculateBalance(record)}</td>
                        </tr>
                      `
                      })
                      .join("")
                  : `<tr><td colspan="${tableFields.length + 1}">No data matches the selected filters for ${formatAcademicYear(selectedAcademicYear)}.</td></tr>`
              }
            </tbody>
          </table>
        `

        tableContainer.innerHTML = tableContent
        document.body.appendChild(tableContainer)

        await new Promise((resolve) => setTimeout(resolve, 200))

        const tableCanvas = await html2canvas(tableContainer, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: true,
          backgroundColor: "#ffffff",
          windowWidth: (pageWidth - margin * 2) * mmToPx,
        })

        const tableImg = tableCanvas.toDataURL("image/jpeg", 0.98)
        const tableImgHeight = ((tableCanvas.height / mmToPx) * (pageWidth - margin * 2)) / (tableCanvas.width / mmToPx)

        pdf.addImage(headerImg, "JPEG", margin, margin, pageWidth - margin * 2, headerHeight)

        const destHeight = Math.min(contentHeight, tableImgHeight)
        if (destHeight > 0) {
          pdf.addImage(tableImg, "JPEG", margin, margin + headerHeight, pageWidth - margin * 2, destHeight)
        } else {
          console.warn(`Page ${page + 1} - Table height is 0, skipping table rendering.`)
          pdf.text("No content to display", margin, margin + headerHeight + 10)
        }

        pdf.addImage(
          footerImg,
          "JPEG",
          margin,
          pageHeight - footerHeight - margin,
          pageWidth - margin * 2,
          footerHeight,
        )
        document.body.removeChild(tableContainer)
      }

      pdf.save(`Admission_Fees_${formatAcademicYear(selectedAcademicYear)}.pdf`)
      onClose()
    } catch (error) {
      console.error("PDF generation failed:", error)
      alert("Failed to generate PDF. Please check the console for details.")
    }
  }

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      size="md"
      dialogClassName="responsive-modal"
      backdropClassName="bg-black bg-opacity-50"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Export Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-3">
          <Button variant="primary" onClick={handleExportExcel}>
            Export to Excel
          </Button>
          <Button variant="primary" onClick={generatePDF}>
            Export to PDF
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex flex-wrap gap-2 justify-content-end">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExportModal
