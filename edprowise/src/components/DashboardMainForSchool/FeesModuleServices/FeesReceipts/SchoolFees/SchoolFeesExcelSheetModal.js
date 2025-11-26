import { useState, useEffect } from 'react';
import { read, utils, writeFile } from 'xlsx';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import ImportModal from './ImportModal';
import ConfirmModal from '../../../../ConfirmModalImportExcel';
import SchoolFeesPreviewModal from './SchoolFeesPreviewModal';

const excelSerialToDate = (serial) => {
  if (typeof serial !== 'number' || isNaN(serial) || serial < 1) {
    return null;
  }
  const excelEpoch = new Date(1900, 0, 1);
  const daysSinceEpoch = serial - 1;
  const date = new Date(excelEpoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
  if (serial <= 60) {
    date.setDate(date.getDate() - 1);
  }
  return date;
};

const SchoolFeesExcelSheetModal = ({
  show,
  onClose,
  schoolId,
  existingStudents,
  classes,
  feeTypes,
  handleFinalSubmit,
}) => {
  const [file, setFile] = useState(null);
  const [showMainModal, setShowMainModal] = useState(show);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullPreviewModal, setShowFullPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [validatedData, setValidatedData] = useState([]);
  const [sectionsByClass, setSectionsByClass] = useState({});

  useEffect(() => {
    setShowMainModal(show);
  }, [show]);

  useEffect(() => {
    const sectionsCache = {};
    classes.forEach((cls) => {
      sectionsCache[cls._id] = cls.sections || [];
    });
    setSectionsByClass(sectionsCache);
  }, [classes]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImportClick = () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }
    if (!schoolId) {
      toast.error('School ID is missing. Please contact support.');
      return;
    }
    setShowMainModal(false);
    setShowConfirmModal(true);
  };

  const extractInstallmentNumber = (installmentName) => {
    if (!installmentName || typeof installmentName !== 'string') {
      return 0;
    }
    const match = installmentName.match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const processExcelData = async () => {
    try {
      if (!file) {
        throw new Error('No file selected');
      }

      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array', dateNF: 'yyyy-mm-dd', raw: false });
            const sheetName = workbook.SheetNames.find((name) => name.toLowerCase() === 'data');
            if (!sheetName) {
              throw new Error('No "Data" sheet found in the Excel file');
            }

            const sheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(sheet, { defval: '', dateNF: 'yyyy-mm-dd' }).filter(
              (row) => row.AdmissionNumber?.toString().trim()
            );

            if (jsonData.length === 0) {
              throw new Error('No valid data rows found in the Excel file');
            }

            const tempValidatedData = [];
            let hasError = false;

            for (let index = 0; index < jsonData.length; index++) {
              const row = jsonData[index];
              const payload = {};

              try {
                // Extract and normalize fields
                payload.AdmissionNumber = row.AdmissionNumber?.toString().trim() || '';
                payload.paymentMode = row.paymentMode?.toString().trim() || '';
                payload.name = row.name?.toString().trim() || '';
                payload.chequeNumber = row.chequeNumber?.toString().trim() || '';
                payload.bankName = row.bankName?.toString().trim() || '';
                payload.academicYear = row.academicYear?.toString().trim() || '';
                payload.installmentName = row.installmentName?.toString().trim() || '';
                payload.feeTypeName = row.feeTypeName?.toString().trim() || '';
                payload.paidAmount = Number(row.paidAmount) || 0;
                payload.excessAmount = Number(row.excessAmount) || 0;
                payload.fineAmount = Number(row.fineAmount) || 0;

                // Handle payment date
                let paymentDate = row.paymentDate;
                if (typeof paymentDate === 'number') {
                  const parsedDate = excelSerialToDate(paymentDate);
                  if (parsedDate && !isNaN(parsedDate.getTime())) {
                    paymentDate = parsedDate.toISOString().split('T')[0];
                  } else {
                    throw new Error(`Row ${index + 2}: Invalid payment date serial "${paymentDate}"`);
                  }
                } else {
                  paymentDate = String(paymentDate).trim();
                  if (paymentDate.includes('-') && paymentDate.split('-')[0].length === 2) {
                    const [day, month, year] = paymentDate.split('-');
                    paymentDate = `${year}-${month}-${day}`;
                  }
                }
                payload.paymentDate = paymentDate;

                // Basic validations
                if (!payload.AdmissionNumber) {
                  throw new Error(`Row ${index + 2}: Admission Number is required`);
                }

                const student = existingStudents.find(
                  (s) => s.AdmissionNumber?.trim().toLowerCase() === payload.AdmissionNumber.toLowerCase()
                );
                if (!student) {
                  throw new Error(`Row ${index + 2}: Invalid Admission Number "${payload.AdmissionNumber}"`);
                }
                payload.firstName = student.firstName;
                payload.lastName = student.lastName;

                const academicHistoryEntry = student.academicHistory?.find(
                  (entry) => entry.academicYear === payload.academicYear
                );
                payload.masterDefineClass =
                  academicHistoryEntry?.masterDefineClass ||
                  student.masterDefineClass?._id ||
                  student.masterDefineClass;
                payload.section =
                  academicHistoryEntry?.section || student.section?._id || student.section;

                const className = row.className?.toString().trim();
                const classObj = classes.find(
                  (c) => c.className.toLowerCase() === className?.toLowerCase()
                );
                if (!classObj) {
                  throw new Error(`Row ${index + 2}: Invalid Class "${className}"`);
                }
                if (classObj._id !== payload.masterDefineClass) {
                  throw new Error(
                    `Row ${index + 2}: Class "${className}" does not match student’s class for Admission Number "${payload.AdmissionNumber}"`
                  );
                }

                const sectionName = row.section?.toString().trim();
                const sections = sectionsByClass[classObj._id] || [];
                const sectionObj = sections.find(
                  (s) => s.name.toLowerCase() === sectionName?.toLowerCase()
                );
                if (!sectionName || !sectionObj) {
                  throw new Error(`Row ${index + 2}: Invalid Section "${sectionName}" for class "${className}"`);
                }
                if (sectionObj._id !== payload.section) {
                  throw new Error(
                    `Row ${index + 2}: Section "${sectionName}" does not match student’s section for Admission Number "${payload.AdmissionNumber}"`
                  );
                }

                if (!['Cash', 'Cheque', 'Online'].includes(payload.paymentMode)) {
                  throw new Error(
                    `Row ${index + 2}: Invalid Payment Mode "${payload.paymentMode}". Must be one of: Cash, Cheque, Online`
                  );
                }

                if (payload.paymentMode === 'Cheque') {
                  if (!payload.chequeNumber || !payload.bankName) {
                    throw new Error(
                      `Row ${index + 2}: Cheque Number and Bank Name are required for Cheque payment mode`
                    );
                  }
                } else {
                  payload.chequeNumber = '';
                  payload.bankName = '';
                }

                if (!payload.name) {
                  throw new Error(`Row ${index + 2}: Collector Name is required`);
                }

                if (!payload.academicYear) {
                  throw new Error(`Row ${index + 2}: Academic Year is required`);
                }

                if (!payload.installmentName) {
                  throw new Error(`Row ${index + 2}: Installment Name is required`);
                }

                payload.installmentNumber = extractInstallmentNumber(payload.installmentName);

                // Fetch fee types for the specific academic year
                let validFeeTypes = feeTypes.filter((ft) => ft.academicYear === payload.academicYear);
                try {
                  const feeTypesResponse = await getAPI(`/getall-fess-type/${schoolId}?academicYear=${payload.academicYear}`);
                  if (!feeTypesResponse.hasError && Array.isArray(feeTypesResponse.data.data)) {
                    validFeeTypes = feeTypesResponse.data.data;
                  } else {
                    console.warn(`Row ${index + 2}: Using filtered default feeTypes for academic year ${payload.academicYear}`);
                  }
                } catch (error) {
                  console.warn(`Row ${index + 2}: Failed to fetch fee types: ${error.message}`);
                }

                // Validate fee type
                if (payload.feeTypeName) {
                  const feeType = validFeeTypes.find(
                    (ft) =>
                      ft.feesTypeName.toLowerCase() === payload.feeTypeName.toLowerCase() &&
                      ft.academicYear === payload.academicYear
                  );
                  payload.feesTypeId = feeType ? feeType._id : null;
                  if (!payload.feesTypeId) {
                    throw new Error(
                      `Row ${index + 2}: Fee Type "${payload.feeTypeName}" not found for Academic Year "${payload.academicYear}"`
                    );
                  }
                }

                if (!payload.paymentDate) {
                  throw new Error(`Row ${index + 2}: Payment Date is required`);
                }
                const parsedDate = new Date(payload.paymentDate);
                if (isNaN(parsedDate.getTime())) {
                  throw new Error(
                    `Row ${index + 2}: Invalid Payment Date "${payload.paymentDate}". Use format YYYY-MM-DD or DD-MM-YYYY`
                  );
                }
                payload.paymentDate = parsedDate;

                // Validate API data for fee type and installment
                if (payload.feesTypeId || payload.excessAmount > 0 || payload.fineAmount > 0) {
                  try {
                    const response = await getAPI(
                      `/get-concession-formbyADMID?classId=${payload.masterDefineClass}&sectionIds=${payload.section}&schoolId=${schoolId}&admissionNumber=${payload.AdmissionNumber}&academicYear=${payload.academicYear}`
                    );
                    if (!response?.data?.data || !Array.isArray(response.data.data)) {
                      throw new Error(
                        `Row ${index + 2}: No fee data found for Admission Number "${payload.AdmissionNumber}" in academic year "${payload.academicYear}"`
                      );
                    }

                    const yearData = response.data.data.find(
                      (y) => y.academicYear === payload.academicYear
                    );
                    if (!yearData) {
                      throw new Error(
                        `Row ${index + 2}: Academic Year "${payload.academicYear}" not found for Admission Number "${payload.AdmissionNumber}"`
                      );
                    }

                    const installmentData = yearData.feeInstallments?.find(
                      (item) => item.installmentName.toLowerCase() === payload.installmentName.toLowerCase()
                    );
                    if (!installmentData) {
                      throw new Error(
                        `Row ${index + 2}: Installment "${payload.installmentName}" not found for Academic Year "${payload.academicYear}"`
                      );
                    }

                    payload.dueDate = installmentData.dueDate;
                    if (!payload.dueDate) {
                      throw new Error(
                        `Row ${index + 2}: Due Date is missing for Installment "${payload.installmentName}" in Academic Year "${payload.academicYear}"`
                      );
                    }

                    if (payload.feesTypeId) {
                      console.log(`Row ${index + 2}: API feeInstallments:`, yearData.feeInstallments);
                      console.log(
                        `Row ${index + 2}: Looking for feeTypeId: ${payload.feesTypeId}, installmentName: ${payload.installmentName}`
                      );

                      const feeInstallment = yearData.feeInstallments?.find(
                        (item) =>
                          item.installmentName.toLowerCase() === payload.installmentName.toLowerCase() &&
                          item.feesTypeId._id === payload.feesTypeId
                      );

                      if (!feeInstallment) {
                        if (payload.excessAmount > 0 || payload.fineAmount > 0) {
                          payload.amount = 0;
                          payload.concession = 0;
                          payload.payable = 0;
                          payload.balance = 0;
                        } else {
                          throw new Error(
                            `Row ${index + 2}: Fee Type "${payload.feeTypeName}" (ID: ${payload.feesTypeId}) not found for Installment "${payload.installmentName}" in Academic Year "${payload.academicYear}"`
                          );
                        }
                      } else {
                        const concessionItem = yearData.concession?.concessionDetails?.find(
                          (cd) =>
                            cd.installmentName.toLowerCase() === payload.installmentName.toLowerCase() &&
                            cd.feesType === payload.feesTypeId
                        );
                        const concessionAmount = concessionItem?.concessionAmount || 0;
                        const payableAmount = feeInstallment.amount - concessionAmount;

                        if (
                          payload.paidAmount <= 0 ||
                          payload.paidAmount > payableAmount + payload.fineAmount
                        ) {
                          throw new Error(
                            `Row ${index + 2}: Paid Amount (${payload.paidAmount}) must be between 1 and ${
                              payableAmount + payload.fineAmount
                            } for Fee Type "${payload.feeTypeName}"`
                          );
                        }

                        payload.amount = feeInstallment.amount;
                        payload.concession = concessionAmount;
                        payload.payable = payableAmount;
                        payload.balance = payableAmount - payload.paidAmount;
                      }
                    } else if (payload.excessAmount > 0 || payload.fineAmount > 0) {
                      payload.amount = 0;
                      payload.concession = 0;
                      payload.payable = 0;
                      payload.balance = 0;
                    } else {
                      throw new Error(
                        `Row ${index + 2}: At least one of feeTypeName, excessAmount, or fineAmount must be provided`
                      );
                    }
                  } catch (error) {
                    console.error(`Row ${index + 2}: API Error:`, error);
                    throw new Error(
                      `Row ${index + 2}: Error fetching fee data: ${error.message || 'Failed to fetch fee data'}`
                    );
                  }
                } else {
                  throw new Error(
                    `Row ${index + 2}: At least one of feeTypeName, excessAmount, or fineAmount must be provided`
                  );
                }

                tempValidatedData.push(payload);
              } catch (error) {
                console.error(`Row ${index + 2}: Validation Error:`, error);
                toast.error(error.message);
                hasError = true;
              }
            }

            if (hasError) {
              toast.error('Some rows contain errors. Review the preview and correct the file');
            }

            resolve({ jsonData, validatedData: tempValidatedData });
          } catch (error) {
            console.error('Error processing Excel data:', error);
            toast.error(`Error processing Excel file: ${error.message}`);
            reject(error);
          }
        };
        reader.readAsArrayBuffer(file);
      });
    } catch (error) {
      console.error('Error in processExcelData:', error);
      toast.error(`Error processing Excel file: ${error.message}`);
      return { jsonData: [], validatedData: [] };
    }
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
      console.error('View Excel Error:', error);
    }
  };

  const handleConfirmImport = async () => {
    if (validatedData.length === 0 && previewData.length === 0) {
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

    try {
      const groupedData = validatedData.reduce((acc, data) => {
        const key = `${data.AdmissionNumber}-${data.academicYear}`;
        if (!acc[key]) {
          acc[key] = {
            AdmissionNumber: data.AdmissionNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            masterDefineClass: data.masterDefineClass,
            section: data.section,
            paymentMode: data.paymentMode,
            name: data.name,
            chequeNumber: data.chequeNumber,
            bankName: data.bankName,
            academicYear: data.academicYear,
            paymentDate: data.paymentDate instanceof Date
              ? data.paymentDate.toISOString().split('T')[0]
              : data.paymentDate,
            installments: [],
          };
        }
        const installmentNum = data.installmentNumber;
        let installment = acc[key].installments.find((i) => i.number === installmentNum);
        if (!installment) {
          installment = {
            number: installmentNum,
            installmentName: data.installmentName,
            dueDate: data.dueDate,
            fineAmount: 0,
            excessAmount: 0,
            feeItems: [],
          };
          acc[key].installments.push(installment);
        }
        if (data.feesTypeId) {
          installment.feeItems.push({
            feeTypeId: data.feesTypeId,
            amount: data.amount,
            concession: data.concession,
            payable: data.payable,
            paid: data.paidAmount,
            balance: data.balance,
            type: data.feeTypeName,
          });
        }
        installment.fineAmount += data.fineAmount;
        installment.excessAmount += data.excessAmount;
        return acc;
      }, {});

      const frontendReceiptDetails = [];
      const errors = [];

      for (const data of Object.values(groupedData)) {
        try {
          const receiptDetails = {
            studentName: `${data.firstName} ${data.lastName}`,
            studentAdmissionNumber: data.AdmissionNumber,
            className: classes.find((c) => c._id === data.masterDefineClass)?.className || 'Unknown',
            section:
              sectionsByClass[data.masterDefineClass]?.find((s) => s._id === data.section)?.name ||
              'Unknown',
            paymentDate: data.paymentDate,
            paymentMode: data.paymentMode,
            collectorName: data.name,
            transactionNumber: data.paymentMode === 'Online'
              ? `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
              : data.chequeNumber,
            chequeNumber: data.paymentMode === 'Cheque' ? data.chequeNumber : undefined,
            bankName: data.paymentMode === 'Cheque' ? data.bankName : undefined,
            academicYear: data.academicYear,
            installments: data.installments.map((inst) => ({
              number: inst.number,
              installmentName: inst.installmentName,
              dueDate: inst.dueDate,
              excessAmount: inst.excessAmount,
              fineAmount: inst.fineAmount,
              feeItems: inst.feeItems.map((fi) => ({
                feeTypeId: fi.feeTypeId,
                amount: fi.amount,
                concession: fi.concession,
                payable: fi.payable,
                paid: fi.paid,
                balance: fi.balance,
                type: fi.type,
                academicYear: data.academicYear,
              })),
            })),
          };

          const response = await postAPI('/create-schoolfees', receiptDetails);
          if (response.hasError) {
            throw new Error(response.message || `Failed to save receipt for ${data.academicYear}`);
          }

          frontendReceiptDetails.push({
            ...receiptDetails,
            receiptNumber: response.data.receipt?.receiptNumber || 'Unknown',
            chequeNumber: data.paymentMode === 'Cheque' ? data.chequeNumber : undefined,
            bankName: data.paymentMode === 'Cheque' ? data.bankName : '',
          });
        } catch (error) {
          errors.push({
            message: `Failed to import for Admission Number ${data.AdmissionNumber}: ${error.message || 'Unknown error'}`,
            admissionNumber: data.AdmissionNumber,
          });
        }
      }

      if (frontendReceiptDetails.length > 0) {
        handleFinalSubmit({ preventDefault: () => {} }, frontendReceiptDetails);
        if (errors.length === 0) {
          toast.success('All school fees data imported successfully.');
        } else {
          toast.warn(
            `Imported ${frontendReceiptDetails.length} receipts successfully, but ${errors.length} failed. Check errors in console.`
          );
          console.error('Import Errors:', errors);
        }
      } else {
        toast.error('No receipts were imported successfully. Check console for details.');
        console.error('Import Errors:', errors);
      }

      onClose();
      setFile(null);
      setPreviewData([]);
      setValidatedData([]);
    } catch (error) {
      toast.error(`Error importing fee receipts: ${error.message || 'Unknown error'}`);
      console.error('Import Error:', error);
      setShowMainModal(true);
    }
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setShowMainModal(true);
  };

  const handleDownloadDemo = async () => {
    // if (!classes.length || !feeTypes.length || !existingStudents.length) {
    //   toast.error('No classes, fee types, or students available to include in demo sheet.');
    //   return;
    // }

    const academicYearsMap = new Map();
    for (const student of existingStudents) {
      if (student.academicHistory && Array.isArray(student.academicHistory)) {
        for (const history of student.academicHistory) {
          const year = history.academicYear;
          if (!academicYearsMap.has(year)) {
            academicYearsMap.set(year, { classes: new Set(), sections: new Set() });
          }
          const classId = history.masterDefineClass?._id || history.masterDefineClass;
          const classObj = classes.find((c) => c._id === classId);
          if (classObj) {
            academicYearsMap.get(year).classes.add(classObj.className);
            const sections = sectionsByClass[classObj._id] || [];
            const sectionId = history.section?._id || history.section;
            const sectionObj = sections.find((s) => s._id === sectionId);
            if (sectionObj) {
              academicYearsMap.get(year).sections.add(sectionObj.name);
            }
          }
        }
      }
    }

    const feeTypesByYear = {};
    for (const year of academicYearsMap.keys()) {
      try {
        const response = await getAPI(`/getall-fess-type/${schoolId}?academicYear=${year}`);
        if (response?.data?.data && Array.isArray(response.data.data)) {
          feeTypesByYear[year] = response.data.data.map((ft) => ft.feesTypeName);
        } else {
          feeTypesByYear[year] = feeTypes
            .filter((ft) => ft.academicYear === year)
            .map((ft) => ft.feesTypeName);
        }
      } catch (error) {
        console.error(`Error fetching fee types for ${year}:`, error);
        feeTypesByYear[year] = feeTypes
          .filter((ft) => ft.academicYear === year)
          .map((ft) => ft.feesTypeName);
      }
    }

    const guidelines = [
      ['📌 Import Guidelines:'],
      [
        'Required Fields: AdmissionNumber, className, section, paymentMode, name, academicYear, installmentName, paymentDate.',
      ],
      ['Conditional Fields: chequeNumber, bankName required if paymentMode is Cheque.'],
      [
        'Optional Fields: feeTypeName, paidAmount, excessAmount, fineAmount (at least one must be provided).',
      ],
      [
        'Formats: paymentMode must be Cash/Cheque/Online academicYear must be in format YYYY-YYYY (e.g., 2023-2024). installmentName can be any non-empty string, optionally ending with a positive integer (e.g., "Quarter", "Quarter 1", "Term 1"). paidAmount, excessAmount, and fineAmount must be non-negative numbers. paymentDate must be in format YYYY-MM-DD or DD-MM-YYYY (e.g., 2023-10-15 or 15-10-2023). chequeNumber is stored separately for Cheque payments; transactionNumber is generated automatically.',
      ],
      [
        'AdmissionNumber must match an existing student. className and section must match the student’s academic history for the specified academicYear. feeTypeName must exist and be valid for the installment and academic year (if provided).',
      ],
      ['Do not change column headers; they must remain exactly as provided.'],
      ['Use the "Data" sheet to enter your data.'],
      ['Available Academic Years and Classes:'],
      ...Array.from(academicYearsMap.entries()).map(([year, data]) => [
        `${year}: Classes: ${Array.from(data.classes).join(', ') || 'None'}, Sections: ${
          Array.from(data.sections).join(', ') || 'None'
        }`,
      ]),
      ['Available Fee Types by Academic Year:'],
      ...Object.entries(feeTypesByYear).map(([year, feeTypes]) => [
        `${year}: ${feeTypes.join(', ') || 'None'}`,
      ]),
    ];

    const wsData = [
      [
        'AdmissionNumber',
        'className',
        'section',
        'paymentMode',
        'name',
        'chequeNumber',
        'bankName',
        'academicYear',
        'installmentName',
        'feeTypeName',
        'paidAmount',
        'excessAmount',
        'fineAmount',
        'paymentDate',
      ],
      [
        existingStudents[0]?.AdmissionNumber || 'ABC10001',
        classes[0]?.className || 'Grade 10',
        classes[0]?.sections[0]?.name || 'A',
        'Cheque',
        'Ajay Jadeja',
        '123456',
        'State Bank',
        '2026-2027',
        'Term 1',
        'PTA Fees',
        '1000',
        '100',
        '100',
        '2024-10-15',
      ],
      [
        existingStudents[0]?.AdmissionNumber || 'ABC10001',
        classes[0]?.className || 'Grade 10',
        classes[0]?.sections[0]?.name || 'A',
        'Cash',
        'Ajay Jadeja',
        '',
        '',
        '2026-2027',
        'Term 1',
        '',
        '0',
        '2000',
        '0',
        '2024-10-15',
      ],
    ];

    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(wsData);
    utils.book_append_sheet(wb, ws, 'Data');

    const wsGuidelines = utils.aoa_to_sheet(guidelines);
    utils.book_append_sheet(wb, wsGuidelines, 'Guidelines');

    writeFile(wb, 'school_fees_receipt.xlsx');
    toast.success('Demo file downloaded successfully');
  };

  return (
    <>
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
      <SchoolFeesPreviewModal
        show={showFullPreviewModal}
        onClose={() => setShowFullPreviewModal(false)}
        previewData={previewData}
        validatedData={validatedData}
        classes={classes}
        feeTypes={feeTypes}
        sectionsByClass={sectionsByClass}
      />
    </>
  );
};

export default SchoolFeesExcelSheetModal;