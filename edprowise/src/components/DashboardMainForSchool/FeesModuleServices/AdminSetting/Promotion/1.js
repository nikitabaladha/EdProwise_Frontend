
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';

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

    useEffect(() => {
        if (!schoolId || !previousYear) {
            console.log('Missing schoolId or previousYear:', { schoolId, previousYear });
            toast.error('Missing school ID or previous academic year.');
            return;
        }

        const fetchPreviousClasses = async () => {
            setIsFetchingClasses(true);
            try {
                console.log('Fetching classes for:', { schoolId, previousYear });
                const response = await getAPI(`/get-class-and-section-year/${schoolId}/year/${previousYear}`, {}, true);
                console.log('API Response:', response);
                if (!response.hasError) {
                    const classData = response?.data?.data || [];
                    setPreviousClasses(classData);
                    console.log('Set previousClasses:', classData);
                    if (classData.length === 0) {
                        setNoData(true);
                        toast.warn('No classes found for the previous academic year.');
                    }
                } else {
                    console.error('API Error:', response.message);
                    toast.error(`Failed to fetch previous year classes: ${response.message}`);
                    setNoData(true);
                }
            } catch (err) {
                console.error('Fetch Error:', err);
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
        console.log('Selected class sections:', sections);
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
        const found = previousClasses.find(cls => cls._id === id);
        return found ? found.className : 'N/A';
    };

    const getSectionNameById = (sectionId) => {
        if (!sectionId) return 'N/A';
        const found = previousClasses.find(cls => cls.sections?.some(sec => sec._id === sectionId));
        const section = found?.sections?.find(sec => sec._id === sectionId);
        return section ? section.name : 'N/A';
    };

    const getShiftName = (shiftId) => {
        const shift = previousShifts.find(s => s._id === shiftId);
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

    const handleFetchStudents = async (e) => {
        e.preventDefault();
        if (!selectedPreviousClass || !selectedPreviousSection) {
            toast.error('Please select previous class and section.');
            return;
        }

        setLoading(true);
        try {
            console.log('Fetching students for:', { selectedPreviousClass, selectedPreviousSection });
            const response = await getAPI(`/get-admission-form-by-year-schoolId/${schoolId}/${previousYear}`);
            if (!response.hasError) {
                const filteredStudents = response.data.data.filter(
                    student => student.masterDefineClass === selectedPreviousClass && student.section === selectedPreviousSection
                );
                setStudents(filteredStudents);
                setSelectedStudents([]);
                setSelectAll(false);
                setShowData(true);
                console.log('Filtered students:', filteredStudents);
                if (filteredStudents.length === 0) {
                    setNoData(true);
                    toast.warn('No students found for the selected class and section.');
                } else {
                    setNoData(false);
                }
            } else {
                console.error('Student API Error:', response.message);
                toast.error(`Failed to fetch students: ${response.message}`);
                setNoData(true);
            }
        } catch (err) {
            console.error('Student Fetch Error:', err);
            toast.error('Error fetching students.');
            setNoData(true);
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
                navigate('/school-dashboard/fees-module/admin-setting/promotion/student-promotion');
            } else {
                toast.error(response.message || 'Failed to promote student.');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error promoting student.');
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
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            )}

            {noData && !loading && (
                <p className="text-sm text-red-500 mt-1 text-center">No data available</p>
            )}

            {showData && students.length > 0 && (
                <>
                    <div className="table-responsive">
                        <table className="table align-middle mb-3 table-centered text-center min-w-full">
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
                                        <td>{getClassNameById(student.masterDefineClass)}</td>
                                        <td>{getSectionNameById(student.section)}</td>
                                        <td>{getShiftName(student.masterDefineShift)}</td>
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
                            {loading ? 'Submitting...' : 'Promote Students'}
                        </button>
                    </div>
                </>
            )}
        </form>
    );
};

export default PromoteByClassSection;
