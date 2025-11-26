import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import getAPI from '../../api/getAPI';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dropdown = ({ onSelect }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const schoolId = userDetails?.schoolId;

        if (!schoolId) {
          setError('School ID not found in local storage');
          return;
        }

        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        setAcademicYears(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch academic years.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYears();
  }, []);

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      const value = selectedOption.value;
      setSelectedAcademicYear(value);
      localStorage.setItem('selectedAcademicYear', value);

      if (onSelect) onSelect(value);
    }
  };

  const handleSubmit = () => {
    if (selectedAcademicYear) {
      navigate('/school-dashboard/fees-module/form/registration');
    } else {
      toast.error('Please select an academic year first.');
    }
  };

  const handleBack = () => {
    navigate('/school/go-to-dashboard');
  };

  const options = academicYears.map((obj) => ({
    value: obj.academicYear,
    label: obj.academicYear,
  }));

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="position-absolute top-0 end-0 m-3">
        <button
          onClick={handleBack}
          className="btn btn-dark shadow-sm px-3 py-1"
        >
          Back
        </button>
      </div>

      <h2 className="mb-4 text-center text-black">Select an Academic Year to View Related Data</h2>

      <div className="mb-3 w-100 d-flex justify-content-center">
        <div className="w-50">
          <Select
            options={options}
            onChange={handleSelect}
            placeholder="Select Academic Year"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <button onClick={handleSubmit} className="btn btn-dark shadow-sm px-4 py-2">
        Submit
      </button>
    </div>
  );
};

export default Dropdown;
