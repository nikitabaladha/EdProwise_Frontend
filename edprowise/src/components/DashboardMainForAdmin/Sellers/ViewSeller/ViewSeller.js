import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { useNavigate } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import getAPI from "../../../../api/getAPI";
import { Link } from "react-router-dom";

const ViewSeller = () => {
  const location = useLocation();

  const sellerId = location.state?.sellerId;

  const navigate = useNavigate();

  const [sellerProfile, setSellerProfile] = useState(null);

  const fetchSellerProfileData = async () => {
    try {
      const response = await getAPI(
        `/seller-profile-get-by-id/${sellerId}`,
        {},
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        setSellerProfile(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Seller data:", err);
    }
  };

  useEffect(() => {
    if (sellerId) {
      fetchSellerProfileData();
    } else {
      console.error("No seller ID provided");
    }
  }, [sellerId]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header mb-2 d-flex justify-content-between align-items-center">
                    <h4 className="card-title text-center custom-heading-font card-title">
                      Seller Details
                    </h4>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font mb-3">
                  Company Detail
                </h4>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3 d-flex justify-content-center">
                      <div className="rounded bg-light d-flex align-items-center justify-content-center">
                        <img
                          src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.sellerProfile}`}
                          alt={`${sellerProfile?.companyName} Profile`}
                          className="avatar-md"
                          style={{
                            objectFit: "cover",
                            width: "200px",
                            height: "200px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="companyName" className="form-label">
                            Company Name
                          </label>
                          <p className="form-control">
                            {sellerProfile?.companyName}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="randomId" className="form-label">
                            SellerId
                          </label>
                          <p className="form-control">
                            {sellerProfile?.randomId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="gstin" className="form-label">
                        GSTIN
                      </label>
                      <p className="form-control">{sellerProfile?.gstin}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tan" className="form-label">
                        TAN Number
                      </label>
                      <p className="form-control">
                        {sellerProfile?.tan || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="companyType" className="form-label">
                        Company Type
                      </label>
                      <p className="form-control">
                        {sellerProfile?.companyType}
                      </p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="pan" className="form-label">
                        PAN Number
                      </label>
                      <p className="form-control">{sellerProfile?.pan}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cin" className="form-label">
                        CIN Number
                      </label>
                      <p className="form-control">
                        {sellerProfile?.cin || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="panFile" className="form-label">
                        PAN File
                      </label>
                      {sellerProfile?.panFile ? (
                        sellerProfile?.panFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.panFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.panFile}`}
                              alt="Affiliation Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No PAN File available</h5>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="gstFile" className="form-label">
                        GST File
                      </label>
                      {sellerProfile?.gstFile ? (
                        sellerProfile?.gstFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.gstFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.gstFile}`}
                              alt="Affiliation Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No GST File available</h5>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="tanFile" className="form-label">
                        TAN File
                      </label>
                      {sellerProfile?.tanFile ? (
                        sellerProfile?.tanFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.tanFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.tanFile}`}
                              alt="TAN Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No TAN File available</h5>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="cinFile" className="form-label">
                        CIN File
                      </label>
                      {sellerProfile?.cinFile ? (
                        sellerProfile?.cinFile?.endsWith(".pdf") ? (
                          <Worker workerUrl={process.env.REACT_APP_WORKER_URL}>
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                              }}
                            >
                              <Viewer
                                fileUrl={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.cinFile}`}
                              />
                            </div>
                          </Worker>
                        ) : (
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API_URL_FOR_IMAGE}${sellerProfile?.cinFile}`}
                              alt="TAN Certificate"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )
                      ) : (
                        <h5>No CIN File available</h5>
                      )}
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
                      Address
                    </label>
                    <p className="form-control">{sellerProfile?.address}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="cityStateCountry" className="form-label">
                        City State Country Location
                      </label>
                      <p className="form-control">
                        {sellerProfile?.cityStateCountry}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="landmark" className="form-label">
                        Land Mark
                      </label>
                      <p className="form-control">{sellerProfile?.landmark}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="pincode" className="form-label">
                        Pin Code
                      </label>
                      <p className="form-control">{sellerProfile?.pincode}</p>
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
                        Contact Number
                      </label>
                      <p className="form-control">{sellerProfile?.contactNo}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        htmlFor="alternateContactNo"
                        className="form-label"
                      >
                        Alternate Contact Number
                      </label>
                      <p className="form-control">
                        {sellerProfile?.alternateContactNo || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="emailId" className="form-label">
                        Email ID
                      </label>
                      <p className="form-control">{sellerProfile?.emailId}</p>
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Bank Details
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="accountNo" className="form-label">
                        Bank Account Number
                      </label>
                      <p className="form-control">{sellerProfile?.accountNo}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="ifsc" className="form-label">
                        IFSC Code
                      </label>
                      <p className="form-control">{sellerProfile?.ifsc}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="bankName" className="form-label">
                        Bank Name
                      </label>
                      <p className="form-control">{sellerProfile?.bankName}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="accountHolderName" className="form-label">
                        Account Holder Name
                      </label>
                      <p className="form-control">
                        {sellerProfile?.accountHolderName}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="branchName" className="form-label">
                        Branch Name
                      </label>
                      <p className="form-control">
                        {sellerProfile?.branchName}
                      </p>
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Additional Details
                </h4>
                <hr></hr>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="noOfEmployees" className="form-label">
                        Number Of Employees
                      </label>
                      <p className="form-control">
                        {sellerProfile?.noOfEmployees}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="ceoName" className="form-label">
                        CEO Name
                      </label>
                      <p className="form-control">
                        {sellerProfile?.ceoName || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="turnover" className="form-label">
                        Company Turnover
                      </label>
                      <p className="form-control">
                        {sellerProfile?.turnover || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Dealing Products
                </h4>
                <hr></hr>

                {sellerProfile?.dealingProducts &&
                  sellerProfile.dealingProducts.map((product, index) => (
                    <div key={index} className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="categoryName" className="form-label">
                            Category Name
                          </label>
                          <h5>{product.categoryId.categoryName}</h5>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="subCategoryName"
                            className="form-label"
                          >
                            Subcategory Name
                          </label>
                          <ul>
                            {product.subCategoryIds.map(
                              (subCategory, subIndex) => (
                                <li key={subIndex}>
                                  {subCategory.subCategoryName}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="text-end">
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSeller;
