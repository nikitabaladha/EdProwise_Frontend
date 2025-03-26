import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../CityData.json";
import Select from "react-select";

const UpdateSchool = () => {
  const location = useLocation();
  const school = location.state?.school;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolMobileNo: "",
    schoolEmail: "",
    schoolAddress: "",
    schoolLocation: "",
    affiliationUpto: "",
    panNo: "",
    profileImage: null,
    affiliationCertificate: null,
    panFile: null,
  });

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => ({
      value: `${city}, ${state}, India`,
      label: `${city}, ${state}, India`,
    }))
  );

  const profileImageRef = useRef(null);
  const affiliationCertificateRef = useRef(null);
  const panFileRef = useRef(null);

  useEffect(() => {
    if (school) {
      setFormData({
        schoolName: school.schoolName || "",
        schoolMobileNo: school.schoolMobileNo || "",
        schoolEmail: school.schoolEmail || "",
        schoolAddress: school.schoolAddress || "",
        schoolLocation: school.schoolLocation || "",
        affiliationUpto: school.affiliationUpto || "",
        panNo: school.panNo || "",
      });
    }
  }, [school]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key] || "");
      }
    }

    try {
      const response = await putAPI(
        `/school/${school._id}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        toast.success("School updated successfully!");

        // Reset formData state
        setFormData({
          schoolName: "",
          schoolMobileNo: "",
          schoolEmail: "",
          schoolAddress: "",
          schoolLocation: "",
          affiliationUpto: "",
          panNo: "",
          profileImage: null,
          affiliationCertificate: null,
          panFile: null,
        });

        // Clear file inputs
        profileImageRef.current.value = "";
        affiliationCertificateRef.current.value = "";
        panFileRef.current.value = "";

        navigate(-1);
      } else {
        toast.error("Failed to update School.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const getBaseFileName = (url) => {
    return url ? url.split("/").pop() : "";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Update School
                  </h4>
                </div>
              </div>
              <form
                onSubmit={handleUpdate}
                className="custom-font-size-for-form"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="schoolName" className="form-label">
                        School Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        className="form-control"
                        value={formData.schoolName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="mobileNo" className="form-label">
                        School Mobile Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="mobileNo"
                        name="schoolMobileNo"
                        className="form-control"
                        value={formData.schoolMobileNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        School Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="schoolEmail"
                        className="form-control"
                        value={formData.schoolEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      School Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="schoolAddress"
                      rows={3}
                      value={formData.schoolAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="cityStateCountry" className="form-label">
                        City-State-Country{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        id="cityStateCountry"
                        name="schoolLocation"
                        options={cityOptions}
                        value={cityOptions.find(
                          (option) => option.value === formData.schoolLocation
                        )}
                        onChange={(selectedOption) =>
                          setFormData((prev) => ({
                            ...prev,
                            schoolLocation: selectedOption
                              ? selectedOption.value
                              : "",
                          }))
                        }
                        placeholder="Select City-State-Country"
                        isSearchable
                        required
                        classNamePrefix="react-select"
                        className="custom-react-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="profileImage" className="form-label">
                        Profile Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        ref={profileImageRef}
                        // required
                      />
                      {school.profileImage ? (
                        <div>
                          <small>
                            Existing Profile Image:{" "}
                            {getBaseFileName(school.profileImage)}
                          </small>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="affiliationUpto" className="form-label">
                        Affiliation Upto <span className="text-danger">*</span>
                      </label>
                      <select
                        id="affiliationUpto"
                        name="affiliationUpto"
                        className="form-control"
                        value={formData.affiliationUpto}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Affiliation</option>
                        <option value="Pre-Primary">Pre-Primary</option>
                        <option value="Primary (Upto Class 5)">
                          Primary (Upto Class 5)
                        </option>
                        <option value="Secondary (Upto Class 10)">
                          Secondary (Upto Class 10)
                        </option>
                        <option value="Higher Secondary (Upto Class 12)">
                          Higher Secondary (Upto Class 12)
                        </option>
                        <option value="College">College</option>
                        <option value="University">University</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="affiliationCertificate"
                        className="form-label"
                      >
                        Affiliation Certificate{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="affiliationCertificate"
                        name="affiliationCertificate"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={affiliationCertificateRef}
                        // required
                      />
                      {school.affiliationCertificate ? (
                        <div>
                          <small>
                            Existing Certificate:{" "}
                            {getBaseFileName(school.affiliationCertificate)}
                          </small>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="panNo" className="form-label">
                        PAN Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="panNo"
                        name="panNo"
                        className="form-control"
                        value={formData.panNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="panFile" className="form-label">
                        PAN File <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="panFile"
                        name="panFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={panFileRef}
                      />
                      {school.panFile ? (
                        <div>
                          <small>
                            Existing PAN File: {getBaseFileName(school.panFile)}
                          </small>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  {" "}
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update School
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSchool;
