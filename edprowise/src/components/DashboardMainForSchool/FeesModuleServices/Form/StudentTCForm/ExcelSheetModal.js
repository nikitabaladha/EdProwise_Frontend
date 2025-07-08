import { useState, useEffect } from 'react';
import { read, utils, writeFile } from 'xlsx';
import { toast } from 'react-toastify';
import postAPI from '../../../../../api/postAPI';
import getAPI from '../../../../../api/getAPI';
import ImportModal from './ImportModal';
import ConfirmModal from '../../../../ConfirmModalImportExcel';
import PreviewModal from './PreviewModal';

const ExcelSheetModal = ({ show, onClose, schoolId, academicYear, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [feeTypesByClass, setFeeTypesByClass] = useState({});

  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchData = async () => {
      try {
        const studentRes = await getAPI(`/get-admission-form/${schoolId}`);
        if (!studentRes.hasError) {
          setStudents(Array.isArray(studentRes.data.data) ? studentRes.data.data : []);
        } else {
          toast.error(studentRes.message || "Failed to fetch student list.");
        }

        const classRes = await getAPI(`/get-class-and-section-year/${schoolId}/year/${academicYear}`, {}, true);
        setClasses(classRes?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching data.");
        console.error(error);
      }
    };

    fetchData();
  }, [schoolId]);

  const fetchFeeTypes = async (classId) => {
    try {
      const response = await getAPI(`/get-one-time-feesbyIds/${schoolId}/${classId}/${academicYear}`, {}, true);
      if (response?.data?.data) {
        const feeTypes = [];
        response.data.data.forEach(feeItem => {
          if (feeItem.oneTimeFees && feeItem.oneTimeFees.length > 0) {
            feeItem.oneTimeFees.forEach(fee => {
              if (fee.feesTypeId && fee.feesTypeId._id) {
                feeTypes.push({
                  id: fee.feesTypeId._id,
                  name: fee.feesTypeId.feesTypeName,
                  amount: fee.amount,
                });
              }
            });
          }
        });
        return feeTypes;
      }
      return [];
    } catch (error) {
      console.error("Fee type fetch error:", error);
      return [];
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }
    if (!academicYear) {
      toast.error('Please select an academic year before importing.');
      return;
    }
    if (students.length === 0) {
      toast.error('No students available. Please ensure students are registered in the system.');
      return;
    }
    if (classes.length === 0) {
      toast.error('No classes available. Please configure classes in the system.');
      return;
    }
    setShowMainModal(false);
    setShowConfirmModal(true);
  };

  const processExcelData = async () => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = read(data, { type: 'array', dateNF: 'yyyy-mm-dd', raw: false });
          const sheetName = workbook.SheetNames.find((name) => name.toLowerCase() === 'data');
          if (!sheetName) {
            toast.error('No "Data" sheet found in the Excel file.');
            resolve({ jsonData: [], validatedData: [] });
            return;
          }
          const sheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(sheet, { defval: '' }).filter((row) => {
            return row.AdmissionNumber?.toString().trim();
          });

          if (jsonData.length === 0) {
            toast.error('No valid data rows found in the Excel file.');
            resolve({ jsonData: [], validatedData: [] });
            return;
          }

          const tempValidatedData = [];
          let hasError = false;

          // Fetch fee types for all classes
          const feeTypesCache = {};
          for (const cls of classes) {
            feeTypesCache[cls._id] = await fetchFeeTypes(cls._id);
          }
          setFeeTypesByClass(feeTypesCache);

          for (let index = 0; index < jsonData.length; index++) {
            const row = jsonData[index];
            const payload = {};
            const admissionNumber = row.AdmissionNumber?.toString().trim();
            const student = students.find(s => s.AdmissionNumber?.trim() === admissionNumber);
            if (!student) {
              toast.error(`Row ${index + 1}: Invalid Admission Number "${admissionNumber}".`);
              hasError = true;
              continue;
            }

            payload.academicYear = academicYear;
            payload.AdmissionNumber = admissionNumber;
            payload.firstName = (row.firstName?.toString().trim() || student.firstName)?.trim();
            payload.lastName = (row.lastName?.toString().trim() || student.lastName)?.trim();

            // Validate className and derive masterDefineClass
            const className = row.className?.toString().trim();
            const classObj = classes.find(c => c.className.toLowerCase() === className?.toLowerCase());
            if (!classObj) {
              toast.error(`Row ${index + 1}: Invalid Class "${className}".`);
              hasError = true;
              continue;
            }
            payload.masterDefineClass = classObj._id;

            const feeTypeName = row.selectedFeeType?.toString().trim();
            const feeTypes = feeTypesCache[classObj._id] || [];
            const feeType = feeTypes.find(ft => ft.name.toLowerCase() === feeTypeName?.toLowerCase());
            if (!feeType) {
              toast.error(`Row ${index + 1}: Invalid Fee Type "${feeTypeName}" for class "${className}".`);
              hasError = true;
              continue;
            }
            payload.selectedFeeType = feeType.id;

            const tcFees = Number(row.TCfees) || 0;
            if (tcFees <= 0 || tcFees !== feeType.amount) {
              toast.error(`Row ${index + 1}: TC Fees must match the fee type amount (${feeType.amount}).`);
              hasError = true;
              continue;
            }
            payload.TCfees = tcFees.toString();

            const concessionAmount = Number(row.concessionAmount) || 0;
            if (concessionAmount < 0 || concessionAmount > tcFees) {
              toast.error(`Row ${index + 1}: Concession Amount must be between 0 and TC Fees (${tcFees}).`);
              hasError = true;
              continue;
            }
            payload.concessionAmount = concessionAmount.toString();

            const finalAmount = Number(row.finalAmount) || 0;
            if (finalAmount !== (tcFees - concessionAmount)) {
              toast.error(`Row ${index + 1}: Final Amount must be TC Fees (${tcFees}) minus Concession (${concessionAmount}).`);
              hasError = true;
              continue;
            }
            payload.finalAmount = finalAmount.toString();

            const requiredFields = [
              { key: 'firstName', value: payload.firstName, label: 'First Name' },
              { key: 'lastName', value: payload.lastName, label: 'Last Name' },
              { key: 'name', value: row.name?.toString().trim(), label: 'Name of Person Filling the Form' },
              { key: 'paymentMode', value: row.paymentMode?.toString().trim(), label: 'Payment Mode' },
              { key: 'className', value: className, label: 'Class Name' },
            ];

            for (const field of requiredFields) {
              if (!field.value) {
                toast.error(`Row ${index + 1}: ${field.label} is required.`);
                hasError = true;
                continue;
              }
            }

            if (hasError) continue;

            const paymentMode = row.paymentMode?.toString().trim();
            if (!['Cash', 'Cheque', 'Online'].includes(paymentMode)) {
              toast.error(`Row ${index + 1}: Invalid Payment Mode "${paymentMode}". Must be one of: Cash, Cheque, Online.`);
              hasError = true;
              continue;
            }
            payload.paymentMode = paymentMode;

            if (paymentMode === 'Cheque') {
              const chequeNumber = row.chequeNumber?.toString().trim();
              const bankName = row.bankName?.toString().trim();
              if (!chequeNumber || !bankName) {
                toast.error(`Row ${index + 1}: Cheque Number and Bank Name are required for Cheque payment mode.`);
                hasError = true;
                continue;
              }
              payload.chequeNumber = chequeNumber;
              payload.bankName = bankName;
            } else {
              payload.chequeNumber = '';
              payload.bankName = '';
            }

            // Automatically set agreementChecked to true
            payload.agreementChecked = true;

            if (tempValidatedData.some(data => data.AdmissionNumber === admissionNumber)) {
              toast.error(`Row ${index + 1}: Duplicate Admission Number "${admissionNumber}".`);
              hasError = true;
              continue;
            }

            // Create payload without className
            const payloadWithoutClassName = {
              academicYear: payload.academicYear,
              AdmissionNumber: payload.AdmissionNumber,
              firstName: payload.firstName,
              lastName: payload.lastName,
              masterDefineClass: payload.masterDefineClass,
              selectedFeeType: payload.selectedFeeType,
              TCfees: payload.TCfees,
              concessionAmount: payload.concessionAmount,
              finalAmount: payload.finalAmount,
              name: row.name?.toString().trim(),
              paymentMode: payload.paymentMode,
              chequeNumber: payload.chequeNumber,
              bankName: payload.bankName,
              agreementChecked: payload.agreementChecked,
            };

            tempValidatedData.push(payloadWithoutClassName);
          }

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
      // Error handled in processExcelData
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

    for (const [index, data] of validatedData.entries()) {
      try {
        const payload = new FormData();
        payload.append('schoolId', schoolId);
        for (const key in data) {
          if (data.hasOwnProperty(key) && key !== 'selectedFeeType') {
            payload.append(key, data[key]);
          }
        }

        const response = await postAPI('/create-TC-form', payload, {
          'Content-Type': 'multipart/form-data',
        });

        if (!response.hasError) {
          toast.success(`TC form for Admission Number ${data.AdmissionNumber} imported successfully (Row ${index + 1}).`);
        } else {
          toast.error(`Row ${index + 1}: ${response.message || 'Failed to import TC form.'}`);
        }
      } catch (err) {
        const errorMessage = err?.response?.data?.message || `Error importing TC form for row ${index + 1}.`;
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
    const guidelines = [
      ['📌 Import Guidelines:'],
      ['• Required Fields: AdmissionNumber, firstName, lastName, className, selectedFeeType, TCfees, finalAmount, name, paymentMode.'],
      ['• Conditional Fields: chequeNumber and bankName are required if paymentMode is Cheque.'],
      ['• Formats: paymentMode must be Cash/Cheque/Online.'],
      ['• TCfees must match the selectedFeeType amount. finalAmount = TCfees - concessionAmount.'],
      ['• selectedFeeType is required for validation and must match an existing feeType in the OneTimeFees collection.'],
      ['• Do not change column headers; they must remain exactly as provided.'],
      ['• If the payment mode is "Cash" or "Online", leave the Cheque Number and Bank Name fields blank.'],
      ['• Use the "Data" sheet to enter your data.'],
      ['• agreementChecked is automatically set to true and should not be included in the Excel file.'],
      [`• Available Classes: ${classes.map(c => c.className).join(', ')}.`],
      [`• Sample Admission Numbers: ${students.slice(0, 5).map(s => s.AdmissionNumber).join(', ')}.`],
    ];

    const wsData = [
      [
        'AdmissionNumber', 'firstName', 'lastName', 'className', 'selectedFeeType',
        'TCfees', 'concessionAmount', 'finalAmount', 'name', 'paymentMode',
        'chequeNumber', 'bankName'
      ],
      [
        students[0]?.AdmissionNumber || 'ADM001', 'John', 'Doe', classes[0]?.className || 'Grade 10',
        'TC Fee', '500', '100', '400', 'Admin User', 'Cheque', '123456', 'State Bank'
      ],
    ];

    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(wsData);
    utils.book_append_sheet(wb, ws, 'Data');

    const wsGuidelines = utils.aoa_to_sheet(guidelines);
    utils.book_append_sheet(wb, wsGuidelines, 'Guidelines');

    writeFile(wb, 'tc_form.xlsx');
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
      <ImportModal
        show={showMainModal}
        onClose={onClose}
        handleFileChange={handleFileChange}
        handleImportClick={handleImportClick}
        handleDownloadDemo={handleDownloadDemo}
      />
      <ConfirmModal
        show={showConfirmModal}
        onCancel={handleCancelConfirm}
        onConfirm={handleConfirmImport}
        onViewExcelSheet={handleViewExcelSheet}
      />
      <PreviewModal
        show={showFullPreviewModal}
        onClose={() => setShowFullPreviewModal(false)}
        previewData={previewData}
        validatedData={validatedData}
        students={students}
        classes={classes}
        feeTypesByClass={feeTypesByClass}
      />
    </>
  );
};

export default ExcelSheetModal;