import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportModal';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const ReconFeesHeadwise = () => {
  const headerMapping = {
    class: 'Class',
    section: 'Section',
    existingStudents: 'No. of Existing Students',
    newAdmission: 'New Admission',
    totalStudents: 'Total Students',
    schoolFees: 'School Fees',
    admFees: 'Adm Fees',
    yearlyDues: 'Yearly Dues',
  };

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('Class & Section');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [school, setSchool] = useState(null);
  const [logoSrc, setLogoSrc] = useState('');
  const [feeData, setFeeData] = useState([]);
  const [lateAdmissionData, setLateAdmissionData] = useState([]);
  const [leftStudentData, setLeftStudentData] = useState([]);
  const [defaulterData, setDefaulterData] = useState([]);
  const [admissionFeesData, setAdmissionFeesData] = useState([]);
  const [registrationFeesData, setRegistrationFeesData] = useState([]);
  const [tcFeesData, setTcFeesData] = useState([]);
  const [boardRegistrationFeesData, setBoardRegistrationFeesData] = useState([]);
  const [boardExamFeesData, setBoardExamFeesData] = useState([]);
  const [lateFeesData, setLateFeesData] = useState([]);
  const [arrearFeesData, setArrearFeesData] = useState([]);
  const [tableFields] = useState(
    Object.keys(headerMapping).map((key) => ({
      id: key,
      label: headerMapping[key],
    }))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [allSectionOptions, setAllSectionOptions] = useState([]);
  const [academicYearOptions, setAcademicYearOptions] = useState([]);
  const [installmentOptions, setInstallmentOptions] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [lossDueToLeft, setLossDueToLeft] = useState(0);
  const [lossDueToLateAdmission, setLossDueToLateAdmission] = useState(0);
  const [defaulterFees, setDefaulterFees] = useState(0);
  const [lateAndExcessFees, setLateAndExcessFees] = useState(0);
  const [registrationFees, setRegistrationFees] = useState(0);
  const [tcFees, setTcFees] = useState(0);
  const [boardRegistrationFees, setBoardRegistrationFees] = useState(0);
  const [boardExaminationFees, setBoardExaminationFees] = useState(0);
  const [arrearFeesReceived, setArrearFeesReceived] = useState(0);
  const dropdownRef = useRef(null);
  const tabs = ['Academic Year', 'Class & Section', 'Installment'];

  const formatAcademicYear = (year) => {
    if (!year) return '-';
    const [startYear, endYear] = year.split('-');
    return `${startYear}-${endYear.slice(2)}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId) {
      toast.error('School ID not found. Please log in again.');
      return;
    }
    setSchoolId(userDetails.schoolId);
  }, []);

  useEffect(() => {
    const fetchAcademicYearsAndClasses = async () => {
      try {
        setLoadingYears(true);
        const [yearResponse, classResponse] = await Promise.all([
          getAPI(`/get-feesmanagment-year/${schoolId}`),
          getAPI(`/get-recon-fees-headwise?schoolId=${schoolId}&academicYear=${selectedAcademicYear}`),
        ]);

        if (!yearResponse.hasError && yearResponse.data?.data) {
          const years = yearResponse.data.data.map((item) => item.academicYear).sort((a, b) => a.localeCompare(b));
          setAcademicYears(years);
          setAcademicYearOptions(
            years.map((year) => ({
              value: year,
              label: formatAcademicYear(year),
            }))
          );
        } else {
          toast.error('No academic years found.');
        }

        if (!classResponse.hasError && classResponse.data?.data) {
          const classes = [...new Set(classResponse.data.data.map(item => item.className))];
          const sections = [...new Set(classResponse.data.data.map(item => item.sectionName))];
          setClassOptions(classes.map(cls => ({ value: cls, label: cls })));
          setAllSectionOptions(sections.map(sec => ({ value: sec, label: sec })));
          setSectionOptions(sections.map(sec => ({ value: sec, label: sec })));
          const installments = [...new Set(classResponse.data.data.flatMap(item => item.installments || []).map(inst => inst.name))];
          setInstallmentOptions(installments.map(inst => ({ value: inst, label: inst })));
        }
      } catch (err) {
        toast.error('Error fetching academic years or class data.');
        console.error(err);
      } finally {
        setLoadingYears(false);
      }
    };
    if (schoolId) {
      fetchAcademicYearsAndClasses();
    }
  }, [schoolId, selectedAcademicYear]);

  useEffect(() => {
    const fetchSectionOptions = async () => {
      if (selectedClasses.length === 0) {
        setSectionOptions(allSectionOptions);
        setSelectedSections([]);
        return;
      }

      try {
        const queryParams = `schoolId=${schoolId}&academicYear=${selectedAcademicYear}&classes=${selectedClasses
          .map((cls) => cls.value)
          .join(",")}`;
        const response = await getAPI(`/get-recon-fees-headwise?${queryParams}`);

        if (!response.hasError && response.data?.data) {
          const selectedClassNames = selectedClasses.map((cls) => cls.value);
          const relevantSections = [
            ...new Set(
              response.data.data
                .filter((item) => selectedClassNames.includes(item.className))
                .map((item) => item.sectionName)
            ),
          ];

          const filteredSectionOptions = relevantSections
            .map((sec) => ({
              value: sec,
              label: sec,
            }))
            .filter((sec) =>
              allSectionOptions.some((allSec) => allSec.value === sec.value)
            );

          setSectionOptions(filteredSectionOptions);
          setSelectedSections((prev) =>
            prev.filter((sec) =>
              filteredSectionOptions.some((opt) => opt.value === sec.value)
            )
          );
        } else {
          toast.error("No sections found for the selected classes.");
          setSectionOptions([]);
          setSelectedSections([]);
        }
      } catch (err) {
        console.error("Error fetching sections for selected classes:", err);
        toast.error("Error updating sections.");
        setSectionOptions([]);
        setSelectedSections([]);
      }
    };

    if (schoolId && selectedAcademicYear) {
      fetchSectionOptions();
    }
  }, [selectedClasses, schoolId, selectedAcademicYear, allSectionOptions]);

  useEffect(() => {
    const fetchData = async () => {
      if (!schoolId || !selectedAcademicYear) return;
      setIsLoading(true);
      try {
        const queryParams = `schoolId=${schoolId}&academicYear=${selectedAcademicYear}` +
          (selectedClasses.length ? `&classes=${selectedClasses.map(cls => cls.value).join(',')}` : '') +
          (selectedSections.length ? `&sections=${selectedSections.map(sec => sec.value).join(',')}` : '') +
          (selectedInstallment ? `&installment=${selectedInstallment.value}` : '') +
          (startDate ? `&startDate=${formatDate(startDate)}` : '') +
          (endDate ? `&endDate=${formatDate(endDate)}` : '');

        let admissionResponse, leftResponse, lateResponse, defaulterResponse, admissionFeesResponse,
          registrationFeesResponse, tcFeesResponse, boardRegistrationFeesResponse,
          boardExamFeesResponse, lateFeesResponse, arrearFeesResponse;

        try {
          admissionResponse = await getAPI(`/get-recon-fees-headwise?${queryParams}`);
        } catch (err) {
          admissionResponse = { hasError: true, data: null };
          console.error('Error fetching admission data:', err);
        }

        try {
          leftResponse = await getAPI(`/Loss-of-fee-due-to-left-student?${queryParams}`);
        } catch (err) {
          leftResponse = { hasError: true, data: null };
          console.error('Error fetching left student data:', err);
        }

        try {
          lateResponse = await getAPI(`/Loss-of-fee-due-to-late-Admission?${queryParams}`);
        } catch (err) {
          lateResponse = { hasError: true, data: null };
          console.error('Error fetching late admission data:', err);
        }

        try {
          defaulterResponse = await getAPI(`/Defaulter-Fees?${queryParams}`);
        } catch (err) {
          defaulterResponse = { hasError: true, data: null };
          console.error('Error fetching defaulter data:', err);
        }

        try {
          admissionFeesResponse = await getAPI(`/get-all-data-admission?${queryParams}`);
        } catch (err) {
          admissionFeesResponse = { hasError: true, data: null };
          console.error('Error fetching admission fees data:', err);
        }

        try {
          registrationFeesResponse = await getAPI(`/get-all-data-Registration?${queryParams}`);
          console.log("✅ Registration API response:", registrationFeesResponse);
        } catch (err) {
          registrationFeesResponse = { hasError: true, data: null };
          console.error('Error fetching registration fees data:', err);
        }

        try {
          tcFeesResponse = await getAPI(`/get-all-data-tc?${queryParams}`);
        } catch (err) {
          tcFeesResponse = { hasError: true, data: null };
          console.error('Error fetching TC fees data:', err);
        }

        try {
          boardRegistrationFeesResponse = await getAPI(`/get-all-data-board-registration?${queryParams}`);
        } catch (err) {
          boardRegistrationFeesResponse = { hasError: true, data: null };
          console.error('Error fetching board registration fees data:', err);
        }

        try {
          boardExamFeesResponse = await getAPI(`/get-all-data-board-exam?${queryParams}`);
        } catch (err) {
          boardExamFeesResponse = { hasError: true, data: null };
          console.error('Error fetching board exam fees data:', err);
        }

        try {
          lateFeesResponse = await getAPI(`/get-all-students-fees-with-late-fees?${queryParams}`);
        } catch (err) {
          lateFeesResponse = { hasError: true, data: null };
          console.error('Error fetching late fees data:', err);
        }

        try {
          arrearFeesResponse = await getAPI(`/get-arrear-fees?${queryParams}`);

          console.log('arrearFeesResponse:', arrearFeesResponse);
        } catch (err) {
          arrearFeesResponse = { hasError: true, data: null };
          console.error('Error fetching arrear fees data:', err);
        }

        if (!admissionResponse?.data?.data) {
          throw new Error('No admission data found');
        }

        setFeeData(admissionResponse.data.data);
        const leftData = leftResponse?.data?.data || [];
        const lateData = lateResponse?.data?.data || [];


        const lateAdmissionSet = new Set(lateData.map((item) => item.admissionNumber));
        const filteredLeftData = leftData.filter(
          (item) => !lateAdmissionSet.has(item.admissionNumber)
        );

        setLeftStudentData(filteredLeftData);
        setLateAdmissionData(lateResponse.data?.data || []);
        setDefaulterData(defaulterResponse.data?.data || []);
        setAdmissionFeesData(admissionFeesResponse.data?.data || []);
        setRegistrationFeesData(
          registrationFeesResponse.data?.combinedDetails || []
        );
        setTcFeesData(tcFeesResponse.data?.combinedDetails



          || []);
        setBoardRegistrationFeesData(boardRegistrationFeesResponse.data?.data
          ?.[selectedAcademicYear]
          || []);
        setBoardExamFeesData(boardExamFeesResponse.data?.data
          ?.[selectedAcademicYear]
          || []);

        setLateFeesData(lateFeesResponse.data?.data || []);
        setArrearFeesData(arrearFeesResponse.data?.data || []);

      } catch (error) {
        console.error('Error in fetchData:', error);
        toast.error('Error fetching data: ' + error.message);
        setFeeData([]);
        setLeftStudentData([]);
        setLateAdmissionData([]);
        setDefaulterData([]);
        setAdmissionFeesData([]);
        setRegistrationFeesData([]);
        setTcFeesData([]);
        setBoardRegistrationFeesData([]);
        setBoardExamFeesData([]);
        setLateFeesData([]);
        setArrearFeesData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [schoolId, selectedAcademicYear, selectedClasses, selectedSections, selectedInstallment, startDate, endDate]);

  useEffect(() => {
    const filteredLeftStudents = leftStudentData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      const matchesInstallment =
        !selectedInstallment ||
        record.installments.some((inst) => inst.installmentName === selectedInstallment.value);
      return matchesClass && matchesSection && matchesInstallment;
    });

    const totalLeft = filteredLeftStudents.reduce((sum, item) => {
      if (selectedInstallment) {
        const relevantInstallments = item.installments.filter(
          (inst) => inst.installmentName === selectedInstallment.value
        );
        return sum + relevantInstallments.reduce((acc, inst) => acc + (inst.balance || 0), 0);
      }
      return sum + (item.totals?.totalBalance || 0);
    }, 0).toFixed(2);

    setLossDueToLeft(totalLeft);
  }, [leftStudentData, selectedClasses, selectedSections, selectedInstallment]);

  useEffect(() => {
    const filteredLateAdmission = lateAdmissionData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      const matchesInstallment =
        !selectedInstallment ||
        record.installments.some((inst) => inst.installmentName === selectedInstallment.value);
      return matchesClass && matchesSection && matchesInstallment;
    });

    const totalLateAdmission = filteredLateAdmission.reduce((sum, item) => {
      if (selectedInstallment) {
        const relevantInstallments = item.installments.filter(
          (inst) => inst.installmentName === selectedInstallment.value
        );
        return sum + relevantInstallments.reduce((acc, inst) => acc + (inst.balance || 0), 0);
      }
      return sum + (item.totals?.totalBalance || 0);
    }, 0).toFixed(2);

    setLossDueToLateAdmission(totalLateAdmission);
  }, [lateAdmissionData, selectedClasses, selectedSections, selectedInstallment]);

  useEffect(() => {
    const filteredDefaulters = defaulterData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      const matchesInstallment =
        !selectedInstallment ||
        record.installments.some((inst) => inst.installmentName === selectedInstallment.value);
      return matchesClass && matchesSection && matchesInstallment;
    });

    const totalDefaulter = filteredDefaulters.reduce((sum, item) => {
      if (selectedInstallment) {
        const relevantInstallments = item.installments.filter(
          (inst) => inst.installmentName === selectedInstallment.value
        );
        return sum + relevantInstallments.reduce((acc, inst) => acc + (inst.balance || 0), 0);
      }
      return sum + (item.totals?.totalBalance || 0);
    }, 0).toFixed(2);

    setDefaulterFees(totalDefaulter);
  }, [defaulterData, selectedClasses, selectedSections, selectedInstallment]);

  useEffect(() => {
    const filteredAdmissionFees = admissionFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      return matchesClass && matchesSection;
    });

    setAdmissionFeesData(filteredAdmissionFees);
  }, [admissionFeesData, selectedClasses, selectedSections]);

  useEffect(() => {
    const filteredRegistrationFees = registrationFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      return matchesClass;
    });

    let totalReg = 0;
    filteredRegistrationFees.forEach(item => {
      if (item.recordType === "Registration" && item.regFeesStatus && item.regFeesStatus.includes("Paid")) {
        const paid = parseFloat(item.regFeesPaid || 0);
        const concession = parseFloat(item.regFeesConcession || 0);
        totalReg += paid + concession;
      } else if (item.recordType === "Refund") {
        const refund = Math.abs(
          parseFloat(item.regFeesrefundAmount || 0) ||
          parseFloat(item.regFeesCancelledAmount || 0)
        );
        const concessionAmount = parseFloat(item.regFeesConcession)
        totalReg -= refund - concessionAmount;
      }
    });

    setRegistrationFees(Number(totalReg).toFixed(2));
  }, [registrationFeesData, selectedClasses]);

  useEffect(() => {
    const filteredTcFees = tcFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      return matchesClass && matchesSection;
    });

    let totalTc = 0;
    filteredTcFees.forEach(item => {
      if (item.recordType === "Transfer Certificate" && item.tcFeesStatus && item.tcFeesStatus.includes("Paid")) {
        const paid = parseFloat(item.tcFeesPaid || 0);
        const concession = parseFloat(item.tcFeesConcession || 0);
        totalTc += paid + concession;
      } else if (item.recordType === "Refund") {
        const refund = Math.abs(
          parseFloat(item.tcFeesrefundAmount || 0) ||
          parseFloat(item.tcFeesCancelledAmount || 0)
        );
        const concessionAmount = parseFloat(item.tcFeesConcession)
        totalTc -= refund - concessionAmount;
      }
    });

    setTcFees(Number(totalTc).toFixed(2));

  }, [tcFeesData, selectedClasses, selectedSections]);

  useEffect(() => {
    const filteredBoardRegistrationFees = boardRegistrationFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      return matchesClass && matchesSection;
    });

    let totalBoardReg = 0;
    filteredBoardRegistrationFees.forEach(item => {
      if (item.recordType === "Board Registration Fee" && item.boardRegFeesStatus && (Array.isArray(item.boardRegFeesStatus) ? item.boardRegFeesStatus.includes("Paid") : item.boardRegFeesStatus.includes("Paid"))) {
        const paid = parseFloat(item.boardRegFeesPaid || 0);
        const concession = parseFloat(item.boardRegFeesConcession || 0);
        totalBoardReg += paid + concession;
      } else if (item.recordType === "Refund") {
        const refund = Math.abs(
          parseFloat(item.boardRegFeesrefundAmount || 0) ||
          parseFloat(item.boardRegFeesCancelledAmount || 0)
        );
        const concessionAmount = parseFloat(item.boardRegFeesConcession)
        totalBoardReg -= refund - concessionAmount;
      }
    });

    setBoardRegistrationFees(Number(totalBoardReg).toFixed(2));

  }, [boardRegistrationFeesData, selectedClasses, selectedSections]);

  useEffect(() => {
    const filteredBoardExamFees = boardExamFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      return matchesClass && matchesSection;
    });

    let totalBoardExam = 0;
    filteredBoardExamFees.forEach(item => {
      if (item.recordType === "Board Exam Fee" && item.boardExamFeesStatus && (Array.isArray(item.boardExamFeesStatus) ? item.boardExamFeesStatus.includes("Paid") : item.boardExamFeesStatus.includes("Paid"))) {
        const paid = parseFloat(item.boardExamFeesPaid || 0);
        const concession = parseFloat(item.boardExamFeesConcession || 0);
        totalBoardExam += paid + concession;
      } else if (item.recordType === "Refund") {
        const refund = Math.abs(
          parseFloat(item.boardExamFeesrefundAmount || 0) ||
          parseFloat(item.boardExamFeesCancelledAmount || 0)
        );
        const concessionAmount = parseFloat(item.boardExamFeesConcession)
        totalBoardExam -= refund - concessionAmount;
      }
    });

    setBoardExaminationFees(Number(totalBoardExam).toFixed(2));

  }, [boardExamFeesData, selectedClasses, selectedSections]);

  useEffect(() => {
    const filteredLateFees = lateFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      const matchesInstallment =
        !selectedInstallment ||
        record.installmentName === selectedInstallment.value;
      const paymentDate = record.displayDate ? new Date(record.displayDate.split('/').reverse().join('-')) : null;
      const matchesDate =
        (!startDate || !paymentDate || paymentDate >= new Date(startDate)) &&
        (!endDate || !paymentDate || paymentDate <= new Date(endDate));
      return matchesClass && matchesSection && matchesInstallment && matchesDate;
    });

    let totalLateAndExcess = 0;
    const lateFeesBreakdown = { lateExcessFee: 0 };

    filteredLateFees.forEach(item => {
      const lateAmount = (parseFloat(item.paidFine) || 0) + (parseFloat(item.excessFees) || 0);
      totalLateAndExcess += lateAmount;
      lateFeesBreakdown.lateExcessFee = totalLateAndExcess;
    });

    setLateAndExcessFees(Number(totalLateAndExcess).toFixed(2));
  }, [lateFeesData, selectedClasses, selectedSections, selectedInstallment, startDate, endDate]);



























  useEffect(() => {
    const filteredArrearFees = arrearFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);

      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);

      const matchesInstallment =
        !selectedInstallment ||
        record.installmentName === selectedInstallment.value;

      const paymentDate = record.paymentDate
        ? new Date(record.paymentDate.split("-").reverse().join("-"))
        : null;

      const matchesDate =
        (!startDate || !paymentDate || paymentDate >= new Date(startDate)) &&
        (!endDate || !paymentDate || paymentDate <= new Date(endDate));

      return matchesClass && matchesSection && matchesInstallment && matchesDate;
    });

    const totalArrearFeesReceived = filteredArrearFees.reduce((sum, record) => {

      const feeTypePaidSum = Object.values(record.feeTypes || {}).reduce(
        (innerSum, fee) => innerSum + (parseFloat(fee.totalPaid) || 0),
        0
      );


      const totalRefundCancelled = (record.refundData || []).reduce(
        (refundSum, refund) => {
          const feeTypeRefundTotal = (refund.feeTypeRefunds || []).reduce(
            (innerRefund, ft) =>
              innerRefund +
              (parseFloat(ft.refundAmountandcancelledAmount) || 0) ,
              // (parseFloat(ft.concessionAmount) || 0),
            0
          );
          return refundSum + feeTypeRefundTotal;
        },
        0
      );


      const netPaid = feeTypePaidSum + totalRefundCancelled;

      return sum + netPaid;
    }, 0);

    setArrearFeesReceived(totalArrearFeesReceived.toFixed(2));
  }, [
    arrearFeesData,
    selectedClasses,
    selectedSections,
    selectedInstallment,
    startDate,
    endDate,
  ]);



  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const { school, logoSrc } = await fetchSchoolData(schoolId);
        setSchool(school);
        setLogoSrc(logoSrc);
      } catch (error) {
        console.error('Failed to fetch school data:', error);
      }
    };
    if (schoolId) {
      loadSchoolData();
    }
  }, [schoolId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectChange = (selectedOptions, { name }) => {
    if (name === 'academicYear') {
      const selectedYear = selectedOptions?.value || '';
      setSelectedAcademicYear(selectedYear);
      setSelectedInstallment(null);
      setStartDate(null);
      setEndDate(null);
    } else if (name === 'class') {
      setSelectedClasses(selectedOptions || []);
    } else if (name === 'section') {
      setSelectedSections(selectedOptions || []);
    } else if (name === 'installment') {
      setSelectedInstallment(selectedOptions || null);
    }
  };

  const resetFilters = () => {
    setSelectedClasses([]);
    setSelectedSections([]);
    setSelectedInstallment(null);
    setStartDate(null);
    setEndDate(null);
    setSearchTerm('');
    const storedYear = localStorage.getItem('selectedAcademicYear');
    if (storedYear) {
      setSelectedAcademicYear(storedYear);
    }
  };

  const applyFilters = () => {
    setShowFilterPanel(false);
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
    setShowExportDropdown(false);
  };

  const toggleExportDropdown = () => {
    setShowExportDropdown(!showExportDropdown);
    setShowFilterPanel(false);
  };

  const getFieldValue = (record, field) => {
    const fieldId = field.id;
    if (fieldId === 'class') return record.className || '-';
    if (fieldId === 'section') return record.sectionName || '-';
    if (fieldId === 'existingStudents') return record.existingStudents || 0;
    if (fieldId === 'newAdmission') return record.newAdmission || 0;
    if (fieldId === 'totalStudents') return record.totalStudents || 0;
    if (fieldId === 'schoolFees') {
      if (selectedInstallment) {
        const installment = record.installments?.find(inst => inst.name === selectedInstallment.value);
        return installment ? Number(installment.fees.reduce((sum, fee) => sum + fee.amount, 0)).toFixed(2) : '0.00';
      }
      return record.schoolFees ? Number(record.schoolFees).toFixed(2) : '0.00';
    }
    if (fieldId === 'admFees') return record.admFees ? Number(record.admFees).toFixed(2) : '0.00';
    if (fieldId === 'yearlyDues') {
      if (selectedInstallment) {
        const installment = record.installments?.find(inst => inst.name === selectedInstallment.value);
        const installmentFees = installment ? installment.fees.reduce((sum, fee) => sum + fee.amount, 0) : 0;
        return Number((record.totalStudents * installmentFees) + (record.newAdmission * (record.admFees || 0))).toFixed(2);
      }
      return record.yearlyDues ? Number(record.yearlyDues).toFixed(2) : '0.00';
    }
    return '-';
  };

  const filteredData = feeData.filter((record) => {
    const matchesSearchTerm = searchTerm
      ? Object.values(record).some((value) =>
        value && typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      ) || (record.className && record.className.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.sectionName && record.sectionName.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    const matchesClass =
      selectedClasses.length === 0 ||
      selectedClasses.some((cls) => record.className === cls.value);
    const matchesSection =
      selectedSections.length === 0 ||
      selectedSections.some((sec) => record.sectionName === sec.value);
    return matchesSearchTerm && matchesClass && matchesSection;
  });

  const totals = filteredData.reduce(
    (acc, record) => ({
      existingStudents: acc.existingStudents + (record.existingStudents || 0),
      newAdmission: acc.newAdmission + (record.newAdmission || 0),
      totalStudents: acc.totalStudents + (record.totalStudents || 0),
      schoolFees: acc.schoolFees + (selectedInstallment
        ? (record.installments?.find(inst => inst.name === selectedInstallment.value)?.fees.reduce((sum, fee) => sum + fee.amount, 0) || 0)
        : (record.schoolFees || 0)),
      admFees: acc.admFees + (record.admFees || 0),
      yearlyDues: acc.yearlyDues + (selectedInstallment
        ? ((record.installments?.find(inst => inst.name === selectedInstallment.value)?.fees.reduce((sum, fee) => sum + fee.amount, 0) || 0) * record.totalStudents) + ((record.newAdmission || 0) * (record.admFees || 0))
        : (record.yearlyDues || 0)),
    }),
    {
      existingStudents: 0,
      newAdmission: 0,
      totalStudents: 0,
      schoolFees: 0,
      admFees: 0,
      yearlyDues: 0,
    }
  );

  totals.schoolFees = Number(totals.schoolFees).toFixed(2);
  totals.admFees = Number(totals.admFees).toFixed(2);
  totals.yearlyDues = Number(totals.yearlyDues).toFixed(2);

  const netFeesDue = (Number(totals.yearlyDues) - Number(lossDueToLeft) - Number(lossDueToLateAdmission) - Number(defaulterFees)).toFixed(2);
  const finalFees = (Number(netFeesDue) + Number(lateAndExcessFees) + Number(registrationFees) + Number(tcFees) + Number(boardRegistrationFees) + Number(boardExaminationFees) + Number(arrearFeesReceived)).toFixed(2);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="row p-1 border border-dark" style={{ background: '#bfbfbf' }}>
                  <div className="col-md-5 col-12">
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Search by any field"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 px-0 d-flex align-content-center justify-content-end">
                    <div
                      className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
                      style={{ cursor: 'pointer' }}
                      onClick={toggleFilterPanel}
                    >
                      <FaFilter />
                    </div>
                    <div className="position-relative" ref={dropdownRef}>
                      <div
                        className="py-1 px-2 mr-2 mx-2 border border-dark finance-filter-icon"
                        style={{ cursor: 'pointer' }}
                        onClick={toggleExportDropdown}
                        title="Download"
                      >
                        <FaDownload />
                      </div>
                      {showExportDropdown && (
                        <div
                          className="position-absolute bg-white border mr-2 mt-2 border-dark rounded shadow"
                          style={{
                            top: '100%',
                            right: 0,
                            zIndex: 1000,
                            minWidth: '150px',
                          }}
                        >
                          <button
                            className="btn btn-light w-100 text-left py-2 px-3"
                            disabled={isExporting}
                            onClick={async () => {
                              setIsExporting(true);
                              try {
                                await exportToExcel(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  null,
                                  {
                                    ...totals,
                                    lossDueToLeft,
                                    lossDueToLateAdmission,
                                    defaulterFees,
                                    netFeesDue,
                                    lateAndExcessFees,
                                    registrationFees,
                                    tcFees,
                                    boardRegistrationFees,
                                    boardExaminationFees,
                                    arrearFeesReceived,
                                    finalFees
                                  },
                                  formatAcademicYear,
                                  selectedAcademicYear
                                );
                              } catch (err) {
                                toast.error("Export to Excel failed");
                              } finally {
                                setIsExporting(false);
                                setShowExportDropdown(false);
                              }
                            }}
                          >
                            {isExporting ? 'Exporting...' : 'Export to Excel'}
                          </button>
                          <button
                            className="btn btn-light w-100 text-left py-2 px-3"
                            disabled={isExporting}
                            onClick={async () => {
                              setIsExporting(true);
                              try {
                                await exportToPDF(
                                  filteredData,
                                  tableFields,
                                  headerMapping,
                                  getFieldValue,
                                  null,
                                  {
                                    ...totals,
                                    lossDueToLeft,
                                    lossDueToLateAdmission,
                                    defaulterFees,
                                    netFeesDue,
                                    lateAndExcessFees,
                                    registrationFees,
                                    tcFees,
                                    boardRegistrationFees,
                                    boardExaminationFees,
                                    arrearFeesReceived,
                                    finalFees
                                  },
                                  formatAcademicYear,
                                  selectedAcademicYear,
                                  school,
                                  logoSrc
                                );
                              } catch (err) {
                                toast.error("Export to PDF failed");
                              } finally {
                                setIsExporting(false);
                                setShowExportDropdown(false);
                              }
                            }}
                          >
                            {isExporting ? 'Exporting...' : 'Export to PDF'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {showFilterPanel && (
                  <div className="row mt-1 border border-light rounded px-md-3 py-1">
                    <div className="col-12 p-2">
                      <ul className="nav nav-tabs mb-0 justify-content-center">
                        {tabs.map((tab) => (
                          <li className="nav-item" key={tab}>
                            <Link
                              className={`nav-link fw-bold ${activeTab === tab ? 'active' : ''}`}
                              onClick={() => setActiveTab(tab)}
                            >
                              {tab}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="tab-content mt-2">
                        {activeTab === 'Class & Section' && (
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-4">
                              <CreatableSelect
                                isMulti
                                name="class"
                                options={classOptions}
                                value={selectedClasses}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Classes"
                                className="mt-2"
                              />
                            </div>
                            <div className="col-md-4">
                              <CreatableSelect
                                isMulti
                                name="section"
                                options={sectionOptions}
                                value={selectedSections}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Sections"
                                className="mt-2"
                                isDisabled={selectedClasses.length === 0}
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Academic Year' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                name="academicYear"
                                options={academicYearOptions}
                                value={academicYearOptions.find((option) => option.value === selectedAcademicYear)}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Academic Year"
                                className="mt-2"
                              />
                            </div>
                          </div>
                        )}
                        {activeTab === 'Installment' && (
                          <div className="row d-lg-flex justify-content-center">
                            <div className="col-md-8">
                              <CreatableSelect
                                name="installment"
                                options={installmentOptions}
                                value={selectedInstallment}
                                onChange={(selected, action) => handleSelectChange(selected, action)}
                                placeholder="Select Installment"
                                className="mt-2"
                                isClearable
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-end mt-3">
                        <button className="btn btn-secondary me-2" onClick={resetFilters}>
                          Reset
                        </button>
                        <button className="btn btn-primary" onClick={applyFilters}>
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="container">
                <div className="card-header d-flex justify-content-between align-items-center gap-1">
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Recon Fees Headwise Report</h2>
                </div>
              </div>
              {isLoading || loadingYears ? (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p>Loading data...</p>
                </div>
              ) : tableFields.length > 0 ? (
                <>
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-dark">
                      <thead>
                        <tr className="payroll-table-header">
                          {tableFields.map((field) => (
                            <th key={field.id} className="text-center align-middle border border-dark text-nowrap p-2">
                              {headerMapping[field.id]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.length > 0 ? (
                          filteredData.map((record, index) => (
                            <tr key={index} className="payroll-table-row">
                              {tableFields.map((field) => (
                                <td
                                  key={field.id}
                                  className="text-center align-middle border border-dark text-nowrap p-2"
                                >
                                  {getFieldValue(record, field)}
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={tableFields.length} className="text-center border border-dark">
                              No data matches the selected filters for {formatAcademicYear(selectedAcademicYear)}.
                            </td>
                          </tr>
                        )}
                        <tr className="payroll-table-footer">
                          <td colSpan={2} className="text-right border border-dark p-2"><strong>Total Fees Due</strong></td>
                          <td className="text-center border border-dark p-2"><strong>{totals.existingStudents}</strong></td>
                          <td className="text-center border border-dark p-2"><strong>{totals.newAdmission}</strong></td>
                          <td className="text-center border border-dark p-2"><strong>{totals.totalStudents}</strong></td>
                          <td colSpan={2} className="text-center border border-dark p-2"></td>
                          <td className="text-center border border-dark p-2"><strong>{totals.yearlyDues}</strong></td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Less: Loss of fees due to left students
                          </td>
                          <td className="text-center border border-dark p-2">{lossDueToLeft}</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Less: Loss of fees due to late Admission
                          </td>
                          <td className="text-center border border-dark p-2">{lossDueToLateAdmission}</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Less: Defaulter Fees
                          </td>
                          <td className="text-center border border-dark p-2">{defaulterFees}</td>
                        </tr>
                        <tr className="payroll-table-footer">
                          <td colSpan={7} className="text-right border border-dark p-2"><strong>Net Fees Due</strong></td>
                          <td className="text-center border border-dark p-2"><strong>{netFeesDue}</strong></td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Add: Late Fee & Excess Fees
                          </td>
                          <td className="text-center border border-dark p-2">{lateAndExcessFees}</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Add: Registration Fees
                          </td>
                          <td className="text-center border border-dark p-2">{registrationFees}</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Add: TC Fees
                          </td>
                          <td className="text-center border border-dark p-2">{tcFees}</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Add: Board Registration Fees
                          </td>
                          <td className="text-center border border-dark p-2">{boardRegistrationFees}</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Add: Board Examination Fees
                          </td>
                          <td className="text-center border border-dark p-2">{boardExaminationFees}</td>
                        </tr>
                        <tr>
                          <td colSpan={7} className="text-right border border-dark p-2">
                            Add: Arrear Fees Received
                          </td>
                          <td className="text-center border border-dark p-2">{arrearFeesReceived}</td>
                        </tr>
                        <tr className="payroll-table-footer">
                          <td colSpan={7} className="text-right border border-dark p-2"><strong>Final Fees</strong></td>
                          <td className="text-center border border-dark p-2"><strong>{finalFees}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center mt-3">
                  <p>No table fields available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReconFeesHeadwise;