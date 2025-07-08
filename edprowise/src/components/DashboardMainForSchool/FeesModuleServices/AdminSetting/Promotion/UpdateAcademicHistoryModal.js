import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import putAPI from '../../../../../api/putAPI';

const UpdateAcademicHistoryModal = ({ show, onClose, schoolId, academicHistoryId, studentData, onUpdateSuccess, selectedYear }) => {
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [sections, setSections] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [formData, setFormData] = useState({
    masterDefineClass: '',
    section: '',
    masterDefineShift: '',
  });
  const [loading, setLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    if (!show || !schoolId || !selectedYear) return;

    const fetchClassesAndShifts = async () => {
      try {
        setIsDataLoading(true);
        const classRes = await getAPI(`/get-class-and-section-year/${schoolId}/year/${selectedYear}`, {}, true);
        if (!classRes.hasError) {
          setClasses(classRes.data.data || []);
        } else {
          toast.error('Failed to fetch classes.');
        }
        const shiftRes = await getAPI(`/master-define-shift-year/${schoolId}/year/${selectedYear}`);
        if (!shiftRes.hasError) {
          setShifts(shiftRes.data.data || []);
        } else {
          toast.error('Failed to fetch shifts.');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        toast.error('Error fetching classes or shifts.');
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchClassesAndShifts();
  }, [show, schoolId, selectedYear]);

  useEffect(() => {
    if (isDataLoading || !studentData || !studentData.academicHistory) return;
    const academicHistory = studentData.academicHistory;
    setFormData({
      masterDefineClass: academicHistory.masterDefineClass || '',
      section: academicHistory.section || '',
      masterDefineShift: academicHistory.masterDefineShift || '',
    });
  }, [isDataLoading, studentData]);

  useEffect(() => {
    if (!formData.masterDefineClass) {
      setSections([]);
      setFilteredShifts([]);
      return;
    }

    const selectedClass = classes.find((c) => c._id === formData.masterDefineClass);
    if (selectedClass) {
      setSections(selectedClass.sections || []);
      setFilteredShifts(shifts);
    } else {
      setSections([]);
      setFilteredShifts([]);
      setFormData((prev) => ({ ...prev, section: '', masterDefineShift: '' }));
    }
  }, [formData.masterDefineClass, classes, shifts]);

  useEffect(() => {
    if (!formData.masterDefineClass || !formData.section) {
      setFilteredShifts([]);
      return;
    }

    const selectedClass = classes.find((c) => c._id === formData.masterDefineClass);
    const selectedSection = selectedClass?.sections.find((s) => s._id === formData.section);
    if (selectedSection) {
      const availableShifts = shifts.filter((shift) => shift._id === selectedSection.shiftId);
      setFilteredShifts(availableShifts);
    } else {
      setFilteredShifts([]);
      setFormData((prev) => ({ ...prev, masterDefineShift: '' }));
    }
  }, [formData.masterDefineClass, formData.section, classes, shifts]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.masterDefineClass || !formData.section || !formData.masterDefineShift) {
      toast.error('Please fill all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await putAPI(`/update-promotion/${academicHistoryId}`, {
        schoolId: schoolId,
        masterDefineClass: formData.masterDefineClass,
        section: formData.section,
        masterDefineShift: formData.masterDefineShift,
      });

      if (!response.hasError) {
        toast.success('Academic history updated successfully.');
        onUpdateSuccess();
        onClose();
      } else {
        toast.error(response.message || 'Failed to update academic history.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error updating academic history.');
    } finally {
      setLoading(false);
    }
  };

  if (isDataLoading) {
    return (
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Academic History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Loading...</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <style>
        {`
          @media (max-width: 767px) {
            .modal-body-scrollable {
              max-height: 60vh; /* Set a maximum height for the modal body */
              overflow-y: auto; /* Enable vertical scrollbar */
              padding-right: 10px; /* Add padding to avoid content touching the scrollbar */
            }
          }
        `}
      </style>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Academic History</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scrollable">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Admission Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData?.AdmissionNumber || 'N/A'}
                  disabled
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData?.firstName || 'N/A'}
                  disabled
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentData?.lastName || 'N/A'}
                  disabled
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Class</label>
                <select
                  className="form-select"
                  value={formData.masterDefineClass}
                  onChange={handleClassChange}
                >
                  <option value="" disabled>Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.className}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Section</label>
                <select
                  className="form-select"
                  value={formData.section}
                  onChange={handleSectionChange}
                  disabled={!formData.masterDefineClass}
                >
                  <option value="" disabled>Select Section</option>
                  {sections.map((section) => (
                    <option key={section._id} value={section._id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Shift</label>
                <select
                  className="form-select"
                  value={formData.masterDefineShift}
                  onChange={(e) => setFormData({ ...formData, masterDefineShift: e.target.value })}
                  disabled={!formData.masterDefineClass || !formData.section}
                >
                  <option value="" disabled>Select Shift</option>
                  {filteredShifts.map((shift) => (
                    <option key={shift._id} value={shift._id}>
                      {shift.masterDefineShiftName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={onClose} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateAcademicHistoryModal;