import React, { useState, useEffect, useRef } from "react";

import getAPI from "../../../api/getAPI";
import putAPI from "../../../api/putAPI";

import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../CityData.json";

const UpdateSchoolProfile = () => {
  const location = useLocation();
  const schoolId = location.state?._id;

  const navigate = useNavigate();

  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (schoolId) {
      fetchSchoolData();
    } else {
      console.error("No school ID provided");
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSchoolData();
  }, []);

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
  });

  const profileImageRef = useRef(null);
  const affiliationCertificateRef = useRef(null);
  const panFileRef = useRef(null);

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school-profile/${schoolId}`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        setSchool(response.data.data);
        setFormData({
          ...formData,
          schoolName: response.data.data.schoolName,
          schoolMobileNo: response.data.data.schoolMobileNo,
          schoolEmail: response.data.data.schoolEmail,
          schoolAddress: response.data.data.schoolAddress,
          schoolLocation: response.data.data.schoolLocation,
          affiliationUpto: response.data.data.affiliationUpto,
          panNo: response.data.data.panNo,
          profileImage: response.data.data.profileImage,
          affiliationCertificate: response.data.data.affiliationCertificate,
          panFile: response.data.data.panFile,
          landMark: response.data.data.landMark,
          schoolPincode: response.data.data.schoolPincode,
          deliveryAddress: response.data.data.deliveryAddress,
          deliveryLocation: response.data.data.deliveryLocation,
          deliveryLandMark: response.data.data.deliveryLandMark,
          deliveryPincode: response.data.data.deliveryPincode,
          contactPersonName: response.data.data.contactPersonName,
          numberOfStudents: response.data.data.numberOfStudents,
          principalName: response.data.data.principalName,
          schoolAlternateContactNo: response.data.data.schoolAlternateContactNo,
        });
        console.log("school data", response.data.data);
        console.log("School location", response.data.data.schoolLocation);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
  }, []);

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
        `/school-profile/${school._id}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
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
        });

        profileImageRef.current.value = "";
        affiliationCertificateRef.current.value = "";
        panFileRef.current.value = "";

        toast.success("School Profile successfully completed!");
        navigate(`/school-dashboard`);
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

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const getBaseFileName = (url) => {
    return url ? url.split("/").pop() : "";
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
                    <div className="card-header mb-2">
                      <h4 className="card-title custom-heading-font">
                        Update Your Profile
                      </h4>
                    </div>
                  </div>
                  <form onSubmit={handleUpdate}>
                    <h4 className="card-title text-center custom-heading-font mb-3">
                      School Details
                    </h4>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="schoolName" className="form-label">
                            School Name
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
                            required
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
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            School Email
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
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="mobileNo" className="form-label">
                            School Mobile Number
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
                            required
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
                        <label htmlFor="address" className="form-label">
                          School Address
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
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="schoolLocation"
                            className="form-label"
                          >
                            School Location
                          </label>
                          <select
                            id="schoolLocation"
                            name="schoolLocation"
                            className="form-control"
                            value={formData.schoolLocation}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select City-State-Country</option>
                            {cityOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="panNo" className="form-label">
                            Land Mark
                          </label>
                          <input
                            type="text"
                            id="landMark"
                            name="landMark"
                            className="form-control"
                            value={formData.landMark}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label htmlFor="panNo" className="form-label">
                            School Pin Code
                          </label>
                          <input
                            type="text"
                            id="schoolPincode"
                            name="schoolPincode"
                            className="form-control"
                            value={formData.schoolPincode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <h4 className="card-title text-center custom-heading-font">
                      Delivery Address Details
                    </h4>
                    <hr></hr>

                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="deliveryAddress" className="form-label">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          className="form-control"
                          value={formData.deliveryAddress}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryLocation"
                            className="form-label"
                          >
                            Delivery Location
                          </label>
                          <select
                            id="deliveryLocation"
                            name="deliveryLocation"
                            className="form-control"
                            value={formData.deliveryLocation}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select City-State-Country</option>
                            {cityOptions.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryLandMark"
                            className="form-label"
                          >
                            Delivery LandMark
                          </label>
                          <input
                            type="text"
                            id="deliveryLandMark"
                            name="deliveryLandMark"
                            className="form-control"
                            value={formData.deliveryLandMark}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryPincode"
                            className="form-label"
                          >
                            Delivery Pin Code
                          </label>
                          <input
                            type="text"
                            id="deliveryPincode"
                            name="deliveryPincode"
                            className="form-control"
                            value={formData.deliveryPincode}
                            onChange={handleChange}
                            required
                          />
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
                            required
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
                            Affiliation Upto
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
                            Affiliation Certificate
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
                            PAN Number
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
                            PAN File
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

export default UpdateSchoolProfile;
