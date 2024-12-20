import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSchool = ({ updateSchool }) => {
  const location = useLocation();
  const school = location.state?.school;

  console.log("School in UpdateSchool: ", school);

  // in part part of profileImage, affiliation Certificate, and pan File i just want to show url nothing else but if uer want he can change the image, certificate etc

  //   {
  //     "_id": "6764ee63a04cca7f8460cc7a",
  //     "schoolId": "SID00002",
  //     "schoolName": "EFG School",
  //     "schoolMobileNo": "1234567890",
  //     "schoolEmail": "efg@gmail.com",
  //     "schoolAddress": "B-503 Saaga Residency\r\nNear Zydus Corporate Park, Near Nirma University",
  //     "schoolLocation": "Choice 1",
  //     "profileImage": "/Images/SchoolProfile/profile_jpg_1734692847187.jpg",
  //     "affiliationCertificate": "/Documents/SchoolAffiliationCertificate/certificate_pdf_1734692847187.pdf",
  //     "affiliationUpto": "Pre-Primary",
  //     "panNo": "AAAAA9999A",
  //     "panFile": "/Documents/SchoolPanFile/certificate_pdf_1734692847187.pdf",
  //     "createdAt": "2024-12-20T04:11:15.486Z",
  //     "updatedAt": "2024-12-20T11:07:27.234Z",
  //     "__v": 0
  // }

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolMobileNo: "",
    schoolEmail: "",
    schoolAddress: "",
    schoolLocation: "",
    profileImage: null,
    affiliationCertificate: null,
    affiliationUpto: "",
    panNo: "",
    panFile: null,
  });

  useEffect(() => {
    if (school) {
      setFormData({
        schoolName: school.schoolName || "",
        schoolMobileNo: school.schoolMobileNo || "",
        schoolEmail: school.schoolEmail || "",
        schoolAddress: school.schoolAddress || "",
        schoolLocation: school.schoolLocation || "",
        profileImage: school.profileImage || null,
        affiliationCertificate: school.affiliationCertificate || null,
        affiliationUpto: school.affiliationUpto || "",
        panNo: school.panNo || "",
        panFile: school.panFile || null,
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
      formDataToSend.append(key, formData[key]);
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

        const newUpdatedSchool = {
          id: response.data.data._id,
          schoolId: response.data.data.schoolId,
          schoolName: response.data.data.schoolName,
          schoolMobileNo: response.data.data.schoolMobileNo,
          schoolEmail: response.data.data.schoolEmail,
          schoolAddress: response.data.data.schoolAddress,
          schoolLocation: response.data.data.schoolLocation,
          affiliationUpto: response.data.data.affiliationUpto,
          panNo: response.data.data.panNo,
        };

        updateSchool(newUpdatedSchool);

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
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body">
                <div className="container">
                  <div className="card-header mb-2">
                    <h4 className="card-title text-center custom-heading-font">
                      Update School
                    </h4>
                  </div>
                </div>
                <form onSubmit={handleUpdate}>
                  <div className="row">
                    <div className="col-md-6">
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
                          <option value="Choice 1">Choice 1</option>
                          <option value="Choice 2">Choice 2</option>
                          <option value="Choice 3">Choice 3</option>
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
                          accept="application/pdf"
                          onChange={handleChange}
                          required
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
                    <div className="col-md-6">
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
                          <option value="Higher Secondary(Upto Class 12)">
                            Higher Secondary (Upto Class 12)
                          </option>
                          <option value="College">College</option>
                          <option value="University">University</option>
                        </select>
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
                      <div className="mb-3">
                        <label htmlFor="panFile" className="form-label">
                          PAN File
                        </label>
                        <input
                          type="file"
                          id="panFile"
                          name="panFile"
                          className="form-control"
                          accept="application/pdf"
                          onChange={handleChange}
                          required
                        />
                        {school.panNo ? (
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
    </>
  );
};

export default UpdateSchool;
