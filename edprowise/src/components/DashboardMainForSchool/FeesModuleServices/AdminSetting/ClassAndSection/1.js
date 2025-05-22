// import { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import * as XLSX from 'xlsx';
// import { toast } from 'react-toastify';
// import postAPI from '../../../../../api/postAPI';

// const ExcelSheetModal = ({ show, onClose, shifts, onImportSuccess }) => {
//   const [file, setFile] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
//   const [previewData, setPreviewData] = useState([]);
//   const [validatedData, setValidatedData] = useState([]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleImportClick = () => {
//     if (!file) {
//       toast.error('Please select a file to import.');
//       return;
//     }
//     if (shifts.length === 0) {
//       toast.error('No shifts available. Please configure shifts in the system.');
//       return;
//     }
//     setShowConfirmModal(true);
//   };

//   const processExcelData = () => {
//     return new Promise((resolve, reject) => {
//       try {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const data = new Uint8Array(e.target.result);
//           const workbook = XLSX.read(data, { type: 'array' });
//           const sheet = workbook.Sheets[workbook.SheetNames[0]];
//           const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' }).filter((row) => {
//             return row.Class?.toString().trim() && row.Section?.toString().trim() && row.Shift?.toString().trim();
//           });

//           if (jsonData.length === 0) {
//             toast.error('No valid data rows found in the Excel file.');
//             resolve({ jsonData: [], validatedData: [] });
//             return;
//           }

//           const tempValidatedData = [];
//           let hasError = false;

//           jsonData.forEach((row, index) => {
//             const shiftValue = row.Shift ? String(row.Shift).trim() : '';
//             const className = row.Class ? String(row.Class).trim() : '';
//             const sectionName = row.Section ? String(row.Section).trim() : '';

//             if (!shiftValue) {
//               toast.error(`Row ${index + 1}: Shift is missing or empty.`);
//               hasError = true;
//               return;
//             }

//             const shift = shifts.find(
//               (s) => s.masterDefineShiftName.toLowerCase() === shiftValue.toLowerCase()
//             );
//             if (!shift) {
//               toast.error(
//                 `Row ${index + 1}: Invalid shift "${shiftValue}". Available shifts: ${shifts
//                   .map((s) => s.masterDefineShiftName)
//                   .join(', ')}.`
//               );
//               hasError = true;
//               return;
//             }

//             if (!className || !sectionName) {
//               toast.error(`Row ${index + 1}: Class or Section is missing.`);
//               hasError = true;
//               return;
//             }

//             tempValidatedData.push({
//               className,
//               sections: [
//                 {
//                   name: sectionName,
//                   shiftId: shift._id,
//                 },
//               ],
//             });
//           });

//           if (hasError) {
//             toast.error('Some rows contain errors. Review the preview and correct the file.');
//           }

//           resolve({ jsonData, validatedData: tempValidatedData });
//         };
//         reader.readAsArrayBuffer(file);
//       } catch (error) {
//         toast.error('Error processing Excel file: ' + error.message);
//         console.error('Process Error:', error);
//         reject(error);
//       }
//     });
//   };

//   const handleViewExcelSheet = async () => {
//     if (!file) {
//       toast.error('Please select a file to view.');
//       setShowConfirmModal(false);
//       return;
//     }

//     try {
//       const { jsonData, validatedData } = await processExcelData();
//       setPreviewData(jsonData);
//       setValidatedData(validatedData);
//       setShowConfirmModal(false);
//       setShowFullPreviewModal(true);
//     } catch (error) {
//       // Error already handled in processExcelData
//     }
//   };

//   const handleConfirmImport = async () => {
//     if (previewData.length === 0) {
//       try {
//         const { jsonData, validatedData } = await processExcelData();
//         setPreviewData(jsonData);
//         setValidatedData(validatedData);
//       } catch (error) {
//         setShowConfirmModal(false);
//         return;
//       }
//     }

//     if (validatedData.length === 0) {
//       toast.error('No valid data to import. Please review and correct the file.');
//       setShowConfirmModal(false);
//       return;
//     }

//     setShowConfirmModal(false);

//     for (const [index, payload] of validatedData.entries()) {
//       try {
//         const response = await postAPI('/create-class-and-section', payload, {}, true);
//         if (!response.hasError) {
//           toast.success(`Class ${payload.className} imported successfully!`);
//         } else {
//           toast.error(
//             response.message || `Failed to import class ${payload.className} (Row ${index + 1}).`
//           );
//         }
//       } catch (err) {
//         const errorMessage =
//           err?.response?.data?.message || `Error importing class for row ${index + 1}.`;
//         toast.error(errorMessage);
//       }
//     }

//     onImportSuccess();
//     onClose();
//     setFile(null);
//     setPreviewData([]);
//     setValidatedData([]);
//   };

//   const handleDownloadDemo = () => {
//     if (shifts.length === 0) {
//       toast.error('No shifts available to include in demo sheet.');
//       return;
//     }

//     const note = `
// Note: 
// - Class: Enter the class name (e.g., Grade 1, Class 10).
// - Section: Enter the section name (e.g., A, B).
// - Shift: Must match one of the following available shifts: ${shifts
//       .map((s) => s.masterDefineShiftName)
//       .join(', ')}.
// - Ensure all fields are filled and valid.
// `;

//     const wsData = [
//       ['Class', 'Section', 'Shift'],
//       ['Grade 1', 'A', shifts[0]?.masterDefineShiftName || 'Morning'],
//       [], 
//       [note], 
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(wsData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Demo');
//     XLSX.writeFile(wb, 'demo_class_section.xlsx');
//   };

//   return (
//     <>
//       <Modal show={show} onHide={onClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Import Class & Section</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="mb-3">
//             <label htmlFor="excelFile" className="form-label">
//               Upload Excel File
//             </label>
//             <input
//               type="file"
//               className="form-control"
//               id="excelFile"
//               accept=".xlsx, .xls"
//               onChange={handleFileChange}
//             />
//           </div>
//           <Button variant="secondary" onClick={handleDownloadDemo}>
//             Download Demo Excel Sheet
//           </Button>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleImportClick}>
//             Import
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal
//         show={showConfirmModal}
//         onHide={() => setShowConfirmModal(false)}
//         centered
//         dialogClassName="modal-dialog-centered"
//         backdrop="static"
//       >
//         <div className="bg-light p-4 rounded shadow">
//           <div className="d-flex justify-content-center mb-3">
//             <div
//               className="bg-warning rounded-circle d-flex align-items-center justify-content-center"
//               style={{ width: '60px', height: '60px' }}
//             >
//               <span className="text-white fs-1 fw-bold">!</span>
//             </div>
//           </div>
//           <h2 className="text-center mb-3">Are you sure?</h2>
//           <p className="text-center mb-4">Add as per your choice. Do you want to proceed with importing the data?</p>
//           <div className="d-flex justify-content-center gap-2">
//             <Button
//               variant="primary"
//               className="w-25"
//               onClick={handleConfirmImport}
//             >
//               Yes, proceed!
//             </Button>
//             <Button
//               variant="danger"
//               className="w-25"
//               onClick={() => setShowConfirmModal(false)}
//             >
//               No, cancel!
//             </Button>
//             <Button
//               variant="info"
//               className="w-25"
//               onClick={handleViewExcelSheet}
//             >
//               View Excel Sheet
//             </Button>
//           </div>
//         </div>
//       </Modal>

//       <Modal
//         show={showFullPreviewModal}
//         onHide={() => setShowFullPreviewModal(false)}
//         size="xl"
//         dialogClassName="modal-fullscreen"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Excel Data Preview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {previewData.length === 0 ? (
//             <p>No data to display. Please check the file and try again.</p>
//           ) : (
//             <div className="table-responsive">
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Row</th>
//                     <th>Class</th>
//                     <th>Section</th>
//                     <th>Shift</th>
//                     <th>Valid</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {previewData.map((row, index) => {
//                     const isValid = validatedData[index] !== undefined;
//                     return (
//                       <tr key={index}>
//                         <td>{index + 1}</td>
//                         <td>{row.Class || '-'}</td>
//                         <td>{row.Section || '-'}</td>
//                         <td>{row.Shift || '-'}</td>
//                         <td style={{ color: isValid ? 'green' : 'red' }}>
//                           {isValid ? 'Yes' : 'No'}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowFullPreviewModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ExcelSheetModal;

import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import postAPI from '../../../../../api/postAPI';

const ExcelSheetModal = ({ show, onClose, shifts, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);


  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }
    if (shifts.length === 0) {
      toast.error('No shifts available. Please configure shifts in the system.');
      return;
    }
    setShowMainModal(false); 
    setShowConfirmModal(true);
  };

  const processExcelData = () => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' }).filter((row) => {
            return row.Class?.toString().trim() && row.Section?.toString().trim() && row.Shift?.toString().trim();
          });

          if (jsonData.length === 0) {
            toast.error('No valid data rows found in the Excel file.');
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          let hasError = false;

          jsonData.forEach((row, index) => {
            const shiftValue = row.Shift ? String(row.Shift).trim() : '';
            const className = row.Class ? String(row.Class).trim() : '';
            const sectionName = row.Section ? String(row.Section).trim() : '';

            if (!shiftValue) {
              toast.error(`Row ${index + 1}: Shift is missing or empty.`);
              hasError = true;
              return;
            }

            const shift = shifts.find(
              (s) => s.masterDefineShiftName.toLowerCase() === shiftValue.toLowerCase()
            );
            if (!shift) {
              toast.error(
                `Row ${index + 1}: Invalid shift "${shiftValue}". Available shifts: ${shifts
                  .map((s) => s.masterDefineShiftName)
                  .join(', ')}.`
              );
              hasError = true;
              return;
            }

            if (!className || !sectionName) {
              toast.error(`Row ${index + 1}: Class or Section is missing.`);
              hasError = true;
              return;
            }

            tempValidatedData.push({
              className,
              sections: [
                {
                  name: sectionName,
                  shiftId: shift._id,
                },
              ],
            });
          });

          if (hasError) {
            toast.error('Some rows contain errors. Review the preview and correct the file.');
          }

          resolve({ jsonData, validatedData: tempValidatedData });
        };
        reader.readAsArrayBuffer(file);
      } catch (error) {
        toast.error('Error processing Excel file: ' + error.message);
        console.error('Process Error:', error);
        reject(error);
      }
    });
  };

  const handleViewExcelSheet = async () => {
    if (!file) {
      toast.error('Please select a file to view.');
      return;
    }

    try {
      const { jsonData, validatedData } = await processExcelData();
      setPreviewData(jsonData);
      setValidatedData(validatedData);
      setShowFullPreviewModal(true);
    } catch (error) {
    
    }
  };

  const handleConfirmImport = async () => {
    if (previewData.length === 0) {
      try {
        const { jsonData, validatedData } = await processExcelData();
        setPreviewData(jsonData);
        setValidatedData(validatedData);
      } catch (error) {
        setShowConfirmModal(false);
        setShowMainModal(true); 
        return;
      }
    }

    if (validatedData.length === 0) {
      toast.error('No valid data to import. Please review and correct the file.');
      setShowConfirmModal(false);
      setShowMainModal(true); 
      return;
    }

    setShowConfirmModal(false);

    for (const [index, payload] of validatedData.entries()) {
      try {
        const response = await postAPI('/create-class-and-section', payload, {}, true);
        if (!response.hasError) {
          toast.success(`Class ${payload.className} imported successfully!`);
        } else {
          toast.error(
            response.message || `Failed to import class ${payload.className} (Row ${index + 1}).`
          );
        }
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || `Error importing class for row ${index + 1}.`;
        toast.error(errorMessage);
      }
    }

    onImportSuccess();
    setFile(null);
    setPreviewData([]);
    setValidatedData([]);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setShowMainModal(true); 
  };

  const handleDownloadDemo = () => {
    if (shifts.length === 0) {
      toast.error('No shifts available to include in demo sheet.');
      return;
    }

    const note = `
Note: 
- Class: Enter the class name (e.g., Grade 1, Class 10).
- Section: Enter the section name (e.g., A, B).
- Shift: Must match one of the following available shifts: ${shifts
      .map((s) => s.masterDefineShiftName)
      .join(', ')}.
- Ensure all fields are filled and valid.
`;

    const wsData = [
      ['Class', 'Section', 'Shift'],
      ['Grade 1', 'A', shifts[0]?.masterDefineShiftName || 'Morning'],
      [], 
      [note], 
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Demo');
    XLSX.writeFile(wb, 'demo_class_section.xlsx');
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateY(-50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .confirmation-dialog {
            animation: slideIn 0.3s ease-out;
          }
          .confirmation-dialog .bg-warning {
            animation: fadeIn 0.5s ease-in;
          }
        `}
      </style>
      <Modal show={showMainModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Import Class & Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="excelFile" className="form-label">
              Upload Excel File
            </label>
            <input
              type="file"
              className="form-control"
              id="excelFile"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
            />
          </div>
          <Button variant="secondary" onClick={handleDownloadDemo}>
            Download Demo Excel Sheet
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleImportClick}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirmModal}
        onHide={handleCancelConfirm}
        centered
        dialogClassName="modal-dialog-centered"
        backdrop="static"
      >
        <div className="bg-light p-4 rounded shadow confirmation-dialog">
          <div className="d-flex justify-content-center mb-3">
            <div
              className="bg-warning rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '60px', height: '60px' }}
            >
              <span className="text-white fs-1 fw-bold">!</span>
            </div>
          </div>
          <h2 className="text-center mb-3">Are you sure?</h2>
          <p className="text-center mb-4">Add as per your choice. Do you want to proceed with importing the data?</p>
          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleConfirmImport}
            >
              Yes, proceed!
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleCancelConfirm}
            >
              No, cancel!
            </Button>
            <Button
              variant="info"
              size="sm"
              onClick={handleViewExcelSheet}
            >
              View Excel Sheet
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        show={showFullPreviewModal}
        onHide={() => setShowFullPreviewModal(false)}
        size="xl"
        dialogClassName="modal-fullscreen"
      >
        <Modal.Header closeButton>
          <Modal.Title>Excel Data Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {previewData.length === 0 ? (
            <p>No data to display. Please check the file and try again.</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Row</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Shift</th>
                    <th>Valid</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => {
                    const isValid = validatedData[index] !== undefined;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.Class || '-'}</td>
                        <td>{row.Section || '-'}</td>
                        <td>{row.Shift || '-'}</td>
                        <td style={{ color: isValid ? 'green' : 'red' }}>
                          {isValid ? 'Yes' : 'No'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFullPreviewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExcelSheetModal;