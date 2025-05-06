import { useState, useEffect } from 'react';
import getAPI from '../../../../api/getAPI';
import postAPI from '../../../../api/postAPI';
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
  const [feeData, setFeeData] = useState(null);
  const [feeTypes, setFeeTypes] = useState([]);
  const [formData, setFormData] = useState({
    AdmissionNumber: '',
    paymentMode: '',
    name: '',
    chequeNumber: '',
    bankName: ''
  });
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentInstallment, setCurrentInstallment] = useState(1);
  const [totalInstallments, setTotalInstallments] = useState(0);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProcessedData, setShowProcessedData] = useState(false);
  const [selectedFeeTypesByInstallment, setSelectedFeeTypesByInstallment] = useState({});
  const [paidAmounts, setPaidAmounts] = useState({});

  const generateReceiptNumber = () => `${'RCPT'}-${Math.floor(100000 + Math.random() * 900000)}`;
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

  const getInstallmentData = (installmentNumber) => {
    if (!feeData?.feeInstallments) return [];
    return feeData.feeInstallments.filter(item => 
      item.installmentName.includes(`Installment ${installmentNumber}`) || 
      item.installmentName === `Installment ${installmentNumber}`
    );
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    const admissionNumber = formData.AdmissionNumber.trim();
  
    try {
      const student = existingStudents.find(s => s.AdmissionNumber.trim() === admissionNumber);
      if (!student) throw new Error('Invalid admission number');
  
      const updatedFormData = {
        ...formData,
        firstName: student.firstName,
        lastName: student.lastName,
        masterDefineClass: student?.masterDefineClass?._id || student?.masterDefineClass || '',
        section: student?.section?._id || student?.section || ''
      };
      setFormData(updatedFormData);
  
      if (updatedFormData.masterDefineClass) {
        const selectedClass = classes.find(c => c._id === updatedFormData.masterDefineClass);
        setSections(selectedClass?.sections || []);
      }
  
      if (schoolId && admissionNumber && updatedFormData.masterDefineClass && updatedFormData.section) {
        const concessionRes = await getAPI(
          `/get-concession-formbyADMID?classId=${updatedFormData.masterDefineClass}&sectionIds=${updatedFormData.section}&schoolId=${schoolId}&admissionNumber=${admissionNumber}`
        );
  
       
        if (!concessionRes?.data?.data) {
          throw new Error('No concession data found');
        }
  
        const concessionData = concessionRes.data.data;
        setFeeData(concessionData);
  
        
        const installmentsPresent = Array.from(
          new Set(concessionData.feeInstallments.map(item => parseInt(item.installmentName.split(' ')[1])))
        ).sort((a, b) => a - b);
  
        setTotalInstallments(installmentsPresent);
  
        if (concessionData.concession?.applicableAcademicYear) {
          setSelectedAcademicYear(concessionData.concession.applicableAcademicYear);
        }
      }
  
      setShowFullForm(true);
    } catch (error) {
      toast.error(error.message || 'Error processing student data');
      console.error('Submission error:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getFeeTypeName = (feeTypeId) => {
    return feeTypes.find(ft => ft._id === feeTypeId)?.feesTypeName || 'Unknown Fee Type';
  };



  const handleInstallmentSelection = (installmentNumber) => {
    setSelectedInstallments(prev => 
      prev.includes(installmentNumber) 
        ? prev.filter(num => num !== installmentNumber) 
        : [...prev, installmentNumber]
    );
  };

  const handleFeeTypeSelection = (installmentNumber, feeTypeId) => {
    setSelectedFeeTypesByInstallment(prev => ({
      ...prev,
      [installmentNumber]: (prev[installmentNumber] || []).includes(feeTypeId)
        ? prev[installmentNumber].filter(id => id !== feeTypeId)
        : [...(prev[installmentNumber] || []), feeTypeId]
    }));
  };

  const areAllFeeTypesSelected = () => {
    if (!feeData?.feeInstallments) return false;
    
    const allFeeTypes = new Set();
    const selectedFeeTypes = new Set();
    
    feeData.feeInstallments.forEach(item => {
      allFeeTypes.add(item.feesTypeId._id);
    });
    
    Object.values(selectedFeeTypesByInstallment).forEach(types => {
      types.forEach(type => selectedFeeTypes.add(type));
    });
    
    return allFeeTypes.size > 0 && allFeeTypes.size === selectedFeeTypes.size;
  };

  const handleSelectAllFeeTypes = (e) => {
    if (e.target.checked) {
      const allSelected = {};
      Array.from({ length: totalInstallments }, (_, i) => i + 1).forEach(num => {
        const installmentData = getInstallmentData(num);
        allSelected[num] = installmentData.map(item => item.feesTypeId._id);
      });
      setSelectedFeeTypesByInstallment(allSelected);
    } else {
      setSelectedFeeTypesByInstallment({});
    }
  };

  const calculatePayFees = () => {
    if (!feeData?.totals) return 0;
    const { totalFeesAmount = 0, totalConcession = 0, totalFine = 0 } = feeData.totals;
    return (totalFeesAmount - totalConcession + totalFine).toFixed(2);
  };

  const handlePaidAmountChange = (installmentNum, feeTypeId, amount) => {
    setPaidAmounts(prev => ({
      ...prev,
      [`${installmentNum}-${feeTypeId}`]: amount
    }));
    
    setFeeData(prev => {
      const updatedInstallments = prev.feeInstallments.map(item => {
        if (item.installmentName === `Installment ${installmentNum}` && 
            item.feesTypeId._id === feeTypeId) {
          return { ...item, paidAmount: amount };
        }
        return item;
      });
      return { ...prev, feeInstallments: updatedInstallments };
    });
  };

  const handleAcademicYearSelect = (academicYear) => {
    if (selectAll) {
      setSelectAll(false);
    }
    setSelectedAcademicYear(academicYear === selectedAcademicYear ? null : academicYear);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.paymentMode || !formData.name) {
      toast.error('Please fill all required fields');
      return;
    }
  
    setIsGenerating(true);
  
    try {
      const receiptDetails = {
        receiptNumber: generateReceiptNumber(),
        transactionNumber: formData.paymentMode === 'Cash'
          ? generateTransactionNumber()
          : formData.chequeNumber,
        studentName: `${formData.firstName} ${formData.lastName}`,
        studentAdmissionNumber: formData.AdmissionNumber,
        className: classes.find(c => c._id === formData.masterDefineClass)?.className || '',
        section: sections.find(s => s._id === formData.section)?.name || '',
        date: new Date().toISOString().split('T')[0],
        academicYear: selectedAcademicYear || 'N/A',
        paymentMode: formData.paymentMode,
        collectorName: formData.name,
        installments: []
      };
  
      for (const installmentNum of selectedInstallments) {
        const installmentData = getInstallmentData(installmentNum);
        const selectedTypes = selectedFeeTypesByInstallment[installmentNum] || [];
  
        const feeItems = installmentData
          .filter(item => selectedTypes.length === 0 || selectedTypes.includes(item.feesTypeId._id))
          .map(item => {
            const concessionItem = feeData.concession?.concessionDetails?.find(
              cd => cd.installmentName === item.installmentName && cd.feesType === item.feesTypeId._id
            );
            const concession = concessionItem?.concessionAmount || 0;
            const fineAmount = item.fineAmount || 0;
            const payable = item.amount - concession;
            const paid = item.paidAmount || 0;
  
            return {
              feeTypeId: item.feesTypeId._id,
              amount: item.amount,
              concession,
              fineAmount,
              payable,
              paid,
              balance: payable - paid
            };
          });
  
        if (feeItems.length > 0) {
          receiptDetails.installments.push({
            number: installmentNum,
            feeItems
          });
        }
      }
  
      const response = await postAPI('/create-schoolfees', receiptDetails, true);
  
      if (response.hasError) {
        throw new Error(response.message || 'Failed to save receipt');
      }
  
      const frontendReceiptDetails = {
        ...receiptDetails,
        installments: receiptDetails.installments.map(inst => ({
          ...inst,
          feeItems: inst.feeItems.map(item => ({
            ...item,
            type: getFeeTypeName(item.feeTypeId) 
          }))
        }))
      };
  
      toast.success('Receipt generated successfully!');
  
      navigate('/school-dashboard/fees-module/fees-receipts/school-fees/student-receipts', {
        state: frontendReceiptDetails
      });
  
    } catch (error) {
      toast.error(error.message || 'Failed to generate receipt');
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
    selectedAcademicYear,
    selectAll,
    setSelectAll,
    currentInstallment,
    setCurrentInstallment,
    totalInstallments,
    selectedInstallments,
    getFeeTypeName,
    getInstallmentData,
    calculatePayFees,
    handleInstallmentSelection,
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
    areAllFeeTypesSelected,
    handleSelectAllFeeTypes,
    handleAcademicYearSelect
  };
};

export default useSchoolFeesReceipts;