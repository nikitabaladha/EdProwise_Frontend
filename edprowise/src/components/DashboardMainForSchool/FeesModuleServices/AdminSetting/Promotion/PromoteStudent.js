import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import PromoteByAdmissionNumber from './PromoteByAdmissionNumber';
import PromoteByClassSection from './PromoteByClassSection';
import PromoteByOrder from './PromoteByOrder';

const PromoteStudent = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [promotionType, setPromotionType] = useState('admissionNumber');
  const [newAcademicYear, setNewAcademicYear] = useState(localStorage.getItem('selectedAcademicYear') || '');
  const [previousYear, setPreviousYear] = useState('');
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [previousShifts, setPreviousShifts] = useState([]); 

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error('School ID not found. Please log in again.');
      return;
    }
    setSchoolId(id);

    const academicYear = localStorage.getItem('selectedAcademicYear');
    if (academicYear) {
      setNewAcademicYear(academicYear);
      const [startYear, endYear] = academicYear.split('-').map(Number);
      setPreviousYear(`${startYear - 1}-${endYear - 1}`);
    } else {
      toast.error('No academic year selected in localStorage.');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!schoolId || !newAcademicYear) return;
        const response = await getAPI(`/get-class-and-section-year/${schoolId}/year/${newAcademicYear}`, {}, true);
        if (!response.hasError) {
          setClasses(response?.data?.data || []);
        } else {
          toast.error('Failed to fetch new academic year classes.');
        }
      } catch (error) {
        toast.error('Error fetching class and section data.');
      }
    };

    fetchData();
  }, [schoolId, newAcademicYear]);

  useEffect(() => {
    if (!schoolId || !newAcademicYear) return;

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift-year/${schoolId}/year/${newAcademicYear}`);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data) ? response.data.data : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || 'Failed to fetch new academic year shifts.');
        }
      } catch (err) {
        toast.error('Error fetching shift data.');
      }
    };

    fetchShifts();
  }, [schoolId, newAcademicYear]);

  useEffect(() => {
    if (!schoolId || !previousYear) return;

    const fetchPreviousShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift-year/${schoolId}/year/${previousYear}`);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data) ? response.data.data : [];
          setPreviousShifts(shiftArray);
        } else {
          toast.error(response.message || 'Failed to fetch previous academic year shifts.');
        }
      } catch (err) {
        toast.error('Error fetching previous shift data.');
      }
    };

    fetchPreviousShifts();
  }, [schoolId, previousYear]);

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4 text-center">Promote Student</h4>
          <div className="mb-3">
            <label className="form-label">Promotion Type</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="byAdmissionNumber"
                  value="admissionNumber"
                  checked={promotionType === 'admissionNumber'}
                  onChange={(e) => setPromotionType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="byAdmissionNumber">
                  Promote by Admission Number
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="byClassSection"
                  value="classSection"
                  checked={promotionType === 'classSection'}
                  onChange={(e) => setPromotionType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="byClassSection">
                  Promote by Class and Section
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="byOrder"
                  value="order"
                  checked={promotionType === 'order'}
                  onChange={(e) => setPromotionType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="byOrder">
                  Promote by firstName/lastName
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="byResult"
                  value="result"
                  checked={promotionType === 'result'}
                  onChange={(e) => setPromotionType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="byResult">
                  Promote by Result
                </label>
              </div>
            </div>
          </div>

          {promotionType === 'admissionNumber' && (
            <PromoteByAdmissionNumber
              schoolId={schoolId}
              newAcademicYear={newAcademicYear}
              previousYear={previousYear}
              classes={classes}
              shifts={shifts}
              navigate={navigate}
            />
          )}
          {promotionType === 'classSection' && (
            <PromoteByClassSection
              schoolId={schoolId}
              newAcademicYear={newAcademicYear}
              previousYear={previousYear}
              classes={classes}
              shifts={shifts}
              previousShifts={previousShifts} 
              navigate={navigate}
            />
          )}
          {promotionType === 'order' && (
            <PromoteByOrder 
              schoolId={schoolId}
              newAcademicYear={newAcademicYear}
              previousYear={previousYear}
              classes={classes}
              shifts={shifts}
              previousShifts={previousShifts} 
              navigate={navigate}
            />
          )}
          {promotionType === 'result' && (
            <div>Promote by Result functionality to be implemented</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoteStudent;