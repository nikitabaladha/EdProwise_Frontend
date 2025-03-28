import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import { toast } from "react-toastify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const SellerRegistrationEmailTamplate = () => {
    const [formData, setFormData] = useState({
        mailFrom: "",
        subject: "As A Seller Registration Sucessful", 
        content: "",
      });
    
      // Handle input change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      // Handle content change for ReactQuill
      const handleContentChange = (value) => {
        setFormData((prevData) => ({
          ...prevData,
          content: value,
        }));
      };

      
    
  return (
        <div>
          <div className="container">
            <div className="row">
              {/* Left Card - Email Details */}
              <div className="col-xl-5">
                <div className="card m-2">
                  <div className="card-body custom-heading-padding">
                    <div className="container">
                      <div className="card-header mb-2">
                        <h4 className="card-title text-center custom-heading-font">
                          Email Details
                        </h4>
                      </div>
                    </div>
                    {/* onSubmit={handleSubmit} */}
                    <form >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              defaultValue="As A Seller Registration Successful"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="mailFrom" className="form-label">
                              From
                            </label>
                            <input
                              type="text"
                              id="mailFrom"
                              name="mailFrom"
                              className="form-control"
                            //   value={formData.mailFrom}
                            //   onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary custom-submit-button">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    
              {/* Right Card - Variables */}
              <div className="col-xl-7">
                <div className="card m-2">
                  <div className="card-body custom-heading-padding">
                    <div className="container">
                      <div className="card-header mb-2">
                        <h4 className="card-title text-center custom-heading-font">
                          Variables
                        </h4>
                      </div>
                    </div>
                    <div className="row">
                      <p className="col-6">
                        Company Name: <span className="text-primary">{`{mailForm}`}</span>
                      </p>
                      <p className="col-6">
                        UserName: <span className="text-primary">{`{userName}`}</span>
                      </p>
                      <p className="col-6">
                        Email: <span className="text-primary">{`{email}`}</span>
                      </p>
                      <p className="col-6">
                        Password: <span className="text-primary">{`{password}`}</span>
                      </p>
                      <p className="col-6">
                        Role: <span className="text-primary">{`{role}`}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Bottom Section - Email Content */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card m-2">
                  <div className="card-body custom-heading-padding">
                    <div className="container">
                      <div className="card-header mb-2">
                        <h4 className="card-title text-center custom-heading-font">
                          Email
                        </h4>
                      </div>
                    </div>
                    {/* onSubmit={handleSubmit} */}
                    <form >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="subject" className="form-label">
                              Subject
                            </label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              className="form-control"
                            //   value={formData.subject}
                            //   onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="emailMessage" className="form-label">
                              Email Message
                            </label>
                            <ReactQuill 
                              theme="snow"
                            //   value={formData.content}
                            //   onChange={handleContentChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary custom-submit-button">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default SellerRegistrationEmailTamplate