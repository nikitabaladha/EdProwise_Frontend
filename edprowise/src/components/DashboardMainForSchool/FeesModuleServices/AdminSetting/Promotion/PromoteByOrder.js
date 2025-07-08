import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';

const PromoteByOrder = ({ schoolId, newAcademicYear, previousYear, classes, shifts, previousShifts, navigate }) => {
  const [previousClasses, setPreviousClasses] = useState([]);
  const [selectedPreviousClass, setSelectedPreviousClass] = useState('');
  const [formData, setFormData] = useState({
    newClass: '',
    orderBy: 'firstName',
    orderType: 'ascending',
  });
  const [students, setStudents] = useState([]);
  const [promotedData, setPromotedData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingClasses, setIsFetchingClasses] = useState(false);
  const [showData, setShowData] = useState(false);
  const [noData, setNoData] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

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

  const getClassNameById = (id) => {
    const found = classes.find(cls => cls._id === id) || previousClasses.find(cls => cls._id === id);
    return found ? found.className : 'N/A';
  };

  const getSectionNameById = (id) => {
    if (!id) return 'N/A';
    const foundClass = classes.find(cls => cls.sections?.some(sec => sec._id === id));
    const section = foundClass?.sections?.find(sec => sec._id === id);
    return section ? section.name : 'N/A';
  };

  const getShiftName = (shiftId) => {
    const shift = shifts.find(s => s._id === shiftId) || previousShifts.find(s => s._id === shiftId);
    return shift ? shift.masterDefineShiftName : 'N/A';
  };

  const distributeStudents = (students, newClassId) => {
    const selectedClass = classes.find(c => c._id === newClassId);
    const sections = selectedClass?.sections || [];
    if (sections.length === 0) {
      toast.error('No sections available for the selected new class.');
      return [];
    }

    const studentsPerSection = Math.floor(students.length / sections.length);
    const extraStudents = students.length % sections.length;
    let studentIndex = 0;
    const distributedData = [];

    sections.forEach((section, index) => {
      const shift = shifts.find(s => s._id === section.shiftId);
      if (!shift) return;

      const numStudents = index < extraStudents ? studentsPerSection + 1 : studentsPerSection;
      for (let i = 0; i < numStudents && studentIndex < students.length; i++) {
        distributedData.push({
          ...students[studentIndex],
          newClass: newClassId,
          newSection: section._id,
          newShift: shift._id,
        });
        studentIndex++;
      }
    });

    return distributedData;
  };

  const handleSelectAll = () => {
    setSelectAll(prev => !prev);
    if (!selectAll) {
      setSelectedStudents(promotedData.map(data => data.AdmissionNumber));
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
    setSelectAll(promotedData.length === selectedStudents.length + 1 && !selectedStudents.includes(admissionNumber));
  };

  const handleFetchStudents = async (e) => {
    e.preventDefault();
    if (!selectedPreviousClass || !formData.newClass || !formData.orderBy || !formData.orderType) {
      toast.error('Please select previous class, new class, order by, and order type.');
      return;
    }

    setLoading(true);
    try {
      const response = await getAPI(`/get-admission-form-by-year-schoolId/${schoolId}/${previousYear}`);
      if (!response.hasError) {
        let filteredStudents = response.data.data.filter(
          student => student.masterDefineClass === selectedPreviousClass
        );


        filteredStudents.sort((a, b) => {
          const fieldA = a[formData.orderBy].toLowerCase();
          const fieldB = b[formData.orderBy].toLowerCase();
          if (formData.orderType === 'ascending') {
            return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
          } else {
            return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
          }
        });

        setStudents(filteredStudents);
        if (filteredStudents.length === 0) {
          setNoData(true);
          toast.warn('No students found for the selected class.');
          setShowData(false);
        } else {
          const distributedData = distributeStudents(filteredStudents, formData.newClass);
          if (distributedData.length === 0) {
            setNoData(true);
            setShowData(false);
          } else {
            setPromotedData(distributedData);
            setSelectedStudents(distributedData.map(data => data.AdmissionNumber)); 
            setSelectAll(true);
            setShowData(true);
            setNoData(false);
          }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedStudents.length) {
      toast.error('Please select at least one student.');
      return;
    }

    setLoading(true);
    try {
      const promotionsBySection = promotedData.reduce((acc, student) => {
        if (selectedStudents.includes(student.AdmissionNumber)) {
          const key = `${student.newClass}-${student.newSection}-${student.newShift}`;
          if (!acc[key]) {
            acc[key] = {
              newClass: student.newClass,
              newSection: student.newSection,
              newShift: student.newShift,
              admissionNumbers: [],
            };
          }
          acc[key].admissionNumbers.push(student.AdmissionNumber);
        }
        return acc;
      }, {});

      const promotionPromises = Object.values(promotionsBySection).map(promotion =>
        postAPI('/promote-students-bulk', {
          schoolId,
          admissionNumbers: promotion.admissionNumbers,
          newAcademicYear,
          newClass: promotion.newClass,
          newSection: promotion.newSection,
          newShift: promotion.newShift,
        })
      );

      const responses = await Promise.all(promotionPromises);
      const errors = responses.filter(res => res.hasError);

      if (errors.length > 0) {
        const errorMessages = errors.map(err => err.message || 'Promotion failed').join(', ');
        toast.error(`Some promotions failed: ${errorMessages}`);
      } else {
        toast.success('Students promoted successfully.');
        navigate('/school-dashboard/fees-module/admin-setting/promotion/student-promotion');
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
          <label className="form-label">New Class</label>
          <select
            className="form-select"
            value={formData.newClass}
            onChange={(e) => setFormData({ ...formData, newClass: e.target.value })}
            disabled={showData}
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
          <label className="form-label">Order By</label>
          <select
            className="form-select"
            value={formData.orderBy}
            onChange={(e) => setFormData({ ...formData, orderBy: e.target.value })}
            disabled={showData}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Order Type</label>
          <select
            className="form-select"
            value={formData.orderType}
            onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
            disabled={showData}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
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

      {showData && promotedData.length > 0 && (
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
                  <th>New Class</th>
                  <th>New Section</th>
                  <th>New Shift</th>
                </tr>
              </thead>
              <tbody>
                {promotedData.map((student, index) => (
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
                    <td>{getClassNameById(student.newClass)}</td>
                    <td>{getSectionNameById(student.newSection)}</td>
                    <td>{getShiftName(student.newShift)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default PromoteByOrder;