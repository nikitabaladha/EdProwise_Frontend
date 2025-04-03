import React, { useState } from "react";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../CityData.json";
import Select from "react-select";

const AddNewSchool = () => {
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
    cities.map((city) => ({
      value: `${city}, ${state}, India`,
      label: `${city}, ${state}, India`,
    }))
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
                    <div className="col-md-3">
                      {" "}
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
                          placeholder="Example : example@gmail.com"
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
                        placeholder="Example :  ABC Building , 123 Street"
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
                          // required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {" "}
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
                      {" "}
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
                        <label htmlFor="panNumber" className="form-label">
                          PAN Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="panNumber"
                          name="panNo"
                          className="form-control"
                          value={formData.panNo}
                          onChange={handleChange}
                          required
                          placeholder="Example : ABCDE1234F"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {" "}
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
