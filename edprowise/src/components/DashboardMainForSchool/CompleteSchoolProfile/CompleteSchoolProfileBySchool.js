import React, { useState, useEffect, useRef } from "react";

import getAPI from "../../../api/getAPI";
import postAPI from "../../../api/postAPI";

import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CityData from "../../CityData.json";
import Select from "react-select";

const CompleteSchoolProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schoolName: "",
    panFile: null,
    panNo: "",
    schoolAddress: "",
    schoolLocation: "",
    landMark: "",
    schoolPincode: "",
    schoolMobileNo: "",
    schoolEmail: "",
    profileImage: null,
    affiliationCertificate: null,
    affiliationUpto: "",
    deliveryAddress: "",
    deliveryLocation: "",
    deliveryLandMark: "",
    deliveryPincode: "",
    contactPersonName: "",
    numberOfStudents: "",
    principalName: "",
    schoolAlternateContactNo: "",
    sameAsSchoolAddress: false,
  });

  const profileImageRef = useRef(null);
  const affiliationCertificateRef = useRef(null);
  const panFileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
        ...(checked
          ? {
              deliveryAddress: prev.schoolAddress,
              deliveryLocation: prev.schoolLocation,
              deliveryLandMark: prev.landMark,
              deliveryPincode: prev.schoolPincode,
            }
          : {
              deliveryAddress: "",
              deliveryLocation: "",
              deliveryLandMark: "",
              deliveryPincode: "",
            }),
      }));
    } else if (files) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    const userId = userDetails?.id;

    const formDataToSend = new FormData();

    const allowedFields = [
      "schoolName",
      "panFile",
      "panNo",
      "schoolAddress",
      "schoolLocation",
      "landMark",
      "schoolPincode",
      "schoolMobileNo",
      "schoolEmail",
      "profileImage",
      "affiliationCertificate",
      "affiliationUpto",
      "deliveryAddress",
      "deliveryLocation",
      "deliveryLandMark",
      "deliveryPincode",
      "contactPersonName",
      "numberOfStudents",
      "principalName",
      "schoolAlternateContactNo",
    ];

    // Append only allowed fields to formDataToSend
    for (const key of allowedFields) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key] || "");
      }
    }

    try {
      const response = await postAPI(
        `/school-profile/${schoolId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        const storedUserResponse = await getAPI(`/get-user-by-id/${userId}`);

        if (!storedUserResponse.hasError) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(storedUserResponse.data.data)
          );
        }

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
          landMark: "",
          schoolPincode: "",
          deliveryAddress: "",
          deliveryLocation: "",
          deliveryLandMark: "",
          deliveryPincode: "",
          contactPersonName: "",
          numberOfStudents: "",
          principalName: "",
          schoolAlternateContactNo: "",
          sameAsSchoolAddress: false,
        });

        toast.success("School Profile successfully created!");
        navigate("/school-dashboard");
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
        console.log(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => ({
      value: `${city}, ${state}, India`,
      label: `${city}, ${state}, India`,
    }))
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                    <h4 className="card-title custom-heading-font">
                      Complete Your Profile
                    </h4>
                    <button
                      type="button"
                      className="btn btn-primary custom-submit-button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <h4 className="card-title text-center custom-heading-font">
                    School Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-4">
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
                          placeholder="Example : ABC School"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="contactPersonName"
                          className="form-label"
                        >
                          Contact Person Name
                        </label>
                        <input
                          type="text"
                          id="contactPersonName"
                          name="contactPersonName"
                          className="form-control"
                          value={formData.contactPersonName}
                          onChange={handleChange}
                          // required
                          placeholder="Example : John Doe"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="principalName" className="form-label">
                          Principal Name
                        </label>
                        <input
                          type="text"
                          id="principalName"
                          name="principalName"
                          className="form-control"
                          value={formData.principalName}
                          onChange={handleChange}
                          // required
                          placeholder="Example : Jane Doe"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
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
                          placeholder="Example : 1234567890"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="schoolAlternateContactNo"
                          className="form-label"
                        >
                          Alternate Contact Number
                        </label>
                        <input
                          type="tel"
                          id="mobileNo"
                          name="schoolAlternateContactNo"
                          className="form-control"
                          value={formData.schoolAlternateContactNo}
                          onChange={handleChange}
                          // required
                          placeholder="Example : 1234567890"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
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
                          placeholder="Example : example@gmail.com"
                        />
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    School Address Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="schoolAddress" className="form-label">
                        School Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="schoolAddress"
                        name="schoolAddress"
                        rows={3}
                        value={formData.schoolAddress}
                        onChange={handleChange}
                        required
                        placeholder="Example : 123, ABC Street"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="schoolLocation" className="form-label">
                          School Location <span className="text-danger">*</span>
                        </label>

                        <Select
                          id="cityStateCountry"
                          name="schoolLocation"
                          options={cityOptions}
                          value={cityOptions.find(
                            (option) => option.value === formData.schoolLocation
                          )}
                          onChange={(selectedOption) =>
                            setFormData((prevState) => ({
                              ...prevState,
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
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="panNo" className="form-label">
                          Land Mark <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="landMark"
                          name="landMark"
                          className="form-control"
                          value={formData.landMark}
                          onChange={handleChange}
                          required
                          placeholder="Example : Near ABC Market"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="panNo" className="form-label">
                          School Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="schoolPincode"
                          name="schoolPincode"
                          className="form-control"
                          value={formData.schoolPincode}
                          onChange={handleChange}
                          required
                          placeholder="Example : 560045"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-1">
                    <h4 className="card-title flex-grow-1 custom-heading-font mb-3">
                      Delivery Address Details
                    </h4>
                    <h4 className="mb-3"> Same As Above</h4>

                    <div className="form-check ms-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="sameAsSchoolAddress"
                        name="sameAsSchoolAddress"
                        checked={formData.sameAsSchoolAddress}
                        onChange={handleChange}
                      />{" "}
                      <label
                        className="form-check-label"
                        htmlFor="sameAsSchoolAddress"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="deliveryAddress" className="form-label">
                        Delivery Address <span className="text-danger">*</span>
                      </label>
                      {formData.sameAsSchoolAddress ? (
                        <input
                          type="text"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          className="form-control"
                          rows={3}
                          value={formData.schoolAddress}
                          onChange={handleChange}
                          required
                          disabled
                          placeholder="Example : ABC Street"
                        />
                      ) : (
                        <input
                          type="text"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          className="form-control"
                          rows={3}
                          value={formData.deliveryAddress}
                          onChange={handleChange}
                          required
                          placeholder="Example : ABC Street"
                        />
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLocation"
                          className="form-label"
                        >
                          Delivery Location{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <Select
                            id="deliveryLocation"
                            name="deliveryLocation"
                            options={cityOptions}
                            value={cityOptions.find(
                              (option) =>
                                option.value === formData.schoolLocation
                            )}
                            onChange={(selectedOption) =>
                              setFormData((prevState) => ({
                                ...prevState,
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
                        ) : (
                          <Select
                            id="deliveryLocation"
                            name="deliveryLocation"
                            options={cityOptions}
                            value={cityOptions.find(
                              (option) =>
                                option.value === formData.deliveryLocation
                            )}
                            onChange={(selectedOption) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                deliveryLocation: selectedOption
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
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label
                          htmlFor="deliveryLandMark"
                          className="form-label"
                        >
                          Delivery LandMark{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <input
                            type="text"
                            id="deliveryLandMark"
                            name="deliveryLandMark"
                            className="form-control"
                            value={formData.landMark}
                            onChange={handleChange}
                            required
                            disabled
                            placeholder="Example : Near ABC Market"
                          />
                        ) : (
                          <input
                            type="text"
                            id="deliveryLandMark"
                            name="deliveryLandMark"
                            className="form-control"
                            value={formData.deliveryLandMark}
                            onChange={handleChange}
                            required
                            placeholder="Example : Near ABC Market"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="deliveryPincode" className="form-label">
                          Delivery Pincode{" "}
                          <span className="text-danger">*</span>
                        </label>
                        {formData.sameAsSchoolAddress ? (
                          <input
                            type="text"
                            id="deliveryPincode"
                            name="deliveryPincode"
                            className="form-control"
                            value={formData.schoolPincode}
                            onChange={handleChange}
                            required
                            disabled
                            placeholder="Example : 560045"
                          />
                        ) : (
                          <input
                            type="text"
                            id="deliveryPincode"
                            name="deliveryPincode"
                            className="form-control"
                            value={formData.deliveryPincode}
                            onChange={handleChange}
                            required
                            placeholder="Example : 560045"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <h4 className="card-title text-center custom-heading-font">
                    School Certificate Details
                  </h4>
                  <hr></hr>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="principalName" className="form-label">
                          Number Of Students
                        </label>
                        <input
                          type="number"
                          id="numberOfStudents"
                          name="numberOfStudents"
                          className="form-control"
                          value={formData.numberOfStudents}
                          onChange={handleChange}
                          placeholder="Example : 500"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="profileImage" className="form-label">
                          Profile Image
                        </label>
                        <input
                          type="file"
                          id="profileImage"
                          name="profileImage"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="affiliationUpto" className="form-label">
                          Affiliation Upto{" "}
                          <span className="text-danger">*</span>
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
                          <option value="Senior Secondary">
                            Senior Secondary
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
                          required
                        />
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
                          placeholder="Example : AAAAA0000A"
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
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteSchoolProfile;
