import React, { useState, useEffect, useRef } from "react";

import getAPI from "../../../api/getAPI";
import putAPI from "../../../api/putAPI";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CityData from "../../CityData.json";

const CompleteSchoolProfile = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
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

  const fetchSchoolData = async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const schoolId = userDetails?.schoolId;

    if (!schoolId) {
      console.error("School ID not found in localStorage");
      return;
    }

    try {
      const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSchool(response.data.data);

        console.log("school profile", response.data.data);

        setFormData((prev) => ({
          ...prev,
          ...response.data.data,
        }));
      } else {
        console.error("Invalid response format or error in response");
        // Redirect to /complete-your-school-profile if no school profile is found
        navigate("/complete-your-school-profile");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
      // Redirect to /complete-your-school-profile if there's an error
      navigate("/complete-your-school-profile");
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
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
      const response = await putAPI(
        `/school-profile/${school.schoolId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        const updatedUserResponse = await getAPI(`/get-user-by-id/${userId}`);
        if (!updatedUserResponse.hasError) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(updatedUserResponse.data.data)
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

        // Clear file input references
        profileImageRef.current.value = "";
        affiliationCertificateRef.current.value = "";
        panFileRef.current.value = "";

        toast.success("School Profile successfully updated!");
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

  const getBaseFileName = (url) => {
    return url ? url.split("/").pop() : "";
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  return (
    <>
      {school && (
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
                  <form onSubmit={handleUpdate}>
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
                            placeholder="Example : ABC SChool"
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
                            School Alternate Contact Number
                          </label>
                          <input
                            type="tel"
                            id="mobileNo"
                            name="schoolAlternateContactNo"
                            className="form-control"
                            value={formData.schoolAlternateContactNo}
                            onChange={handleChange}
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
                          placeholder="Example :  ABC Building, XYZ Street"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="schoolLocation"
                            className="form-label"
                          >
                            School Location{" "}
                            <span className="text-danger">*</span>
                          </label>

                          <Select
                            id="cityStateCountry"
                            name="schoolLocation"
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
                            placeholder="Example : Near XYZ Market"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="panNo" className="form-label">
                            School Pin Code{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            id="schoolPincode"
                            name="schoolPincode"
                            className="form-control"
                            value={formData.schoolPincode}
                            onChange={handleChange}
                            required
                            placeholder="Example : 560068"
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
                          Delivery Address{" "}
                          <span className="text-danger">*</span>
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
                            placeholder="Example : ABC Building , XYZ Street"
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
                            placeholder="Example : ABC Building , XYZ Street"
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
                              placeholder="Example : Near Bus Stand"
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
                              placeholder="Example : Near Bus Stand"
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryPincode"
                            className="form-label"
                          >
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
                              placeholder="Example : 518345"
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
                              placeholder="Example : 518345"
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
                          <label
                            htmlFor="affiliationUpto"
                            className="form-label"
                          >
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
                            <option value="Senior Secondary (Upto Class 12)">
                              Senior Secondary (Upto Class 12)
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
                            ref={panFileRef}
                          />
                          {school.panFile ? (
                            <div>
                              <small>
                                Existing PAN File:{" "}
                                {getBaseFileName(school.panFile)}
                              </small>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
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
      )}
    </>
  );
};

export default CompleteSchoolProfile;
