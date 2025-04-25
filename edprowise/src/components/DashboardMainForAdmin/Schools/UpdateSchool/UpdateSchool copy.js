import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CityData from "../../../CityData.json";
import Select from "react-select";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";

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

  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [previewAffiliationCertificate, setPreviewAffiliationCertificate] =
    useState(null);
  const [previewPanFile, setPreviewPanFile] = useState(null);
  const [isAffiliationCertificatePDF, setIsAffiliationCertificatePDF] =
    useState(false);
  const [isPanFilePDF, setIsPanFilePDF] = useState(false);

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
      // Check file types for existing files
      const isAffiliationPDF = school.affiliationCertificate?.endsWith(".pdf");
      const isPanPDF = school.panFile?.endsWith(".pdf");

      setIsAffiliationCertificatePDF(isAffiliationPDF);
      setIsPanFilePDF(isPanPDF);

      // Set form data
      setFormData({
        schoolName: school.schoolName || "",
        schoolMobileNo: school.schoolMobileNo || "",
        schoolEmail: school.schoolEmail || "",
        schoolAddress: school.schoolAddress || "",
        schoolLocation: school.schoolLocation || "",
        affiliationUpto: school.affiliationUpto || "",
        panNo: school.panNo || "",
        profileImage: school.profileImage || null,
        affiliationCertificate: school.affiliationCertificate || null,
        panFile: school.panFile || null,
      });

      // Set previews for existing files
      if (school.profileImage) {
        setPreviewProfileImage(
          `${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.profileImage}`
        );
      }
      if (school.affiliationCertificate) {
        setPreviewAffiliationCertificate(
          `${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.affiliationCertificate}`
        );
      }
      if (school.panFile) {
        setPreviewPanFile(
          `${process.env.REACT_APP_API_URL_FOR_IMAGE}${school.panFile}`
        );
      }
    }
  }, [school]);

  useEffect(() => {
    return () => {
      // Clean up object URLs to avoid memory leaks
      if (previewProfileImage) URL.revokeObjectURL(previewProfileImage);
      if (previewAffiliationCertificate)
        URL.revokeObjectURL(previewAffiliationCertificate);
      if (previewPanFile) URL.revokeObjectURL(previewPanFile);
    };
  }, [previewProfileImage, previewAffiliationCertificate, previewPanFile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Handle previews based on file type
      if (file) {
        const fileUrl = URL.createObjectURL(file);

        if (name === "profileImage") {
          setPreviewProfileImage(fileUrl);
        } else if (name === "affiliationCertificate") {
          setPreviewAffiliationCertificate(fileUrl);
          setIsAffiliationCertificatePDF(file.type === "application/pdf");
        } else if (name === "panFile") {
          setPreviewPanFile(fileUrl);
          setIsPanFilePDF(file.type === "application/pdf");
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] instanceof File) {
        formDataToSend.append(key, formData[key]);
      } else if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }

    setSending(true);

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
        navigate(-1);
      } else {
        toast.error("Failed to update School.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setSending(false);
    }
  };

  const getBaseFileName = (url) => {
    return url ? url.split("/").pop() : "";
  };

  const renderFilePreview = (preview, isPDF, defaultPreview, altText) => {
    const fileUrl = preview || defaultPreview;
    const isPdfFile =
      isPDF ||
      (defaultPreview && defaultPreview.toLowerCase().endsWith(".pdf"));

    const containerStyle = {
      width: "100%",
      height: "200px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      marginBottom: "10px",
    };

    const contentStyle = {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    if (fileUrl) {
      if (isPdfFile) {
        return (
          <div style={containerStyle}>
            <Worker
              workerUrl={
                process.env.REACT_APP_WORKER_URL ||
                "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"
              }
            >
              <div style={contentStyle}>
                <Viewer
                  fileUrl={fileUrl}
                  defaultScale={SpecialZoomLevel.PageFit}
                  scrollMode="none"
                  renderError={(error) => (
                    <div className="text-danger">
                      Failed to load PDF: {error.message}
                    </div>
                  )}
                />
              </div>
            </Worker>
          </div>
        );
      } else {
        return (
          <div style={containerStyle}>
            <img
              src={fileUrl}
              alt={altText}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        );
      }
    } else {
      return (
        <div style={containerStyle}>
          <div className="text-muted">No file uploaded</div>
        </div>
      );
    }
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
                  <div className="col-md-4">
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
                      />
                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewProfileImage,
                          false,
                          formData.profileImage
                            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.profileImage}`
                            : null,
                          "Profile Preview"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
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
                  <div className="col-md-4">
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
                        <option value="Senior Secondary (Upto Class 12)">
                          Senior Secondary (Upto Class 12)
                        </option>
                        <option value="College">College</option>
                        <option value="University">University</option>
                      </select>
                    </div>
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
                  <div className="col-md-4">
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
                      />

                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewAffiliationCertificate,
                          isAffiliationCertificatePDF,
                          formData.affiliationCertificate
                            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.affiliationCertificate}`
                            : null,
                          "Affiliation Certificate"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
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

                      <div className="d-flex justify-content-center mt-2">
                        {renderFilePreview(
                          previewPanFile,
                          isPanFilePDF,
                          formData.panFile
                            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.panFile}`
                            : null,
                          "PAN File"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={sending}
                  >
                    {sending ? "Updating..." : "Update School"}
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
