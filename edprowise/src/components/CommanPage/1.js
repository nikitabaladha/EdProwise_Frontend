import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getAPI from '../../api/getAPI';

const AcademicYearsDropdown = ({ onSelect }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a previously selected year in local storage
    const savedYear = localStorage.getItem('selectedAcademicYear');
    if (savedYear) {
      setSelectedYear(savedYear);
    }

    const fetchAcademicYears = async () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const schoolId = userDetails?.schoolId;

        if (!schoolId) {
          setError('School ID not found in local storage');
          setLoading(false);
          return;
        }

        const response = await getAPI(`/get-feesmanagment-year/${schoolId}`);
        setAcademicYears(response.data.data);
      } catch (err) {
        setError('Failed to fetch academic years. Please try again later.');
        console.error('Error fetching academic years:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicYears();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedYear(value);
    
 
    localStorage.setItem('selectedAcademicYear', value);
 
    if (onSelect) onSelect(value);
    
 
    if (value) {
      navigate('/school-dashboard/fees-module/form/registration');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="text-gray-600">Loading academic years...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">Select Academic Year</h2>
        <p className="text-gray-500">Choose the academic year to continue</p>
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Academic Year</label>
        <select
          value={selectedYear}
          onChange={handleChange}
          className="block w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-all duration-200"
        >
          <option value="">-- Select Academic Year --</option>
          {academicYears.map((item) => (
            <option key={item._id} value={item.academicYear} className="py-2">
              {item.academicYear}
            </option>
          ))}
        </select>
      </div>
      
      {selectedYear && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            Selected: <span className="font-semibold">{selectedYear}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AcademicYearsDropdown;