import React, { useState, useEffect } from "react";
import CityData from "../../../../../CityData.json";
import { useNavigate } from "react-router-dom";
import getAPI from "../../../../../../api/getAPI";
import { toast } from "react-toastify";
import postAPI from "../../../../../../api/postAPI";
import {
  validateBasicForm,
  validateFullForm,
} from "../FormValidation/FormValidation";
import RegistrationSelector from "./RegistrationSelector";
import Form from "./Form";

const StudentAdmissionForm = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [existingStudents, setExistingStudents] = useState([]);
  const [showFullForm, setShowFullForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [shifts, setShifts] = useState([]);

  const [formData, setFormData] = useState({
    registrationNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    gender: "",
    bloodGroup: "",
    masterDefineClass: "",
    section: "",
    masterDefineShift: "",
    currentAddress: "",
    cityStateCountry: "",
    pincode: "",
    parentContactNumber: "",
    motherLanguage: "",
    previousSchoolName: "",
    addressOfPreviousSchool: "",
    previousSchoolBoard: "",
    previousSchoolResult: null,
    tcCertificate: null,
    proofOfResidence: null,
    aadharPassportNumber: "",
    aadharPassportFile: null,
    studentCategory: "",
    castCertificate: null,
    siblingInfoChecked: false,
    relationType: null,
    siblingName: "",
    idCardFile: null,
    parentalStatus: "Parents",
    fatherName: "",
    fatherContactNo: "",
    fatherQualification: "",
    fatherProfession: "",
    motherName: "",
    motherContactNo: "",
    motherQualification: "",
    motherProfession: "",
    agreementChecked: false,
    name: "",
    paymentMode: "",
    chequeNumber: "",
    bankName: "",
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchStudents = async () => {
      try {
        const response = await getAPI(`/get-registartion-form/${schoolId}`);

        if (!response.hasError) {
          const studentArray = Array.isArray(response.data.students)
            ? response.data.students.map((student) => ({
                ...student,
                registrationNumber:
                  student.registrationNumber ||
                  `ABC${10000 + response.data.students.indexOf(student) + 1}`,
              }))
            : [];
          setExistingStudents(studentArray);
        } else {
          toast.error(response.message || "Failed to fetch student list.");
        }
      } catch (err) {
        toast.error("Error fetching student data.");
        console.error("Student Fetch Error:", err);
      }
    };

    fetchStudents();
  }, [schoolId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!schoolId) return;
        const response = await getAPI(
          `/get-class-and-section/${schoolId}`,
          {},
          true
        );
        setClasses(response?.data?.data || []);
      } catch (error) {
        toast.error("Error fetching class and section data.");
      }
    };

    fetchData();
  }, [schoolId]);

  useEffect(() => {
    if (!schoolId) return;

    const fetchShifts = async () => {
      try {
        const response = await getAPI(`/master-define-shift/${schoolId}`);
        if (!response.hasError) {
          const shiftArray = Array.isArray(response.data?.data)
            ? response.data.data
            : [];
          setShifts(shiftArray);
        } else {
          toast.error(response.message || "Failed to fetch shifts.");
        }
      } catch (err) {
        toast.error("Error fetching shift data.");
        console.error("Shift Fetch Error:", err);
      }
    };

    fetchShifts();
  }, [schoolId]);

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find((c) => c._id === classId);

    let filteredSections = selectedClass?.sections || [];
    if (formData.masterDefineShift) {
      filteredSections = filteredSections.filter(
        (section) => section.shiftId === formData.masterDefineShift
      );
    }

    setSections(filteredSections);

    setFormData({
      ...formData,
      masterDefineClass: classId,
      section: "",
    });
  };

  const handleShiftChange = (e) => {
    const shiftId = e.target.value;

    if (formData.masterDefineClass) {
      const selectedClass = classes.find(
        (c) => c._id === formData.masterDefineClass
      );
      const filteredSections =
        selectedClass?.sections.filter(
          (section) => section.shiftId === shiftId
        ) || [];
      setSections(filteredSections);
    }

    setFormData({
      ...formData,
      masterDefineShift: shiftId,
      section: "",
    });
  };
  useEffect(() => {
    if (formData.masterDefineClass && formData.masterDefineShift) {
      const selectedClass = classes.find(
        (c) => c._id === formData.masterDefineClass
      );
      const filteredSections =
        selectedClass?.sections.filter(
          (section) => section.shiftId === formData.masterDefineShift
        ) || [];
      setSections(filteredSections);

      if (
        formData.section &&
        !filteredSections.some((s) => s._id === formData.section)
      ) {
        setFormData((prev) => ({ ...prev, section: "" }));
      }
    }
  }, [formData.masterDefineShift, formData.masterDefineClass, classes]);

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      if (name === "nationality") {
        setFormData((prev) => ({
          ...prev,
          nationality: value,
          studentCategory:
            value === "SAARC Countries" || value === "International"
              ? "General"
              : prev.studentCategory,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  useEffect(() => {
    if (formData.dateOfBirth) {
      try {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        if (birthDate > today) {
          toast.error("Date of birth cannot be in the future");
          setFormData((prev) => ({ ...prev, dateOfBirth: "", age: "" }));
          return;
        }
        const maxAgeDate = new Date();
        maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 120);
        if (birthDate < maxAgeDate) {
          toast.error("Please enter a valid date of birth");
          setFormData((prev) => ({ ...prev, dateOfBirth: "", age: "" }));
          return;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        setFormData((prev) => ({
          ...prev,
          age: age > 0 ? age.toString() : "0",
        }));
      } catch (error) {
        console.error("Error calculating age:", error);
        toast.error("Invalid date format");
        setFormData((prev) => ({ ...prev, dateOfBirth: "", age: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, age: "" }));
    }
  }, [formData.dateOfBirth]);

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (!formData.registrationNumber) {
      toast.error("Please select a registration number");
      return;
    }

    const student = existingStudents.find(
      (s) => s.registrationNumber === formData.registrationNumber
    );

    if (!student) {
      toast.error(
        "Invalid registration number. Please select a valid registration number from the list."
      );
      return;
    }
    if (student) {
      setSelectedStudent(student);

      setFormData((prev) => ({
        ...prev,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth
          ? student.dateOfBirth.split("T")[0]
          : "",
        nationality: student.nationality,
        gender: student.gender,
        masterDefineClass:
          student?.masterDefineClass?._id || student?.masterDefineClass || "",
        masterDefineShift:
          student?.masterDefineShift?._id || student?.masterDefineShift || "",
        currentAddress: student.currentAddress,
        cityStateCountry: student.cityStateCountry,
        pincode: student.pincode,
        parentContactNumber:
          student.fatherContactNo || student.motherContactNo || "",
        previousSchoolName: student.previousSchoolName || "",
        addressOfPreviousSchool: student.addressOfpreviousSchool || "",
        previousSchoolBoard: student.previousSchoolBoard || "",
        previousSchoolResult: student?.previousSchoolResult || null,
        tcCertificate: student?.tcCertificate || null,
        aadharPassportNumber: student.aadharPassportNumber,
        castCertificate: student?.castCertificate || null,
        aadharPassportFile: student.aadharPassportFile || null,
        studentCategory: student.studentCategory,
        siblingInfoChecked: false,
        relationType: null,
        fatherName: student.fatherName,
        fatherContactNo: student.fatherContactNo,
        motherName: student.motherName,
        motherContactNo: student.motherContactNo,
        name: student.name,
        paymentMode: student.paymentMode,
      }));

      if (student?.masterDefineClass?._id || student?.masterDefineClass) {
        const classId =
          student?.masterDefineClass?._id || student?.masterDefineClass;
        const selectedClass = classes.find((c) => c._id === classId);
        setSections(selectedClass?.sections || []);
      }
    }

    setShowFullForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const isNursery = isNurseryClass(formData.masterDefineClass);
    const error = validateBasicForm(formData, isNursery);

    if (error) {
      toast.error(error);
      return;
    }

    setShowAdditionalData(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isNursery = isNurseryClass(formData.masterDefineClass);
    const error = validateFullForm(formData, isNursery);

    if (error) {
      toast.error(error);
      setIsSubmitting(false);
      return;
    }

    const submissionData = {
      ...formData,
      ...(formData.siblingInfoChecked && {
        relationType: null,
        siblingName: "",
        idCardFile: null,
      }),
    };

    const formDataObj = new FormData();

    const fileFields = [
      "previousSchoolResult",
      "tcCertificate",
      "proofOfResidence",
      "aadharPassportFile",
      "castCertificate",
      "idCardFile",
    ];

    Object.entries(submissionData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (fileFields.includes(key)) {
          if (value instanceof File) {
            formDataObj.append(key, value, value.name);
          } else if (typeof value === "string" && value) {
            formDataObj.append(key, value);
          }
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            formDataObj.append(`${key}[]`, item);
          });
        } else {
          formDataObj.append(key, value);
        }
      }
    });

    formDataObj.append("schoolId", schoolId);

    try {
      const response = await postAPI("/create-admission-form", formDataObj, {
        "Content-Type": "multipart/form-data",
      });

      if (response?.hasError) {
        toast.error(response.message || "Something went wrong");
      } else {
        toast.success("Admission Form Submitted successfully");
        const studentData = response.data?.student || response.student;

        navigate(
          `/school-dashboard/fees-module/form/admission-form/admission-details`,
          {
            state: {
              student: response.data?.admission,
            },
          }
        );
      }
    } catch (error) {
      const backendMessage = error?.response?.data?.message;

      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("An error occurred during registration");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const isNurseryClass = (classId) => {
    const selectedClass = classes.find((c) => c._id === classId);
    return selectedClass?.className === "Nursery";
  };

  const isNursery = isNurseryClass(formData.masterDefineClass);

  const getFileNameFromPath = (path) => {
    if (!path) return "";
    return path.split(/[\\/]/).pop();
  };

  if (!showFullForm) {
    return (
      <RegistrationSelector
        formData={formData}
        handleChange={handleChange}
        handleRegistrationSubmit={handleRegistrationSubmit}
        existingStudents={existingStudents}
      />
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Student Admission Form
                  </h4>
                </div>
              </div>
              <Form
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSave={handleSave}
                classes={classes}
                handleClassChange={handleClassChange}
                sections={sections}
                shifts={shifts}
                cityOptions={cityOptions}
                isNursery={isNursery}
                getFileNameFromPath={getFileNameFromPath}
                isSubmitting={isSubmitting}
                showAdditionalData={showAdditionalData}
                handleShiftChange={handleShiftChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmissionForm;
