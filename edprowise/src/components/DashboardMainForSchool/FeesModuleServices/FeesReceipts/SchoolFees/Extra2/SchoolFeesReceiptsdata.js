// useSchoolFeesReceipts.js
import { useState, useEffect } from 'react';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useSchoolFeesReceipts = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState('');
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
  const [currentInstallment, setCurrentInstallment] = useState(1);
  const [totalInstallments, setTotalInstallments] = useState([]);
  const [selectedInstallments, setSelectedInstallments] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProcessedData, setShowProcessedData] = useState(false);
  const [selectedFeeTypesByInstallment, setSelectedFeeTypesByInstallment] = useState({});
  const [paidAmounts, setPaidAmounts] = useState({});
  const [actionSelections, setActionSelections] = useState({});
  const [modalData, setModalData] = useState(null);

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
    if (!schoolId) return;

    const fetchInitialData = async () => {
      try {
        const studentsRes = await getAPI(`/get-admission-form/${schoolId}`);
        if (!studentsRes.hasError) {
          setExistingStudents(Array.isArray(studentsRes.data.data) ? studentsRes.data.data : []);
        }

        const classesRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        setClasses(classesRes?.data?.data || []);

        const feeTypesRes = await getAPI(`/getall-fess-type/${schoolId}`);
        if (!feeTypesRes.hasError) {
          setFeeTypes(feeTypesRes.data.data || []);
        }
      } catch (error) {
        toast.error('Error initializing data');
        console.error('Initialization error:', error);
      }
    };

    fetchInitialData();
  }, [schoolId]);

  const getInstallmentData = (installmentNumber, academicYear) => {
    if (!Array.isArray(feeData)) {
      console.warn('feeData is not an array:', { feeData });
      return [];
    }

    const selectedYearData = feeData.find((year) => year.academicYear === academicYear);
    if (!selectedYearData?.feeInstallments) {
      console.warn(`No feeInstallments found for academic year: ${academicYear}`);
      return [];
    }

    return selectedYearData.feeInstallments
      .filter((item) => item.installmentName === `Installment ${installmentNumber}`)
      .map((item) => ({
        ...item,
        academicYear: selectedYearData.academicYear,
      }));
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    const admissionNumber = formData.AdmissionNumber.trim();

    try {
      const student = existingStudents.find((s) => s.AdmissionNumber.trim() === admissionNumber);
      if (!student) throw new Error('Invalid admission number');

      const updatedFormData = {
        ...formData,
        firstName: student.firstName,
        lastName: student.lastName,
        masterDefineClass: student?.masterDefineClass?._id || student?.masterDefineClass || '',
        section: student?.section?._id || student?.section || '',
      };
      setFormData(updatedFormData);

      if (updatedFormData.masterDefineClass) {
        const selectedClass = classes.find((c) => c._id === updatedFormData.masterDefineClass);
        setSections(selectedClass?.sections || []);
      }

      if (schoolId && admissionNumber && updatedFormData.masterDefineClass && updatedFormData.section) {
        const response = await getAPI(
          `/get-concession-formbyADMID?classId=${updatedFormData.masterDefineClass}&sectionIds=${updatedFormData.section}&schoolId=${schoolId}&admissionNumber=${admissionNumber}`
        );
        if (!response?.data?.data || !Array.isArray(response.data.data)) {
          throw new Error('All fees are paid or no fee data found');
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
              const installmentNum = item.installmentName.split(' ')[1];
              const key = `${year.academicYear}-${installmentNum}-${item.feesTypeId._id}`;
              initialPaidAmounts[key] = 0; // Initialize as 0 for empty Amount Paid
              initialActionSelections[`${year.academicYear}-${installmentNum}`] = '';
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
      }
    } catch (error) {
      toast.error(error?.data?.message || 'All fees are paid for all academic years');
      console.error('Submission error:', error);
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

 const openFeeTypeModal = (installmentNum, academicYear) => {
  const installmentData = getInstallmentData(installmentNum, academicYear);
  const seenFeeTypeIds = new Set();
  const feeItems = installmentData
    .filter((item) => {
      if (seenFeeTypeIds.has(item.feesTypeId._id)) {
        console.warn(`Duplicate feeTypeId ${item.feesTypeId._id} found for ${academicYear}-${installmentNum}`);
        return false;
      }
      seenFeeTypeIds.add(item.feesTypeId._id);
      return true;
    })
    .map((item) => {
      const concessionItem = feeData
        .find((y) => y.academicYear === academicYear)
        ?.concession?.concessionDetails?.find(
          (cd) => cd.installmentName === `Installment ${installmentNum}` && cd.feesType === item.feesTypeId._id
        );
      const key = `${academicYear}-${installmentNum}-${item.feesTypeId._id}`;
      // Only use paidAmount if it's a positive number; otherwise, set to ''
      const paidAmount = paidAmounts[key] && Number(paidAmounts[key]) > 0 ? paidAmounts[key] : '';
      return {
        feeTypeId: item.feesTypeId._id,
        amount: item.amount,
        balance: item.balanceAmount,
        concession: concessionItem?.concessionAmount || 0,
        fineAmount: item.fineAmount || 0,
        paidAmount: paidAmount,
      };
    });

  console.log('Opening FeeTypeModal with feeItems:', feeItems);

  setModalData({
    academicYear,
    installmentNum,
    feeItems,
  });
};

  const closeFeeTypeModal = () => {
    setModalData(null);
  };

const handleModalPaidAmountChange = (installmentNum, feeTypeId, amount, academicYear) => {
  const parsedAmount = amount === '' ? '' : Math.max(0, Number(amount));
  const key = `${academicYear}-${installmentNum}-${feeTypeId}`;

  // Find the fee item to validate paidAmount against balance
  const feeItem = modalData?.feeItems.find((item) => item.feeTypeId === feeTypeId);
  if (feeItem && parsedAmount !== '' && parsedAmount > feeItem.balance) {
    toast.error(`Paid amount cannot exceed balance (${feeItem.balance})`);
    return;
  }

  console.log(`Updating paidAmount for key: ${key}, amount: ${parsedAmount}`);

  setPaidAmounts((prev) => {
    const newPaidAmounts = { ...prev };
    if (parsedAmount === '' || parsedAmount === 0) {
      // Remove the key if amount is 0 or empty
      delete newPaidAmounts[key];
    } else {
      // Only store if amount is positive
      newPaidAmounts[key] = parsedAmount;
    }
    console.log('Updated paidAmounts:', newPaidAmounts);
    return newPaidAmounts;
  });

  setModalData((prev) => {
    if (!prev) return prev;
    const updatedFeeItems = prev.feeItems.map((item) =>
      item.feeTypeId === feeTypeId
        ? { ...item, paidAmount: parsedAmount === 0 ? '' : parsedAmount } // Set to '' if 0
        : item
    );
    console.log('Updated modalData:', { ...prev, feeItems: updatedFeeItems });
    return {
      ...prev,
      feeItems: updatedFeeItems,
    };
  });
};

  const handleInstallmentSelection = (installmentNumber, academicYear) => {
    setSelectedInstallments((prev) => {
      const yearInstallments = prev[academicYear] || [];
      const isSelected = yearInstallments.includes(installmentNumber);
      const newYearInstallments = isSelected
        ? yearInstallments.filter((num) => num !== installmentNumber)
        : [...yearInstallments, installmentNumber];

      const installmentData = getInstallmentData(installmentNumber, academicYear);
      const allFeeTypeIds = installmentData.map((item) => item.feesTypeId._id);

      setSelectedFeeTypesByInstallment((prevTypes) => {
        if (!isSelected) {
          return {
            ...prevTypes,
            [academicYear]: {
              ...(prevTypes[academicYear] || {}),
              [installmentNumber]: allFeeTypeIds,
            },
          };
        } else {
          const newTypes = { ...prevTypes };
          if (newTypes[academicYear]) {
            delete newTypes[academicYear][installmentNumber];
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
          const key = `${academicYear}-${installmentNumber}-${item.feesTypeId._id}`;
          delete newPaidAmounts[key];
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
          const unpaidInstallments = yearData.installmentsPresent.filter((installmentNum) => {
            const installmentData = yearData.feeInstallments?.filter((item) =>
              item.installmentName.includes(`Installment ${installmentNum}`)
            );
            return installmentData?.some((item) => item.balanceAmount > 0);
          });
          const currentYearInstallments = updatedSelectedInstallments[academicYear] || [];
          return unpaidInstallments.every((num) => currentYearInstallments.includes(num));
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
          const unpaidInstallments = yearData.installmentsPresent.filter((installmentNum) => {
            const installmentData = yearData.feeInstallments?.filter((item) =>
              item.installmentName.includes(`Installment ${installmentNum}`)
            );
            return installmentData?.some((item) => item.balanceAmount > 0);
          });

          if (newSelectAll) {
            newSelectedInstallments[academicYear] = unpaidInstallments;
            unpaidInstallments.forEach((installmentNum) => {
              const installmentData = getInstallmentData(installmentNum, academicYear);
              const allFeeTypeIds = installmentData.map((item) => item.feesTypeId._id);
              newSelectedFeeTypes[academicYear] = {
                ...(newSelectedFeeTypes[academicYear] || {}),
                [installmentNum]: allFeeTypeIds,
              };
            });
          } else {
            delete newSelectedInstallments[academicYear];
            delete newSelectedFeeTypes[academicYear];
          }
        }
      });

      setSelectedFeeTypesByInstallment(newSelectedFeeTypes);
      return newSelectedInstallments;
    });

    if (!newSelectAll) {
      const newPaidAmounts = { ...paidAmounts };
      actualSelectedYears.forEach((academicYear) => {
        const yearData = feeData.find((year) => year.academicYear === academicYear);
        if (yearData && Array.isArray(yearData.installmentsPresent)) {
          yearData.installmentsPresent.forEach((installmentNum) => {
            const installmentData = getInstallmentData(installmentNum, academicYear);
            installmentData.forEach((item) => {
              const key = `${academicYear}-${installmentNum}-${item.feesTypeId._id}`;
              delete newPaidAmounts[key];
            });
          });
        }
      });
      setPaidAmounts(newPaidAmounts);
    }
  };

  const handleFeeTypeSelection = (installmentNumber, feeTypeId, academicYear) => {
    setSelectedFeeTypesByInstallment((prev) => {
      const yearTypes = prev[academicYear] || {};
      const currentInstallmentTypes = yearTypes[installmentNumber] || [];
      const isAlreadySelected = currentInstallmentTypes.includes(feeTypeId);
      const newTypes = isAlreadySelected
        ? currentInstallmentTypes.filter((id) => id !== feeTypeId)
        : [...currentInstallmentTypes, feeTypeId];

      setSelectedInstallments((prevInst) => {
        const yearInstallments = prevInst[academicYear] || [];
        const isInstallmentSelected = newTypes.length > 0;

        if (isInstallmentSelected && !yearInstallments.includes(installmentNumber)) {
          return {
            ...prevInst,
            [academicYear]: [...yearInstallments, installmentNumber],
          };
        } else if (!isInstallmentSelected && yearInstallments.includes(installmentNumber)) {
          const newYearInstallments = yearInstallments.filter((num) => num !== installmentNumber);
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
            (item) =>
              item.installmentName === `Installment ${installmentNumber}` &&
              item.feesTypeId._id === feeTypeId
          );

          if (installmentData) {
            const concessionItem = yearData.concession?.concessionDetails?.find(
              (cd) =>
                cd.installmentName === `Installment ${installmentNumber}` &&
                cd.feesType === feeTypeId
            );
            const concessionAmount = concessionItem?.concessionAmount || 0;
            const fineAmount = installmentData.fineAmount || 0;
            const payableAmount = installmentData.balanceAmount - concessionAmount + fineAmount;
            const paidKey = `${academicYear}-${installmentNumber}-${feeTypeId}`;
            setPaidAmounts((prev) => ({
              ...prev,
              [paidKey]: '', 
            }));
          }
        }
      } else {
        const paidKey = `${academicYear}-${installmentNumber}-${feeTypeId}`;
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
          [installmentNumber]: newTypes,
        },
      };
    });
  };

  const handleActionSelection = (installmentNumber, academicYear, action) => {
  const key = `${academicYear}-${installmentNumber}`;
  setActionSelections((prev) => ({
    ...prev,
    [key]: action,
  }));

  const installmentData = getInstallmentData(installmentNumber, academicYear);
  const allFeeTypeIds = installmentData.map((item) => item.feesTypeId._id);

  if (action === 'Full Fees') {
    setSelectedFeeTypesByInstallment((prev) => ({
      ...prev,
      [academicYear]: {
        ...(prev[academicYear] || {}),
        [installmentNumber]: allFeeTypeIds,
      },
    }));

    setSelectedInstallments((prev) => {
      const yearInstallments = prev[academicYear] || [];
      if (!yearInstallments.includes(installmentNumber)) {
        return {
          ...prev,
          [academicYear]: [...yearInstallments, installmentNumber],
        };
      }
      return prev;
    });

    // Set paidAmount only for selected fee types with positive amounts
    const newPaidAmounts = { ...paidAmounts };
    installmentData.forEach((item) => {
      const concessionItem = feeData
        .find((y) => y.academicYear === academicYear)
        ?.concession?.concessionDetails?.find(
          (cd) =>
            cd.installmentName === `Installment ${installmentNumber}` &&
            cd.feesType === item.feesTypeId._id
        );
      const concessionAmount = concessionItem?.concessionAmount || 0;
      const fineAmount = item.fineAmount || 0;
      const payableAmount = item.balanceAmount - concessionAmount + fineAmount;
      const paidKey = `${academicYear}-${installmentNumber}-${item.feesTypeId._id}`;
      // Only set paidAmount for selected fee types
      if (selectedFeeTypesByInstallment[academicYear]?.[installmentNumber]?.includes(item.feesTypeId._id)) {
        newPaidAmounts[paidKey] = payableAmount;
      } else {
        // Remove if previously set to 0 or ''
        if (newPaidAmounts[paidKey] === '' || newPaidAmounts[paidKey] === 0) {
          delete newPaidAmounts[paidKey];
        }
      }
    });
    console.log('Updated paidAmounts after Full Fees:', newPaidAmounts);
    setPaidAmounts(newPaidAmounts);
  } else if (action === 'Part Fees') {
    setSelectedFeeTypesByInstallment((prev) => {
      const yearTypes = prev[academicYear] || {};
      const currentTypes = yearTypes[installmentNumber] || [];
      if (currentTypes.length === 0) {
        const newPaidAmounts = { ...paidAmounts };
        installmentData.forEach((item) => {
          const paidKey = `${academicYear}-${installmentNumber}-${item.feesTypeId._id}`;
          // Initialize as '' only if not already set to a positive value
          if (!newPaidAmounts[paidKey] || newPaidAmounts[paidKey] === 0) {
            newPaidAmounts[paidKey] = '';
          }
        });
        console.log('Updated paidAmounts after Part Fees:', newPaidAmounts);
        setPaidAmounts(newPaidAmounts);
        return {
          ...prev,
          [academicYear]: {
            ...yearTypes,
            [installmentNumber]: allFeeTypeIds,
          },
        };
      }
      return prev;
    });

    setSelectedInstallments((prev) => {
      const yearInstallments = prev[academicYear] || [];
      if (!yearInstallments.includes(installmentNumber)) {
        return {
          ...prev,
          [academicYear]: [...yearInstallments, installmentNumber],
        };
      }
      return prev;
    });
  }
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

  const handlePaidAmountChange = (installmentNum, feeTypeId, amount, academicYear) => {
    const parsedAmount = amount === '' ? '' : Math.max(0, Number(amount));
    const key = `${academicYear}-${installmentNum}-${feeTypeId}`;
    setPaidAmounts((prev) => ({
      ...prev,
      [key]: parsedAmount,
    }));
  };

  const handleFineAmountChange = (installmentNum, feeTypeId, newFineAmount, academicYear) => {
    const parsedFineAmount = Math.max(0, Number(newFineAmount));

    setFeeData((prev) => {
      if (!prev || !Array.isArray(prev)) return prev;

      return prev.map((year) => {
        if (year.academicYear === academicYear) {
          const updatedInstallments = year.feeInstallments.map((item) => {
            if (
              item.installmentName === `Installment ${installmentNum}` &&
              item.feesTypeId._id === feeTypeId
            ) {
              const concessionItem = year.concession?.concessionDetails?.find(
                (cd) =>
                  cd.installmentName === `Installment ${installmentNum}` &&
                  cd.feesType === feeTypeId
              );
              const concessionAmount = concessionItem?.concessionAmount || 0;
              const payableAmount = item.balanceAmount - concessionAmount + parsedFineAmount;
              const paidKey = `${academicYear}-${installmentNum}-${feeTypeId}`;
              const currentPaidAmount = paidAmounts[paidKey] !== undefined ? paidAmounts[paidKey] : '';

              return {
                ...item,
                fineAmount: parsedFineAmount,
                balanceAmount: payableAmount - (currentPaidAmount || 0),
              };
            }
            return item;
          });

          const totalFeesAmount = updatedInstallments.reduce((sum, item) => sum + item.amount, 0);
          const totalFine = updatedInstallments.reduce((sum, item) => sum + (item.fineAmount || 0), 0);
          const totalConcession =
            year.concession?.concessionDetails?.reduce(
              (sum, cd) => sum + (cd.concessionAmount || 0),
              0
            ) || 0;
          const totalFeesPayable = updatedInstallments.reduce((sum, item) => {
            const concession = year.concession?.concessionDetails?.find(
              (cd) => cd.installmentName === item.installmentName && cd.feesType === item.feesTypeId._id
            )?.concessionAmount || 0;
            return sum + (item.balanceAmount - concession + (item.fineAmount || 0));
          }, 0);
          const totalPaid = updatedInstallments.reduce((sum, item) => {
            const paidKey = `${academicYear}-${item.installmentName.split(' ')[1]}-${item.feesTypeId._id}`;
            return sum + (paidAmounts[paidKey] !== undefined ? Number(paidAmounts[paidKey] || 0) : 0);
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
  };

  const handleFinalSubmit = async (e) => {
  e.preventDefault();

  if (!formData.paymentMode || !formData.name) {
    toast.error('Please fill all required fields');
    return;
  }

  setIsGenerating(true);

  try {
    const actualSelectedYears = selectAllYears
      ? feeData.map((year) => year.academicYear)
      : selectedAcademicYears;

    if (actualSelectedYears.length === 0) {
      throw new Error('No academic years selected for processing');
    }

    const baseReceiptDetails = {
      studentName: `${formData.firstName} ${formData.lastName}`,
      studentAdmissionNumber: formData.AdmissionNumber,
      className: classes.find((c) => c._id === formData.masterDefineClass)?.className || '',
      section: sections.find((s) => s._id === formData.section)?.name || '',
      paymentDate: new Date().toISOString().split('T')[0],
      date: new Date().toISOString().split('T')[0],
      paymentMode: formData.paymentMode,
      collectorName: formData.name,
      bankName: formData.paymentMode === 'Cheque' ? formData.bankName : undefined,
    };

    const frontendReceiptDetails = [];

    for (const academicYear of actualSelectedYears) {
      if (!selectedInstallments[academicYear]?.length) {
        console.warn(`No installments selected for academic year ${academicYear}`);
        continue;
      }

      const receiptDetails = {
        ...baseReceiptDetails,
        transactionNumber:
          formData.paymentMode === 'Online Transfer' ? generateTransactionNumber() : formData.chequeNumber,
        chequeNumber: formData.chequeNumber,
        bankName: formData.bankName,
        academicYear,
        installments: [],
      };

      for (const installmentNum of selectedInstallments[academicYear] || []) {
        const installmentData = getInstallmentData(installmentNum, academicYear);
        const selectedTypes = selectedFeeTypesByInstallment[academicYear]?.[installmentNum] || [];

        if (!selectedTypes.length) {
          console.warn(`No fee types selected for installment ${installmentNum}, year ${academicYear}`);
          continue;
        }

        const seenFeeTypeIds = new Set();
        const uniqueFeeItems = installmentData
          .filter((item) => selectedTypes.includes(item.feesTypeId._id))
          .filter((item) => {
            if (seenFeeTypeIds.has(item.feesTypeId._id)) {
              console.warn(
                `Duplicate feeTypeId ${item.feesTypeId._id} filtered out for installment ${installmentNum}, year ${academicYear}`
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
            const fineAmount = item.fineAmount || 0;
            const payable = item.balanceAmount - concession + fineAmount;
            const paidKey = `${item.academicYear}-${installmentNum}-${item.feesTypeId._id}`;
            const paid = Number(paidAmounts[paidKey] || 0);
            return {
              feeTypeId: item.feesTypeId._id,
              amount: item.amount,
              concession,
              fineAmount,
              payable,
              paid,
              balance: payable - paid,
              academicYear: item.academicYear,
            };
          })
          .filter((item) => item.paid > 0); // Only include fee items with non-zero paidAmount

        if (uniqueFeeItems.length > 0) {
          receiptDetails.installments.push({
            number: installmentNum,
            academicYear,
            feeItems: uniqueFeeItems,
          });
        }
      }

      if (receiptDetails.installments.length === 0) {
        console.warn(`No valid fee items selected for academic year ${academicYear}`);
        continue;
      }

      const response = await postAPI('/create-schoolfees', receiptDetails, true);

      if (response.hasError) {
        throw new Error(response.message || `Failed to save receipt for ${academicYear}`);
      }

      frontendReceiptDetails.push({
        ...receiptDetails,
        receiptNumber: response.data.receipt.receiptNumber,
        bankName: formData.paymentMode === 'Cheque' ? formData.bankName : undefined,
        installments: receiptDetails.installments.map((inst) => ({
          ...inst,
          feeItems: inst.feeItems.map((item) => ({
            ...item,
            type: getFeeTypeName(item.feeTypeId),
            academicYear: item.academicYear,
          })),
        })),
      });
    }

    if (frontendReceiptDetails.length === 0) {
      throw new Error('No valid fee items selected for any academic year');
    }

    toast.success('Receipts generated successfully!');

    navigate('/school-dashboard/fees-module/fees-receipts/school-fees/student-receipts', {
      state: frontendReceiptDetails,
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