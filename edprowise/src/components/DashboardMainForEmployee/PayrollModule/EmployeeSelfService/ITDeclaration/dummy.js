
import EmployeeRentDetail from '../../../../models/PayrollModule/Employee/EmployeeRentDetail.js';
import ItDeclaration from '../../../../models/PayrollModule/Employee/ItDeclaration.js';
import EmployeeCTC from '../../../../models/PayrollModule/Employeer/EmployeeCTC.js';
import fs from 'fs';
import path from 'path';

const submitRentDetails = async (req, res) => {
  try {
    const { academicYear, schoolId: bodySchoolId, employeeId: bodyEmployeeId } = req.body;
    const sessionUserDetails = req.session?.userDetails || {};
    const schoolId = sessionUserDetails.schoolId || bodySchoolId;
    const employeeId = sessionUserDetails.userId || bodyEmployeeId;

    console.log('Received data:', { schoolId, employeeId, academicYear, rentDetails: req.body.rentDetails });

    if (!schoolId || !employeeId || !academicYear) {
      console.error('Missing required fields:', { schoolId, employeeId, academicYear });
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: schoolId, employeeId, or academicYear'
      });
    }

    const ctc = await EmployeeCTC.findOne({ schoolId, employeeId, academicYear }).lean();
    if (!ctc) {
      console.error('CTC data not found:', { schoolId, employeeId, academicYear });
      return res.status(400).json({
        success: false,
        message: 'CTC data not found for the employee and academic year'
      });
    }

    const monthOrder = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'];

    const getCtcForMonth = (monthName, ctcData) => {
      const monthIndex = monthOrder.indexOf(monthName);
      if (monthIndex === -1) {
        throw new Error(`Invalid month: ${monthName}`);
      }

      const fiscalYearStart = parseInt(academicYear.split('-')[0]);
      const calendarMonth = (monthIndex + 3) % 12;
      const year = monthIndex < 9 ? fiscalYearStart : fiscalYearStart + 1;
      const monthEnd = new Date(year, calendarMonth + 1, 0);

      const applicableDate = new Date(ctcData.applicableDate);
      let selectedCtc = null;
      if (applicableDate <= monthEnd) {
        selectedCtc = {
          components: ctcData.components,
          totalAnnualCost: ctcData.totalAnnualCost,
          applicableDate: ctcData.applicableDate
        };
      } else {
        const validHistory = ctcData.history
          .filter((h) => new Date(h.applicableDate) <= monthEnd)
          .sort((a, b) => new Date(b.applicableDate) - new Date(a.applicableDate));
        if (validHistory.length > 0) {
          selectedCtc = {
            components: validHistory[0].components,
            totalAnnualCost: validHistory[0].totalAnnualCost,
            applicableDate: validHistory[0].applicableDate
          };
        }
      }

      if (!selectedCtc) {
        return {
          monthlyHRA: 0,
          monthlyBasicSalary: 0
        };
      }

      const hraComponent = selectedCtc.components.find(comp => comp.ctcComponentName.toLowerCase().includes('hra'));
      const basicSalaryComponent = selectedCtc.components.find(comp => comp.ctcComponentName.toLowerCase().includes('basic salary'));

      if (!hraComponent || !basicSalaryComponent) {
        throw new Error(`HRA or Basic Salary component not found in CTC for ${monthName}`);
      }

      return {
        monthlyHRA: (hraComponent.annualAmount || 0) / 12,
        monthlyBasicSalary: (basicSalaryComponent.annualAmount || 0) / 12
      };
    };

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxFileSize = 2 * 1024 * 1024;
    const filesByField = {};
    (req.files || []).forEach(file => {
      const match = file.fieldname.match(/rentReceipts\[(\d+)\]/);
      if (match) {
        const index = parseInt(match[1]);
        filesByField[index] = file;
      }
    });

    if (!Array.isArray(req.body.rentDetails) || req.body.rentDetails.length !== 12) {
      console.error('Invalid rentDetails array:', req.body.rentDetails);
      return res.status(400).json({
        success: false,
        message: 'rentDetails must be an array of 12 months'
      });
    }

    const rentDetails = [];
    let totalDeclaredRent = 0;
    let totalMonthActualHRAReceivedMetro = 0;
    let totalMonthActualRentPaidMetro = 0;
    let totalMonthBasicSalaryMetro = 0;
    let totalMonthActualHRAReceivedNonMetro = 0;
    let totalMonthActualRentPaidNonMetro = 0;
    let totalMonthBasicSalaryNonMetro = 0;

    for (const [index, detail] of req.body.rentDetails.entries()) {
      const { month, declaredRent, cityType, landlordName, landlordPanNumber, landlordAddress, existingRentReceipt } = detail;
      const rentReceipt = filesByField[index]?.path;
      const declaredRentValue = parseFloat(declaredRent) || 0;

      console.log(`Processing rentDetails[${index}]:`, { month, declaredRentValue, cityType, landlordName, landlordPanNumber, landlordAddress, rentReceipt });

      if (rentReceipt) {
        const file = filesByField[index];
        if (!validTypes.includes(file.mimetype)) {
          throw new Error(`Invalid file type for rentDetails[${index}]. Only JPEG, PNG, or PDF allowed.`);
        }
        if (file.size > maxFileSize) {
          throw new Error(`File size for rentDetails[${index}] exceeds 2MB.`);
        }
      }

      const normalizedExistingRentReceipt = existingRentReceipt ? path.normalize(existingRentReceipt) : null;
      const normalizedRentReceipt = rentReceipt ? path.normalize(rentReceipt) : null;

      if (declaredRentValue > 0) {
        if (!month || !monthOrder.includes(month)) {
          throw new Error(`Invalid or missing month for rentDetails[${index}]`);
        }
        if (!cityType || !['Metro', 'Non-Metro'].includes(cityType)) {
          throw new Error(`Invalid or missing cityType for rentDetails[${index}]`);
        }
        if (!landlordName || !landlordAddress || (!normalizedRentReceipt && !normalizedExistingRentReceipt)) {
          throw new Error(`Missing required fields for rentDetails[${index}]: landlordName, landlordAddress, or rentReceipt`);
        }
        if (declaredRentValue > 100000 && !landlordPanNumber) {
          throw new Error(`Missing landlordPanNumber for rentDetails[${index}] with declaredRent > ₹1,00,000`);
        }

        const { monthlyHRA, monthlyBasicSalary } = getCtcForMonth(month, ctc);
        const monthActualRentPaid = declaredRentValue;
        const monthBasicSalaryCity = parseFloat(monthlyBasicSalary);

        if (normalizedRentReceipt && normalizedExistingRentReceipt && fs.existsSync(normalizedExistingRentReceipt)) {
          fs.unlinkSync(normalizedExistingRentReceipt);
          console.log(`Deleted old file: ${normalizedExistingRentReceipt}`);
        }

        rentDetails.push({
          month,
          declaredRent: declaredRentValue,
          cityType,
          landlordName,
          landlordPanNumber: landlordPanNumber || '',
          landlordAddress,
          rentReceipt: normalizedRentReceipt || normalizedExistingRentReceipt,
          monthActualHRAReceived: monthlyHRA,
          monthActualRentPaid,
          monthBasicSalaryCity
        });

        totalDeclaredRent += declaredRentValue;
        if (cityType === 'Metro') {
          totalMonthActualHRAReceivedMetro += monthlyHRA;
          totalMonthActualRentPaidMetro += monthActualRentPaid;
          totalMonthBasicSalaryMetro += monthBasicSalaryCity;
        } else if (cityType === 'Non-Metro') {
          totalMonthActualHRAReceivedNonMetro += monthlyHRA;
          totalMonthActualRentPaidNonMetro += monthActualRentPaid;
          totalMonthBasicSalaryNonMetro += monthBasicSalaryCity;
        }
      } else {
        rentDetails.push({
          month,
          declaredRent: 0,
          cityType: '',
          landlordName: '',
          landlordPanNumber: '',
          landlordAddress: '',
          rentReceipt: null,
          monthActualHRAReceived: 0,
          monthActualRentPaid: 0,
          monthBasicSalaryCity: 0
        });
      }
    }

    if (rentDetails.length === 0) {
      console.error('No rent details provided');
      return res.status(400).json({
        success: false,
        message: 'No rent details provided'
      });
    }

    // Metro calculations
    const actualHRAReceivedMetro = totalMonthActualHRAReceivedMetro;
    const basicSalaryMetroCity = totalMonthBasicSalaryMetro * 0.5;
    const actualRentPaidMetro = totalMonthActualRentPaidMetro - (totalMonthBasicSalaryMetro * 0.1);
    const metroHraExemption = Math.min(
      actualHRAReceivedMetro,
      actualRentPaidMetro,
      basicSalaryMetroCity
    );

    // Non-Metro calculations
    const actualHRAReceivedNonMetro = totalMonthActualHRAReceivedNonMetro;
    const basicSalaryNonMetroCity = totalMonthBasicSalaryNonMetro * 0.4;
    const actualRentPaidNonMetro = totalMonthActualRentPaidNonMetro - (totalMonthBasicSalaryNonMetro * 0.1);
    const nonMetroHraExemption = Math.min(
      actualHRAReceivedNonMetro,
      actualRentPaidNonMetro,
      basicSalaryNonMetroCity
    );

    // Combined totals
    const actualHRAReceived = actualHRAReceivedMetro + actualHRAReceivedNonMetro;
    const actualRentPaid = totalMonthActualRentPaidMetro + totalMonthActualRentPaidNonMetro;
    const basicSalaryCity = totalMonthBasicSalaryMetro + totalMonthBasicSalaryNonMetro;
    const rentPaidMinusTenPercent = actualRentPaid - (basicSalaryCity * 0.1);
    const hraExemption = metroHraExemption + nonMetroHraExemption;

    console.log('Totals:', {
      actualHRAReceived,
      actualRentPaid,
      basicSalaryCity,
      rentPaidMinusTenPercent,
      hraExemption,
      metroHraExemption,
      nonMetroHraExemption
    });

    rentDetails.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

    const rentDetailData = {
      schoolId,
      employeeId,
      academicYear,
      actualHRAReceived,
      actualRentPaid,
      basicSalaryCity,
      hraExemption,
      rentDetails
    };

    console.log('Saving rent details:', rentDetailData);

    const rentDetail = await EmployeeRentDetail.findOneAndUpdate(
      { schoolId, employeeId, academicYear },
      rentDetailData,
      { upsert: true, new: true, runValidators: true }
    );

    console.log('Rent detail saved:', rentDetail);

    await ItDeclaration.findOneAndUpdate(
      { schoolId, employeeId, academicYear },
      { 'hraExemption.rentDetailsId': rentDetail._id },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: rentDetail,
      message: 'Rent details submitted successfully'
    });
  } catch (error) {
    if (req.files) {
      req.files.forEach(file => {
        const normalizedPath = path.normalize(file.path);
        if (fs.existsSync(normalizedPath)) {
          fs.unlinkSync(normalizedPath);
          console.log(`Cleaned up file: ${normalizedPath}`);
        }
      });
    }
    console.error('Error submitting rent details:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

export default submitRentDetails;


**Changes**:
- Removed `monthHraExemption` from `rentDetails` push.
- Fixed `hraExemption` calculation by ensuring `metroHraExemption` and `nonMetroHraExemption` are numbers (removed `.toFixed(0)`).
- Separated Metro and Non-Metro totals correctly based on `cityType` per month.
- Added logging for totals to aid debugging.

### Corrected Mongoose Schema
Revert to the original schema without `monthHraExemption`.

<xaiArtifact artifact_id="49f962b8-4bed-4415-91d9-a544da21c7f3" artifact_version_id="1579d196-5674-4322-8550-a20d971fe16b" title="EmployeeRentDetail.js" contentType="text/javascript">
```javascript
import mongoose from 'mongoose';

const monthRentDetailSchema = new mongoose.Schema({
  month: {
    type: String,
    enum: ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'],
    required: true
  },
  declaredRent: {
    type: Number,
    required: true,
    min: 0
  },
  cityType: {
    type: String,
    enum: ['Metro', 'Non-Metro', ''],
    required: function() {
      return this.declaredRent > 0;
    }
  },
  landlordName: {
    type: String,
    required: function() {
      return this.declaredRent > 0;
    }
  },
  landlordPanNumber: {
    type: String,
    required: function() {
      return this.declaredRent > 100000;
    }
  },
  landlordAddress: {
    type: String,
    required: function() {
      return this.declaredRent > 0;
    }
  },
  rentReceipt: {
    type: String,
    required: function() {
      return this.declaredRent > 0;
    }
  },
  monthActualHRAReceived: {
    type: Number,
    required: true,
    min: 0
  },
  monthActualRentPaid: {
    type: Number,
    required: true,
    min: 0
  },
  monthBasicSalaryCity: {
    type: Number,
    required: true,
    min: 0
  }
});

const employeeRentDetailSchema = new mongoose.Schema({
  schoolId: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  actualHRAReceived: {
    type: Number,
    required: true,
    min: 0
  },
  actualRentPaid: {
    type: Number,
    required: true,
    min: 0
  },
  basicSalaryCity: {
    type: Number,
    required: true,
    min: 0
  },
  hraExemption: {
    type: Number,
    required: true,
    min: 0
  },
  rentDetails: [monthRentDetailSchema]
}, {
  timestamps: true
});

export default mongoose.model('EmployeeRentDetail', employeeRentDetailSchema);
```

**Changes**:
- Removed `monthHraExemption` from `monthRentDetailSchema`.

### Corrected Multer Middleware
Use `req.body.employeeId` for filename generation.

<xaiArtifact artifact_id="97d0dd47-7acf-4629-aa1a-3fe63f3c0b08" artifact_version_id="eb5a8c3f-e97b-4b4c-828f-11d5a4a3e4ec" title="rentDetailsUpload.js" contentType="text/javascript">
```javascript
import multer from "multer";
import path from "path";
import fs from "fs";

const rentDetailsDir = "./Documents/RentDetailsReceipts";

if (!fs.existsSync(rentDetailsDir)) {
  fs.mkdirSync(rentDetailsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, rentDetailsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fieldIndex = file.fieldname.match(/\[(\d+)\]/)?.[1] || 'unknown';
    const filename = `Rent_${req.body.employeeId || 'unknown'}_${fieldIndex}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}. Only JPEG, PNG, or PDF are allowed.`), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter
}).any();

const rentDetailsUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      let message = 'File upload failed';
      if (err.code === 'LIMIT_FILE_SIZE') {
        message = `File size exceeds 2MB limit for ${err.field}`;
      } else if (err.message.includes('Invalid file type')) {
        message = err.message;
      } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = `Unexpected file field received: ${err.field}`;
      } else {
        message = err.message || 'Unknown file upload error';
      }

      console.error('Multer Error:', message, err);
      return res.status(400).json({
        success: false,
        message
      });
    }

    console.log('Multer req.files:', req.files);
    console.log('Multer req.body:', req.body);
    next();
  });
};

export default rentDetailsUpload;
```

### Corrected Frontend Code
The frontend should:
- Calculate Metro and Non-Metro HRA exemptions at the aggregate level, matching the backend.
- Avoid copying previous `monthActualHRAReceived`, `monthActualRentPaid`, and `monthBasicSalaryCity` values.
- Allow different `cityType` values.
- Display Metro and Non-Metro totals in the summary table.
- Remove the HRA exemption column from the monthly table since it’s not calculated per month.

<xaiArtifact artifact_id="cd923bb9-1cb6-48e7-bb0c-6a0e0a2cb100" artifact_version_id="8d0d9055-a921-40be-be6b-b1f77dc4de62" title="EmployeeRentDetails.jsx" contentType="text/jsx">
```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';

const EmployeeRentDetails = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [totals, setTotals] = useState({
    declaredRent: 0,
    actualHRAReceivedMetro: 0,
    actualRentPaidMetro: 0,
    basicSalaryMetro: 0,
    hraExemptionMetro: 0,
    actualHRAReceivedNonMetro: 0,
    actualRentPaidNonMetro: 0,
    basicSalaryNonMetro: 0,
    hraExemptionNonMetro: 0,
    actualHRAReceived: 0,
    actualRentPaid: 0,
    basicSalaryCity: 0,
    hraExemption: 0
  });

  const [rentDetails, setRentDetails] = useState([
    { month: 'April', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'May', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'June', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'July', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'August', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'September', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'October', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'November', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'December', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'January', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'February', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 },
    { month: 'March', declaredRent: 0, cityType: '', landlordName: '', landlordPanNumber: '', landlordAddress: '', rentReceipt: null, existingRentReceipt: null, monthActualHRAReceived: 0, monthActualRentPaid: 0, monthBasicSalaryCity: 0 }
  ]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (!userDetails?.schoolId || !userDetails?.userId) {
      toast.error('Authentication details missing');
      navigate('/login');
      return;
    }
    setSchoolId(userDetails.schoolId);
    setEmployeeId(userDetails.userId);

    fetchEmployeeData(userDetails.schoolId, userDetails.userId);
    fetchRentDetails(userDetails.schoolId, userDetails.userId);
  }, [navigate]);

  const fetchEmployeeData = async (schoolId, empId) => {
    try {
      const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
      if (!employeeRes.hasError && employeeRes.data?.data) {
        setEmployeeDetails(employeeRes.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch employee details");
      console.error("Fetch employee error:", error);
    }
  };

  const fetchRentDetails = async (schoolId, empId) => {
    try {
      const rentRes = await getAPI(`/rent-details/${schoolId}/${empId}?academicYear=${academicYear}`);
      if (!rentRes.hasError && rentRes.data?.data) {
        const fetchedRentDetails = rentRes.data.data.rentDetails.map(item => ({
          ...item,
          rentReceipt: null,
          existingRentReceipt: item.rentReceipt,
          monthActualHRAReceived: 0, // Reset to avoid copying
          monthActualRentPaid: item.declaredRent, // Use declaredRent
          monthBasicSalaryCity: 0 // Reset to avoid copying
        }));
        setRentDetails(fetchedRentDetails);
        console.log("Get Rent Res", rentRes);
        calculateTotals(fetchedRentDetails);
      }
    } catch (error) {
      toast.error("Failed to fetch rent details");
      console.error("Fetch rent details error:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRentDetails = [...rentDetails];
    updatedRentDetails[index] = {
      ...updatedRentDetails[index],
      [field]: field === 'declaredRent' ? Number(value.replace(/,/g, '')) || 0 : value,
      monthActualRentPaid: field === 'declaredRent' ? Number(value.replace(/,/g, '')) || 0 : updatedRentDetails[index].monthActualRentPaid
    };
    setRentDetails(updatedRentDetails);
    calculateTotals(updatedRentDetails);
  };

  const calculateTotals = (details) => {
    let totalDeclaredRent = 0;
    let totalMonthActualHRAReceivedMetro = 0;
    let totalMonthActualRentPaidMetro = 0;
    let totalMonthBasicSalaryMetro = 0;
    let totalMonthActualHRAReceivedNonMetro = 0;
    let totalMonthActualRentPaidNonMetro = 0;
    let totalMonthBasicSalaryNonMetro = 0;

    details.forEach(item => {
      totalDeclaredRent += item.declaredRent || 0;
      if (item.cityType === 'Metro') {
        totalMonthActualHRAReceivedMetro += item.monthActualHRAReceived || 0;
        totalMonthActualRentPaidMetro += item.monthActualRentPaid || 0;
        totalMonthBasicSalaryMetro += item.monthBasicSalaryCity || 0;
      } else if (item.cityType === 'Non-Metro') {
        totalMonthActualHRAReceivedNonMetro += item.monthActualHRAReceived || 0;
        totalMonthActualRentPaidNonMetro += item.monthActualRentPaid || 0;
        totalMonthBasicSalaryNonMetro += item.monthBasicSalaryCity || 0;
      }
    });

    const actualHRAReceivedMetro = totalMonthActualHRAReceivedMetro;
    const basicSalaryMetroCity = totalMonthBasicSalaryMetro * 0.5;
    const actualRentPaidMetro = totalMonthActualRentPaidMetro - (totalMonthBasicSalaryMetro * 0.1);
    const hraExemptionMetro = Math.min(
      actualHRAReceivedMetro,
      actualRentPaidMetro,
      basicSalaryMetroCity
    );

    const actualHRAReceivedNonMetro = totalMonthActualHRAReceivedNonMetro;
    const basicSalaryNonMetroCity = totalMonthBasicSalaryNonMetro * 0.4;
    const actualRentPaidNonMetro = totalMonthActualRentPaidNonMetro - (totalMonthBasicSalaryNonMetro * 0.1);
    const hraExemptionNonMetro = Math.min(
      actualHRAReceivedNonMetro,
      actualRentPaidNonMetro,
      basicSalaryNonMetroCity
    );

    const actualHRAReceived = actualHRAReceivedMetro + actualHRAReceivedNonMetro;
    const actualRentPaid = totalMonthActualRentPaidMetro + totalMonthActualRentPaidNonMetro;
    const basicSalaryCity = totalMonthBasicSalaryMetro + totalMonthBasicSalaryNonMetro;
    const hraExemption = hraExemptionMetro + hraExemptionNonMetro;

    setTotals({
      declaredRent: totalDeclaredRent,
      actualHRAReceivedMetro,
      actualRentPaidMetro,
      basicSalaryMetro: totalMonthBasicSalaryMetro,
      hraExemptionMetro,
      actualHRAReceivedNonMetro,
      actualRentPaidNonMetro,
      basicSalaryNonMetro: totalMonthBasicSalaryNonMetro,
      hraExemptionNonMetro,
      actualHRAReceived,
      actualRentPaid,
      basicSalaryCity,
      hraExemption
    });
  };

  const handleFileUpload = (index, file) => {
    const updatedRentDetails = [...rentDetails];
    if (!file) {
      updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: null };
      setRentDetails(updatedRentDetails);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, or PDF files are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must be less than 2MB');
      return;
    }

    updatedRentDetails[index] = { ...updatedRentDetails[index], rentReceipt: file };
    setRentDetails(updatedRentDetails);
  };

  const validateSubmission = () => {
    const invalidRentDetails = rentDetails.some(
      item => item.declaredRent > 0 && (
        !item.cityType ||
        !item.landlordName ||
        !item.landlordAddress ||
        (item.declaredRent > 100000 && !item.landlordPanNumber) ||
        (!item.rentReceipt && !item.existingRentReceipt)
      )
    );

    if (invalidRentDetails) {
      toast.error('Please provide all required fields (city type, landlord name, address, PAN if rent > ₹1,00,000, and rent receipt) for non-zero rent entries');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateSubmission()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('schoolId', schoolId);
      formData.append('employeeId', employeeId);
      formData.append('academicYear', academicYear);

      rentDetails.forEach((item, index) => {
        formData.append(`rentDetails[${index}][month]`, item.month);
        formData.append(`rentDetails[${index}][declaredRent]`, item.declaredRent);
        formData.append(`rentDetails[${index}][cityType]`, item.cityType || '');
        formData.append(`rentDetails[${index}][landlordName]`, item.landlordName || '');
        formData.append(`rentDetails[${index}][landlordPanNumber]`, item.landlordPanNumber || '');
        formData.append(`rentDetails[${index}][landlordAddress]`, item.landlordAddress || '');
        if (item.existingRentReceipt) {
          formData.append(`rentDetails[${index}][existingRentReceipt]`, item.existingRentReceipt);
        }
        if (item.rentReceipt instanceof File) {
          formData.append(`rentReceipts[${index}]`, item.rentReceipt);
        }
      });

      const response = await postAPI(
        `/rent-details/${schoolId}/${employeeId}`,
        formData,
        { 'Content-Type': 'multipart/form-data' },
        true
      );

      if (!response.hasError) {
        toast.success("Rent details submitted successfully!");
        fetchRentDetails(schoolId, employeeId);
      } else {
        toast.error(response.message || "Failed to submit rent details");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while submitting the rent details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  const getFileName = (rentReceipt, existingRentReceipt) => {
    if (rentReceipt instanceof File) {
      return rentReceipt.name.length > 25 ? rentReceipt.name.slice(0, 25) + '...' : rentReceipt.name;
    }
    if (existingRentReceipt) {
      const fullName = existingRentReceipt.split('\\').pop().split('/').pop() || 'Existing file';
      return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
    }
    return 'No file';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Employee Rent Details
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary ms-2 custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="table-responsive mb-4">
                  <table className="border border-dark mb-4 table table-hover">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Month</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Declared Rent</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">City Type</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Name</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord PAN</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Landlord Address</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Rent Receipt</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Actual HRA Received</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Actual Rent Paid</th>
                        <th className="text-center align-content-center border border-dark p-2 text-nowrap">Basic Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentDetails.map((item, index) => (
                        <tr key={index} className='payroll-table-body'>
                          <td className="align-content-center border border-dark p-2">{item.month}</td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border text-end"
                              value={formatCurrency(item.declaredRent)}
                              onChange={(e) => handleInputChange(index, 'declaredRent', e.target.value)}
                              required={item.declaredRent > 0}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <select
                              className="form-control payroll-input-border"
                              value={item.cityType}
                              onChange={(e) => handleInputChange(index, 'cityType', e.target.value)}
                              required={item.declaredRent > 0}
                            >
                              <option value="">Select City Type</option>
                              <option value="Metro">Metro</option>
                              <option value="Non-Metro">Non-Metro</option>
                            </select>
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border"
                              value={item.landlordName}
                              onChange={(e) => handleInputChange(index, 'landlordName', e.target.value)}
                              required={item.declaredRent > 0}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border"
                              value={item.landlordPanNumber}
                              onChange={(e) => handleInputChange(index, 'landlordPanNumber', e.target.value)}
                              required={item.declaredRent > 100000}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <input
                              type="text"
                              className="form-control payroll-table-body payroll-input-border"
                              value={item.landlordAddress}
                              onChange={(e) => handleInputChange(index, 'landlordAddress', e.target.value)}
                              required={item.declaredRent > 0}
                            />
                          </td>
                          <td className="align-content-center border border-dark p-2">
                            <div className="d-flex align-items-center">
                              <input
                                type="file"
                                className="form-control payroll-input-border me-2"
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                required={item.declaredRent > 0 && !item.rentReceipt && !item.existingRentReceipt}
                              />
                            </div>
                            {(item.rentReceipt || item.existingRentReceipt) && (
                              <div className="mt-2">
                                <small>{getFileName(item.rentReceipt, item.existingRentReceipt)}</small>
                              </div>
                            )}
                          </td>
                          <td className="align-content-center border border-dark p-2 text-end">
                            {formatCurrency(item.monthActualHRAReceived)}
                          </td>
                          <td className="align-content-center border border-dark p-2 text-end">
                            {formatCurrency(item.monthActualRentPaid)}
                          </td>
                          <td className="align-content-center border border-dark p-2 text-end">
                            {formatCurrency(item.monthBasicSalaryCity)}
                          </td>
                        </tr>
                      ))}
                      <tr className='payroll-table-body it-declaration-section-bg'>
                        <td className="align-content-center border fw-bold border-dark p-2">Total</td>
                        <td className="align-content-center border fw-bold border-dark p-2">{formatCurrency(totals.declaredRent)}</td>
                        <td className="align-content-center border fw-bold border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2"></td>
                        <td className="align-content-center fw-bold border border-dark p-2 text-end">{formatCurrency(totals.actualHRAReceived)}</td>
                        <td className="align-content-center fw-bold border border-dark p-2 text-end">{formatCurrency(totals.actualRentPaid)}</td>
                        <td className="align-content-center fw-bold border border-dark p-2 text-end">{formatCurrency(totals.basicSalaryCity)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer border-top" style={{ overflowX: "auto" }}>
                  <div className="d-flex justify-content-end mt-3">
                    <div className="text-end">
                      <button
                        type="submit"
                        className="btn btn-primary custom-submit-button"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="table-responsive mb-4">
                <table className="border border-dark mb-4 table table-hover">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                      <th className="text-center align-content-center border border-dark p-2 text-nowrap">Particulars</th>
                      <th className="text-center align-content-center border border-dark p-2 text-nowrap">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Received (Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualHRAReceivedMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Rent Paid - 10% of Basic Salary (Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualRentPaidMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">50% of Basic Salary (Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.basicSalaryMetro * 0.5)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Exemption (Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.hraExemptionMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Received (Non-Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualHRAReceivedNonMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Rent Paid - 10% of Basic Salary (Non-Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualRentPaidNonMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">40% of Basic Salary (Non-Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.basicSalaryNonMetro * 0.4)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">HRA Exemption (Non-Metro)</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.hraExemptionNonMetro)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Total HRA Received</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualHRAReceived)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Total Rent Paid</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.actualRentPaid)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Total Basic Salary</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.basicSalaryCity)}</td>
                    </tr>
                    <tr className='payroll-table-body'>
                      <td className="align-content-center border border-dark p-2">Total HRA Exemption</td>
                      <td className="align-content-center border border-dark p-2">{formatCurrency(totals.hraExemption)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRentDetails;
```

### Key Frontend Changes
1. **Removed Per-Month HRA Exemption**:
   - Removed the `monthHraExemption` field from `rentDetails` and the monthly table.
   - HRA exemption is now calculated only at the aggregate level in `calculateTotals`.

2. **Avoid Copying Previous Data**:
   - In `fetchRentDetails`, reset `monthActualHRAReceived` and `monthBasicSalaryCity` to 0 to avoid copying previous values. Set `monthActualRentPaid` to `declaredRent` to reflect user input.

3. **Metro and Non-Metro Calculations**:
   - Updated `calculateTotals` to compute Metro and Non-Metro HRA exemptions at the aggregate level, matching the backend logic.
   - Ensured `totals` state includes separate Metro and Non-Metro fields.

4. **City Type Flexibility**:
   - Removed the `cityType` consistency validation from `validateSubmission`, allowing different `cityType` values for different months.

5. **Summary Table**:
   - Displays Metro and Non-Metro totals separately, including HRA received, rent paid minus 10% of basic salary, percentage of basic salary, and HRA exemption.

6. **Input Handling**:
   - In `handleInputChange`, sync `monthActualRentPaid` with `declaredRent` to match backend logic.

### Debugging Steps
1. **Verify Backend Calculations**:
   - Check console logs for `Totals` and `Saving rent details` to ensure `hraExemption`, `metroHraExemption`, and `nonMetroHraExemption` are correct numbers.
   - Test with mixed Metro and Non-Metro entries in Postman:
     ```json
     {
       "schoolId": "testSchool",
       "employeeId": "testEmployee",
       "academicYear": "2025-26",
       "rentDetails[0][month]": "April",
       "rentDetails[0][declaredRent]": 15000,
       "rentDetails[0][cityType]": "Metro",
       "rentDetails[0][landlordName]": "John Doe",
       "rentDetails[0][landlordPanNumber]": "",
       "rentDetails[0][landlordAddress]": "123 Street",
       "rentDetails[1][month]": "May",
       "rentDetails[1][declaredRent]": 20000,
       "rentDetails[1][cityType]": "Non-Metro",
       "rentDetails[1][landlordName]": "Jane Doe",
       "rentDetails[1][landlordPanNumber]": "",
       "rentDetails[1][landlordAddress]": "456 Avenue"
       // ... other months
     }
     ```

2. **Verify Frontend Display**:
   - Ensure the summary table shows correct Metro and Non-Metro totals after entering data.
   - Test with different `cityType` values and verify totals reflect separate calculations.

3. **Check Database**:
   - Use MongoDB Compass to verify the `EmployeeRentDetail` document has correct `hraExemption` and no `monthHraExemption`.
   - Query: `db.EmployeeRentDetail.find({ schoolId: "testSchool", employeeId: "testEmployee", academicYear: "2025-26" })`.

4. **Test File Upload**:
   - Ensure files are uploaded with correct filenames using `req.body.employeeId`.

### Additional Recommendations
- **PAN Validation**: Add regex validation for `landlordPanNumber` (e.g., `/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/`) in frontend and backend.
- **Security**: Replace `localStorage` with HTTP-only cookies or server-side sessions.
- **Error Feedback**: Display specific backend error messages in the frontend using `response.message`.
- **CTC Data**: Ensure `EmployeeCTC` has valid `hra` and `basic salary` components.

### Assumptions
- `EmployeeCTC` and `ItDeclaration` models exist and are correctly structured.
- The backend route is `POST /rent-details/:schoolId/:employeeId` with `rentDetailsUpload` middleware.
- MongoDB connection is established.

This code should now correctly calculate HRA exemptions at the aggregate level for Metro and Non-Metro, avoid copying unwanted data, allow flexible `cityType` values, and display accurate totals in the frontend. If you encounter issues, share console logs or specific errors, and I’ll assist further!



{/* UPDATED Once */}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';

const EmployeeItDeclaration = () => {
    const navigate = useNavigate();
    const [schoolId, setSchoolId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [academicYear, setAcademicYear] = useState("2025-26");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [employeeCtc, setEmployeeCtcDetails] = useState(null);
    const [section80C, setSection80C] = useState({
        items: [
            {
                section: "80C",
                category: "Life Insurance Premium including Bima Nivesh (only Self, Spouse and children)",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Employee Provident Fund (EPF)",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
            },
            {
                section: "80C",
                category: "Public Provident Fund (PPF)",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
            },
            {
                section: "80C",
                category: "Tuition Fees (For 2 Children)",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
            },
            {
                section: "80C",
                category: "5 Year Bank Fixed Deposit",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
            },
            {
                section: "80C",
                category: "5 Year Post Office Time Deposit",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Sukanya Samriddhi Account",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Housing Loan Payment of Principal/Stamp Duty & Registration",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Unit Link Insurance Plan / Infrastructure Bond / National Saving Certificate / Accrued Interest on NSC",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80C",
                category: "Subscription to notified Central Government security (NSS) / Mutual Funds/ELSS and others / Pension Fund",
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            }
        ],
        sectionLimit: 150000,
        finalDeduction: 0
    });

    const [section80D, setSection80D] = useState({
        items: [
            {
                section: "80D",
                category: "Medical Insurance Premium For Self, Spouse and Dependent Children (Age Below 60 Years)",
                categoryLimit: 25000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Insurance Premium For Self, Spouse and Dependent Children (60 Years or Above)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Insurance Premium For Parents (Age Below 60 Years)",
                categoryLimit: 25000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Insurance Premium For Parents (60 Years or Above)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Expenditure for Self (60 Years or Above) (If No Insurance Premium)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Medical Expenditure for Parents (60 Years or Above) (If No Insurance Premium)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "80D",
                category: "Preventive Health Checkup (Self, Family or Parents)",
                categoryLimit: 5000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            }
        ],
        finalDeduction: 0
    });

    const [otherSections, setOtherSections] = useState({
        items: [
            {
                section: "Other",
                category: "Deduction For Dependent With Disability (Form 10-I) (Flat Deduction of INR 75000) (Yes/No)",
                categoryLimit: 75000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Deduction For Dependent With Severe Disability (Form 10-I)",
                categoryLimit: 125000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Deduction For Self Disability",
                categoryLimit: 75000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Deduction For Self Severe Disability",
                categoryLimit: 125000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Other",
                category: "Mediclaim Expenses For Critical Illness (Deduction allowed to the extent of expenses incurred, Maximum of INR 40000)",
                categoryLimit: 40000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "Other",
                category: "Mediclaim Expenses For Critical Illness - Senior Citizen (Deduction allowed to the extent of expenses incurred, Maximum of INR 100000)",
                categoryLimit: 100000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "Other",
                category: "Interest on Educational Loan for Higher Studies (u/s 80E) - Self, Spouse & Children [Allowed for 8 Years from repayment starts]",
                categoryLimit: 0,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: ""
            },
            {
                section: "Section80EE",
                category: "Interest on Home Loan (u/s 80EE) (Loan Sanctioned between April 2016 to Mar 2017)",
                categoryLimit: 50000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            },
            {
                section: "Section80EEA",
                category: "Interest on Home Loan (u/s 80EEA) (Loan Sanctioned between April 2019 to Mar 2022) (Cost of House Less than 45 Lakh)",
                categoryLimit: 150000,
                categoryFinalDeduction: 0,
                proofSubmitted: 0,
                proofDocument: null,
                existingDocument: null,
                status: "Pending",
                adminRemarks: "",
                enabled: false
            }
        ],
        finalDeduction: 0
    });

    const [hraExemption, setHraExemption] = useState({
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: ""
    });

    const [ltaExemption, setLTAExemption] = useState({
        categoryLimit: 0,
        categoryFinalDeduction: 0,
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: "",
        ltaDetailsId: null // Added to store reference to EmployeeltaDetails
    });

    const [telephoneAllowance, setTelephoneAllowance] = useState({
        categoryLimit: 0,
        categoryFinalDeduction: 0,
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: "",
        telephoneAllowanceDetailsId: null // Added to store reference
    });

    const [internetAllowance, setInternetAllowance] = useState({
        categoryLimit: 0,
        categoryFinalDeduction: 0,
        proofSubmitted: 0,
        proofDocument: null,
        existingDocument: null,
        status: "Pending",
        adminRemarks: "",
        internetAllowanceDetailsId: null // Added to store reference
    });

    const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);
    const handleTermsChange = (e) => {
        setAcceptTermsAndConditions(e.target.checked);
    };

    const [isBuyer, setIsBuyer] = useState(false);
    const [isYes, setIsYes] = useState(false);
    const [isYes1, setIsYes1] = useState(false);
    const [isYes2, setIsYes2] = useState(false);

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (!userDetails?.schoolId || !userDetails?.userId) {
            toast.error('Authentication details missing');
            navigate('/login');
            return;
        }
        setSchoolId(userDetails.schoolId);
        setEmployeeId(userDetails.userId);
        setAcademicYear(userDetails.acadmicYear || "2025-26");

        fetchEmployeeData(userDetails.schoolId, userDetails.userId);
        feachEmployeeCtc(userDetails.schoolId, userDetails.userId, userDetails.acadmicYear || "2025-26");
        fetchItDeclaration(userDetails.schoolId, userDetails.userId);
        fetchLtaDetails(userDetails.schoolId, userDetails.userId, userDetails.acadmicYear || "2025-26");
        fetchInternetAllowanceDetails(userDetails.schoolId, userDetails.userId, userDetails.acadmicYear || "2025-26");
        fetchTelephoneAllowanceDetails(userDetails.schoolId, userDetails.userId, userDetails.acadmicYear || "2025-26");
    }, [navigate]);

    const fetchEmployeeData = async (schoolId, empId) => {
        try {
            const employeeRes = await getAPI(`/get-employee-self-details/${schoolId}/${empId}?academicYear=${academicYear}`);
            if (!employeeRes.hasError && employeeRes.data?.data) {
                setEmployeeDetails(employeeRes.data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch employee details");
        }
    };

    const fetchItDeclaration = async (schoolId, empId) => {
        try {
            const declarationRes = await getAPI(`/it-declaration/${schoolId}/${empId}?academicYear=${academicYear}`);
            if (!declarationRes.hasError && declarationRes.data?.data) {
                const data = declarationRes.data.data;
                setSection80C({
                    ...data.section80C,
                    items: data.section80C.items.map(item => ({
                        ...item,
                        proofDocument: null,
                        existingDocument: item.proofDocument
                    }))
                });
                setSection80D({
                    ...data.section80D,
                    items: data.section80D.items.map(item => ({
                        ...item,
                        proofDocument: null,
                        existingDocument: item.proofDocument
                    }))
                });
                setOtherSections({
                    ...data.otherSections,
                    items: data.otherSections.items.map(item => ({
                        ...item,
                        proofDocument: null,
                        existingDocument: item.proofDocument,
                        enabled: item.proofSubmitted > 0 && [0, 1, 2, 3, 7, 8].includes(data.otherSections.items.indexOf(item))
                    }))
                });
                setHraExemption({
                    ...data.hraExemption,
                    proofDocument: null,
                    existingDocument: data.hraExemption.proofDocument
                });
                setEmployeeDetails(prev => ({
                    ...prev,
                    taxRegime: data.taxRegime,
                    panNumber: data.panNumber
                }));
                setAcceptTermsAndConditions(data.acceptTermsAndConditions);
                setIsBuyer(data.otherSections.items[0].enabled);
                setIsYes(data.otherSections.items[1].enabled);
                setIsYes1(data.otherSections.items[2].enabled);
                setIsYes2(data.otherSections.items[3].enabled);
                // Set ltaExemption, internetAllowance, and telephoneAllowance from ItDeclaration
                setLTAExemption(prev => ({
                    ...prev,
                    status: data.otherExemption?.ltaExemption?.status || "Pending",
                    adminRemarks: data.otherExemption?.ltaExemption?.adminRemarks || "",
                    ltaDetailsId: data.otherExemption?.ltaExemption?.ltaDetailsId || null
                }));
                setInternetAllowance(prev => ({
                    ...prev,
                    status: data.otherExemption?.internetAllowance?.status || "Pending",
                    adminRemarks: data.otherExemption?.internetAllowance?.adminRemarks || "",
                    internetAllowanceDetailsId: data.otherExemption?.internetAllowance?.internetAllowanceDetailsId || null
                }));
                setTelephoneAllowance(prev => ({
                    ...prev,
                    status: data.otherExemption?.telephoneAllowance?.status || "Pending",
                    adminRemarks: data.otherExemption?.telephoneAllowance?.adminRemarks || "",
                    telephoneAllowanceDetailsId: data.otherExemption?.telephoneAllowance?.telephoneAllowanceDetailsId || null
                }));
            }
        } catch (error) {
            toast.error("Failed to fetch IT declaration");
        }
    };

    const feachEmployeeCtc = async (schoolId, employeeId, academicYear) => {
        try {
            const response = await getAPI(`/get-employee-ctc-details/${schoolId}/${employeeId}/${academicYear}`);
            if (!response.hasError && response.data?.data) {
                setEmployeeCtcDetails(response.data.data);
                const components = response.data.data.components;
                components.forEach(component => {
                    if (component.ctcComponentName === 'LTA') {
                        setLTAExemption(prev => ({
                            ...prev,
                            categoryLimit: component.annualAmount
                        }));
                    } else if (component.ctcComponentName === 'Internet Allowance') {
                        setInternetAllowance(prev => ({
                            ...prev,
                            categoryLimit: component.annualAmount
                        }));
                    } else if (component.ctcComponentName === 'Telephone Allowance') {
                        setTelephoneAllowance(prev => ({
                            ...prev,
                            categoryLimit: component.annualAmount
                        }));
                    }
                });
            } else {
                toast.error("No employee CTC data found.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred.");
        }
    };

    // New function to fetch LTA details
    const fetchLtaDetails = async (schoolId, employeeId, academicYear) => {
        try {
            const response = await getAPI(`/get-lta-details/${schoolId}/${employeeId}?academicYear=${academicYear}`);
            if (!response.hasError && response.data?.data) {
                const ltaDetails = response.data.data;
                // Calculate total proofSubmitted as sum of totalAmount from ltaDetails
                const totalProofSubmitted = ltaDetails.reduce((sum, detail) => sum + (detail.totalAmount || 0), 0);
                // categoryFinalDeduction is the minimum of proofSubmitted and categoryLimit
                setLTAExemption(prev => ({
                    ...prev,
                    proofSubmitted: totalProofSubmitted,
                    categoryFinalDeduction: Math.min(totalProofSubmitted, prev.categoryLimit || 0)
                }));
            } else {
                setLTAExemption(prev => ({
                    ...prev,
                    proofSubmitted: 0,
                    categoryFinalDeduction: 0
                }));
            }
        } catch (error) {
            console.error('Error fetching LTA details:', error);
            toast.error("Failed to fetch LTA details");
            setLTAExemption(prev => ({
                ...prev,
                proofSubmitted: 0,
                categoryFinalDeduction: 0
            }));
        }
    };

    // Placeholder function for fetching Internet Allowance details
    const fetchInternetAllowanceDetails = async (schoolId, employeeId, academicYear) => {
        try {
            const response = await getAPI(`/get-internet-allowance-details/${schoolId}/${employeeId}?academicYear=${academicYear}`);
            if (!response.hasError && response.data?.data) {
                const internetDetails = response.data.data;
                const totalProofSubmitted = internetDetails.reduce((sum, detail) => sum + (detail.totalAmount || 0), 0);
                setInternetAllowance(prev => ({
                    ...prev,
                    proofSubmitted: totalProofSubmitted,
                    categoryFinalDeduction: Math.min(totalProofSubmitted, prev.categoryLimit || 0)
                }));
            } else {
                setInternetAllowance(prev => ({
                    ...prev,
                    proofSubmitted: 0,
                    categoryFinalDeduction: 0
                }));
            }
        } catch (error) {
            console.error('Error fetching Internet Allowance details:', error);
            toast.error("Failed to fetch Internet Allowance details");
            setInternetAllowance(prev => ({
                ...prev,
                proofSubmitted: 0,
                categoryFinalDeduction: 0
            }));
        }
    };

    // Placeholder function for fetching Telephone Allowance details
    const fetchTelephoneAllowanceDetails = async (schoolId, employeeId, academicYear) => {
        try {
            const response = await getAPI(`/get-telephone-allowance-details/${schoolId}/${employeeId}?academicYear=${academicYear}`);
            if (!response.hasError && response.data?.data) {
                const telephoneDetails = response.data.data;
                const totalProofSubmitted = telephoneDetails.reduce((sum, detail) => sum + (detail.totalAmount || 0), 0);
                setTelephoneAllowance(prev => ({
                    ...prev,
                    proofSubmitted: totalProofSubmitted,
                    categoryFinalDeduction: Math.min(totalProofSubmitted, prev.categoryLimit || 0)
                }));
            } else {
                setTelephoneAllowance(prev => ({
                    ...prev,
                    proofSubmitted: 0,
                    categoryFinalDeduction: 0
                }));
            }
        } catch (error) {
            console.error('Error fetching Telephone Allowance details:', error);
            toast.error("Failed to fetch Telephone Allowance details");
            setTelephoneAllowance(prev => ({
                ...prev,
                proofSubmitted: 0,
                categoryFinalDeduction: 0
            }));
        }
    };

    const handleToggle = (index) => {
        const updatedItems = [...otherSections.items];
        const enabled = !updatedItems[index].enabled;
        updatedItems[index] = {
            ...updatedItems[index],
            enabled,
            proofSubmitted: enabled ? updatedItems[index].categoryLimit : 0,
            proofDocument: enabled ? updatedItems[index].proofDocument : null,
            existingDocument: enabled ? updatedItems[index].existingDocument : null,
            categoryFinalDeduction: enabled ? updatedItems[index].categoryLimit : 0
        };

        const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
        setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });

        if (index === 0) setIsBuyer(enabled);
        if (index === 1) setIsYes(enabled);
        if (index === 2) setIsYes1(enabled);
        if (index === 3) setIsYes2(enabled);
    };

    const handle80CInputChange = (index, field, value) => {
        const updatedItems = [...section80C.items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: field === 'proofSubmitted' ? Number(value.replace(/,/g, '')) || 0 : value
        };
        setSection80C({ ...section80C, items: updatedItems });
    };

    const handle80CFileUpload = (index, file) => {
        const updatedItems = [...section80C.items];
        if (!file) {
            updatedItems[index] = {
                ...updatedItems[index],
                proofDocument: null
            };
            setSection80C({ ...section80C, items: updatedItems });
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            toast.error('Only JPEG, PNG, or PDF files are allowed');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size must be less than 2MB');
            return;
        }

        updatedItems[index] = { ...updatedItems[index], proofDocument: file };
        setSection80C({ ...section80C, items: updatedItems });
    };

    const handle80DInputChange = (index, field, value) => {
        const updatedItems = [...section80D.items];
        const numericValue = Number(value.replace(/,/g, '')) || 0;

        updatedItems[index] = { ...updatedItems[index], [field]: numericValue };

        if ([0, 1, 4].includes(index)) {
            if (numericValue > 0) {
                [0, 1, 4].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        updatedItems[i].proofSubmitted = 0;
                        updatedItems[i].categoryFinalDeduction = 0;
                        updatedItems[i].proofDocument = null;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                [0, 1, 4].forEach(i => { updatedItems[i].disabled = false; });
            }
        }

        if ([2, 3, 5].includes(index)) {
            if (numericValue > 0) {
                [2, 3, 5].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        updatedItems[i].proofSubmitted = 0;
                        updatedItems[i].categoryFinalDeduction = 0;
                        updatedItems[i].proofDocument = null;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                [2, 3, 5].forEach(i => { updatedItems[i].disabled = false; });
            }
        }

        const { updatedItems: calculatedItems, finalDeduction } = calculate80DTotals(updatedItems);
        setSection80D({ ...section80D, items: calculatedItems, finalDeduction });
    };

    const handle80DFileUpload = (index, file) => {
        const updatedItems = [...section80D.items];
        if (!file) {
            updatedItems[index] = { ...updatedItems[index], proofDocument: null };
            setSection80D({ ...section80D, items: updatedItems });
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            toast.error('Only JPEG, PNG, or PDF files are allowed');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size must be less than 2MB');
            return;
        }

        updatedItems[index] = { ...updatedItems[index], proofDocument: file };
        setSection80D({ ...section80D, items: updatedItems });
    };

    const handleOtherSectionsInputChange = (index, field, value) => {
        const updatedItems = [...otherSections.items];
        const numericValue = Number(value.replace(/,/g, '')) || 0;

        updatedItems[index] = {
            ...updatedItems[index],
            [field]: numericValue,
            categoryFinalDeduction: numericValue > 0 ? Math.min(numericValue, updatedItems[index].categoryLimit) : 0
        };

        if ([4, 5].includes(index)) {
            if (numericValue > 0) {
                [4, 5].forEach(i => {
                    if (i !== index) {
                        updatedItems[i].disabled = true;
                        updatedItems[i].proofSubmitted = 0;
                        updatedItems[i].categoryFinalDeduction = 0;
                        updatedItems[i].proofDocument = null;
                    } else {
                        updatedItems[i].disabled = false;
                    }
                });
            } else {
                [4, 5].forEach(i => { updatedItems[i].disabled = false; });
            }
        }

        const { updatedItems: calculatedItems, finalDeduction } = calculateOtherSectionsTotals(updatedItems);
        setOtherSections({ ...otherSections, items: calculatedItems, finalDeduction });
    };

    const handleOtherSectionsFileUpload = (index, file) => {
        const updatedItems = [...otherSections.items];
        if (!file) {
            updatedItems[index] = { ...updatedItems[index], proofDocument: null };
            setOtherSections({ ...otherSections, items: updatedItems });
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            toast.error('Only JPEG, PNG, or PDF files are allowed');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size must be less than 2MB');
            return;
        }

        updatedItems[index] = { ...updatedItems[index], proofDocument: file };
        setOtherSections({ ...otherSections, items: updatedItems });
    };

    const calculate80CTotals = () => {
        const totalProofSubmitted = section80C.items.reduce(
            (sum, item) => sum + (item.proofSubmitted || 0),
            0
        );
        const finalDeduction = Math.min(totalProofSubmitted, section80C.sectionLimit);
        return { totalProofSubmitted, finalDeduction };
    };

    const calculate80DTotals = (items) => {
        const updatedItems = items.map(item => ({
            ...item,
            categoryFinalDeduction: Math.min(item.proofSubmitted, item.categoryLimit)
        }));
        const totalProofSubmitted = updatedItems.reduce(
            (sum, item) => sum + (item.proofSubmitted || 0),
            0
        );
        const finalDeduction = updatedItems.reduce(
            (sum, item) => sum + (item.categoryFinalDeduction || 0),
            0
        );
        return { updatedItems, totalProofSubmitted, finalDeduction };
    };

    const calculateOtherSectionsTotals = (items) => {
        const updatedItems = items.map(item => ({
            ...item,
            categoryFinalDeduction: item.categoryLimit > 0 ? Math.min(item.proofSubmitted, item.categoryLimit) : item.proofSubmitted
        }));
        const totalProofSubmitted = updatedItems.reduce(
            (sum, item) => sum + (item.proofSubmitted || 0),
            0
        );
        const finalDeduction = updatedItems.reduce(
            (sum, item) => sum + (item.categoryFinalDeduction || 0),
            0
        );
        return { updatedItems, totalProofSubmitted, finalDeduction };
    };

    const validateSubmission = () => {
        if (!acceptTermsAndConditions) {
            toast.error('You must accept the terms and conditions');
            return false;
        }
        const invalid80C = section80C.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
        const invalid80D = section80D.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);
        const invalidOther = otherSections.items.some(item => item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument);

        if (invalid80C || invalid80D || invalidOther) {
            toast.error('Please upload documents for all submitted proofs');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateSubmission()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('schoolId', schoolId);
            formData.append('employeeId', employeeId);
            formData.append('academicYear', academicYear);
            formData.append('taxRegime', employeeDetails.taxRegime || 'old');
            formData.append('panNumber', employeeDetails.panNumber || '');
            formData.append('acceptTermsAndConditions', acceptTermsAndConditions);

            section80C.items.forEach((item, index) => {
                formData.append(`section80C[${index}][section]`, item.section);
                formData.append(`section80C[${index}][category]`, item.category);
                formData.append(`section80C[${index}][proofSubmitted]`, item.proofSubmitted);
                formData.append(`section80C[${index}][status]`, item.status);
                formData.append(`section80C[${index}][adminRemarks]`, item.adminRemarks || '');
                if (item.existingDocument) {
                    formData.append(`section80C[${index}][existingDocument]`, item.existingDocument);
                }
                if (item.proofDocument instanceof File) {
                    formData.append(`section80CProofs[${index}]`, item.proofDocument);
                }
            });
            formData.append('section80C[sectionLimit]', section80C.sectionLimit);

            section80D.items.forEach((item, index) => {
                formData.append(`section80D[${index}][section]`, item.section);
                formData.append(`section80D[${index}][category]`, item.category);
                formData.append(`section80D[${index}][categoryLimit]`, item.categoryLimit);
                formData.append(`section80D[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction);
                formData.append(`section80D[${index}][proofSubmitted]`, item.proofSubmitted);
                formData.append(`section80D[${index}][status]`, item.status);
                formData.append(`section80D[${index}][adminRemarks]`, item.adminRemarks || '');
                if (item.existingDocument) {
                    formData.append(`section80D[${index}][existingDocument]`, item.existingDocument);
                }
                if (item.proofDocument instanceof File) {
                    formData.append(`section80DProofs[${index}]`, item.proofDocument);
                }
            });

            otherSections.items.forEach((item, index) => {
                formData.append(`otherSections[${index}][section]`, item.section);
                formData.append(`otherSections[${index}][category]`, item.category);
                formData.append(`otherSections[${index}][categoryLimit]`, item.categoryLimit || 0);
                formData.append(`otherSections[${index}][categoryFinalDeduction]`, item.categoryFinalDeduction || 0);
                formData.append(`otherSections[${index}][proofSubmitted]`, item.proofSubmitted);
                formData.append(`otherSections[${index}][status]`, item.status);
                formData.append(`otherSections[${index}][adminRemarks]`, item.adminRemarks || '');
                if (item.existingDocument) {
                    formData.append(`otherSections[${index}][existingDocument]`, item.existingDocument);
                }
                if (item.proofDocument instanceof File) {
                    formData.append(`otherSectionsProofs[${index}]`, item.proofDocument);
                }
            });

            // Add LTA Exemption data
            formData.append('otherExemption[ltaExemption][ltaDetailsId]', ltaExemption.ltaDetailsId || '');
            formData.append('otherExemption[ltaExemption][proofSubmitted]', ltaExemption.proofSubmitted);
            formData.append('otherExemption[ltaExemption][categoryFinalDeduction]', ltaExemption.categoryFinalDeduction);
            formData.append('otherExemption[ltaExemption][status]', ltaExemption.status);
            formData.append('otherExemption[ltaExemption][adminRemarks]', ltaExemption.adminRemarks || '');

            // Add Internet Allowance data
            formData.append('otherExemption[internetAllowance][internetAllowanceDetailsId]', internetAllowance.internetAllowanceDetailsId || '');
            formData.append('otherExemption[internetAllowance][proofSubmitted]', internetAllowance.proofSubmitted);
            formData.append('otherExemption[internetAllowance][categoryFinalDeduction]', internetAllowance.categoryFinalDeduction);
            formData.append('otherExemption[internetAllowance][status]', internetAllowance.status);
            formData.append('otherExemption[internetAllowance][adminRemarks]', internetAllowance.adminRemarks || '');

            // Add Telephone Allowance data
            formData.append('otherExemption[telephoneAllowance][telephoneAllowanceDetailsId]', telephoneAllowance.telephoneAllowanceDetailsId || '');
            formData.append('otherExemption[telephoneAllowance][proofSubmitted]', telephoneAllowance.proofSubmitted);
            formData.append('otherExemption[telephoneAllowance][categoryFinalDeduction]', telephoneAllowance.categoryFinalDeduction);
            formData.append('otherExemption[telephoneAllowance][status]', telephoneAllowance.status);
            formData.append('otherExemption[telephoneAllowance][adminRemarks]', telephoneAllowance.adminRemarks || '');

            const response = await postAPI(
                `/it-declaration/${schoolId}/${employeeId}`,
                formData,
                { 'Content-Type': 'multipart/form-data' },
                true
            );

            if (!response.hasError) {
                toast.success("IT Declaration submitted successfully!");
                fetchItDeclaration(schoolId, employeeId);
            } else {
                toast.error(response.message || "Failed to submit declaration");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("An error occurred while submitting the declaration");
        } finally {
            setIsSubmitting(false);
        }
    };

    const { totalProofSubmitted: total80C, finalDeduction: final80C } = calculate80CTotals();
    const { totalProofSubmitted: total80D, finalDeduction: final80D } = calculate80DTotals(section80D.items);
    const { totalProofSubmitted: totalOther, finalDeduction: finalOther } = calculateOtherSectionsTotals(otherSections.items);

    const handleNavigateToRentDetails = () => {
        navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/rent-details");
    };

    const handleNavigateToLtaDetails = () => {
        navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/lta-details");
    };

    const handleNavigateToTelephoneDetails = () => {
        navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/telephone-allowance-details");
    };

    const handleNavigateToInternetDetails = () => {
        navigate("/employee-dashboard/payroll-module/employee-services/income-tax/it-declaration/internet-allowance-details");
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN').format(amount);
    };

    const getFileName = (proofDocument, existingDocument) => {
        if (proofDocument instanceof File) {
            return proofDocument.name.length > 25 ? proofDocument.name.slice(0, 25) + '...' : proofDocument.name;
        }
        if (existingDocument) {
            const fullName = existingDocument.split('\\').pop().split('/').pop() || 'Existing file';
            return fullName.length > 25 ? fullName.slice(0, 25) + '...' : fullName;
        }
        return 'No file';
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header mb-2">
                                    <h4 className="payroll-title text-center mb-0">
                                        Income Tax (IT) Declaration
                                    </h4>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row m-0 mb-2 pt-2 salary-slip-box">
                                    <div className="col-md-8">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>Employee Name: </strong> {employeeDetails.employeeName || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>Employee ID: </strong>{employeeDetails.employeeId || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>Tax Regime: </strong>{employeeDetails.taxRegime === "new" ? "New" : "Old" || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark payroll-box-text'>
                                            <strong>PAN No: </strong>{employeeDetails.panNumber || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="col-md-4">
                                        <p className='text-dark'>
                                            <label htmlFor="yearSelect" className="mb-0 payroll-box-text fw-bold">Financial Year: </label>
                                            <select
                                                id="yearSelect"
                                                className="custom-select"
                                                aria-label="Select Year"
                                                style={{ marginLeft: "5px" }}
                                                value={academicYear}
                                                onChange={(e) => setAcademicYear(e.target.value)}
                                            >
                                                <option value="2025-26">2025-26</option>
                                                <option value="2026-27">2026-27</option>
                                                <option value="2027-28">2027-28</option>
                                                <option value="2028-29">2028-29</option>
                                                <option value="2029-30">2029-30</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>

                                <div className="table-responsive mb-4">
                                    <table className="border border-dark mb-4 table table-hover">
                                        <thead className="bg-light-subtle">
                                            <tr className="payroll-table-header">
                                                <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
                                                    Investment
                                                </th>
                                                <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "100px" }}>
                                                    Limit
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "130px" }}>
                                                    Proof Sub.
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "100px" }}>
                                                    Final Ded.
                                                </th>
                                                <th className="text-center align-content-center border border-dark text-nowrap p-2" style={{ width: "200px" }}>
                                                    Upload Document
                                                </th>
                                                <th className="text-center align-content-center border text-nowrap border-dark p-2" style={{ width: "120px" }}>
                                                    Status
                                                </th>
                                                <th className="text-center align-content-center border border-dark p-2 text-nowrap" style={{ width: "250px" }}>
                                                    Admin Remarks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">Section 80C</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(section80C.sectionLimit)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80C)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80C)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                            </tr>
                                            {section80C.items.map((item, index) => (
                                                <tr key={index} className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                                                    <td className="text-end align-content-center border border-dark p-2"></td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={formatCurrency(item.proofSubmitted)}
                                                            onChange={(e) => handle80CInputChange(index, 'proofSubmitted', e.target.value)}
                                                            required={item.proofSubmitted > 0}
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2"></td>
                                                    <td className="align-content-center border border-dark p-2">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="file"
                                                                className="form-control payroll-input-border me-2"
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handle80CFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
                                                            />
                                                        </div>
                                                        {(item.proofDocument || item.existingDocument) && (
                                                            <div className="mt-2">
                                                                <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={item.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
                                                </tr>
                                            ))}
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">Section 80D</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(total80D)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(final80D)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                            </tr>
                                            {section80D.items.map((item, index) => (
                                                <tr key={index} className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">{item.category}</td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
                                                            value={formatCurrency(item.proofSubmitted)}
                                                            onChange={(e) => handle80DInputChange(index, 'proofSubmitted', e.target.value)}
                                                            disabled={item.disabled}
                                                            required={item.proofSubmitted > 0}
                                                        />
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
                                                    <td className="align-content-center border border-dark p-2">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="file"
                                                                className={`form-control payroll-input-border me-2 ${item.disabled ? 'bg-light' : ''}`}
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handle80DFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
                                                                disabled={item.disabled}
                                                            />
                                                        </div>
                                                        {(item.proofDocument || item.existingDocument) && (
                                                            <div className="mt-2">
                                                                <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={item.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
                                                </tr>
                                            ))}
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">Other Sections</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(totalOther)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(finalOther)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                            </tr>
                                            {otherSections.items.map((item, index) => (
                                                <tr key={index} className='payroll-table-body'>
                                                    <td className="align-content-center border border-dark px-3 py-2">
                                                        {item.category}
                                                        {index < 4 && (
                                                            <div className="d-flex rounded-pill overflow-hidden declaration-form-btn mt-1" style={{ maxWidth: "fit-content" }}>
                                                                <button
                                                                    className={`btn ${item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                                                    type='button'
                                                                    style={{
                                                                        backgroundColor: item.enabled ? 'white' : 'black',
                                                                        borderColor: item.enabled ? 'black' : '',
                                                                        color: item.enabled ? 'black' : 'white',
                                                                        maxWidth: "fit-content",
                                                                        transition: 'all 0.4s ease-in-out',
                                                                        boxShadow: "none"
                                                                    }}
                                                                    onClick={() => handleToggle(index)}
                                                                >
                                                                    Yes
                                                                </button>
                                                                <button
                                                                    type='button'
                                                                    className={`btn ${!item.enabled ? 'btn-primary' : 'btn-dark'} rounded-pill`}
                                                                    style={{
                                                                        backgroundColor: !item.enabled ? 'white' : 'black',
                                                                        borderColor: !item.enabled ? 'black' : '',
                                                                        color: !item.enabled ? 'black' : 'white',
                                                                        transition: 'all 0.4s ease-in-out',
                                                                        boxShadow: "none",
                                                                        maxWidth: "fit-content"
                                                                    }}
                                                                    onClick={() => handleToggle(index)}
                                                                >
                                                                    No
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryLimit)}</td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        {index < 4 ? (
                                                            <input
                                                                type="text"
                                                                className={`form-control payroll-table-body payroll-input-border text-end ${!item.enabled ? 'bg-light' : ''}`}
                                                                value={formatCurrency(item.proofSubmitted)}
                                                                readOnly
                                                            />
                                                        ) : (
                                                            <input
                                                                type="text"
                                                                className={`form-control payroll-table-body payroll-input-border text-end ${item.disabled ? 'bg-light' : ''}`}
                                                                value={formatCurrency(item.proofSubmitted)}
                                                                onChange={(e) => handleOtherSectionsInputChange(index, 'proofSubmitted', e.target.value)}
                                                                required={item.proofSubmitted > 0}
                                                                disabled={item.disabled}
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">{formatCurrency(item.categoryFinalDeduction)}</td>
                                                    <td className="align-content-center border border-dark p-2">
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="file"
                                                                className={`form-control payroll-input-border me-2 ${index < 4 && !item.enabled || item.disabled ? 'bg-light' : ''}`}
                                                                accept="image/*,application/pdf"
                                                                onChange={(e) => handleOtherSectionsFileUpload(index, e.target.files[0])}
                                                                required={item.proofSubmitted > 0 && !item.proofDocument && !item.existingDocument}
                                                                disabled={index < 4 && !item.enabled || item.disabled}
                                                            />
                                                        </div>
                                                        {(item.proofDocument || item.existingDocument) && (
                                                            <div className="mt-2">
                                                                <small>{getFileName(item.proofDocument, item.existingDocument)}</small>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="text-end align-content-center border border-dark p-2">
                                                        <input
                                                            type="text"
                                                            className="form-control payroll-table-body payroll-input-border text-end"
                                                            value={item.status}
                                                            readOnly
                                                        />
                                                    </td>
                                                    <td className="text-start align-content-center border border-dark p-2">{item.adminRemarks}</td>
                                                </tr>
                                            ))}
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">HRA Exemption</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{formatCurrency(hraExemption.proofSubmitted)}</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-center align-content-center border border-dark fw-bold p-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0"
                                                        onClick={handleNavigateToRentDetails}
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold",
                                                            fontSize: "1rem"
                                                        }}
                                                    >
                                                        Enter Rent Details
                                                    </button>
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        value={hraExemption.status}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2">{hraExemption.adminRemarks}</td>
                                            </tr>
                                            <tr className='it-declaration-section-bg payroll-box-text fw-bold'>
                                                <td className="align-content-center border border-dark fw-bold p-2">Other Exemption</td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-center align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                                <td className="text-end align-content-center border border-dark fw-bold p-2"></td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="align-content-center border border-dark px-3 py-2">LTA Exemption</td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(ltaExemption.categoryLimit)}
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(ltaExemption.proofSubmitted)}
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(ltaExemption.categoryFinalDeduction)}
                                                </td>
                                                <td className="text-center align-content-center border border-dark p-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0"
                                                        onClick={handleNavigateToLtaDetails}
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold",
                                                            fontSize: "1rem"
                                                        }}
                                                    >
                                                        Enter LTA Details
                                                    </button>
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        value={ltaExemption.status}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2">{ltaExemption.adminRemarks}</td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="align-content-center border border-dark px-3 py-2">Telephone Allowance</td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(telephoneAllowance.categoryLimit)}
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(telephoneAllowance.proofSubmitted)}
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(telephoneAllowance.categoryFinalDeduction)}
                                                </td>
                                                <td className="text-center align-content-center border border-dark p-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0"
                                                        onClick={handleNavigateToTelephoneDetails}
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold",
                                                            fontSize: "1rem"
                                                        }}
                                                    >
                                                        Enter Telephone Details
                                                    </button>
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        value={telephoneAllowance.status}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2">{telephoneAllowance.adminRemarks}</td>
                                            </tr>
                                            <tr className='payroll-table-body'>
                                                <td className="align-content-center border border-dark px-3 py-2">Internet Allowance</td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(internetAllowance.categoryLimit)}
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(internetAllowance.proofSubmitted)}
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    {formatCurrency(internetAllowance.categoryFinalDeduction)}
                                                </td>
                                                <td className="text-center align-content-center border border-dark p-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0"
                                                        onClick={handleNavigateToInternetDetails}
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "bold",
                                                            fontSize: "1rem"
                                                        }}
                                                    >
                                                        Enter Internet Details
                                                    </button>
                                                </td>
                                                <td className="text-end align-content-center border border-dark p-2">
                                                    <input
                                                        type="text"
                                                        className="form-control payroll-table-body payroll-input-border text-end"
                                                        value={internetAllowance.status}
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="text-start align-content-center border border-dark p-2">{internetAllowance.adminRemarks}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={7} className="border border-dark fw-bold p-2">
                                                    <div className="d-flex align-items-center gap-1">
                                                        <p className="form-check ms-1">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input mt-0 me-2"
                                                                id="acceptTermsAndConditions"
                                                                name="acceptTermsAndConditions"
                                                                checked={acceptTermsAndConditions}
                                                                onChange={handleTermsChange}
                                                                required
                                                            />
                                                        </p>
                                                        <p className="mb-0 fw-bold text-dark">
                                                            I hereby declare that all the investment proofs given by me as mentioned above are correct. In case of any tax deduction being levied on account of incorrect proofs, I shall be fully responsible for payment of such income tax.
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row m-0">
                                    <div className="col-md-12 text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeItDeclaration;