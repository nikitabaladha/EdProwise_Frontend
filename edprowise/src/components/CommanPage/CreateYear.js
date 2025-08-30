// // CreateYearModal.jsx
// import React, { useState } from 'react';
// import postAPI from '../../api/postAPI';
// import { toast } from 'react-toastify';

// const CreateYearModal = ({ isOpen, onClose, fetchAcademicYears }) => {
//   const [year, setYear] = useState('');

//   const handleSubmit = async () => {
//     if (!year) return toast.error('Please enter a year');

//     try {
//       const token = localStorage.getItem('token');
//       const res = await postAPI('/create-feesmanagment-year', { academicYear: year }, token);

//       if (!res.data.hasError) {
//         toast.success(res.data.message);
//         fetchAcademicYears(); 
//         onClose();      
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error('Failed to create academic year');
//       console.error(error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div style={overlayStyle}>
//       <div style={modalStyle}>
//         <h3>Create Academic Year</h3>
//         <input
//           type="text"
//           placeholder="e.g. 2025 or 2025-2026"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
//         />
//         <div style={{ textAlign: 'right' }}>
//           <button onClick={onClose} style={buttonStyle(false)}>Cancel</button>
//           <button onClick={handleSubmit} style={buttonStyle(true)}>Create</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const overlayStyle = {
//   position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
//   justifyContent: 'center', alignItems: 'center', zIndex: 1000
// };

// const modalStyle = {
//   backgroundColor: 'white', padding: '20px', borderRadius: '8px',
//   width: '300px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
// };

// const buttonStyle = (primary) => ({
//   padding: '6px 12px',
//   marginLeft: '10px',
//   backgroundColor: primary ? '#1a1729' : '#ccc',
//   color: primary ? 'white' : 'black',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// });

// export default CreateYearModal;

import React, { useState } from 'react';
import postAPI from '../../api/postAPI';
import { toast } from 'react-toastify';

const CreateYearModal = ({ isOpen, onClose, fetchAcademicYears }) => {
  const [year, setYear] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async () => {
    if (!year) return toast.error('Please enter an academic year');

    // Validate academic year format
    let formattedYear = year;
    if (/^\d{4}$/.test(year)) {
      const startYear = parseInt(year);
      formattedYear = `${startYear}-${startYear + 1}`;
    }
    if (!/^\d{4}-\d{4}$/.test(formattedYear)) {
      return toast.error('Invalid academic year format. Use YYYY or YYYY-YYYY (e.g., 2025 or 2025-2026).');
    }

    const [startYear, endYear] = formattedYear.split('-').map(Number);
    if (endYear - startYear !== 1) {
      return toast.error('Academic year must have a difference of 1 year (e.g., 2025-2026).');
    }

    // Validate startDate and endDate if provided
    if (startDate && new Date(startDate).getFullYear() !== startYear) {
      return toast.error(`Start date must be in the year ${startYear}.`);
    }
    if (endDate && new Date(endDate).getFullYear() !== endYear) {
      return toast.error(`End date must be in the year ${endYear}.`);
    }

    try {
      const token = localStorage.getItem('token');
      const payload = { academicYear: formattedYear };
      if (startDate) payload.startDate = startDate;
      if (endDate) payload.endDate = endDate;

      const res = await postAPI('/create-feesmanagment-year', payload, token);

      if (!res.data.hasError) {
        toast.success(res.data.message);
        fetchAcademicYears();
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to create academic year');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Create Academic Year</h3>
        <input
          type="text"
          placeholder="e.g. 2025 or 2025-2026"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <p style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>
          Note: The current academic year (e.g., 2025-2026) is automatically created with start date April 1 of the first year and end date March 31 of the second year if not present. For manual creation, if start and end dates are not provided, they will be set to these defaults.
        </p>
        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} style={buttonStyle(false)}>Cancel</button>
          <button onClick={handleSubmit} style={buttonStyle(true)}>Create</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
  justifyContent: 'center', alignItems: 'center', zIndex: 1000
};

const modalStyle = {
  backgroundColor: 'white', padding: '20px', borderRadius: '8px',
  width: '300px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
};

const buttonStyle = (primary) => ({
  padding: '6px 12px',
  marginLeft: '10px',
  backgroundColor: primary ? '#1a1729' : '#ccc',
  color: primary ? 'white' : 'black',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
});

export default CreateYearModal;
