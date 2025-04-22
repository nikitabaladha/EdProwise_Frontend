import React, { useState, useEffect, useRef } from "react";
import putAPI from "../../../api/putAPI";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CityData from "../../CityData.json";
import getAPI from "../../../api/getAPI";
import Select from "react-select";

const UpdateAdminProfile = () => {
  const location = useLocation();
  const profileId = location.state?._id;
  console.log("profileId", profileId);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    edprowiseProfile: null,
    gstin: "",
    pan: "",
    tan: "",
    cin: "",
    address: "",
    cityStateCountry: "",
    landmark: "",
    pincode: "",
    contactNo: "",
    alternateContactNo: "",
    emailId: "",
  });

  const edprowiseProfileRef = useRef(null);

  useEffect(() => {
    if (profileId) {
      fetchProfileData();
    } else {
      console.error("No ProfileId provided");
    }
  }, [profileId]);

  console.log("Profile ID for fetching:", profileId);

  const fetchProfileData = async () => {
    try {
      const response = await getAPI(`/edprowise-profile`, {}, true);

      if (!response.hasError && response.data && response.data.data) {
        const profileData = response.data.data;

        console.log("profileData after fetch", profileData);

        setFormData({
          companyName: profileData.companyName || "",
          companyType: profileData.companyType || "",
          edprowiseProfile: profileData.edprowiseProfile || null,
          gstin: profileData.gstin || "",
          pan: profileData.pan || "",
          tan: profileData.tan || "",
          cin: profileData.cin || "",
          address: profileData.address || "",
          cityStateCountry: profileData.cityStateCountry || "",
          landmark: profileData.landmark || "",
          pincode: profileData.pincode || "",
          contactNo: profileData.contactNo || "",
          alternateContactNo: profileData.alternateContactNo || "",
          emailId: profileData.emailId || "",
        });
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Profile:", err);
    }
  };

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(
        key,
        formData[key] instanceof File ? formData[key] : formData[key] || ""
      );
    }

    setSending(true);

    try {
      const response = await putAPI(
        `/edprowise-profile/${profileId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        // Reset formData state
        setFormData({
          companyName: "",
          companyType: "",
          edprowiseProfile: null,
          gstin: "",
          pan: "",
          tan: "",
          cin: "",
          address: "",
          cityStateCountry: "",
          landmark: "",
          pincode: "",
          contactNo: "",
          alternateContactNo: "",
          emailId: "",
        });

        edprowiseProfileRef.current.value = "";

        toast.success("Admin Profile successfully updated!");
        navigate(`/admin-dashboard`);
      } else {
        toast.error("Failed to update Admin Profile.");
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
    } finally {
      setSending(false);
    }
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => ({
      value: `${city}, ${state}, India`,
      label: `${city}, ${state}, India`,
    }))
  );

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
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
                <h4 className="card-title text-center custom-heading-font">
                  Company Detail
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="edprowiseProfile" className="form-label">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        id="edprowiseProfile"
                        name="edprowiseProfile"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        ref={edprowiseProfileRef}
                      />
                      <div className="mt-3">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="New Profile Preview"
                            className="img-thumbnail"
                            style={{ maxWidth: "150px" }}
                          />
                        ) : formData.edprowiseProfile ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData?.edprowiseProfile}`}
                            alt={`${formData?.companyName} Profile`}
                            className="avatar-md"
                            style={{
                              objectFit: "cover",
                              width: "200px",
                              height: "200px",
                              borderRadius: "10px",
                              backgroundColor: "#f0f0f0",
                            }}
                          />
                        ) : (
                          <small>No profile image uploaded</small>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="companyName" className="form-label">
                        Company Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="gstin" className="form-label">
                        Company GSTIN Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="gstin"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tan" className="form-label">
                        Company TAN Number
                      </label>
                      <input
                        type="text"
                        id="tan"
                        name="tan"
                        value={formData.tan}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Example : AAAAPL1234C"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="companyType" className="form-label">
                        Company Type <span className="text-danger">*</span>
                      </label>
                      <select
                        id="companyType"
                        name="companyType"
                        className="form-control"
                        value={formData.companyType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Company Type</option>
                        <option value="Public Limited">Public Limited</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Sole Proprietor">Sole Proprietor</option>
                        <option value="HUF">HUF</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="pan" className="form-label">
                        Company PAN Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="pan"
                        name="pan"
                        value={formData.pan}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cin" className="form-label">
                        Company CIN Number
                      </label>
                      <input
                        type="text"
                        id="cin"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Example : U74999KA2022PTC123456"
                      />
                    </div>
                  </div>
                </div>

                <h4 className="card-title text-center custom-heading-font">
                  Address Details
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="cityStateCountry" className="form-label">
                        City, State, Country{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Select
                        id="cityStateCountry"
                        name="schoolLocation"
                        options={cityOptions}
                        value={cityOptions.find(
                          (option) => option.value === formData.cityStateCountry
                        )}
                        onChange={(selectedOption) =>
                          setFormData((prev) => ({
                            ...prev,
                            cityStateCountry: selectedOption
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
                      <label htmlFor="landmark" className="form-label">
                        Landmark <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pincode <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <h4 className="card-title text-center custom-heading-font">
                  Contact Details
                </h4>
                <hr></hr>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="contactNo" className="form-label">
                        Contact No <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactNo"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <div className="mb-3">
                      <label
                        htmlFor="alternateContactNo"
                        className="form-label"
                      >
                        Alternate Contact No
                      </label>
                      <input
                        type="text"
                        id="alternateContactNo"
                        name="alternateContactNo"
                        value={formData.alternateContactNo}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Example : 9876543210"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="emailId"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending}
                >
                  {sending ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminProfile;
