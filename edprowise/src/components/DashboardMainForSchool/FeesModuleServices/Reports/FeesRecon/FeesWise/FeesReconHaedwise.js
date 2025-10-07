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
  const [closingAdvance, setClosingAdvance] = useState(0); // New state for closing advance
  const [openingAdvance, setOpeningAdvance] = useState(0); // New state for opening advance
  const [feesConcession, setFeesConcession] = useState(0); // New state for fees concession
  const [schoolFeesReceived, setSchoolFeesReceived] = useState(0); // New state for school fees received
  const [oneTimeFeesReceived, setOneTimeFeesReceived] = useState(0); // New state for one-time fees received
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

  // Updated fetchData with processed lateFeesData as per provided logic
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

        // Updated late fees fetch with processing logic for paid totals (handling cancelled/cheque return as negative)
        try {
          lateFeesResponse = await getAPI(`/get-all-students-fees-with-late-fees?${queryParams}`);
          if (!lateFeesResponse.hasError && lateFeesResponse.data?.data) {
            const unifiedData = lateFeesResponse.data.data; // Assuming single year for simplicity; extend if multi-year
            const processedData = unifiedData.flatMap((record) => {
              return (record.reportStatus || ['Paid']).map((status) => ({
                ...record,
                status,
                displayDate: status === 'Paid' ? record.paymentDate : record.cancelledDate,
                lateFees: (status === 'Cancelled' || status === 'Cheque Return') ? -(record.lateFees || 0) : (record.lateFees || 0),
                paidFine: (status === 'Cancelled' || status === 'Cheque Return') ? -(record.paidFine || 0) : (record.paidFine || 0),
                excessFees: (status === 'Cancelled' || status === 'Cheque Return') ? -(record.excessFees || 0) : (record.excessFees || 0),
              }));
            }).filter(
              (record) => Math.abs(record.lateFees) > 0 || Math.abs(record.paidFine) > 0 || Math.abs(record.excessFees) > 0
            );
            lateFeesResponse.data.data = processedData; // Override with processed data
          }
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

        // Placeholder fetches for new states (implement actual APIs as needed)
        // For example, closing advance, opening advance, concession, received fees
        // Assuming you have APIs like /get-closing-advance, etc. Adjust accordingly.

        if (!admissionResponse?.data?.data) {
          throw new Error('No admission data found');
        }

        setFeeData(admissionResponse.data.data);
        setLeftStudentData(leftResponse.data?.data || []);
        setLateAdmissionData(lateResponse.data?.data || []);
        setDefaulterData(defaulterResponse.data?.data || []);
        setAdmissionFeesData(admissionFeesResponse.data?.data || []);
        setRegistrationFeesData(
          registrationFeesResponse.data?.combinedDetails ||[]
        );
        setTcFeesData(tcFeesResponse.data?.combinedDetails || []);
        setBoardRegistrationFeesData(boardRegistrationFeesResponse.data?.data
          ?.[selectedAcademicYear] 
          || []);
        setBoardExamFeesData(boardExamFeesResponse.data?.data
          ?.[selectedAcademicYear]
           || []);
        setLateFeesData(lateFeesResponse.data?.data || []);
        setArrearFeesData(arrearFeesResponse.data?.data || []);

        // Set placeholder values for new states (replace with actual calculations)
        setClosingAdvance(0); // Fetch from Annexure 2 API
        setOpeningAdvance(0); // Fetch from Annexure 9 API
        setFeesConcession(0); // Fetch from Annexure 4 API
        setSchoolFeesReceived(0); // Fetch from Annexure 5A API
        setOneTimeFeesReceived(0); // Fetch from Annexure 5B API (sum of one-time fees)

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

  // Existing useEffects for calculations remain the same...
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

    const totalRegistrationFees = filteredRegistrationFees.reduce((sum, item) => {
      return item.regFeesStatus.includes("Paid")
        ? sum + (parseFloat(item.regFeesDue) || 0)
        : sum;
    }, 0).toFixed(2);

    setRegistrationFees(totalRegistrationFees);
  }, [registrationFeesData, selectedClasses]);

  useEffect(() => {
    const filteredTcFees = tcFeesData.filter((record) => {
      const matchesClass =
        selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection =
        selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      return matchesClass && matchesSection ;
    });

    const totalTcFees = filteredTcFees.reduce((sum, item) => {
      return item.tcFeesStatus.includes("Paid")
        ? sum + (parseFloat(item.tcFeesDue) || 0)
        : sum;
    }, 0).toFixed(2);

    setTcFees(totalTcFees);
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

    const totalBoardRegistrationFees = filteredBoardRegistrationFees.reduce((sum, item) => {
      return sum + (parseFloat(item.boardRegFeesDue) || 0);
    }, 0).toFixed(2);

    setBoardRegistrationFees(totalBoardRegistrationFees);
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

    const totalBoardExamFees = filteredBoardExamFees.reduce((sum, item) => {
      return sum + (parseFloat(item.boardExamFeesDue) || 0);
    }, 0).toFixed(2);

    setBoardExaminationFees(totalBoardExamFees);
  }, [boardExamFeesData, selectedClasses, selectedSections]);

  // Updated useEffect for late and excess fees to handle processed data (paid totals with negatives for cancelled)
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
      const paymentDate = record.displayDate ? new Date(record.displayDate.split('/').reverse().join('-')) : null; // Adjusted for DD/MM/YYYY format in sample
      const matchesDate =
        (!startDate || !paymentDate || paymentDate >= new Date(startDate)) &&
        (!endDate || !paymentDate || paymentDate <= new Date(endDate));
      return matchesClass && matchesSection && matchesInstallment && matchesDate;
    });

    const totalLateAndExcessFees = filteredLateFees.reduce((sum, item) => {
      return sum + (parseFloat(item.paidFine) || 0) + (parseFloat(item.excessFees) || 0);
    }, 0).toFixed(2);

    setLateAndExcessFees(totalLateAndExcessFees);
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
      return sum + feeTypePaidSum;
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

  // Calculations for reconciliation table
  const schoolFeesDue = Number(totals.schoolFees); // Tuition + Annual + Dev from feeData
  const oneTimeFeesDue = Number(totals.admFees) + Number(registrationFees) + Number(boardRegistrationFees) + Number(boardExaminationFees) + Number(tcFees); // One-time fees
  const totalA = Number(schoolFeesDue) + Number(oneTimeFeesDue) + Number(closingAdvance) + Number(arrearFeesReceived); // Total (A)

  const totalB = Number(schoolFeesReceived) + Number(oneTimeFeesReceived) + Number(lateAndExcessFees) + Number(feesConcession) + Number(openingAdvance); // Total (B) - adjust based on annexures

  const differenceAB = (totalA - totalB).toFixed(2);

  // Dynamic columns for fees (based on fee types from data, e.g., Tuition, Annual, Dev, Late&Excess, etc.)
  const feeColumns = [
    { key: 'tuitionFee', label: 'Tuition Fee' },
    { key: 'annualFee', label: 'Annual Fee' },
    { key: 'devFee', label: 'Dev Fee' },
    { key: 'lateExcessFee', label: 'Late & Excess Fee' },
    { key: 'admFee', label: 'Adm Fee' },
    { key: 'regFees', label: 'Reg. Fees' },
    { key: 'boardRegFees', label: 'Board Reg Fees' },
    { key: 'boardExamFees', label: 'Board Exam Fees' },
    { key: 'tcFees', label: 'TC Fees' },
  ];

  // Sample row data structure (dynamic, populate from states)
  const reconciliationRows = [
    {
      particulars: 'Fees Due-School Fees',
      annexure: 'Annexure 1',
      tuitionFee: schoolFeesDue * 0.4, // Dynamic split example
      annualFee: schoolFeesDue * 0.3,
      devFee: schoolFeesDue * 0.3,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: schoolFeesDue,
      note: 'No. of Students * Installment Fees'
    },
    {
      particulars: 'Fees Due -One Time',
      annexure: '',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: Number(totals.admFees),
      regFees: Number(registrationFees),
      boardRegFees: Number(boardRegistrationFees),
      boardExamFees: Number(boardExaminationFees),
      tcFees: Number(tcFees),
      total: oneTimeFeesDue,
      note: 'No. of Registration * Registration Fees, etc.'
    },
    {
      particulars: 'Closing Advance',
      annexure: 'Annexure 2',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: closingAdvance,
      note: ''
    },
    {
      particulars: 'Arrear Fees Received',
      annexure: 'Annexure 3',
      tuitionFee: Number(arrearFeesReceived) * 0.4, // Split example
      annualFee: Number(arrearFeesReceived) * 0.3,
      devFee: Number(arrearFeesReceived) * 0.3,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: Number(arrearFeesReceived),
      note: ''
    },
    {
      particulars: 'Total (A)',
      annexure: '',
      tuitionFee: totalA * 0.4, // Aggregated
      annualFee: totalA * 0.3,
      devFee: totalA * 0.3,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: totalA,
      note: ''
    },
    {
      particulars: 'Fees Concession',
      annexure: 'Annexure 4',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: feesConcession,
      note: ''
    },
    {
      particulars: 'School Fees Received',
      annexure: 'Annexure 5A',
      tuitionFee: schoolFeesReceived * 0.4,
      annualFee: schoolFeesReceived * 0.3,
      devFee: schoolFeesReceived * 0.3,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: schoolFeesReceived,
      note: ''
    },
    {
      particulars: 'One Time Fees Received',
      annexure: 'Annexure 5B',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: oneTimeFeesReceived * 0.2,
      regFees: oneTimeFeesReceived * 0.2,
      boardRegFees: oneTimeFeesReceived * 0.2,
      boardExamFees: oneTimeFeesReceived * 0.2,
      tcFees: oneTimeFeesReceived * 0.2,
      total: oneTimeFeesReceived,
      note: ''
    },
    {
      particulars: 'Loss of fees due to left students',
      annexure: 'Annexure 6',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: lossDueToLeft,
      note: ''
    },
    {
      particulars: 'Loss of fees due to late Admission',
      annexure: 'Annexure 7',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: lossDueToLateAdmission,
      note: ''
    },
    {
      particulars: 'Defaulter Fees',
      annexure: 'Annexure 8',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: defaulterFees,
      note: ''
    },
    {
      particulars: 'Opening Advance',
      annexure: 'Annexure 9',
      tuitionFee: 0,
      annualFee: 0,
      devFee: 0,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: openingAdvance,
      note: ''
    },
    {
      particulars: 'Total (B)',
      annexure: '',
      tuitionFee: totalB * 0.4,
      annualFee: totalB * 0.3,
      devFee: totalB * 0.3,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: totalB,
      note: ''
    },
    {
      particulars: 'Difference (A-B)',
      annexure: '',
      tuitionFee: differenceAB * 0.4,
      annualFee: differenceAB * 0.3,
      devFee: differenceAB * 0.3,
      lateExcessFee: 0,
      admFee: 0,
      regFees: 0,
      boardRegFees: 0,
      boardExamFees: 0,
      tcFees: 0,
      total: differenceAB,
      note: ''
    },
  ];

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
                                  reconciliationRows, // Use reconciliation data for export
                                  feeColumns.map(col => ({ id: col.key, label: col.label })),
                                  { particulars: 'Particulars', annexure: 'Annexure', total: 'Total' },
                                  (row, field) => row[field.id] || row[field.id]?.toFixed(2) || 0,
                                  null,
                                  { totalA, totalB, differenceAB },
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
                                  reconciliationRows,
                                  feeColumns.map(col => ({ id: col.key, label: col.label })),
                                  { particulars: 'Particulars', annexure: 'Annexure', total: 'Total' },
                                  (row, field) => row[field.id] || row[field.id]?.toFixed(2) || 0,
                                  null,
                                  { totalA, totalB, differenceAB },
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
              ) : (
                <>
                  {/* Dynamic Reconciliation Table */}
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-dark">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center align-middle border border-dark text-nowrap p-2">Particulars</th>
                          <th className="text-center align-middle border border-dark text-nowrap p-2">Annexure</th>
                          {feeColumns.map((col) => (
                            <th key={col.key} className="text-center align-middle border border-dark text-nowrap p-2">
                              {col.label}
                            </th>
                          ))}
                          <th className="text-center align-middle border border-dark text-nowrap p-2">Total</th>
                          <th className="text-center align-middle border border-dark text-nowrap p-2">Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reconciliationRows.map((row, index) => (
                          <tr key={index} className="payroll-table-row">
                            <td className="text-left align-middle border border-dark p-2">{row.particulars}</td>
                            <td className="text-center align-middle border border-dark p-2">{row.annexure}</td>
                            {feeColumns.map((col) => (
                              <td key={col.key} className="text-center align-middle border border-dark p-2">
                                {row[col.key]?.toFixed(2) || '0.00'}
                              </td>
                            ))}
                            <td className="text-center align-middle border border-dark p-2"><strong>{row.total.toFixed(2)}</strong></td>
                            <td className="text-left align-middle border border-dark p-2">{row.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReconFeesHeadwise;