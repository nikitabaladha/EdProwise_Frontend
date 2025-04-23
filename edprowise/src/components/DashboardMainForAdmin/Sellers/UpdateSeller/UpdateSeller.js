import React, { useState, useEffect, useRef, use } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../api/getAPI";
import putAPI from "../../../../api/putAPI";
import CityData from "../../../CityData.json";
import Select from "react-select";

const UpdateSeller = () => {
  const location = useLocation();
  const seller = location.state?.seller;
  const profileId = location.state?.seller?.sellerId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "",
    sellerProfile: null,
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
    accountNo: "",
    ifsc: "",
    accountHolderName: "",
    bankName: "",
    branchName: "",
    noOfEmployees: "",
    ceoName: "",
    turnover: "",
    panFile: null,
    tanFile: null,
    cinFile: null,
    gstFile: null,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [dealingProducts, setDealingProducts] = useState([]);
  const [sellerProfile, setSellerProfile] = useState(null);

  const cityOptions = Object.entries(CityData).flatMap(([state, cities]) =>
    cities.map((city) => ({
      value: `${city}, ${state}, India`,
      label: `${city}, ${state}, India`,
    }))
  );
  const sellerProfileRef = useRef(null);
  const panFileRef = useRef(null);
  const gstFileRef = useRef(null);
  const tanFileRef = useRef(null);
  const cinFileRef = useRef(null);

  useEffect(() => {
    if (profileId) {
      fetchSellerProfileData();
    }
  }, [profileId]);

  const fetchSellerProfileData = async () => {
    try {
      const response = await getAPI(
        `/seller-profile-get-by-id/${profileId}`,
        {},
        true
      );
      if (!response.hasError && response.data && response.data.data) {
        setFormData({
          companyName: response.data.data.companyName,
          companyType: response.data.data.companyType,
          sellerProfile: response.data.data.sellerProfile,
          gstin: response.data.data.gstin,
          pan: response.data.data.pan,
          tan: response.data.data.tan,
          cin: response.data.data.cin,
          address: response.data.data.address,
          cityStateCountry: response.data.data.cityStateCountry,
          landmark: response.data.data.landmark,
          pincode: response.data.data.pincode,
          contactNo: response.data.data.contactNo,
          alternateContactNo: response.data.data.alternateContactNo,
          emailId: response.data.data.emailId,
          accountNo: response.data.data.accountNo,
          ifsc: response.data.data.ifsc,
          accountHolderName: response.data.data.accountHolderName,
          bankName: response.data.data.bankName,
          branchName: response.data.data.branchName,
          noOfEmployees: response.data.data.noOfEmployees,
          ceoName: response.data.data.ceoName,
          turnover: response.data.data.turnover,
          panFile: response.data.data.panFile,
          tanFile: response.data.data.tanFile,
          cinFile: response.data.data.cinFile,
          gstFile: response.data.data.gstFile,
        });

        setSellerProfile(response.data.data);

        const normalizedProducts = response.data.data.dealingProducts.map(
          (product) => ({
            categoryId: product.categoryId._id,
            subCategoryIds: product.subCategoryIds.map((subCat) => subCat._id),
          })
        );
        setDealingProducts(normalizedProducts);

        // Fetch subcategories for existing categories
        normalizedProducts.forEach((product) => {
          if (product.categoryId) {
            handleCategoryChange(product.categoryId, product.subCategoryIds);
          }
        });
      }
    } catch (err) {
      console.error("Error fetching Seller data:", err);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAPI("/category", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (
    categoryId,
    selectedSubCategoryIds = []
  ) => {
    if (subCategories[categoryId]) return;

    try {
      const response = await getAPI(`/sub-category/${categoryId}`, {}, true);
      if (!response.hasError && Array.isArray(response.data.data)) {
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: response.data.data,
        }));

        const updatedProducts = [...dealingProducts];
        const productIndex = updatedProducts.findIndex(
          (product) => product.categoryId === categoryId
        );
        if (productIndex !== -1) {
          updatedProducts[productIndex].subCategoryIds = selectedSubCategoryIds;
          setDealingProducts(updatedProducts);
        }
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  };

  const addDealingProduct = () => {
    setDealingProducts((prev) => [
      ...prev,
      { categoryId: "", subCategoryIds: [] },
    ]);
  };

  const handleDealingProductChange = (index, field, value) => {
    const updatedProducts = [...dealingProducts];
    if (field === "categoryId") {
      updatedProducts[index] = { categoryId: value, subCategoryIds: [] };
      handleCategoryChange(value);
    } else if (field === "subCategoryIds") {
      updatedProducts[index].subCategoryIds = value;
    }
    setDealingProducts(updatedProducts);
  };

  const removeDealingProduct = (index) => {
    const updatedProducts = [...dealingProducts];
    updatedProducts.splice(index, 1);
    setDealingProducts(updatedProducts);
  };

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

  const [sending, setSending] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("companyType", formData.companyType);
    formDataToSend.append("gstin", formData.gstin);
    formDataToSend.append("pan", formData.pan);
    formDataToSend.append("tan", formData.tan);
    formDataToSend.append("cin", formData.cin);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("cityStateCountry", formData.cityStateCountry);
    formDataToSend.append("landmark", formData.landmark);
    formDataToSend.append("pincode", formData.pincode);
    formDataToSend.append("contactNo", formData.contactNo);
    formDataToSend.append("alternateContactNo", formData.alternateContactNo);
    formDataToSend.append("emailId", formData.emailId);
    formDataToSend.append("accountNo", formData.accountNo);
    formDataToSend.append("ifsc", formData.ifsc);
    formDataToSend.append("accountHolderName", formData.accountHolderName);
    formDataToSend.append("bankName", formData.bankName);
    formDataToSend.append("branchName", formData.branchName);
    formDataToSend.append("noOfEmployees", formData.noOfEmployees);
    formDataToSend.append("ceoName", formData.ceoName);
    formDataToSend.append("turnover", formData.turnover);

    if (formData.sellerProfile instanceof File) {
      formDataToSend.append("sellerProfile", formData.sellerProfile);
    }
    if (formData.panFile instanceof File) {
      formDataToSend.append("panFile", formData.panFile);
    }
    if (formData.tanFile instanceof File) {
      formDataToSend.append("tanFile", formData.tanFile);
    }
    if (formData.cinFile instanceof File) {
      formDataToSend.append("cinFile", formData.cinFile);
    }
    if (formData.gstFile instanceof File) {
      formDataToSend.append("gstFile", formData.gstFile);
    }
    formDataToSend.append("dealingProducts", JSON.stringify(dealingProducts));

    setSending(true);

    try {
      const response = await putAPI(
        `/seller-profile/${profileId}`,
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (!response.data.hasError) {
        toast.success("Seller updated successfully!");

        setFormData({
          companyName: "",
          companyType: "",
          sellerProfile: null,
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
          accountNo: "",
          ifsc: "",
          accountHolderName: "",
          bankName: "",
          branchName: "",
          noOfEmployees: "",
          ceoName: "",
          turnover: "",
          panFile: null,
          tanFile: null,
          cinFile: null,
          gstFile: null,
        });
        navigate(-1);
      } else {
        toast.error("Failed to update Seller.");
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title custom-heading-font">
                    Update Seller
                  </h4>
                </div>
              </div>
              <form onSubmit={handleUpdate}>
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
                        // required
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
                        // required
                      >
                        <option value="">Select Company Type</option>
                        <option value="Public Limited">Public Limited</option>
                        <option value="Private Limited">Private Limited</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Sole Proprietor">Sole Proprietor</option>
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
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="gstFile" className="form-label">
                        GST File <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        id="gstFile"
                        name="gstFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={gstFileRef}
                        // required
                      />
                      {seller?.gstFile ? (
                        <div>
                          <small>
                            Existing GST File: {getBaseFileName(seller.gstFile)}
                          </small>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
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
                        // required
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
                        // required
                      />
                      {seller?.panFile ? (
                        <div>
                          <small>
                            Existing PAN File: {getBaseFileName(seller.panFile)}
                          </small>
                        </div>
                      ) : null}
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
                        value={formData.tan || "Not Provided"}
                        onChange={handleChange}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="tanFile" className="form-label">
                        TAN File
                      </label>
                      <input
                        type="file"
                        id="tanFile"
                        name="tanFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={tanFileRef}
                        // required
                      />
                      {seller?.tanFile ? (
                        <div>
                          <small>
                            Existing TAN File: {getBaseFileName(seller.tanFile)}
                          </small>
                        </div>
                      ) : (
                        <h5>Not Provided</h5>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
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
                        value={formData.cin || "Not Provided"}
                        onChange={handleChange}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="cinFile" className="form-label">
                        CIN File
                      </label>
                      <input
                        type="file"
                        id="cinFile"
                        name="cinFile"
                        className="form-control"
                        accept="image/*,application/pdf"
                        onChange={handleChange}
                        ref={cinFileRef}
                        // required
                      />
                      {seller?.cinFile ? (
                        <div>
                          <small>
                            Existing PAN File: {getBaseFileName(seller.cinFile)}
                          </small>
                        </div>
                      ) : (
                        <h5>Not Provided</h5>
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
                      Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      // required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="cityStateCountry" className="form-label">
                        City State Country Location{" "}
                        <span className="text-danger">*</span>
                      </label>

                      <Select
                        id="cityStateCountry"
                        name="cityStateCountry"
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
                        // required
                        classNamePrefix="react-select"
                        className="custom-react-select"
                      />
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
                        // required
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
                        // required
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
                        // required
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
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="sellerProfile" className="form-label">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        id="sellerProfile"
                        name="sellerProfile"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        ref={sellerProfileRef}
                        // required
                      />
                      {seller?.sellerProfile ? (
                        <div>
                          <small>
                            Existing Profile Image:{" "}
                            {getBaseFileName(seller.sellerProfile)}
                          </small>
                        </div>
                      ) : null}
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
                        Bank Account Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="accountNo"
                        name="accountNo"
                        className="form-control"
                        value={formData.accountNo}
                        onChange={handleChange}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <label htmlFor="ifsc" className="form-label">
                        IFSC Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="ifsc"
                        name="ifsc"
                        className="form-control"
                        value={formData.ifsc}
                        onChange={handleChange}
                        // required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="bankName" className="form-label">
                        Bank Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        className="form-control"
                        value={formData.bankName}
                        onChange={handleChange}
                        // required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="accountHolderName" className="form-label">
                        Account Holder Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="accountHolderName"
                        name="accountHolderName"
                        className="form-control"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="branchName" className="form-label">
                        Branch Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="branchName"
                        name="branchName"
                        className="form-control"
                        value={formData.branchName}
                        onChange={handleChange}
                        required
                      />
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
                        Number Of Employees{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        id="noOfEmployees"
                        name="noOfEmployees"
                        className="form-control"
                        value={formData.noOfEmployees}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Number Of Employees</option>
                        <option value="1 to 10 Employees">
                          1 to 10 Employees
                        </option>
                        <option value="11 to 25 Employees">
                          11 to 25 Employees
                        </option>
                        <option value="25 to 50 Employees">
                          25 to 50 Employees
                        </option>
                        <option value="50 to 100 Employees">
                          50 to 100 Employees
                        </option>
                        <option value="50 to 100 Employees">
                          50 to 100 Employees
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="ceoName" className="form-label">
                        CEO Name
                      </label>
                      <input
                        type="text"
                        id="ceoName"
                        name="ceoName"
                        className="form-control"
                        value={formData.ceoName}
                        onChange={handleChange}
                        // required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="turnover" className="form-label">
                        Company Turnover
                      </label>
                      <select
                        id="turnover"
                        name="turnover"
                        className="form-control"
                        value={formData.turnover}
                        onChange={handleChange}
                      >
                        <option value="">Select Company Turnover</option>
                        <option value="1 to 10 Lakh">1 to 10 Lakh</option>
                        <option value="10 to 50 Lakh">10 to 50 Lakh</option>
                        <option value="50 Lakh to 1 Crore">
                          50 Lakh to 1 Crore
                        </option>
                        <option value="More than 1 Crore">
                          More than 1 Crore
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <h4 className="card-title text-center custom-heading-font">
                  Dealing Products
                </h4>
                <hr />

                <div className="row">
                  {dealingProducts.map((product, index) => (
                    <div key={index} className="mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="category" className="form-label">
                            Category <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control"
                            value={product.categoryId}
                            onChange={(e) =>
                              handleDealingProductChange(
                                index,
                                "categoryId",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="subCategories" className="form-label">
                            Subcategories <span className="text-danger">*</span>
                          </label>
                          <div>
                            {(subCategories[product.categoryId] || []).map(
                              (subCategory) => (
                                <div
                                  key={subCategory.id}
                                  className="form-check ms-1"
                                >
                                  <input
                                    type="checkbox"
                                    id={`subCategory-${subCategory.id}`}
                                    value={subCategory.id}
                                    checked={product.subCategoryIds.includes(
                                      subCategory.id
                                    )}
                                    onChange={(e) => {
                                      const selectedSubCategories = e.target
                                        .checked
                                        ? [
                                            ...product.subCategoryIds,
                                            subCategory.id,
                                          ]
                                        : product.subCategoryIds.filter(
                                            (id) => id !== subCategory.id
                                          );
                                      handleDealingProductChange(
                                        index,
                                        "subCategoryIds",
                                        selectedSubCategories
                                      );
                                    }}
                                    className="form-check-input"
                                  />
                                  <label
                                    htmlFor={`subCategory-${subCategory.id}`}
                                    className="form-label"
                                  >
                                    {subCategory.subCategoryName}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={() => removeDealingProduct(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={addDealingProduct}
                >
                  Add Dealing Product
                </button>
                <div className="text-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={sending}
                  >
                    {sending ? "Submitting..." : "Submit"}
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

export default UpdateSeller;
