import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CityData from "../../../../../CityData.json";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import postAPI from "../../../../../../api/postAPI";
import { validateBasicForm } from "../Formvalidation.js/FormValidation";

const useStudentRegistration = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState("");
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [formData, setFormData] = useState({
    studentPhoto: null,
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    nationality: "",
    gender: "",
    masterDefineClass: "",
    masterDefineShift: "",
    fatherName: "",
    fatherContactNo: "",
    motherName: "",
    motherContactNo: "",
    currentAddress: "",
    cityStateCountry: "",
    pincode: "",
    previousSchoolName: "",
    previousSchoolBoard: "",
    addressOfpreviousSchool: "",
    previousSchoolResult: null,
    tcCertificate: null,
    studentCategory: "",
    howReachUs: "",
    aadharPassportFile: null,
    aadharPassportNumber: "",
    castCertificate: null,
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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        studentPhoto: file,
      }));
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

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    // Remove this line - it's preventing name field updates
    // if (name === 'name') return;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      if (name === "fatherName") {
        setFormData((prev) => ({ ...prev, fatherName: value }));
      } else if (name === "nationality") {
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

  const isNurseryClass = (classId) => {
    const selectedClass = classes.find((c) => c._id === classId);
    return selectedClass?.className === "Nursery";
  };

  const isNursery = isNurseryClass(formData.masterDefineClass);

  const handleSave = (e) => {
    e.preventDefault();
    if (validateBasicForm(formData, toast, isNurseryClass)) {
      setShowAdditionalData(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateBasicForm(formData, toast, isNurseryClass)) {
        setIsSubmitting(false);
        return;
      }

      const submissionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (value instanceof File) {
            submissionData.append(key, value, value.name);
          } else {
            submissionData.append(key, value);
          }
        }
      });

      const response = await postAPI(
        "/create-registartion-form",
        submissionData,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      if (!response) {
        throw new Error("No response from server");
      }

      if (response.error || response.status === "error") {
        toast.error(response.message || "Registration failed");
        return;
      }
      toast.success("Student registered successfully");
      navigate(`/school-dashboard/fees-module/form/registration-form/sucess`, {
        state: {
          student: response.data?.student || response.student,
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  return {
    formData,
    handleChange,
    handleSave,
    handleSubmit,
    isSubmitting,
    showAdditionalData,
    classes,
    shifts,
    cityOptions,
    isNursery,
    handlePhotoUpload,
  };
};

export default useStudentRegistration;
