import React, { useState } from "react";
import postAPI from "../../../api/postAPI";
import getAPI from "../../../api/getAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CityData from "../../CityData.json";


const CompleteEdprowiseProfile = () => {
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

  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const navigate = useNavigate();

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  // const handleSelectCity = (city) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     cityStateCountry: city,
  //   }));
  //   setShowDropdown(false); // Hide dropdown after selection
  //   setSearchQuery(""); // Clear search query
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await postAPI(
        "/edprowise-profile",
        data,
        { "Content-Type": "multipart/form-data" },
        true
      );

      if (!response.hasError) {
        console.log("profile storage data", response.data.data);
        const userId = response.data.data.userId;

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
        document.getElementById("edprowiseProfile").value = "";

        const updatedUserResponse = await getAPI(`/get-admin-by-id/${userId}`);

        if (!updatedUserResponse.hasError) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(updatedUserResponse.data.data)
          );
        }

        toast.success("Admin Profile added successfully");
        navigate("/admin-dashboard");
      } else {
        toast.error(response.message || "Failed to add admin profile");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => `${city}, ${state}, India`)
  );

  // Filter cities based on search query
  const filteredCities = cityOptions.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (city) => {
    console.log("Selected city:", city); // Debugging log
    setFormData((prevState) => ({
      ...prevState,
      cityStateCountry: city,
    }));
    setShowDropdown(false); // Hide dropdown after selection
    setSearchQuery(""); // Clear search query
    console.log("Updated formData:", formData); // Check updated state
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
                    <h4 className="card-title custom-heading-font">
                      Add Your Profile
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <h4 className="card-title text-center custom-heading-font">
                    Company Detail
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">
                          Company Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          className="form-control"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          placeholder="ABC Company"
                        />
                      </div>
                    </div>  
                    <div className="col-md-6">
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
                          <option value="Private Limited">
                            Private Limited
                          </option>
                          <option value="Partnership">Partnership</option>
                          <option value="Sole Proprietor">
                            Sole Proprietor
                          </option>
                          <option value="HUF">HUF</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="gstin" className="form-label">
                          GSTIN <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="gstin"
                          name="gstin"
                          className="form-control"
                          value={formData.gstin}
                          onChange={handleChange}
                          required
                          placeholder="Example : 22AAAAA0000A1Z5"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="pan" className="form-label">
                          PAN Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="pan"
                          name="pan"
                          className="form-control"
                          value={formData.pan}
                          onChange={handleChange}
                          required
                          placeholder="Example : AAAA0000A"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="tan" className="form-label">
                          TAN Number
                        </label>
                        <input
                          type="text"
                          id="tan"
                          name="tan"
                          className="form-control"
                          value={formData.tan}
                          onChange={handleChange}
                          placeholder="Example : AAAAPL1234C"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="cin" className="form-label">
                          CIN Number
                        </label>
                        <input
                          type="text"
                          id="cin"
                          name="cin"
                          className="form-control"
                          value={formData.cin}
                          onChange={handleChange}
                          placeholder="Example : U74999KA2022PTC123456"
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custo m-heading-font">
                    Address Details 
                  </h4> 
                  <hr></hr>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="address"
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Example : 123 Building, ABC Street"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">           
                      <div className="mb-3">
                        <label
                          htmlFor="cityStateCountry"
                          className="form-label"
                        >
                          City State Country Location
                        </label>
                        <div className="dropdown">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search City"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setShowDropdown(true)}
                          />
                          {showDropdown && (
                            <div className="dropdown-menu show" style={{
                              maxHeight: '200px', 
                              overflowY: 'auto',  
                              overflowX: 'hidden'
                            }}
                      >
                              {filteredCities.map((city, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  className="dropdown-item"
                                  onClick={() => handleSelectCity(city)}
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="landmark" className="form-label">
                          Land Mark <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="landmark"
                          name="landmark"
                          className="form-control"
                          value={formData.landmark}
                          onChange={handleChange}
                          required  
                          placeholder="Example : Near ABC Market"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="pincode" className="form-label">
                          Pin Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          className="form-control"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                          placeholder="Example : 560045"
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="card-title text-center custom-heading-font">
                    Contact Details
                  </h4>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="contactNo" className="form-label">
                          Contact Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          id="contactNo"
                          name="contactNo"
                          className="form-control"
                          value={formData.contactNo}
                          onChange={handleChange}
                          required
                          placeholder="Example : 9876543210"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="alternateContactNo"
                          className="form-label"
                        >
                          Alternate Contact Number
                        </label>
                        <input
                          type="tel"
                          id="alternateContactNo"
                          name="alternateContactNo"
                          className="form-control"
                          value={formData.alternateContactNo}
                          onChange={handleChange}
                          // required
                          placeholder="Example : 9876543210"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="emailId" className="form-label">
                          Email ID <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          id="emailId"
                          name="emailId"
                          className="form-control"
                          value={formData.emailId}
                          onChange={handleChange}
                          required
                          placeholder="Example : example@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="edprowiseProfile"
                          className="form-label"
                        >
                          Profile Image
                        </label>
                        <input
                          type="file"
                          id="edprowiseProfile"
                          name="edprowiseProfile"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChange}
                          // required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary custom-submit-button"
                    >
                      Submit Profile  
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

export default CompleteEdprowiseProfile;  