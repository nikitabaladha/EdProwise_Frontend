import React, { useState, useEffect, useRef } from 'react';
import { FaFilter, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import getAPI from '../../../../../../api/getAPI';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from './ExportModal';
import { fetchSchoolData } from '../../../PdfUtlisReport';

const ReconFeesFeeswise = () => {
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
  const [admissionFeesReceived, setAdmissionFeesReceived] = useState(0);
  const [arrearFeesReceived, setArrearFeesReceived] = useState(0);
  const [closingAdvance, setClosingAdvance] = useState(0);
  const [openingAdvance, setOpeningAdvance] = useState(0);
  const [feesConcession, setFeesConcession] = useState(0);
  const [schoolFeesReceived, setSchoolFeesReceived] = useState(0);
  const [oneTimeFeesReceived, setOneTimeFeesReceived] = useState(0);
  const [schoolFeeTypes, setSchoolFeeTypes] = useState([]);
  const [oneTimeFeeTypes, setOneTimeFeeTypes] = useState([]);
  const [feeBreakdowns, setFeeBreakdowns] = useState({});
  const dropdownRef = useRef(null);
  const tabs = ['Academic Year','Class & Section',  'Installment'];

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
    const fetchAcademicYears = async () => {
      try {
        setLoadingYears(true);
        const yearResponse = await getAPI(`/get-feesmanagment-year/${schoolId}`);
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
      } catch (err) {
        toast.error('Error fetching academic years.');
        console.error(err);
      } finally {
        setLoadingYears(false);
      }
    };
    if (schoolId) {
      fetchAcademicYears();
    }
  }, [schoolId]);

  useEffect(() => {
    const fetchFeeData = async () => {
      if (!schoolId || !selectedAcademicYear) return;
      setIsLoading(true);
      try {
        const queryParams = `schoolId=${schoolId}&academicYear=${selectedAcademicYear}` +
          (selectedClasses.length ? `&classes=${selectedClasses.map(cls => cls.value).join(',')}` : '') +
          (selectedSections.length ? `&sections=${selectedSections.map(sec => sec.value).join(',')}` : '') +
          (selectedInstallment ? `&installment=${selectedInstallment.value}` : '') +
          (startDate ? `&startDate=${formatDate(startDate)}` : '') +
          (endDate ? `&endDate=${formatDate(endDate)}` : '');

        console.log('Current Filters:', { selectedClasses, selectedSections, selectedInstallment, startDate, endDate });

        const response = await getAPI(`/get-fees-recon-schoolfees?${queryParams}`);
        if (!response?.data?.data) {
          console.warn(`No data found for year ${selectedAcademicYear}`);
          setFeeData([]);
          setSchoolFeeTypes([]);
          setClassOptions([]);
          setSectionOptions([]);
          setInstallmentOptions([]);
          return;
        }

        const unifiedData = response.data.data;
        console.log('Fetched unifiedData:', unifiedData);


        setFeeData(unifiedData);


        const allFeeTypes = response.data.feeTypes || [];
        const schoolFees = allFeeTypes
          .filter(type => !['Admission Fee', 'Registration Fee', 'TC Fees', 'Transfer Certificate Fee', 'Board Exam Fee', 'Board Registration Fee'].includes(type))
          .filter((type, index, self) => type && self.indexOf(type) === index)
          .sort()
          .map(type => ({ key: type, label: type }));
        setSchoolFeeTypes(schoolFees);
        console.log('School Fee Types:', schoolFees.map(fee => fee.key));

        const oneTimeFees = [
          { key: 'Admission Fee', label: 'Admission Fee' },
          { key: 'Registration Fee', label: 'Registration Fee' },
          { key: 'TC Fee', label: 'TC Fee' },
          { key: 'Board Exam Fee', label: 'Board Exam Fee' },
          { key: 'Board Registration Fee', label: 'Board Registration Fee' },
        ];
        setOneTimeFeeTypes(oneTimeFees);


        const filterOptions = response.data.filterOptions || {};
        setClassOptions(filterOptions.classOptions || []);
        setSectionOptions(filterOptions.sectionOptions || []);
        setAllSectionOptions(filterOptions.sectionOptions || []);
        setInstallmentOptions(filterOptions.installmentOptions || []);


        const [reconResponse, leftResponse, lateResponse, defaulterResponse, admissionFeesResponse,
          registrationFeesResponse, tcFeesResponse, boardRegistrationFeesResponse,
          boardExamFeesResponse, lateFeesResponse, arrearFeesResponse] = await Promise.all([
            getAPI(`/get-fees-recon-feeswise/${schoolId}/${selectedAcademicYear}${selectedInstallment ? `?installment=${selectedInstallment.value}` : ''}`),
            getAPI(`/Loss-of-fee-due-to-left-student?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/Loss-of-fee-due-to-late-Admission?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/Defaulter-Fees?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/get-all-data-admission?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/get-all-data-Registration?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/get-all-data-tc?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/get-all-data-board-registration?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/get-all-data-board-exam?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/get-all-students-fees-with-late-fees?${queryParams}`).catch(err => ({ hasError: true, data: null })),
            getAPI(`/get-arrear-fees?${queryParams}`).catch(err => ({ hasError: true, data: null })),
          ]);

        const leftData = leftResponse?.data?.data || [];
        const lateData = lateResponse?.data?.data || [];
         const DefaulterData = defaulterResponse.data?.data|| [];


        const lateAdmissionSet = new Set(lateData.map((item) => item.admissionNumber));
        const filteredLeftData = leftData.filter(
          (item) => !lateAdmissionSet.has(item.admissionNumber)
        );

         const filteredDefaulterData = DefaulterData.filter(
          (item) => !lateAdmissionSet.has(item.admissionNumber)
        );


        setLeftStudentData(filteredLeftData);
        setLateAdmissionData(lateResponse.data?.data || []);
        setDefaulterData(filteredDefaulterData);
        setAdmissionFeesData(admissionFeesResponse.data?.combinedDetails || []);
        setRegistrationFeesData(registrationFeesResponse.data?.combinedDetails || []);
        setTcFeesData(tcFeesResponse.data?.combinedDetails || []);
        setBoardRegistrationFeesData(boardRegistrationFeesResponse.data?.data?.[selectedAcademicYear] || []);
        setBoardExamFeesData(boardExamFeesResponse.data?.data?.[selectedAcademicYear] || []);


        if (!lateFeesResponse.hasError && lateFeesResponse.data?.data) {
          const processedLateFees = lateFeesResponse.data.data.flatMap((record) => {
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
          setLateFeesData(processedLateFees);
        } else {
          setLateFeesData([]);
        }

        setArrearFeesData(arrearFeesResponse.data?.data || []);

        if (!reconResponse.hasError && reconResponse.data) {
          const { Schoolfees = {}, OneTimefees = {} } = reconResponse.data;
          setFeeBreakdowns(prev => ({
            ...prev,
            'Fees Due-School Fees': { ...Schoolfees, total: reconResponse.data.totalofSchoolfees || 0 },
            'Fees Due -One Time': { ...OneTimefees, total: reconResponse.data.totalofOneTimefees || 0 },
          }));
        }

        setClosingAdvance(0);
        setOpeningAdvance(0);
        setFeesConcession(0);
        setSchoolFeesReceived(0);
        setOneTimeFeesReceived(0);
      } catch (error) {
        console.error('Error in fetchData:', error);
        toast.error('Error fetching data: ' + error.message);
        setFeeData([]);
        setSchoolFeeTypes([]);
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
        setClassOptions([]);
        setSectionOptions([]);
        setInstallmentOptions([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeeData();
  }, [schoolId, selectedAcademicYear, selectedClasses, selectedSections, selectedInstallment, startDate, endDate]);

  useEffect(() => {
    const calculateSchoolFeesReceived = () => {
      const schoolBreakdown = {};
      let totalSchoolReceived = 0;

      schoolFeeTypes.forEach((type) => {
        schoolBreakdown[type.key] = 0;
      });



      feeData.forEach((record, index) => {
        console.log(`Processing record ${index + 1}:`, { admissionNumber: record.admissionNumber, installments: record.installments });
        record.installments.forEach((installment, instIndex) => {
          const feeTypes = installment.feeTypes || {};
          console.log(`Processing installment ${instIndex + 1}:`, { type: installment.type, feeTypes });
          Object.entries(feeTypes).forEach(([feeType, feeData]) => {
            if (schoolFeeTypes.some((type) => type.key === feeType)) {
              let amount = 0;
              if (installment.type === "Paid") {
                const paid = parseFloat(feeData.paid || feeData.paidAmount || 0);
                amount = paid;
              } else if (installment.type === "Cancelled" || installment.type === "Cheque Return") {
                const paid = -parseFloat(feeData.cancelled || feeData.chequeReturn || 0);
                const concession = parseFloat(feeData.concession);
                amount = paid - concession;
              } else if (installment.type === "Refund") {
                amount = -parseFloat(feeData.refund);
              }
              schoolBreakdown[feeType] = (schoolBreakdown[feeType] || 0) + amount;
              totalSchoolReceived += amount;
              console.log(`Fee Type: ${feeType}, Amount: ${amount}, Running Total: ${schoolBreakdown[feeType]}`);
            } else {
              console.log(`Fee Type ${feeType} not in schoolFeeTypes, skipping`);
            }
          });
        });
      });

      console.log('Final School Fees Received:', { schoolBreakdown, totalSchoolReceived });

      setSchoolFeesReceived(Number(totalSchoolReceived).toFixed(2));
      setFeeBreakdowns((prev) => ({
        ...prev,
        "School Fees Received": {
          ...schoolBreakdown,
          total: Number(totalSchoolReceived).toFixed(2),
        },
      }));
    };

    if (feeData.length > 0 && schoolFeeTypes.length > 0) {
      calculateSchoolFeesReceived();
    } else {
      console.warn('Skipping School Fees Received calculation', {
        feeDataEmpty: feeData.length === 0,
        schoolFeeTypesEmpty: schoolFeeTypes.length === 0,
      });
      setSchoolFeesReceived('0.00');
      setFeeBreakdowns((prev) => ({
        ...prev,
        "School Fees Received": { total: '0.00' },
      }));
    }
  }, [feeData, schoolFeeTypes]);

  useEffect(() => {
    const calculateFeesConcession = () => {
      const concessionBreakdown = {};
      let totalConcession = 0;


      schoolFeeTypes.forEach((type) => {
        concessionBreakdown[type.key] = 0;
      });
      oneTimeFeeTypes.forEach((type) => {
        concessionBreakdown[type.key] = 0;
      });


      feeData.forEach((record) => {
        record.installments.forEach((installment) => {
          const feeTypes = installment.feeTypes || {};
          Object.entries(feeTypes).forEach(([feeType, feeData]) => {
            if (schoolFeeTypes.some((type) => type.key === feeType)) {
              const concession = parseFloat(feeData.concession || feeData.concessionAmount || 0);
              concessionBreakdown[feeType] = (concessionBreakdown[feeType] || 0) + concession;
              totalConcession += concession;
            }
          });
        });
      });


      const filteredAdmissionFees = admissionFeesData.filter((record) => {
        const matchesClass =
          selectedClasses.length === 0 ||
          selectedClasses.some((cls) => record.className === cls.value);
        const matchesSection =
          selectedSections.length === 0 ||
          selectedSections.some((sec) => record.sectionName === sec.value);
        return matchesClass && matchesSection;
      });

      filteredAdmissionFees.forEach((item) => {
        if (item.recordType === "Admission Fee" && item.admFeesStatus && item.admFeesStatus.includes("Paid")) {
          const concession = parseFloat(item.admFeesConcession || 0);
          concessionBreakdown['Admission Fee'] = (concessionBreakdown['Admission Fee'] || 0) + concession;
          totalConcession += concession;
        }
      });


      const filteredRegistrationFees = registrationFeesData.filter((record) => {
        const matchesClass =
          selectedClasses.length === 0 ||
          selectedClasses.some((cls) => record.className === cls.value);
        return matchesClass;
      });

      filteredRegistrationFees.forEach((item) => {
        if (item.recordType === "Registration" && item.regFeesStatus && item.regFeesStatus.includes("Paid")) {
          const concession = parseFloat(item.regFeesConcession || 0);
          concessionBreakdown['Registration Fee'] = (concessionBreakdown['Registration Fee'] || 0) + concession;
          totalConcession += concession;
        }
      });


      const filteredTcFees = tcFeesData.filter((record) => {
        const matchesClass =
          selectedClasses.length === 0 ||
          selectedClasses.some((cls) => record.className === cls.value);
        const matchesSection =
          selectedSections.length === 0 ||
          selectedSections.some((sec) => record.sectionName === sec.value);
        return matchesClass && matchesSection;
      });

      filteredTcFees.forEach((item) => {
        if (item.recordType === "Transfer Certificate" && item.tcFeesStatus && item.tcFeesStatus.includes("Paid")) {
          const concession = parseFloat(item.tcFeesConcession || 0);
          concessionBreakdown['TC Fee'] = (concessionBreakdown['TC Fee'] || 0) + concession;
          totalConcession += concession;
        }
      });


      const filteredBoardRegistrationFees = boardRegistrationFeesData.filter((record) => {
        const matchesClass =
          selectedClasses.length === 0 ||
          selectedClasses.some((cls) => record.className === cls.value);
        const matchesSection =
          selectedSections.length === 0 ||
          selectedSections.some((sec) => record.sectionName === sec.value);
        return matchesClass && matchesSection;
      });

      filteredBoardRegistrationFees.forEach((item) => {
        if (item.recordType === "Board Registration Fee" && item.boardRegFeesStatus && (Array.isArray(item.boardRegFeesStatus) ? item.boardRegFeesStatus.includes("Paid") : item.boardRegFeesStatus.includes("Paid"))) {
          const concession = parseFloat(item.boardRegFeesConcession || 0);
          concessionBreakdown['Board Registration Fee'] = (concessionBreakdown['Board Registration Fee'] || 0) + concession;
          totalConcession += concession;
        }
      });

      const filteredBoardExamFees = boardExamFeesData.filter((record) => {
        const matchesClass =
          selectedClasses.length === 0 ||
          selectedClasses.some((cls) => record.className === cls.value);
        const matchesSection =
          selectedSections.length === 0 ||
          selectedSections.some((sec) => record.sectionName === sec.value);
        return matchesClass && matchesSection;
      });

      filteredBoardExamFees.forEach((item) => {
        if (item.recordType === "Board Exam Fee" && item.boardExamFeesStatus && (Array.isArray(item.boardExamFeesStatus) ? item.boardExamFeesStatus.includes("Paid") : item.boardExamFeesStatus.includes("Paid"))) {
          const concession = parseFloat(item.boardExamFeesConcession || 0);
          concessionBreakdown['Board Exam Fee'] = (concessionBreakdown['Board Exam Fee'] || 0) + concession;
          totalConcession += concession;
        }
      });



      setFeesConcession(Number(totalConcession).toFixed(2));
      setFeeBreakdowns((prev) => ({
        ...prev,
        "Fees Concession": {
          ...concessionBreakdown,
          total: Number(totalConcession).toFixed(2),
        },
      }));
    };

    if (feeData.length > 0 && schoolFeeTypes.length > 0) {
      calculateFeesConcession();
    } else {
      console.warn('Skipping Fees Concession calculation', {
        feeDataEmpty: feeData.length === 0,
        schoolFeeTypesEmpty: schoolFeeTypes.length === 0,
      });
      setFeesConcession('0.00');
      setFeeBreakdowns((prev) => ({
        ...prev,
        "Fees Concession": { total: '0.00' },
      }));
    }
  }, [feeData, schoolFeeTypes, admissionFeesData, registrationFeesData, tcFeesData, boardRegistrationFeesData, boardExamFeesData, selectedClasses, selectedSections]);

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

    const leftBreakdown = {};
    let totalLeft = 0;

    filteredLeftStudents.forEach((item) => {

      const relevantInstallments = selectedInstallment
        ? item.installments.filter((inst) => inst.installmentName === selectedInstallment.value)
        : item.installments;

      relevantInstallments.forEach((installment) => {



        if (installment.feeTypeDetails) {
          installment.feeTypeDetails.forEach((fee) => {
            const feeType = fee.feeType;
            const balance = parseFloat(fee.balance) || 0;
            if (balance > 0) {
              leftBreakdown[feeType] = (leftBreakdown[feeType] || 0) + balance;
              totalLeft += balance;
            }
          });
        } else {

          const balance = parseFloat(installment.balance) || 0;
          if (balance > 0) {


            leftBreakdown['Other'] = (leftBreakdown['Other'] || 0) + balance;
            totalLeft += balance;
          }
        }
      });
    });

    setLossDueToLeft(Number(totalLeft).toFixed(2));
    setFeeBreakdowns((prev) => ({
      ...prev,
      'Loss of fees due to left students': {
        ...leftBreakdown,
        total: Number(totalLeft).toFixed(2),
      },
    }));
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

    const lateAdmissionBreakdown = {};
    let totalLateAdmission = 0;

    filteredLateAdmission.forEach((item) => {
      const relevantInstallments = selectedInstallment
        ? item.installments.filter((inst) => inst.installmentName === selectedInstallment.value)
        : item.installments;

      relevantInstallments.forEach((installment) => {
        installment.feeTypeDetails?.forEach((fee) => {
          const feeType = fee.feeType;
          const balance = parseFloat(fee.balance) || 0;

          if (balance > 0) {
            lateAdmissionBreakdown[feeType] = (lateAdmissionBreakdown[feeType] || 0) + balance;
            totalLateAdmission += balance;
          }
        });
      });
    });

    setLossDueToLateAdmission(Number(totalLateAdmission).toFixed(2));
    setFeeBreakdowns((prev) => ({
      ...prev,
      'Loss of fees due to late Admission': {
        ...lateAdmissionBreakdown,
        total: Number(totalLateAdmission).toFixed(2),
      },
    }));
  }, [lateAdmissionData, selectedClasses, selectedSections, selectedInstallment]);


  // useEffect(() => {
  //   const filteredDefaulters = defaulterData.filter((record) => {
  //     const matchesClass =
  //       selectedClasses.length === 0 ||
  //       selectedClasses.some((cls) => record.className === cls.value);
  //     const matchesSection =
  //       selectedSections.length === 0 ||
  //       selectedSections.some((sec) => record.sectionName === sec.value);
  //     const matchesInstallment =
  //       !selectedInstallment ||
  //       record.installments.some((inst) => inst.installmentName === selectedInstallment.value);
  //     return matchesClass && matchesSection && matchesInstallment;
  //   });

  //   const totalDefaulter = filteredDefaulters.reduce((sum, item) => {
  //     if (selectedInstallment) {
  //       const relevantInstallments = item.installments.filter(
  //         (inst) => inst.installmentName === selectedInstallment.value
  //       );
  //       return sum + relevantInstallments.reduce((acc, inst) => acc + (inst.balance || 0), 0);
  //     }
  //     return sum + (item.totals?.totalBalance || 0);
  //   }, 0);

  //   setDefaulterFees(Number(totalDefaulter).toFixed(2));
  //   setFeeBreakdowns(prev => ({ ...prev, 'Defaulter Fees': { total: Number(totalDefaulter).toFixed(2) } }));
  // }, [defaulterData, selectedClasses, selectedSections, selectedInstallment]);

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

  const defaulterBreakdown = {};
  let totalDefaulter = 0;

  filteredDefaulters.forEach((item) => {
    const relevantInstallments = selectedInstallment
      ? item.installments.filter((inst) => inst.installmentName === selectedInstallment.value)
      : item.installments;

    relevantInstallments.forEach((installment) => {
      installment.feeTypeBreakdown?.forEach((fee) => {
        const feeType = fee.feeTypeName; 
        const balance = parseFloat(fee.balance) || 0;

        if (balance > 0) {
          defaulterBreakdown[feeType] = (defaulterBreakdown[feeType] || 0) + balance;
          totalDefaulter += balance;
        }
      });
    });
  });

  setDefaulterFees(Number(totalDefaulter).toFixed(2));
  setFeeBreakdowns((prev) => ({
    ...prev,
    'Defaulter Fees': {
      ...defaulterBreakdown,
      total: Number(totalDefaulter).toFixed(2),
    },
  }));
}, [defaulterData, selectedClasses, selectedSections, selectedInstallment]);

  useEffect(() => {
    const filteredAdmissionFees = admissionFeesData.filter((record) => {
      const matchesClass = selectedClasses.length === 0 ||
        selectedClasses.some((cls) => record.className === cls.value);
      const matchesSection = selectedSections.length === 0 ||
        selectedSections.some((sec) => record.sectionName === sec.value);
      return matchesClass && matchesSection;
    });

    let totalAdmissionReceived = 0;

    filteredAdmissionFees.forEach(item => {

      if (item.recordType === "Admission Fee" &&
        item.admFeesStatus &&
        item.admFeesStatus.includes("Paid")) {

        const paid = parseFloat(item.admFeesPaid || 0);
        const concession = parseFloat(item.admFeesConcession || 0);
        totalAdmissionReceived += paid;
      }


      else if (item.recordType === "Refund") {
        const refund = Math.abs(
          parseFloat(item.admFeesRefundAmount || 0) ||
          parseFloat(item.admFeesCancelledAmount || 0)
        );
        const concessionAmount = parseFloat(item.admFeesConcession)
        totalAdmissionReceived -= refund - concessionAmount;
      }
    });

    const final = Number(totalAdmissionReceived).toFixed(2);
    setAdmissionFeesReceived(final);

    setFeeBreakdowns(prev => ({
      ...prev,
      'Admission Fee': {
        'Admission Fee': final,
        total: final
      }
    }));
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
        totalReg += paid ;
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
    setFeeBreakdowns(prev => ({
      ...prev,
      'Registration Fee': { 'Registration Fee': Number(totalReg).toFixed(2), total: Number(totalReg).toFixed(2) }
    }));
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
        totalTc += paid ;
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
    setFeeBreakdowns(prev => ({
      ...prev,
      'TC Fees': { 'TC Fee': Number(totalTc).toFixed(2), total: Number(totalTc).toFixed(2) }
    }));
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
    setFeeBreakdowns(prev => ({
      ...prev,
      'Board Registration Fee': { 'Board Registration Fee': Number(totalBoardReg).toFixed(2), total: Number(totalBoardReg).toFixed(2) }
    }));
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
    setFeeBreakdowns(prev => ({
      ...prev,
      'Board Exam Fee': { 'Board Exam Fee': Number(totalBoardExam).toFixed(2), total: Number(totalBoardExam).toFixed(2) }
    }));
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


    setFeeBreakdowns(prev => ({
      ...prev,
      'Late & Excess Fee': {
        lateExcessFee: Number(totalLateAndExcess).toFixed(2),
        total: Number(totalLateAndExcess).toFixed(2)
      },

      'Fees Due -One Time': {
        ...prev['Fees Due -One Time'],
        lateExcessFee: (parseFloat(prev['Fees Due -One Time']?.lateExcessFee || 0) + Number(totalLateAndExcess)).toFixed(2),
        total: (parseFloat(prev['Fees Due -One Time']?.total || 0) + Number(totalLateAndExcess)).toFixed(2)
      }
    }));
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

    const arrearBreakdown = {};
    let totalArrear = 0;

    filteredArrearFees.forEach((record) => {

      const refundMap = {};

      (record.refundData || []).forEach((refund) => {
        if (refund.status === "Cancelled" || refund.status === "Cheque Return" || refund.status === "Refund") {
          refund.feeTypeRefunds.forEach((item) => {
            const feeType = item.feeType;
            const cancelledAmt = Number(item.refundAmountandcancelledAmount || 0);
            refundMap[feeType] = (refundMap[feeType] || 0) + cancelledAmt;
          });
        }
      });


      Object.entries(record.feeTypes || {}).forEach(([feeType, feeData]) => {
        const paid = parseFloat(feeData.totalPaid) || 0;
        const refunded = refundMap[feeType] || 0;
        const netPaid = paid + refunded;

        arrearBreakdown[feeType] = (arrearBreakdown[feeType] || 0) + netPaid;
        totalArrear += netPaid;
      });
    });

    setArrearFeesReceived(Number(totalArrear).toFixed(2));
    setFeeBreakdowns((prev) => ({
      ...prev,
      "Arrear Fees Received": {
        ...arrearBreakdown,
        total: Number(totalArrear).toFixed(2),
      },
    }));
  }, [
    arrearFeesData,
    selectedClasses,
    selectedSections,
    selectedInstallment,
    startDate,
    endDate,
  ]);


  useEffect(() => {
    const totalOneTimeReceived = Number(admissionFeesReceived) + Number(registrationFees) + Number(tcFees) + Number(boardRegistrationFees) + Number(boardExaminationFees);

    setOneTimeFeesReceived(Number(totalOneTimeReceived).toFixed(2));
    setFeeBreakdowns(prev => ({
      ...prev,
      'One Time Fees Received': {
        'Admission Fee': Number(admissionFeesReceived),
        'Registration Fee': Number(registrationFees),
        'TC Fee': Number(tcFees),
        'Board Registration Fee': Number(boardRegistrationFees),
        'Board Exam Fee': Number(boardExaminationFees),
        total: totalOneTimeReceived
      }
    }));
  }, [admissionFeesReceived, registrationFees, tcFees, boardRegistrationFees, boardExaminationFees]);


//  useEffect(() => {

//     const schoolFeesDue = parseFloat(feeBreakdowns['Fees Due-School Fees']?.total || 0);
//     const oneTimeFeesDue = parseFloat(feeBreakdowns['Fees Due -One Time']?.total || 0);
//     const closingAdvanceNum = parseFloat(closingAdvance || 0);
//     const arrearFeesReceivedNum = parseFloat(arrearFeesReceived || 0);

//     const totalA = schoolFeesDue + oneTimeFeesDue + closingAdvanceNum + arrearFeesReceivedNum;


//     const schoolFeesReceivedNum = parseFloat(schoolFeesReceived || 0);
//     const oneTimeFeesReceivedNum = parseFloat(oneTimeFeesReceived || 0);
//     const lateAndExcessFeesNum = parseFloat(lateAndExcessFees || 0);
//     const feesConcessionNum = parseFloat(feesConcession || 0);
//     const openingAdvanceNum = parseFloat(openingAdvance || 0);
//     const lossDueToLeftNum = parseFloat(lossDueToLeft || 0);
//     const lossDueToLateAdmissionNum = parseFloat(lossDueToLateAdmission || 0);
//     const defaulterFeesNum = parseFloat(defaulterFees || 0);

//     const totalB = schoolFeesReceivedNum +
//         oneTimeFeesReceivedNum +
//         lateAndExcessFeesNum +
//         feesConcessionNum +
//         openingAdvanceNum +
//         lossDueToLeftNum +
//         lossDueToLateAdmissionNum +
//         defaulterFeesNum;

//     const differenceAB = totalA - totalB;


//     const totalABreakdown = {};

//     ['Fees Due-School Fees', 'Fees Due -One Time', 'Arrear Fees Received'].forEach(section => {
//         if (feeBreakdowns[section]) {
//             Object.entries(feeBreakdowns[section]).forEach(([k, v]) => {
//                 if (k !== 'total') {
//                     totalABreakdown[k] = (totalABreakdown[k] || 0) + parseFloat(v || 0);
//                 }
//             });
//         }
//     });
//     totalABreakdown.total = totalA;


//     const totalBBreakdown = {};


//     ['School Fees Received', 'Fees Concession'].forEach(section => {
//         if (feeBreakdowns[section]) {
//             Object.entries(feeBreakdowns[section]).forEach(([k, v]) => {
//                 if (k !== 'total' && k !== 'lateExcessFee') {
//                     totalBBreakdown[k] = (totalBBreakdown[k] || 0) + parseFloat(v || 0);
//                 }
//             });
//         }
//     });


//     if (feeBreakdowns['One Time Fees Received']) {
//         Object.entries(feeBreakdowns['One Time Fees Received']).forEach(([k, v]) => {
//             if (k !== 'total' && k !== 'lateExcessFee') {
//                 totalBBreakdown[k] = (totalBBreakdown[k] || 0) + parseFloat(v || 0);
//             }
//         });
//     }


//     ['Loss of fees due to left students', 'Loss of fees due to late Admission', 'Defaulter Fees'].forEach(section => {
//         if (feeBreakdowns[section]) {
//             Object.entries(feeBreakdowns[section]).forEach(([k, v]) => {
//                 if (k !== 'total') {
//                     totalBBreakdown[k] = (totalBBreakdown[k] || 0) + parseFloat(v || 0);
//                 }
//             });
//         }
//     });


//     totalBBreakdown.lateExcessFee = lateAndExcessFeesNum;

//     totalBBreakdown.total = totalB;


//     const differenceBreakdown = {};
//     const allKeys = new Set([
//         ...Object.keys(totalABreakdown),
//         ...Object.keys(totalBBreakdown)
//     ]);

//     allKeys.forEach(key => {
//         if (key !== 'total') {
//             const a = parseFloat(totalABreakdown[key] || 0);
//             const b = parseFloat(totalBBreakdown[key] || 0);
//             differenceBreakdown[key] = a - b;
//         }
//     });
//     differenceBreakdown.total = differenceAB;


//     setFeeBreakdowns(prev => ({
//         ...prev,
//         'Total (A)': totalABreakdown,
//         'Total (B)': totalBBreakdown,
//         'Difference (A-B)': differenceBreakdown
//     }));

// }, [
//     feeBreakdowns,
//     schoolFeesReceived,
//     oneTimeFeesReceived,
//     lateAndExcessFees,
//     feesConcession,
//     openingAdvance,
//     closingAdvance,
//     arrearFeesReceived,
//     lossDueToLeft,
//     lossDueToLateAdmission,
//     defaulterFees
// ]);

useEffect(() => {
   
    const schoolFeesDue = parseFloat(feeBreakdowns['Fees Due-School Fees']?.total || 0);
    const oneTimeFeesDue = parseFloat(feeBreakdowns['Fees Due -One Time']?.total || 0);
    const closingAdvanceNum = parseFloat(closingAdvance || 0);
    const arrearFeesReceivedNum = parseFloat(arrearFeesReceived || 0);

    const totalA = schoolFeesDue + oneTimeFeesDue + closingAdvanceNum + arrearFeesReceivedNum;

    const schoolFeesReceivedNum = parseFloat(feeBreakdowns['School Fees Received']?.total || 0);
    const oneTimeFeesReceivedNum = parseFloat(feeBreakdowns['One Time Fees Received']?.total || 0);
    const lateAndExcessFeesNum = parseFloat(lateAndExcessFees || 0);
    const feesConcessionNum = parseFloat(feeBreakdowns['Fees Concession']?.total || 0);
    const openingAdvanceNum = parseFloat(openingAdvance || 0);
    const lossDueToLeftNum = parseFloat(feeBreakdowns['Loss of fees due to left students']?.total || 0);
    const lossDueToLateAdmissionNum = parseFloat(feeBreakdowns['Loss of fees due to late Admission']?.total || 0);
    const defaulterFeesNum = parseFloat(feeBreakdowns['Defaulter Fees']?.total || 0);

    const totalB = schoolFeesReceivedNum +
        oneTimeFeesReceivedNum +
        lateAndExcessFeesNum +
        feesConcessionNum +
        openingAdvanceNum +
        lossDueToLeftNum +
        lossDueToLateAdmissionNum +
        defaulterFeesNum;


    const differenceAB = totalA - totalB;


    const totalABreakdown = {};
    ['Fees Due-School Fees', 'Fees Due -One Time', 'Arrear Fees Received'].forEach(section => {
        if (feeBreakdowns[section]) {
            Object.entries(feeBreakdowns[section]).forEach(([k, v]) => {
                if (k !== 'total') {
                    totalABreakdown[k] = (totalABreakdown[k] || 0) + parseFloat(v || 0);
                }
            });
        }
    });
    totalABreakdown.total = totalA;

    const totalBBreakdown = {};


    const allColumns = [
        ...schoolFeeTypes.map(fee => fee.key),
        ...oneTimeFeeTypes.map(fee => fee.key),
        'lateExcessFee'
    ];
    
    allColumns.forEach(col => {
        totalBBreakdown[col] = 0;
    });


    const components = [
        'School Fees Received',
        'One Time Fees Received', 
        'Fees Concession',
        'Loss of fees due to left students',
        'Loss of fees due to late Admission',
        'Defaulter Fees'
    ];

    components.forEach(component => {
        if (feeBreakdowns[component]) {
            Object.entries(feeBreakdowns[component]).forEach(([key, value]) => {
                if (key !== 'total' && totalBBreakdown.hasOwnProperty(key)) {
                    totalBBreakdown[key] += parseFloat(value || 0);
                }
            });
        }
    });


    if (totalBBreakdown.hasOwnProperty('lateExcessFee')) {
        totalBBreakdown['lateExcessFee'] += lateAndExcessFeesNum;
    }

 
    totalBBreakdown.total = totalB;

    console.log('Total B Breakdown:', totalBBreakdown);


    const differenceBreakdown = {};
    const allKeys = new Set([
        ...Object.keys(totalABreakdown),
        ...Object.keys(totalBBreakdown)
    ]);

    allKeys.forEach(key => {
        if (key !== 'total') {
            const a = parseFloat(totalABreakdown[key] || 0);
            const b = parseFloat(totalBBreakdown[key] || 0);
            differenceBreakdown[key] = a - b;
        }
    });
    differenceBreakdown.total = differenceAB;

    setFeeBreakdowns(prev => ({
        ...prev,
        'Total (A)': totalABreakdown,
        'Total (B)': totalBBreakdown,
        'Difference (A-B)': differenceBreakdown
    }));

}, [
    feeBreakdowns,
    schoolFeesReceived,
    oneTimeFeesReceived,
    lateAndExcessFees,
    feesConcession,
    openingAdvance,
    closingAdvance,
    arrearFeesReceived,
    lossDueToLeft,
    lossDueToLateAdmission,
    defaulterFees,
    schoolFeeTypes,
    oneTimeFeeTypes
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

  const getFieldValue = (record, field, breakdowns) => {
    const breakdown = breakdowns?.[record.particulars] || {};
    return breakdown[field.key] !== undefined ? Number(breakdown[field.key]).toFixed(2) : '0.00';
  };

  const safeFormat = (value) => {
    const num = Number(value || 0);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };


  const dynamicColumns = schoolFeeTypes.length > 0 ? [
    ...schoolFeeTypes,
    { key: 'lateExcessFee', label: 'Late & Excess Fee' },
    ...oneTimeFeeTypes,
  ] : [
    { key: 'lateExcessFee', label: 'Late & Excess Fee' },
    ...oneTimeFeeTypes,
  ];

  const reconciliationRows = [
    { particulars: 'Fees Due-School Fees' },
    { particulars: 'Fees Due -One Time' },
    { particulars: 'Closing Advance' },
    { particulars: 'Arrear Fees Received' },
    { particulars: 'Total (A)' },
    { particulars: 'Fees Concession' },
    { particulars: 'School Fees Received' },
    { particulars: 'One Time Fees Received' },
    { particulars: 'Late & Excess Fee' },
    { particulars: 'Loss of fees due to left students' },
    { particulars: 'Loss of fees due to late Admission' },
    { particulars: 'Defaulter Fees' },
    { particulars: 'Opening Advance' },
    { particulars: 'Total (B)' },
    { particulars: 'Difference (A-B)' },
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

                                const totals = reconciliationRows.reduce((acc, row) => {
                                  acc[row.particulars] = feeBreakdowns[row.particulars]?.total || 0;
                                  return acc;
                                }, {});

                                await exportToExcel(
                                  reconciliationRows,
                                  dynamicColumns,
                                  { particulars: 'Particulars', total: 'Total' },
                                  (row, field) => getFieldValue(row, field, feeBreakdowns),
                                  null,
                                  totals,
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

                                const totals = reconciliationRows.reduce((acc, row) => {
                                  acc[row.particulars] = feeBreakdowns[row.particulars]?.total || 0;
                                  return acc;
                                }, {});

                                await exportToPDF(
                                  reconciliationRows,
                                  dynamicColumns,
                                  { particulars: 'Particulars', total: 'Total' },
                                  (row, field) => getFieldValue(row, field, feeBreakdowns),
                                  null,
                                  totals,
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
                  <h2 className="payroll-title text-center mb-0 flex-grow-1">Recon Fees Feeswise Report</h2>
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
                  { }
                  <div className="table-responsive pb-4 mt-3">
                    <table className="table text-dark border border-dark">
                      <thead>
                        <tr className="payroll-table-header">
                          <th className="text-center align-middle border border-dark text-nowrap p-2">Particulars</th>
                          {dynamicColumns.map((col) => (
                            <th key={col.key} className="text-center align-middle border border-dark text-nowrap p-2">
                              {col.label}
                            </th>
                          ))}
                          <th className="text-center align-middle border border-dark text-nowrap p-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reconciliationRows.map((row, index) => {
                          const isBoldRow = [
                            'Total (A)',
                            'Total (B)',
                            'Difference (A-B)',
                            'Total (A)',
                            'Total (B)',
                            'Difference (A-B)'
                          ].includes(row.particulars);

                          return (
                            <tr key={index} className={isBoldRow ? 'fw-bold' : ''}>
                              <td className="text-left align-middle border border-dark p-2">
                                {isBoldRow ? <strong>{row.particulars}</strong> : row.particulars}
                              </td>
                              {dynamicColumns.map((col) => (
                                <td key={col.key} className="text-center align-middle border border-dark p-2">
                                  {isBoldRow ? (
                                    <strong>{getFieldValue(row, col, feeBreakdowns)}</strong>
                                  ) : (
                                    getFieldValue(row, col, feeBreakdowns)
                                  )}
                                </td>
                              ))}
                              <td className="text-center align-middle border border-dark p-2">
                                {isBoldRow ? (
                                  <strong>{safeFormat(feeBreakdowns[row.particulars]?.total || 0)}</strong>
                                ) : (
                                  safeFormat(feeBreakdowns[row.particulars]?.total || 0)
                                )}
                              </td>
                            </tr>
                          );
                        })}
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

export default ReconFeesFeeswise;