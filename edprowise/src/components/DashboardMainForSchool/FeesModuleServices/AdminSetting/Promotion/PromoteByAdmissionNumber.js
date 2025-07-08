import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';

const PromoteByAdmissionNumber = ({ schoolId, newAcademicYear, previousYear, classes, shifts, navigate }) => {
    const [admissionNumbers, setAdmissionNumbers] = useState([]);
    const [selectedAdmission, setSelectedAdmission] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [previousClassList, setPreviousClassList] = useState([]);
    const [previousShifts, setPreviousShifts] = useState([]);
    const [sections, setSections] = useState([]);
    const [filteredShifts, setFilteredShifts] = useState([]);
    const [formData, setFormData] = useState({
        masterDefineClass: '',
        section: '',
        masterDefineShift: '',
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        if (!schoolId || !previousYear) return;

        const fetchAdmissionNumbers = async () => {
            try {
                const response = await getAPI(`/get-admission-form-by-year-schoolId/${schoolId}/${previousYear}`);
                if (!response.hasError) {
                    const students = response.data.data || [];
                    setAdmissionNumbers(students.map(student => ({
                        admissionNumber: student.AdmissionNumber,
                        name: `${student.firstName} ${student.lastName}`,
                    })));
                } else {
                    toast.error('Failed to fetch admission numbers.');
                }
            } catch (err) {
                toast.error('Error fetching admission numbers.');
            }
        };

        const fetchClassesAndShifts = async () => {
            try {
                const classRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
                if (!classRes.hasError) {
                    setPreviousClassList(classRes.data.data || []);
                } else {
                    toast.error('Failed to fetch previous classes.');
                }

                const shiftRes = await getAPI(`/master-define-shift/${schoolId}`);
                if (!shiftRes.hasError) {
                    setPreviousShifts(shiftRes.data.data || []);
                } else {
                    toast.error('Failed to fetch previous shifts.');
                }
            } catch (err) {
                toast.error('Error fetching previous classes or shifts.');
            }
        };

        fetchAdmissionNumbers();
        fetchClassesAndShifts();
    }, [schoolId, previousYear]);

    useEffect(() => {
        if (formData.masterDefineClass) {
            const selectedClass = classes.find(c => c._id === formData.masterDefineClass);
            setSections(selectedClass?.sections || []);
            setFilteredShifts(shifts);
            setFormData(prev => ({ ...prev, section: '', masterDefineShift: '' }));
        } else {
            setSections([]);
            setFilteredShifts([]);
            setFormData(prev => ({ ...prev, section: '', masterDefineShift: '' }));
        }
    }, [formData.masterDefineClass, classes, shifts]);

    useEffect(() => {
        if (formData.masterDefineClass && formData.section) {
            const selectedClass = classes.find(c => c._id === formData.masterDefineClass);
            const selectedSection = selectedClass?.sections.find(s => s._id === formData.section);
            const availableShifts = shifts.filter(shift => shift._id === selectedSection?.shiftId);
            setFilteredShifts(availableShifts);
            setFormData(prev => ({ ...prev, masterDefineShift: '' }));
        } else {
            setFilteredShifts([]);
        }
    }, [formData.masterDefineClass, formData.section, classes, shifts]);

    const getClassNameById = (id) => {
        const found = previousClassList.find(cls => cls._id === id);
        return found ? found.className : 'N/A';
    };

    const getSectionNameById = (sectionId) => {
        if (!sectionId) return 'N/A';
        const found = previousClassList.find(cls => cls.sections?.some(sec => sec._id === sectionId));
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
            masterDefineClass: e.target.value,
            section: '',
            masterDefineShift: '',
        });
    };

    const handleSectionChange = (e) => {
        setFormData({
            ...formData,
            section: e.target.value,
            masterDefineShift: '',
        });
    };

    const handleFetchStudent = async (e) => {
        e.preventDefault();
        if (!selectedAdmission) {
            toast.error('Please select an admission number.');
            return;
        }

        setFetchLoading(true);
        setFetchError(false);
        try {
            const response = await getAPI(`/get-admission-form-by-year-schoolId/${schoolId}/${previousYear}`);
            if (!response.hasError) {
                const student = response.data.data.find(s => s.AdmissionNumber === selectedAdmission);
                if (student) {
                    setStudentData(student);
                } else {
                    setFetchError(true);
                    setStudentData(null);
                    toast.error('Student not found.');
                }
            } else {
                setFetchError(true);
                toast.error('Failed to fetch student details.');
            }
        } catch (err) {
            setFetchError(true);
            toast.error('Error fetching student details.');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !selectedAdmission ||
            !formData.masterDefineClass ||
            !formData.section ||
            !formData.masterDefineShift
        ) {
            toast.error('Please fill all required fields.');
            return;
        }

        setLoading(true);
        try {
            const response = await postAPI('/promote-student', {
                schoolId,
                admissionNumber: selectedAdmission,
                newAcademicYear,
                newClass: formData.masterDefineClass,
                newSection: formData.section,
                newShift: formData.masterDefineShift,
            });

            if (!response.hasError) {
                toast.success('Student promoted successfully.');
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
        <div className="container-fluid">
            {!studentData && !fetchError && (
                <form onSubmit={handleFetchStudent}>
                    <div className="row align-items-end mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Admission Number</label>
                            <input
                                type="text"
                                className="form-control"
                                list="admissionNumbers"
                                value={selectedAdmission}
                                onChange={(e) => setSelectedAdmission(e.target.value)}
                                placeholder="Type or select admission number"
                            />
                            <datalist id="admissionNumbers">
                                {admissionNumbers.map((admission, index) => (
                                    <option key={index} value={admission.admissionNumber}>
                                        {admission.admissionNumber} - {admission.name}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <div className="col-md-3">
                            <button
                                type="submit"
                                className="btn btn-primary mt-4"
                                disabled={fetchLoading}
                            >
                                {fetchLoading ? 'Loading...' : 'Proceed'}
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {fetchError && !studentData && (
                <div className="alert alert-warning" role="alert">
                    Student not available.

                </div>
            )}

            {studentData && (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Admission Number</label>
                            <input
                                type="text"
                                className="form-control"
                                value={studentData.AdmissionNumber || 'N/A'}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={studentData.firstName}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Middle Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={studentData.middleName || 'N/A'}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={studentData.lastName}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Gender</label>
                            <input
                                type="text"
                                className="form-control"
                                value={studentData.gender}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input
                                type="text"
                                className="form-control"
                                value={studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toLocaleDateString() : 'N/A'}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Last Year Class</label>
                            <input
                                type="text"
                                className="form-control"
                                value={getClassNameById(studentData.masterDefineClass)}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Last Year Section</label>
                            <input
                                type="text"
                                className="form-control"
                                value={getSectionNameById(studentData.section)}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Last Year Shift</label>
                            <input
                                type="text"
                                className="form-control"
                                value={getShiftName(studentData.masterDefineShift)}
                                disabled
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">New Class</label>
                            <select
                                className="form-select"
                                value={formData.masterDefineClass}
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
                        <div className="col-md-4 mb-3">
                            <label className="form-label">New Section</label>
                            <select
                                className="form-select"
                                value={formData.section}
                                onChange={handleSectionChange}
                                disabled={!formData.masterDefineClass}
                            >
                                <option value="" disabled>Select New Section</option>
                                {sections.map((section) => (
                                    <option key={section._id} value={section._id}>
                                        {section.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">New Shift</label>
                            <select
                                className="form-select"
                                value={formData.masterDefineShift}
                                onChange={(e) => setFormData({ ...formData, masterDefineShift: e.target.value })}
                                disabled={!formData.masterDefineClass || !formData.section}
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
                </form>
            )}
        </div>
    );
};

export default PromoteByAdmissionNumber;