import React, { useState } from "react";

const AddSchoolProfile = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    pan: "",
    schoolAddress: "",
    schoolCityStateCountry: "",
    schoolPincode: "",
    sameAsAbove: false,
    deliveryAddress: "",
    deliveryCityStateCountry: "",
    deliveryPincode: "",
    contactNo: "",
    alternateContactNo: "",
    email: "",
    logo: null,
    contactPersonName: "",
    noOfStudents: "",
    principalName: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "sameAsAbove" && checked
        ? {
            deliveryAddress: prevData.schoolAddress,
            deliveryCityStateCountry: prevData.schoolCityStateCountry,
            deliveryPincode: prevData.schoolPincode,
          }
        : {}),
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
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
                    School Details
                  </h4>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="schoolName" className="form-label">
                      School Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="pan" className="form-label">
                      PAN
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pan"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="schoolAddress" className="form-label">
                      Address of School
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="schoolAddress"
                      name="schoolAddress"
                      value={formData.schoolAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="schoolCityStateCountry"
                      className="form-label"
                    >
                      City, State, Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="schoolCityStateCountry"
                      name="schoolCityStateCountry"
                      value={formData.schoolCityStateCountry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="schoolPincode" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="schoolPincode"
                      name="schoolPincode"
                      value={formData.schoolPincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="sameAsAbove" className="form-label">
                      Same as Above
                    </label>
                    <input
                      type="checkbox"
                      id="sameAsAbove"
                      name="sameAsAbove"
                      checked={formData.sameAsAbove}
                      onChange={handleChange}
                    />
                  </div>
                  {!formData.sameAsAbove && (
                    <>
                      <div className="col-md-12 mb-3">
                        <label htmlFor="deliveryAddress" className="form-label">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="deliveryAddress"
                          name="deliveryAddress"
                          value={formData.deliveryAddress}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label
                          htmlFor="deliveryCityStateCountry"
                          className="form-label"
                        >
                          City, State, Country
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="deliveryCityStateCountry"
                          name="deliveryCityStateCountry"
                          value={formData.deliveryCityStateCountry}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="deliveryPincode" className="form-label">
                          Pincode
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="deliveryPincode"
                          name="deliveryPincode"
                          value={formData.deliveryPincode}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="contactNo" className="form-label">
                      Contact No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactNo"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="alternateContactNo" className="form-label">
                      Alternate Contact No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="alternateContactNo"
                      name="alternateContactNo"
                      value={formData.alternateContactNo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email ID
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="logo" className="form-label">
                      Logo of School
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="logo"
                      name="logo"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="contactPersonName" className="form-label">
                      Contact Person Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactPersonName"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="noOfStudents" className="form-label">
                      No. of Students
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="noOfStudents"
                      name="noOfStudents"
                      value={formData.noOfStudents}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="principalName" className="form-label">
                      Principal Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="principalName"
                      name="principalName"
                      value={formData.principalName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Add School Profile
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

export default AddSchoolProfile;
