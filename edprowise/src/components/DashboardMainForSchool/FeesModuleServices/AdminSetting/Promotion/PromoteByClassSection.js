
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import putAPI from '../../../../../api/putAPI';

const PromoteByClassSection = ({ schoolId, newAcademicYear, previousYear, classes, shifts, previousShifts, navigate }) => {
    const [previousClasses, setPreviousClasses] = useState([]);
    const [previousSections, setPreviousSections] = useState([]);
    const [selectedPreviousClass, setSelectedPreviousClass] = useState('');
    const [selectedPreviousSection, setSelectedPreviousSection] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [formData, setFormData] = useState({
        newClass: '',
        newSection: '',
        newShift: '',
    });
    const [newSections, setNewSections] = useState([]);
    const [filteredShifts, setFilteredShifts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFetchingClasses, setIsFetchingClasses] = useState(false);
    const [showData, setShowData] = useState(false);
    const [noData, setNoData] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [studentSelections, setStudentSelections] = useState({}); 
    const [promotedStudents, setPromotedStudents] = useState({}); 

    useEffect(() => {
        if (!schoolId || !previousYear) {
            toast.error('Missing school ID or previous academic year.');
            return;
        }

        const fetchPreviousClasses = async () => {
            setIsFetchingClasses(true);
            try {
                const response = await getAPI(`/get-class-and-section-year/${schoolId}/year/${previousYear}`, {}, true);
                if (!response.hasError) {
                    const classData = response?.data?.data || [];
                    setPreviousClasses(classData);
                    if (classData.length === 0) {
                        setNoData(true);
                        toast.warn('No classes found for the previous academic year.');
                    }
                } else {
                    toast.error(`Failed to fetch previous year classes: ${response.message}`);
                    setNoData(true);
                }
            } catch (err) {
                toast.error('Error fetching previous year classes.');
                setNoData(true);
            } finally {
                setIsFetchingClasses(false);
            }
        };

        fetchPreviousClasses();
    }, [schoolId, previousYear]);

    useEffect(() => {
        if (!selectedPreviousClass) {
            setPreviousSections([]);
            setSelectedPreviousSection('');
            return;
        }

        const selectedClass = previousClasses.find(c => c._id === selectedPreviousClass);
        const sections = selectedClass?.sections || [];
        setPreviousSections(sections);
        setSelectedPreviousSection('');
        setNoData(sections.length === 0);
    }, [selectedPreviousClass, previousClasses]);

    useEffect(() => {
        if (formData.newClass) {
            const selectedClass = classes.find(c => c._id === formData.newClass);
            setNewSections(selectedClass?.sections || []);
            setFilteredShifts([]);
            setFormData(prev => ({ ...prev, newSection: '', newShift: '' }));
        } else {
            setNewSections([]);
            setFilteredShifts([]);
            setFormData(prev => ({ ...prev, newSection: '', newShift: '' }));
        }
    }, [formData.newClass, classes]);

    useEffect(() => {
        if (formData.newClass && formData.newSection) {
            const selectedClass = classes.find(c => c._id === formData.newClass);
            const selectedSection = selectedClass?.sections.find(s => s._id === formData.newSection);
            const availableShifts = shifts.filter(shift => shift._id === selectedSection?.shiftId);
            setFilteredShifts(availableShifts);
            setFormData(prev => ({ ...prev, newShift: '' }));
        } else {
            setFilteredShifts([]);
        }
    }, [formData.newClass, formData.newSection, classes, shifts]);

    const handleSelectAll = () => {
        setSelectAll(prev => !prev);
        if (!selectAll) {
            setSelectedStudents(students.map(student => student.AdmissionNumber));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleStudentSelect = (admissionNumber) => {
        setSelectedStudents(prev =>
            prev.includes(admissionNumber)
                ? prev.filter(num => num !== admissionNumber)
                : [...prev, admissionNumber]
        );
        setSelectAll(students.length === selectedStudents.length + 1 && !selectedStudents.includes(admissionNumber));
    };

    const getClassNameById = (id) => {
        const found = previousClasses.find(cls => cls._id === id) || classes.find(cls => cls._id === id);
        return found ? found.className : 'N/A';
    };

    const getSectionNameById = (sectionId) => {
        if (!sectionId) return 'N/A';
        const found = previousClasses.find(cls => cls.sections?.some(sec => sec._id === sectionId)) ||
                     classes.find(cls => cls.sections?.some(sec => sec._id === sectionId));
        const section = found?.sections?.find(sec => sec._id === sectionId);
        return section ? section.name : 'N/A';
    };

    const getShiftName = (shiftId) => {
        const shift = previousShifts.find(s => s._id === shiftId) || shifts.find(s => s._id === shiftId);
        return shift ? shift.masterDefineShiftName : 'N/A';
    };

    const handleClassChange = (e) => {
        setFormData({
            ...formData,
            newClass: e.target.value,
            newSection: '',
            newShift: '',
        });
    };

    const handleSectionChange = (e) => {
        setFormData({
            ...formData,
            newSection: e.target.value,
            newShift: '',
        });
    };

    const handleStudentFieldChange = (admissionNumber, field, value) => {
        setStudentSelections(prev => {
            const updatedSelections = { ...prev[admissionNumber] } || {};

            if (field === 'masterDefineClass') {
                const selectedClass = classes.find(c => c._id === value);
                updatedSelections.masterDefineClass = value;
                updatedSelections.sections = selectedClass?.sections || [];
                updatedSelections.section = ''; 
                updatedSelections.shifts = []; 
                updatedSelections.masterDefineShift = ''; 
            } else if (field === 'section') {
                updatedSelections.section = value;
                const selectedClass = classes.find(c => c._id === updatedSelections.masterDefineClass);
                const selectedSection = selectedClass?.sections.find(s => s._id === value);
                updatedSelections.shifts = shifts.filter(s => s._id === selectedSection?.shiftId) || [];
                updatedSelections.masterDefineShift = ''; 
            } else if (field === 'masterDefineShift') {
                updatedSelections.masterDefineShift = value;
            }

            return {
                ...prev,
                [admissionNumber]: updatedSelections,
            };
        });
    };

    const fetchStudentDetails = async (admissionNumber) => {
        try {
            const response = await getAPI(`/get-admission-form-by-year-classnsection/${schoolId}/${newAcademicYear}`);
            if (!response.hasError) {
                const studentData = response.data.data.find(
                    student => student.AdmissionNumber === admissionNumber
                );
                if (studentData && studentData.academicHistory) {
                    const selectedClass = classes.find(c => c._id === studentData.academicHistory.masterDefineClass);
                    const selectedSection = selectedClass?.sections.find(s => s._id === studentData.academicHistory.section);
                    setPromotedStudents(prev => ({
                        ...prev,
                        [admissionNumber]: {
                            masterDefineClass: studentData.academicHistory.masterDefineClass || '',
                            section: studentData.academicHistory.section || '',
                            masterDefineShift: studentData.academicHistory.masterDefineShift || '',
                            academicHistoryId: studentData.academicHistory._id || '',
                            isPromoted: true,
                        },
                    }));
                    setStudentSelections(prev => ({
                        ...prev,
                        [admissionNumber]: {
                            masterDefineClass: studentData.academicHistory.masterDefineClass || '',
                            section: studentData.academicHistory.section || '',
                            masterDefineShift: studentData.academicHistory.masterDefineShift || '',
                            sections: selectedClass?.sections || [],
                            shifts: shifts.filter(s => s._id === selectedSection?.shiftId) || [],
                            academicHistoryId: studentData.academicHistory._id || '',
                        },
                    }));
                } else {
                    setPromotedStudents(prev => ({
                        ...prev,
                        [admissionNumber]: {
                            masterDefineClass: '',
                            section: '',
                            masterDefineShift: '',
                            academicHistoryId: '',
                            isPromoted: false,
                        },
                    }));
                    setStudentSelections(prev => ({
                        ...prev,
                        [admissionNumber]: {
                            masterDefineClass: '',
                            section: '',
                            masterDefineShift: '',
                            sections: [],
                            shifts: [],
                            academicHistoryId: '',
                        },
                    }));
                }
            }
        } catch (err) {
            console.error('Error fetching student details:', err);
            setPromotedStudents(prev => ({
                ...prev,
                [admissionNumber]: {
                    masterDefineClass: '',
                    section: '',
                    masterDefineShift: '',
                    academicHistoryId: '',
                    isPromoted: false,
                },
            }));
            setStudentSelections(prev => ({
                ...prev,
                [admissionNumber]: {
                    masterDefineClass: '',
                    section: '',
                    masterDefineShift: '',
                    sections: [],
                    shifts: [],
                    academicHistoryId: '',
                },
            }));
        }
    };

    const handleFetchStudents = async (e) => {
        e.preventDefault();
        if (!selectedPreviousClass || !selectedPreviousSection) {
            toast.error('Please select previous class and section.');
            return;
        }

        setLoading(true);
        try {
            const response = await getAPI(`/get-admission-form-by-year-schoolId/${schoolId}/${previousYear}`);
            if (!response.hasError) {
                const filteredStudents = response.data.data.filter(
                    student => student.masterDefineClass === selectedPreviousClass && student.section === selectedPreviousSection
                );
                setStudents(filteredStudents);
                setSelectedStudents([]);
                setSelectAll(false);
                setShowData(true);
                if (filteredStudents.length === 0) {
                    setNoData(true);
                    toast.warn('No students found for the selected class and section.');
                } else {
                    setNoData(false);
                    filteredStudents.forEach(student => fetchStudentDetails(student.AdmissionNumber));
                }
            } else {
                toast.error(`Failed to fetch students: ${response.message}`);
                setNoData(true);
            }
        } catch (err) {
            toast.error('Error fetching students.');
            setNoData(true);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStudent = async (admissionNumber) => {
        const studentSelection = studentSelections[admissionNumber] || {};
        if (!studentSelection.masterDefineClass || !studentSelection.section || !studentSelection.masterDefineShift) {
            toast.error('Please select class, section, and shift for the student.');
            return;
        }

        setLoading(true);
        try {
            const isPromoted = promotedStudents[admissionNumber]?.isPromoted;
            const academicHistoryId = promotedStudents[admissionNumber]?.academicHistoryId || studentSelection.academicHistoryId;

            let response;
            if (isPromoted && academicHistoryId) {
         
                response = await putAPI(`/update-promotion/${academicHistoryId}`, {
                    schoolId,
                    masterDefineClass: studentSelection.masterDefineClass,
                    section: studentSelection.section,
                    masterDefineShift: studentSelection.masterDefineShift,
                });
            } else {
    
                response = await postAPI('/promote-students-bulk', {
                    schoolId,
                    admissionNumbers: [admissionNumber],
                    newAcademicYear,
                    newClass: studentSelection.masterDefineClass,
                    newSection: studentSelection.section,
                    newShift: studentSelection.masterDefineShift,
                });
            }

            if (!response.hasError) {
                toast.success(isPromoted ? 'Academic history updated successfully.' : 'Student promoted successfully.');
                setPromotedStudents(prev => ({
                    ...prev,
                    [admissionNumber]: {
                        masterDefineClass: studentSelection.masterDefineClass,
                        section: studentSelection.section,
                        masterDefineShift: studentSelection.masterDefineShift,
                        academicHistoryId: academicHistoryId || '', 
                        isPromoted: true,
                    },
                }));
            } else {
                toast.error(response.message || (isPromoted ? 'Failed to update academic history.' : 'Failed to promote student.'));
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error processing student promotion.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStudents.length || !formData.newClass || !formData.newSection || !formData.newShift) {
            toast.error('Please select at least one student and fill all required fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await postAPI('/promote-students-bulk', {
                schoolId,
                admissionNumbers: selectedStudents,
                newAcademicYear,
                newClass: formData.newClass,
                newSection: formData.newSection,
                newShift: formData.newShift,
            });

            if (!response.hasError) {
                toast.success('Students promoted successfully.');
                selectedStudents.forEach(admissionNumber => {
                    setPromotedStudents(prev => ({
                        ...prev,
                        [admissionNumber]: {
                            masterDefineClass: formData.newClass,
                            section: formData.newSection,
                            masterDefineShift: formData.newShift,
                            academicHistoryId: '', 
                            isPromoted: true,
                        },
                    }));
                    setStudentSelections(prev => ({
                        ...prev,
                        [admissionNumber]: {
                            ...prev[admissionNumber],
                            masterDefineClass: formData.newClass,
                            section: formData.newSection,
                            masterDefineShift: formData.newShift,
                        },
                    }));
                });
                navigate('/school-dashboard/fees-module/admin-setting/promotion/student-promotion');
            } else {
                toast.error(response.message || 'Failed to promote students.');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error promoting students.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={showData ? handleSubmit : handleFetchStudents}>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label className="form-label">Previous Year Class</label>
                    <select
                        className="form-select"
                        value={selectedPreviousClass}
                        onChange={(e) => setSelectedPreviousClass(e.target.value)}
                        disabled={isFetchingClasses || noData || showData}
                    >
                        <option value="" disabled>Select Previous Class</option>
                        {previousClasses.length > 0 ? (
                            previousClasses.map((cls) => (
                                <option key={cls._id} value={cls._id}>
                                    {cls.className}
                                </option>
                            ))
                        ) : (
                            <option disabled>No classes available</option>
                        )}
                    </select>
                    {isFetchingClasses && <p className="text-sm text-gray-500 mt-1">Loading classes...</p>}
                </div>
                <div className="col-md-3">
                    <label className="form-label">Previous Year Section</label>
                    <select
                        className="form-select mb-2"
                        value={selectedPreviousSection}
                        onChange={(e) => setSelectedPreviousSection(e.target.value)}
                        disabled={!selectedPreviousClass || previousSections.length === 0 || noData || showData}
                    >
                        <option value="" disabled>Select Previous Section</option>
                        {previousSections.map((section) => (
                            <option key={section._id} value={section._id}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {!showData && (
                <div className="d-flex">
                    <button
                        type="submit"
                        className="btn btn-primary ms-auto"
                        disabled={loading || noData}
                    >
                        {loading ? 'Loading...' : 'Proceed'}
                    </button>
                </div>
            )}

            {noData && !loading && (
                <p className="text-sm text-red-500 mt-1 text-center">No data available</p>
            )}

            {showData && students.length > 0 && (
                <>
                    <div className="table-responsive">
                        <table className="table align-middle mb-3 table-centered text-center min-w-full text-nowrap">
                            <thead>
                                <tr>
                                    <th style={{ width: 20 }}>
                                        <div className="form-check ms-1">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                                className="form-check-input h-4 w-4 text-indigo-600"
                                                id="customCheck1"
                                            />
                                            <label className="form-check-label" htmlFor="customCheck1" />
                                        </div>
                                    </th>
                                    <th>Admission Number</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Gender</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Shift</th>
                                    <th>Status</th>
                                    <th>New Class</th>
                                    <th>New Section</th>
                                    <th>New Shift</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={student.AdmissionNumber}>
                                        <td>
                                            <div className="form-check ms-1">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.includes(student.AdmissionNumber)}
                                                    onChange={() => handleStudentSelect(student.AdmissionNumber)}
                                                    className="form-check-input h-4 w-4 text-indigo-600"
                                                    id={`customCheck${index + 2}`}
                                                />
                                                <label className="form-check-label" htmlFor={`customCheck${index + 2}`} />
                                            </div>
                                        </td>
                                        <td>{student.AdmissionNumber}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.gender}</td>
                                        <td>
                                            {promotedStudents[student.AdmissionNumber]?.isPromoted
                                                ? getClassNameById(promotedStudents[student.AdmissionNumber].masterDefineClass)
                                                : getClassNameById(student.masterDefineClass)}
                                        </td>
                                        <td>
                                            {promotedStudents[student.AdmissionNumber]?.isPromoted
                                                ? getSectionNameById(promotedStudents[student.AdmissionNumber].section)
                                                : getSectionNameById(student.section)}
                                        </td>
                                        <td>
                                            {promotedStudents[student.AdmissionNumber]?.isPromoted
                                                ? getShiftName(promotedStudents[student.AdmissionNumber].masterDefineShift)
                                                : getShiftName(student.masterDefineShift)}
                                        </td>
                                        <td>
                                            {promotedStudents[student.AdmissionNumber]?.isPromoted ? 'Promoted' : 'Not Promoted'}
                                        </td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={studentSelections[student.AdmissionNumber]?.masterDefineClass || ''}
                                                onChange={(e) => handleStudentFieldChange(student.AdmissionNumber, 'masterDefineClass', e.target.value)}
                                            >
                                                <option value="" disabled>Select New Class</option>
                                                {classes.map((cls) => (
                                                    <option key={cls._id} value={cls._id}>
                                                        {cls.className}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={studentSelections[student.AdmissionNumber]?.section || ''}
                                                onChange={(e) => handleStudentFieldChange(student.AdmissionNumber, 'section', e.target.value)}
                                                disabled={!studentSelections[student.AdmissionNumber]?.masterDefineClass}
                                            >
                                                <option value="" disabled>Select New Section</option>
                                                {studentSelections[student.AdmissionNumber]?.sections?.length > 0 ? (
                                                    studentSelections[student.AdmissionNumber].sections.map((section) => (
                                                        <option key={section._id} value={section._id}>
                                                            {section.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>No sections available</option>
                                                )}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={studentSelections[student.AdmissionNumber]?.masterDefineShift || ''}
                                                onChange={(e) => handleStudentFieldChange(student.AdmissionNumber, 'masterDefineShift', e.target.value)}
                                                disabled={!studentSelections[student.AdmissionNumber]?.section}
                                            >
                                                <option value="" disabled>Select New Shift</option>
                                                {studentSelections[student.AdmissionNumber]?.shifts?.length > 0 ? (
                                                    studentSelections[student.AdmissionNumber].shifts.map((shift) => (
                                                        <option key={shift._id} value={shift._id}>
                                                            {shift.masterDefineShiftName}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>No shifts available</option>
                                                )}
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => handleUpdateStudent(student.AdmissionNumber)}
                                                disabled={loading || !studentSelections[student.AdmissionNumber]?.masterDefineClass || !studentSelections[student.AdmissionNumber]?.section || !studentSelections[student.AdmissionNumber]?.masterDefineShift}
                                            >
                                                {loading ? 'Updating...' : 'Update'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-label">New Class</label>
                            <select
                                className="form-select"
                                value={formData.newClass}
                                onChange={handleClassChange}
                            >
                                <option value="" disabled>Select New Class</option>
                                {classes.map((cls) => (
                                    <option key={cls._id} value={cls._id}>
                                        {cls.className}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">New Section</label>
                            <select
                                className="form-select"
                                value={formData.newSection}
                                onChange={handleSectionChange}
                                disabled={!formData.newClass}
                            >
                                <option value="" disabled>Select New Section</option>
                                {newSections.map((section) => (
                                    <option key={section._id} value={section._id}>
                                        {section.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">New Shift</label>
                            <select
                                className="form-select"
                                value={formData.newShift}
                                onChange={(e) => setFormData({ ...formData, newShift: e.target.value })}
                                disabled={!formData.newClass || !formData.newSection}
                            >
                                <option value="" disabled>Select New Shift</option>
                                {filteredShifts.map((shift) => (
                                    <option key={shift._id} value={shift._id}>
                                        {shift.masterDefineShiftName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex">
                        <button
                            type="submit"
                            className="btn btn-primary ms-auto"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </>
            )}
        </form>
    );
};

export default PromoteByClassSection;
