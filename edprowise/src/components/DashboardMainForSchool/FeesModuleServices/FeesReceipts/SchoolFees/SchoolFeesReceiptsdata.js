import { useState, useEffect } from 'react';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useSchoolFeesReceipts = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [existingStudents, setExistingStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [sections, setSections] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [initialFeeData, setInitialFeeData] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [formData, setFormData] = useState({
    AdmissionNumber: '',
    paymentMode: '',
    name: '',
    chequeNumber: '',
    bankName: '',
    firstName: '',
    lastName: '',
    masterDefineClass: '',
    section: '',
  });
  const [selectedAcademicYears, setSelectedAcademicYears] = useState([]);
  const [selectAllYears, setSelectAllYears] = useState(false);
  const [selectAllInstallments, setSelectAllInstallments] = useState(false);
  const [currentInstallment, setCurrentInstallment] = useState('Installment 1');
  const [totalInstallments, setTotalInstallments] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProcessedData, setShowProcessedData] = useState(false);
  const [selectedFeeTypesByInstallment, setSelectedFeeTypesByInstallment] = useState({});
  const [paidAmounts, setPaidAmounts] = useState({});
  const [actionSelections, setActionSelections] = useState({});
  const [modalData, setModalData] = useState(null);
     const academicYear = localStorage.getItem('selectedAcademicYear');

  const generateTransactionNumber = () => `${'TXN'}-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      return;
    }
    setSchoolId(userDetails.schoolId);
  }, []);

  useEffect(() => {
  if (!schoolId) {
    return;
  }



  const fetchInitialData = async () => {
    try {
      const studentsRes = await getAPI(`/get-admission-form/${schoolId}`);

      if (!studentsRes.hasError) {
        setExistingStudents(Array.isArray(studentsRes.data.data) ? studentsRes.data.data : []);
      } else {
        console.error('Students API error:', studentsRes.message);
      }

      const classesRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
      setClasses(classesRes?.data?.data || []);

      const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
      if (!feeTypesRes.hasError) {
        setFeeTypes(feeTypesRes.data.data || []);
      } else {
        console.error('Fee types API error:', feeTypesRes.message);
      }
    } catch (error) {
      toast.error('Error initializing data');
    }
  };

  fetchInitialData();
}, [schoolId]);

  const getInstallmentData = (installmentName, academicYear) => {
    if (!Array.isArray(feeData)) {
      console.warn('feeData is not an array:', { feeData: [] });
      return [];
    }

    const selectedYearData = feeData.find((year) => year.academicYear === academicYear);
    if (!selectedYearData?.feeInstallments) {
      console.warn(`No feeInstallments found for academic year: ${academicYear}`);
      return [];
    }

    return selectedYearData.feeInstallments
      .filter((item) => item?.installmentName === installmentName)
      .map((item) => ({
        ...item,
        academicYear: selectedYearData.academicYear,
      }));
  };

//   const handleAdmissionSubmit = async (e) => {
//   e.preventDefault();
//   const admissionNumber = formData?.AdmissionNumber?.trim();
//   if (!admissionNumber) {
//     toast.error('Please enter a valid admission number');
//     return;
//   }

//   try {
//     const student = existingStudents.find((s) => {
//       console.log('Comparing:', s.AdmissionNumber?.trim(), admissionNumber);
//       return s.AdmissionNumber?.trim() === admissionNumber;
//     });
//     if (!student) {
//       console.log('No student found for admission number:', admissionNumber);
//       throw new Error('Invalid admission number');
//     }

//     const selectedAcademicYear = academicYear;
//     console.log('Selected academic year:', selectedAcademicYear);
//     console.log('Student academicHistory:', student.academicHistory);

//     const academicHistoryEntry = student.academicHistory?.find(
//       (entry) => entry.academicYear === selectedAcademicYear
//     );
//     console.log('Found academicHistoryEntry:', academicHistoryEntry);

//     const defaultClass = classes[0]?._id || 'not-provided';
//     const defaultSection = classes[0]?.sections?.[0]?._id || 'not-provided';
//     console.log('Default class and section:', { defaultClass, defaultSection });

//     // Fetch classId and sectionId from feeData if available
//     const feeDataForYear = feeData.find((year) => year.academicYear === selectedAcademicYear);
//     const classIdFromFeeData = feeDataForYear?.classId || academicHistoryEntry?.masterDefineClass || student?.masterDefineClass?._id || student?.masterDefineClass || defaultClass;
//     const sectionIdFromFeeData = feeDataForYear?.sectionId || academicHistoryEntry?.section || student?.section?._id || student?.section || defaultSection;

//     const updatedFormData = {
//       ...formData,
//       firstName: student.firstName || '',
//       lastName: student.lastName || '',
//       masterDefineClass: classIdFromFeeData,
//       section: sectionIdFromFeeData,
//     };
//     console.log('Updated formData:', updatedFormData);
//     setFormData(updatedFormData);

//     if (updatedFormData.masterDefineClass && updatedFormData.masterDefineClass !== 'not-provided') {
//       const selectedClass = classes.find((c) => c._id === updatedFormData.masterDefineClass);
//       setSections(selectedClass?.sections || []);
//     } else {
//       console.log('No valid masterDefineClass in updatedFormData');
//       setSections([]);
//     }

//     if (schoolId && admissionNumber) {
//       console.log('Calling API to fetch concession form data with params:', {
//         classId: updatedFormData.masterDefineClass,
//         sectionIds: updatedFormData.section,
//         schoolId,
//         admissionNumber,
//         academicYear: selectedAcademicYear,
//       });
//       try {
//         const response = await getAPI(
//           `/get-concession-formbyADMID?classId=${updatedFormData.masterDefineClass}&sectionIds=${updatedFormData.section}&schoolId=${schoolId}&admissionNumber=${admissionNumber}&academicYear=${selectedAcademicYear}`
//         );
//         if (!response?.data?.data || !Array.isArray(response.data.data)) {
//           throw new Error('All fees are paid or no fee data found for the selected academic year');
//         }

//         const dataCopy = JSON.parse(JSON.stringify(response.data.data));
//         setFeeData(dataCopy);
//         setInitialFeeData(dataCopy);
//         setShowFullForm(true);

//         const initialPaidAmounts = {};
//         const initialActionSelections = {};
//         response.data.data.forEach((year) => {
//           if (Array.isArray(year.feeInstallments)) {
//             year.feeInstallments.forEach((item) => {
//               const key = `${year.academicYear}-${item.installmentName}-${item.feesTypeId._id}`;
//               initialPaidAmounts[key] = 0;
//               initialActionSelections[`${year.academicYear}-${item.installmentName}`] = '';
//             });
//           }
//         });
//         setPaidAmounts(initialPaidAmounts);
//         setActionSelections(initialActionSelections);

//         if (response.data.data.length > 0) {
//           setSelectedAcademicYears([response.data.data[0].academicYear]);
//           setTotalInstallments(
//             Array.isArray(response.data.data[0].installmentsPresent)
//               ? response.data.data[0].installmentsPresent
//               : []
//           );
//         }
//       } catch (apiError) {
//         throw new Error(apiError.message || 'Failed to fetch concession form data');
//       }
//     } else {
//       console.log('API call skipped due to missing fields:', {
//         schoolId: !!schoolId,
//         admissionNumber: !!admissionNumber,
//         masterDefineClass: !!updatedFormData.masterDefineClass,
//         section: !!updatedFormData.section,
//       });
//     }
//   } catch (error) {
//     toast.error(error.message || 'All fees are paid for all academic years');
//   }
// };

const handleAdmissionSubmit = async (e) => {
  e.preventDefault();
  const admissionNumber = formData?.AdmissionNumber?.trim();
  if (!admissionNumber) {
    toast.error('Please enter a valid admission number');
    return;
  }

  try {
    const student = existingStudents.find((s) => {
      console.log('Comparing:', s.AdmissionNumber?.trim(), admissionNumber);
      return s.AdmissionNumber?.trim() === admissionNumber;
    });
    if (!student) {
      console.log('No student found for admission number:', admissionNumber);
      throw new Error('Invalid admission number');
    }

    const selectedAcademicYear = academicYear;
  

    const academicHistoryEntry = student.academicHistory?.find(
      (entry) => entry.academicYear === selectedAcademicYear
    );
  

    const defaultClass = classes[0]?._id || 'not-provided';
    const defaultSection = classes[0]?.sections?.[0]?._id || 'not-provided';
  
    const feeDataForYear = feeData.find((year) => year.academicYear === selectedAcademicYear);
    const classIdFromFeeData = feeDataForYear?.classId || academicHistoryEntry?.masterDefineClass || student?.masterDefineClass?._id || student?.masterDefineClass || defaultClass;
    const sectionIdFromFeeData = feeDataForYear?.sectionId || academicHistoryEntry?.section || student?.section?._id || student?.section || defaultSection;

    const updatedFormData = {
      ...formData,
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      masterDefineClass: classIdFromFeeData,
      section: sectionIdFromFeeData,
    };
    setFormData(updatedFormData);

    if (updatedFormData.masterDefineClass && updatedFormData.masterDefineClass !== 'not-provided') {
      const selectedClass = classes.find((c) => c._id === updatedFormData.masterDefineClass);
      setSections(selectedClass?.sections || []);
    } else {
      setSections([]);
    }

    if (schoolId && admissionNumber) {
      try {
        const response = await getAPI(
          `/get-concession-formbyADMID?classId=${updatedFormData.masterDefineClass}&sectionIds=${updatedFormData.section}&schoolId=${schoolId}&admissionNumber=${admissionNumber}&academicYear=${selectedAcademicYear}`
        );
        if (!response?.data?.data || !Array.isArray(response.data.data)) {
          throw new Error('All fees are paid or no fee data found for the selected academic year');
        }

        const dataCopy = JSON.parse(JSON.stringify(response.data.data));
        setFeeData(dataCopy);
        setInitialFeeData(dataCopy);
        setShowFullForm(true);

        const initialPaidAmounts = {};
        const initialActionSelections = {};
        response.data.data.forEach((year) => {
          if (Array.isArray(year.feeInstallments)) {
            year.feeInstallments.forEach((item) => {
              const key = `${year.academicYear}-${item.installmentName}-${item.feesTypeId._id}`;
              initialPaidAmounts[key] = 0;
              initialActionSelections[`${year.academicYear}-${item.installmentName}`] = '';
            });
          }
        });
        setPaidAmounts(initialPaidAmounts);
        setActionSelections(initialActionSelections);

        if (response.data.data.length > 0) {
          setSelectedAcademicYears([response.data.data[0].academicYear]);
          setTotalInstallments(
            Array.isArray(response.data.data[0].installmentsPresent)
              ? response.data.data[0].installmentsPresent
              : []
          );
        }
      } catch (apiError) {
        throw new Error(apiError.message || 'Failed to fetch concession form data');
      }
    } else {
      console.log('API call skipped due to missing fields:', {
        schoolId: !!schoolId,
        admissionNumber: !!admissionNumber,
        masterDefineClass: !!updatedFormData.masterDefineClass,
        section: !!updatedFormData.section,
      });
    }
  } catch (error) {
    toast.error(error.message || 'All fees are paid for all academic years');
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const getFeeTypeName = (feeTypeId) => {
    return feeTypes.find((ft) => ft._id === feeTypeId)?.feesTypeName || 'Unknown Fee Type';
  };

  const openFeeTypeModal = (installmentName, academicYear) => {
  const installmentData = getInstallmentData(installmentName, academicYear);
  const seenFeeTypeIds = new Set();
  const fineAmount = installmentData[0]?.fineAmount || 0;
  const finePaidKey = `${academicYear}-${installmentName}-fine`;
  const totalFinePaid = paidAmounts[finePaidKey] !== undefined ? Number(paidAmounts[finePaidKey] || 0) : 0;
  const excessKey = `${academicYear}-${installmentName}-excess`;
  const excessAmount = paidAmounts[excessKey] !== undefined ? Number(paidAmounts[excessKey] || 0) : 0;

  const feeItems = installmentData
    .filter((item) => {
      if (seenFeeTypeIds.has(item.feesTypeId._id)) {
        return false;
      }
      seenFeeTypeIds.add(item.feesTypeId._id);
      return true;
    })
    .map((item) => {
      const concessionItem = feeData
        .find((y) => y.academicYear === academicYear)
        ?.concession?.concessionDetails?.find(
          (cd) => cd.installmentName === installmentName && cd.feesType === item.feesTypeId._id
        );
      const key = `${academicYear}-${installmentName}-${item.feesTypeId._id}`;
      const paidAmount = paidAmounts[key] !== undefined ? Number(paidAmounts[key]) : 0;
      return {
        feeTypeId: item.feesTypeId._id,
        amount: item.amount,
        balance: item.balanceAmount,
        concession: concessionItem?.concessionAmount || 0,
        fineAmount: 0,
        paidAmount: paidAmount,
        isFine: false,
      };
    });

  setModalData({
    academicYear,
    installmentName,
    excessAmount,
    fineAmount,
    feeItems: [
      ...feeItems,
      {
        feeTypeId: 'fine',
        amount: fineAmount,
        concession: 0,
        fineAmount: 0,
        paidamount:0,
        paidAmount: totalFinePaid,
        balance: fineAmount - totalFinePaid,
        isFine: true,
      },
      {
        feeTypeId: 'excess',
        amount: excessAmount,
        concession: 0,
        fineAmount: 0,
        paidAmount: excessAmount,
        balance: 0,
        isExcess: true,
      },
    ],
  });
};

  const closeFeeTypeModal = () => {
    setModalData(null);
  };

  const handleModalPaidAmountChange = (installmentName, feeTypeId, amount, academicYear) => {
    const parsedAmount = amount === '' ? '' : Math.max(0, Number(amount));
    const key = `${academicYear}-${installmentName}-${feeTypeId}`;

    const feeItem = modalData?.feeItems.find((item) => item.feeTypeId === feeTypeId);
    if (feeItem && parsedAmount !== '' && parsedAmount > feeItem.balance && feeTypeId !== 'fine' && feeTypeId !== 'excess') {
      toast.error(`Paid amount cannot exceed balance (${feeItem.balance})`);
      return;
    }

    setPaidAmounts((prev) => {
      const newPaidAmounts = { ...prev };
      if (parsedAmount === '' || parsedAmount === 0) {
        delete newPaidAmounts[key];
      } else {
        newPaidAmounts[key] = parsedAmount;
      }
      return newPaidAmounts;
    });

    setModalData((prev) => {
      if (!prev) return prev;
      const updatedFeeItems = prev.feeItems.map((item) =>
        item.feeTypeId === feeTypeId
          ? { ...item, paidAmount: parsedAmount === 0 ? '' : parsedAmount }
          : item
      );
      return {
        ...prev,
        excessAmount: feeTypeId === 'excess' ? parsedAmount : prev.excessAmount,
        fineAmount: feeTypeId === 'fine' ? parsedAmount : prev.fineAmount,
        feeItems: updatedFeeItems,
      };
    });
  };

  const handleInstallmentSelection = (installmentName, academicYear) => {
    setSelectedInstallments((prev) => {
      const yearInstallments = prev[academicYear] || [];
      const isSelected = yearInstallments.includes(installmentName);
      const newYearInstallments = isSelected
        ? yearInstallments.filter((name) => name !== installmentName)
        : [...yearInstallments, installmentName];

      const installmentData = getInstallmentData(installmentName, academicYear);
      const allFeeTypeIds = installmentData.map((item) => item.feesTypeId._id);

      setSelectedFeeTypesByInstallment((prevTypes) => {
        if (!isSelected) {
          return {
            ...prevTypes,
            [academicYear]: {
              ...(prevTypes[academicYear] || {}),
              [installmentName]: allFeeTypeIds,
            },
          };
        } else {
          const newTypes = { ...prevTypes };
          if (newTypes[academicYear]) {
            delete newTypes[academicYear][installmentName];
            if (Object.keys(newTypes[academicYear]).length === 0) {
              delete newTypes[academicYear];
            }
          }
          return newTypes;
        }
      });

      if (isSelected) {
        const newPaidAmounts = { ...paidAmounts };
        installmentData.forEach((item) => {
          const key = `${academicYear}-${installmentName}-${item.feesTypeId._id}`;
          const fineKey = `${academicYear}-${installmentName}-fine`;
          const excessKey = `${academicYear}-${installmentName}-excess`;
          delete newPaidAmounts[key];
          delete newPaidAmounts[fineKey];
          delete newPaidAmounts[excessKey];
        });
        setPaidAmounts(newPaidAmounts);
      }

      const updatedSelectedInstallments = {
        ...prev,
        [academicYear]: newYearInstallments,
      };

      setSelectAllInstallments(() => {
        const actualSelectedYears = selectAllYears
          ? feeData.map((year) => year.academicYear)
          : selectedAcademicYears;
        return actualSelectedYears.every((academicYear) => {
          const yearData = feeData.find((year) => year.academicYear === academicYear);
          if (!yearData || !Array.isArray(yearData.installmentsPresent)) return true;
          const unpaidInstallments = yearData.installmentsPresent.filter((instName) => {
            const installmentData = yearData.feeInstallments?.filter((item) => item.installmentName === instName);
            return installmentData?.some((item) => item.balanceAmount > 0);
          });
          const currentYearInstallments = updatedSelectedInstallments[academicYear] || [];
          return unpaidInstallments.every((name) => currentYearInstallments.includes(name));
        });
      });

      return updatedSelectedInstallments;
    });
  };

  const handleSelectAllInstallments = () => {
    const newSelectAll = !selectAllInstallments;
    setSelectAllInstallments(newSelectAll);

    const actualSelectedYears = selectAllYears
      ? feeData.map((year) => year.academicYear)
      : selectedAcademicYears;

    setSelectedInstallments((prev) => {
      const newSelectedInstallments = { ...prev };
      const newSelectedFeeTypes = { ...selectedFeeTypesByInstallment };

      actualSelectedYears.forEach((academicYear) => {
        const yearData = feeData.find((year) => year.academicYear === academicYear);
        if (yearData && Array.isArray(yearData.installmentsPresent)) {
          const unpaidInstallments = yearData.installmentsPresent.filter((instName) => {
            const installmentData = yearData.feeInstallments?.filter((item) => item.installmentName === instName);
            return installmentData?.some((item) => item.balanceAmount > 0);
          });

          if (newSelectAll) {
            newSelectedInstallments[academicYear] = unpaidInstallments;
            unpaidInstallments.forEach((instName) => {
              const installmentData = getInstallmentData(instName, academicYear);
              const allFeeTypeIds = installmentData.map((item) => item.feesTypeId._id);
              newSelectedFeeTypes[academicYear] = {
                ...(newSelectedFeeTypes[academicYear] || {}),
                [instName]: allFeeTypeIds,
              };
            });
          } else {
            delete newSelectedInstallments[academicYear];
            delete newSelectedFeeTypes[academicYear];
          }
        }
      });

      setSelectedFeeTypesByInstallment(newSelectedFeeTypes);
      if (!newSelectAll) {
        const newPaidAmounts = { ...paidAmounts };
        actualSelectedYears.forEach((academicYear) => {
          const yearData = feeData.find((year) => year.academicYear === academicYear);
          if (yearData && Array.isArray(yearData.installmentsPresent)) {
            yearData.installmentsPresent.forEach((instName) => {
              const installmentData = getInstallmentData(instName, academicYear);
              installmentData.forEach((item) => {
                const key = `${academicYear}-${instName}-${item.feesTypeId._id}`;
                const fineKey = `${academicYear}-${instName}-fine`;
                const excessKey = `${academicYear}-${instName}-excess`;
                delete newPaidAmounts[key];
                delete newPaidAmounts[fineKey];
                delete newPaidAmounts[excessKey];
              });
            });
          }
        });
        setPaidAmounts(newPaidAmounts);
      }
      return newSelectedInstallments;
    });
  };

  const handleFeeTypeSelection = (installmentName, feeTypeId, academicYear) => {
    setSelectedFeeTypesByInstallment((prev) => {
      const yearTypes = prev[academicYear] || {};
      const currentInstallmentTypes = yearTypes[installmentName] || [];
      const isAlreadySelected = currentInstallmentTypes.includes(feeTypeId);
      const newTypes = isAlreadySelected
        ? currentInstallmentTypes.filter((id) => id !== feeTypeId)
        : [...currentInstallmentTypes, feeTypeId];

      setSelectedInstallments((prevInst) => {
        const yearInstallments = prevInst[academicYear] || [];
        const isInstallmentSelected = newTypes.length > 0;

        if (isInstallmentSelected && !yearInstallments.includes(installmentName)) {
          return {
            ...prevInst,
            [academicYear]: [...yearInstallments, installmentName],
          };
        } else if (!isInstallmentSelected && yearInstallments.includes(installmentName)) {
          const newYearInstallments = yearInstallments.filter((name) => name !== installmentName);
          const newInstallments = {
            ...prevInst,
            [academicYear]: newYearInstallments,
          };
          if (newYearInstallments.length === 0) {
            delete newInstallments[academicYear];
          }
          return newInstallments;
        }
        return prevInst;
      });

      if (!isAlreadySelected) {
        const yearData = feeData.find((y) => y.academicYear === academicYear);
        if (yearData) {
          const installmentData = yearData.feeInstallments?.find(
            (item) => item.installmentName === installmentName && item.feesTypeId._id === feeTypeId
          );

          if (installmentData) {
            // const concessionItem = yearData.concession?.concessionDetails?.find(
            //   (cd) => cd.installmentName === installmentName && cd.feesType === feeTypeId
            // );
            // const concessionAmount = concessionItem?.concessionAmount || 0;
            // const fineAmount = installmentData.fineAmount || 0;
            // const payableAmount = installmentData.amount - concessionAmount + fineAmount;
            const paidKey = `${academicYear}-${installmentName}-${feeTypeId}`;
            setPaidAmounts((prev) => ({
              ...prev,
              [paidKey]: '',
            }));
          }
        }
      } else {
        const paidKey = `${academicYear}-${installmentName}-${feeTypeId}`;
        setPaidAmounts((prev) => {
          const newPaidAmounts = { ...prev };
          delete newPaidAmounts[paidKey];
          return newPaidAmounts;
        });
      }

      return {
        ...prev,
        [academicYear]: {
          ...yearTypes,
          [installmentName]: newTypes,
        },
      };
    });
  };

 const handleActionSelection = (installmentName, academicYear, action) => {
  const key = `${academicYear}-${installmentName}`;
  setActionSelections((prev) => ({
    ...prev,
    [key]: action,
  }));

  const installmentData = getInstallmentData(installmentName, academicYear);
  const allFeeTypeIds = installmentData.map((item) => item.feesTypeId._id);

  setPaidAmounts((prev) => {
    let newPaidAmounts = { ...prev };


    installmentData.forEach((item) => {
      const paidKey = `${academicYear}-${installmentName}-${item.feesTypeId._id}`;
      delete newPaidAmounts[paidKey]; 
    });

    const fineKey = `${academicYear}-${installmentName}-fine`;
    const excessKey = `${academicYear}-${installmentName}-excess`;

    if (action === 'Full Fees') {
      setSelectedFeeTypesByInstallment((prev) => ({
        ...prev,
        [academicYear]: {
          ...(prev[academicYear] || {}),
          [installmentName]: allFeeTypeIds,
        },
      }));

      setSelectedInstallments((prev) => {
        const yearInstallments = prev[academicYear] || [];
        if (!yearInstallments.includes(installmentName)) {
          return {
            ...prev,
            [academicYear]: [...yearInstallments, installmentName],
          };
        }
        return prev;
      });

    
      installmentData.forEach((item) => {
        const concessionItem = feeData
          .find((y) => y.academicYear === academicYear)
          ?.concession?.concessionDetails?.find(
            (cd) => cd.installmentName === installmentName && cd.feesType === item.feesTypeId._id
          );
        const concessionAmount = concessionItem?.concessionAmount || 0;
        const fineAmount = item.fineAmount || 0;
        // const payableAmount = item.amount - concessionAmount;
        const paidAmount = item.balanceAmount;
        const paidKey = `${academicYear}-${installmentName}-${item.feesTypeId._id}`;
        const finePaidKey = `${academicYear}-${installmentName}-fine`;
        newPaidAmounts[paidKey] = paidAmount;
        if (fineAmount > 0) {
          newPaidAmounts[finePaidKey] = fineAmount; 
        }
      });
    } 
  else if (action === 'Part Fees') {
      setSelectedFeeTypesByInstallment((prev) => ({
        ...prev,
        [academicYear]: {
          ...(prev[academicYear] || {}),
          [installmentName]: allFeeTypeIds,
        },
      }));

      setSelectedInstallments((prev) => {
        const yearInstallments = prev[academicYear] || [];
        if (!yearInstallments.includes(installmentName)) {
          return {
            ...prev,
            [academicYear]: [...yearInstallments, installmentName],
          };
        }
        return prev;
      });

    
      installmentData.forEach((item) => {
        const fineAmount = item.fineAmount || 0;
        const paidKey = `${academicYear}-${installmentName}-${item.feesTypeId._id}`;
        const finePaidKey = `${academicYear}-${installmentName}-fine`;
        newPaidAmounts[paidKey] = '';
        if (fineAmount > 0) {
          newPaidAmounts[finePaidKey] = fineAmount; 
        }
      });
    }
    
    else {
    
      setSelectedFeeTypesByInstallment((prev) => {
        const newTypes = { ...prev };
        if (newTypes[academicYear]) {
          delete newTypes[academicYear][installmentName];
          if (Object.keys(newTypes[academicYear]).length === 0) {
            delete newTypes[academicYear];
          }
        }
        return newTypes;
      });

    
      installmentData.forEach((item) => {
        const paidKey = `${academicYear}-${installmentName}-${item.feesTypeId._id}`;
        const fineKey = `${academicYear}-${installmentName}-fine`;
        const excessKey = `${academicYear}-${installmentName}-excess`;
        delete newPaidAmounts[paidKey];
        delete newPaidAmounts[fineKey];
        delete newPaidAmounts[excessKey];
      });
    }


    setModalData((prev) => {
      if (!prev || prev.academicYear !== academicYear || prev.installmentName !== installmentName) {
        return prev;
      }
      const updatedFeeItems = prev.feeItems.map((item) => {
        if (item.isFine) {
          const fineAmount = installmentData[0]?.fineAmount || 0;
          return {
            ...item,
            amount: fineAmount,
            paidAmount: newPaidAmounts[fineKey] || 0, 
            balance: fineAmount - (newPaidAmounts[fineKey] || 0),
          };
        }
        if (item.isExcess) {
          const excessAmount = newPaidAmounts[excessKey] || 0;
          return {
            ...item,
            amount: excessAmount,
            paidAmount: excessAmount,
            balance: 0,
          };
        }
        const paidKey = `${academicYear}-${installmentName}-${item.feeTypeId}`;
        const paidAmount = newPaidAmounts[paidKey] || item.paidAmount || 0;
        return {
          ...item,
          paidAmount,
          balance: item.balance - paidAmount,
        };
      });
      const fineAmount = installmentData[0]?.fineAmount || 0;
      const excessAmount = newPaidAmounts[excessKey] || 0;
      return {
        ...prev,
        feeItems: updatedFeeItems,
        fineAmount,
        excessAmount,
      };
    });

    return newPaidAmounts;
  });
};

  const handleAcademicYearSelect = (academicYear) => {
    if (selectAllYears) {
      setSelectAllYears(false);
      setSelectedAcademicYears([academicYear]);
    } else {
      setSelectedAcademicYears((prev) =>
        prev.includes(academicYear) ? prev.filter((year) => year !== academicYear) : [...prev, academicYear]
      );
    }
    updateInstallmentsForSelectedYears();
  };

  const updateInstallmentsForSelectedYears = () => {
    const allInstallments = new Set();
    feeData.forEach((year) => {
      if ((selectAllYears || selectedAcademicYears.includes(year.academicYear)) && Array.isArray(year.installmentsPresent)) {
        year.installmentsPresent.forEach((inst) => allInstallments.add(inst));
      }
    });
    setTotalInstallments(Array.from(allInstallments));
  };

  const handleSelectAllYears = () => {
    const newSelectAll = !selectAllYears;
    setSelectAllYears(newSelectAll);

    if (newSelectAll) {
      setSelectedAcademicYears(feeData.map((year) => year.academicYear));
    } else {
      setSelectedAcademicYears([]);
    }
    updateInstallmentsForAllYears(newSelectAll);
  };

  const updateInstallmentsForAllYears = (selectAll) => {
    if (selectAll) {
      const allInstallments = new Set();
      feeData.forEach((year) => {
        if (Array.isArray(year.installmentsPresent)) {
          year.installmentsPresent.forEach((inst) => allInstallments.add(inst));
        }
      });
      setTotalInstallments(Array.from(allInstallments));
    } else {
      setTotalInstallments([]);
    }
  };

  const handlePaidAmountChange = (installmentName, feeTypeId, amount, academicYear) => {
    const parsedAmount = amount === '' ? '' : Math.max(0, Number(amount));
    const key = `${academicYear}-${installmentName}-${feeTypeId}`;
    setPaidAmounts((prev) => ({
      ...prev,
      [key]: parsedAmount,
    }));
  };

const handleFineAmountChange = (installmentName, feeTypeId, newFineAmount, academicYear) => {
  const parsedFineAmount = Math.max(0, Number(newFineAmount) || 0);
  const finePaidKey = `${academicYear}-${installmentName}-fine`;


  let newPaidAmounts = { ...paidAmounts };
  if (parsedFineAmount === 0) {
    delete newPaidAmounts[finePaidKey];
  } else {
    newPaidAmounts[finePaidKey] = parsedFineAmount;
  }


  setPaidAmounts(() => newPaidAmounts);


  setFeeData((prev) => {
    if (!prev || !Array.isArray(prev)) return prev;

    return prev.map((year) => {
      if (year.academicYear === academicYear) {
        const updatedInstallments = year.feeInstallments.map((item) => {
          if (item.installmentName === installmentName) {
            return {
              ...item,
              fineAmount: parsedFineAmount,
            };
          }
          return item;
        });

        const totalFeesAmount = updatedInstallments.reduce((sum, item) => sum + item.amount, 0);
        const totalFine = parsedFineAmount;
        const totalConcession =
          year.concession?.concessionDetails?.reduce(
            (sum, cd) => sum + (cd.concessionAmount || 0),
            0
          ) || 0;
        const totalFeesPayable = updatedInstallments.reduce((sum, item) => {
          const concession = year.concession?.concessionDetails?.find(
            (cd) => cd.installmentName === item.installmentName && cd.feesType === item.feesTypeId._id
          )?.concessionAmount || 0;
          return sum + (item.amount - concession);
        }, 0) + totalFine;
        const totalPaid = updatedInstallments.reduce((sum, item, index) => {
          const paidKey = `${academicYear}-${item.installmentName}-${item.feesTypeId._id}`;
          const excessPaidKey = `${academicYear}-${item.installmentName}-excess`;
          let paid = newPaidAmounts[paidKey] !== undefined ? Number(newPaidAmounts[paidKey] || 0) : 0;
          paid += index === 0 && newPaidAmounts[finePaidKey] !== undefined ? Number(newPaidAmounts[finePaidKey] || 0) : 0;
          paid += newPaidAmounts[excessPaidKey] !== undefined ? Number(newPaidAmounts[excessPaidKey] || 0) : 0;
          return sum + paid;
        }, 0);
        const totalBalance = totalFeesPayable - totalPaid;

        return {
          ...year,
          feeInstallments: updatedInstallments,
          totals: {
            totalFeesAmount,
            totalConcession,
            totalFine,
            totalFeesPayable,
            totalPaidAmount: totalPaid,
            totalRemainingAmount: totalBalance,
          },
        };
      }
      return year;
    });
  });


  setModalData((prev) => {
    if (!prev || prev.academicYear !== academicYear || prev.installmentName !== installmentName) {
      return prev;
    }
    const updatedFeeItems = prev.feeItems.map((item) =>
      item.isFine
        ? {
            ...item,
            amount: parsedFineAmount,
            paidAmount: newPaidAmounts[finePaidKey] || 0,
            balance: parsedFineAmount - (newPaidAmounts[finePaidKey] || 0),
          }
        : item
    );
    return {
      ...prev,
      fineAmount: parsedFineAmount,
      feeItems: updatedFeeItems,
    };
  });
};

//   const handleFinalSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.paymentMode || !formData.name) {
//     toast.error('Please fill all required fields');
//     return;
//   }

//   setIsGenerating(true);

//   try {
//     const actualSelectedYears = selectAllYears
//       ? feeData.map((year) => year.academicYear)
//       : selectedAcademicYears;

//     if (actualSelectedYears.length === 0) {
//       throw new Error('No academic years selected for processing');
//     }

//     const frontendReceiptDetails = [];

//     for (const academicYear of actualSelectedYears) {
//       if (!selectedInstallments[academicYear]?.length) {
//         console.warn(`No installments selected for academic year ${academicYear}`);
//         continue;
//       }

     
//       const yearData = feeData.find((year) => year.academicYear === academicYear);
//       if (!yearData) {
//         console.warn(`No fee data found for academic year ${academicYear}`);
//         continue;
//       }

//       const baseReceiptDetails = {
//         studentName: `${formData.firstName} ${formData.lastName}`,
//         studentAdmissionNumber: formData.AdmissionNumber,
//         className: yearData.classId,
//         section: yearData.sectionId, 
//         paymentDate: new Date().toISOString().split('T')[0],
//         paymentMode: formData.paymentMode,
//         collectorName: formData.name,
//         bankName: formData.paymentMode === 'Cheque' ? formData.bankName : undefined,
//         chequeNumber: formData.paymentMode === 'Cheque' ? formData.chequeNumber : undefined,
//       };

//       const receiptDetails = {
//         ...baseReceiptDetails,
//         transactionNumber:
//           formData.paymentMode === 'Online Transfer' ? generateTransactionNumber() : formData.chequeNumber,
//         academicYear,
//         installments: [],
//       };

//       for (const installmentName of selectedInstallments[academicYear] || []) {
//         const installmentData = getInstallmentData(installmentName, academicYear);
//         const selectedTypes = selectedFeeTypesByInstallment[academicYear]?.[installmentName] || [];

//         if (!selectedTypes.length) {
//           console.warn(`No fee types selected for installment ${installmentName}, year ${academicYear}`);
//           continue;
//         }

//         const excessKey = `${academicYear}-${installmentName}-excess`;
//         const excessAmount = paidAmounts[excessKey] !== undefined ? Number(paidAmounts[excessKey] || 0) : 0;
//         const fineKey = `${academicYear}-${installmentName}-fine`;
//         const fineAmount = paidAmounts[fineKey] !== undefined ? Number(paidAmounts[fineKey] || 0) : 0;

//         const dueDate = installmentData[0]?.dueDate;
//         if (!dueDate) {
//           throw new Error(`Missing dueDate for installment ${installmentName} in academic year ${academicYear}`);
//         }

//         const seenFeeTypeIds = new Set();
//         const uniqueFeeItems = installmentData
//           .filter((item) => selectedTypes.includes(item.feesTypeId._id))
//           .filter((item) => {
//             if (seenFeeTypeIds.has(item.feesTypeId._id)) {
//               console.warn(
//                 `Duplicate feeTypeId ${item.feesTypeId._id} filtered out for installment ${installmentName}, year ${academicYear}`
//               );
//               return false;
//             }
//             seenFeeTypeIds.add(item.feesTypeId._id);
//             return true;
//           })
//           .map((item) => {
//             const concessionItem = feeData
//               .find((y) => y.academicYear === item.academicYear)
//               ?.concession?.concessionDetails?.find(
//                 (cd) => cd.installmentName === item.installmentName && cd.feesType === item.feesTypeId._id
//               );
//             const concession = concessionItem?.concessionAmount || 0;
//             const paidKey = `${item.academicYear}-${installmentName}-${item.feesTypeId._id}`;
//             const paid = Number(paidAmounts[paidKey] || 0);
//             const totalPayable = item.amount - concession;
//             return {
//               feeTypeId: item.feesTypeId._id,
//               amount: item.amount,
//               concession,
//               payable: totalPayable,
//               paid,
//               balance: item.balanceAmount - paid,
//             };
//           })
//           .filter((item) => item.paid > 0);

//         if (uniqueFeeItems.length > 0 || excessAmount > 0 || fineAmount > 0) {
//           receiptDetails.installments.push({
//             number: installmentData[0]?.installmentNumber || parseInt(installmentName.match(/\d+/)?.[0] || '0') || 0,
//             installmentName,
//             dueDate,
//             excessAmount,
//             fineAmount,
//             feeItems: uniqueFeeItems,
//           });
//         }
//       }

//       if (receiptDetails.installments.length === 0) {
//         console.warn(`No valid fee items, excess amount, or fine amount for academic year ${academicYear}`);
//         continue;
//       }

//       console.log('Submitting receiptDetails for API:', receiptDetails);

//       const response = await postAPI('/create-schoolfees', receiptDetails, true);

//       if (response.hasError) {
//         throw new Error(response.message || `Failed to save receipt for ${academicYear}`);
//       }

//       frontendReceiptDetails.push({
//         ...receiptDetails,
//         receiptNumber: response.data.receipt.receiptNumber,
//         bankName: formData.paymentMode === 'Cheque' ? formData.bankName : undefined,
//         installments: receiptDetails.installments.map((inst) => ({
//           ...inst,
//           feeItems: inst.feeItems.map((item) => ({
//             ...item,
//             type: getFeeTypeName(item.feeTypeId),
//             academicYear,
//           })),
//         })),
//       });
//     }

//     if (frontendReceiptDetails.length === 0) {
//       throw new Error('No valid fee items, excess amount, or fine amount selected for any academic year');
//     }

//     toast.success('Receipts generated successfully!');

//     navigate('/school-dashboard/fees-module/fees-receipts/school-fees/student-receipts', {
//       state: frontendReceiptDetails,
//     });
//   } catch (error) {
//     toast.error(error.message || 'Failed to generate receipts');
//     console.error('Receipt generation error:', error);
//   } finally {
//     setIsGenerating(false);
//   }
// };

const handleFinalSubmit = async (e, frontendReceiptDetails = null, isImport = false) => {
  e.preventDefault();

  if (!isImport && (!formData.paymentMode || !formData.name)) {
    // toast.error('Please fill all required fields');
    return;
  }

  setIsGenerating(true);

  try {
    let receiptDetailsToProcess = frontendReceiptDetails;

    if (!isImport) {
      const actualSelectedYears = selectAllYears
        ? feeData.map((year) => year.academicYear)
        : selectedAcademicYears;

      if (actualSelectedYears.length === 0) {
        throw new Error('No academic years selected for processing');
      }

      receiptDetailsToProcess = [];

      for (const academicYear of actualSelectedYears) {
        if (!selectedInstallments[academicYear]?.length) {
          console.warn(`No installments selected for academic year ${academicYear}`);
          continue;
        }

        const yearData = feeData.find((year) => year.academicYear === academicYear);
        if (!yearData) {
          console.warn(`No fee data found for academic year ${academicYear}`);
          continue;
        }

        const baseReceiptDetails = {
          studentName: `${formData.firstName} ${formData.lastName}`,
          studentAdmissionNumber: formData.AdmissionNumber,
          className: yearData.classId,
          section: yearData.sectionId,
          paymentDate: new Date().toISOString().split('T')[0],
          paymentMode: formData.paymentMode,
          collectorName: formData.name,
          bankName: formData.paymentMode === 'Cheque' ? formData.bankName : undefined,
          chequeNumber: formData.paymentMode === 'Cheque' ? formData.chequeNumber : undefined,
        };

        const receiptDetails = {
          ...baseReceiptDetails,
          transactionNumber:
            formData.paymentMode === 'Online' ? generateTransactionNumber() : formData.chequeNumber,
          academicYear,
          installments: [],
        };

        for (const installmentName of selectedInstallments[academicYear] || []) {
          const installmentData = getInstallmentData(installmentName, academicYear);
          const selectedTypes = selectedFeeTypesByInstallment[academicYear]?.[installmentName] || [];

          if (!selectedTypes.length) {
            console.warn(`No fee types selected for installment ${installmentName}, year ${academicYear}`);
            continue;
          }

          const excessKey = `${academicYear}-${installmentName}-excess`;
          const excessAmount = paidAmounts[excessKey] !== undefined ? Number(paidAmounts[excessKey] || 0) : 0;
          const fineKey = `${academicYear}-${installmentName}-fine`;
          const fineAmount = paidAmounts[fineKey] !== undefined ? Number(paidAmounts[fineKey] || 0) : 0;

          const dueDate = installmentData[0]?.dueDate;
          if (!dueDate) {
            throw new Error(`Missing dueDate for installment ${installmentName} in academic year ${academicYear}`);
          }

          const seenFeeTypeIds = new Set();
          const uniqueFeeItems = installmentData
            .filter((item) => selectedTypes.includes(item.feesTypeId._id))
            .filter((item) => {
              if (seenFeeTypeIds.has(item.feesTypeId._id)) {
                console.warn(
                  `Duplicate feeTypeId ${item.feesTypeId._id} filtered out for installment ${installmentName}, year ${academicYear}`
                );
                return false;
              }
              seenFeeTypeIds.add(item.feesTypeId._id);
              return true;
            })
            .map((item) => {
              const concessionItem = feeData
                .find((y) => y.academicYear === item.academicYear)
                ?.concession?.concessionDetails?.find(
                  (cd) => cd.installmentName === item.installmentName && cd.feesType === item.feesTypeId._id
                );
              const concession = concessionItem?.concessionAmount || 0;
              const paidKey = `${item.academicYear}-${installmentName}-${item.feesTypeId._id}`;
              const paid = Number(paidAmounts[paidKey] || 0);
              const totalPayable = item.amount - concession;
              return {
                feeTypeId: item.feesTypeId._id,
                amount: item.amount,
                concession,
                payable: totalPayable,
                paid,
                balance: item.balanceAmount - paid,
              };
            })
            .filter((item) => item.paid > 0);

          if (uniqueFeeItems.length > 0 || excessAmount > 0 || fineAmount > 0) {
            receiptDetails.installments.push({
              number: installmentData[0]?.installmentNumber || parseInt(installmentName.match(/\d+/)?.[0] || '0') || 0,
              installmentName,
              dueDate,
              excessAmount,
              fineAmount,
              feeItems: uniqueFeeItems,
            });
          }
        }

        if (receiptDetails.installments.length === 0) {
          console.warn(`No valid fee items, excess amount, or fine amount for academic year ${academicYear}`);
          continue;
        }

        const response = await postAPI('/create-schoolfees', receiptDetails, true);
        if (response.hasError) {
          throw new Error(response.message || `Failed to save receipt for ${academicYear}`);
        }

        receiptDetailsToProcess.push({
          ...receiptDetails,
          _id: response.data.receipt._id,
          receiptNumber: response.data.receipt.receiptNumber,
          bankName: formData.paymentMode === 'Cheque' ? formData.bankName : undefined,
          installments: receiptDetails.installments.map((inst) => ({
            ...inst,
            feeItems: inst.feeItems.map((item) => ({
              ...item,
              type: getFeeTypeName(item.feeTypeId),
              academicYear,
            })),
          })),
        });
      }
    }

    if (!receiptDetailsToProcess || receiptDetailsToProcess.length === 0) {
      throw new Error('No valid receipt details to process');
    }

    toast.success('Receipts generated successfully!');

    navigate('/school-dashboard/fees-module/fees-receipts/school-fees/student-receipts', {
      state: receiptDetailsToProcess,
    });
  } catch (error) {
    toast.error(error.message || 'Failed to generate receipts');
    console.error('Receipt generation error:', error);
  } finally {
    setIsGenerating(false);
  }
};

  return {
    formData,
    handleChange,
    handleAdmissionSubmit,
    existingStudents,
    classes,
    sections,
    feeData,
    initialFeeData,
    selectedAcademicYears,
    selectAllYears,
    setSelectAllYears,
    selectAllInstallments,
    setSelectAllInstallments,
    currentInstallment,
    setCurrentInstallment,
    totalInstallments,
    selectedInstallments,
    getFeeTypeName,
    getInstallmentData,
    handleInstallmentSelection,
    handleSelectAllInstallments,
    handleFeeTypeSelection,
    handleFinalSubmit,
    isGenerating,
    showFullForm,
    showSecondTable,
    setShowSecondTable,
    showProcessedData,
    setShowProcessedData,
    selectedFeeTypesByInstallment,
    handlePaidAmountChange,
    paidAmounts,
    handleAcademicYearSelect,
    handleSelectAllYears,
    setTotalInstallments,
    schoolId,
    feeTypes,
    handleFineAmountChange,
    actionSelections,
    handleActionSelection,
    modalData,
    openFeeTypeModal,
    handleModalPaidAmountChange,
    closeFeeTypeModal,
    
  };
};

export default useSchoolFeesReceipts;