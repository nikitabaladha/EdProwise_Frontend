import React, { useState } from "react";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../CityData.json";

const AddNewSchool = ({ addSchool }) => {
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

  const navigate = useNavigate();

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await postAPI(
        "/school",
        data,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.hasError) {
        toast.success("School added successfully");

        const newSchool = {
          _id: response.data.data._id,
          schoolId: response.data.data.schoolId,
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
        };

        addSchool(newSchool);

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

        document.getElementById("profileImage").value = "";
        document.getElementById("affiliationCertificate").value = "";
        document.getElementById("panFile").value = "";

        navigate(-1);
      } else {
        toast.error(response.message || "Failed to add school");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Add New School
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
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
                    <div className="col-md-3">
                      {" "}
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
                    <div className="col-md-3">
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
                  </div>

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
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="cityStateCountry"
                          className="form-label"
                        >
                          City-State-Country
                        </label>

                        <select
                          id="cityStateCountry"
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
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <div className="mb-3">
                        <label htmlFor="affiliationUpto" className="form-label">
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
                      {" "}
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
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="panNumber" className="form-label">
                          PAN Number
                        </label>
                        <input
                          type="text"
                          id="panNumber"
                          name="panNo"
                          className="form-control"
                          value={formData.panNo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {" "}
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
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    {" "}
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Add School
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

export default AddNewSchool;
