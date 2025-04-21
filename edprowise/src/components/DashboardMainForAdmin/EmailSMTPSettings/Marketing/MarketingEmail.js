import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI";
import postAPI from "../../../../api/postAPI";
import CreatableSelect from "react-select/creatable";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const MarketingEmail = () => {
    const [formData, setFormData] = useState({
        mailTo: [],
        subject: "",
        content: "",
    });

    const [emailOptions, setEmailOptions] = useState([]);

    // Fetch settings and template
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // All Emails
                const emailResponse = await getAPI("/get-all-emails", {}, true);
                if (!emailResponse.hasError) {
                    const options = emailResponse.data.data.map(email => ({
                        label: email,
                        value: email,
                    }));
                    setEmailOptions(options);
                }
            } catch (err) {
                toast.error("Initialization error: " + err.message);
            }
        };

        fetchInitialData();
    }, []);

    // Input handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Email content handler
    const handleContentChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            content: value,
        }));
    };

    // Email selection handler
    const handleEmailChange = (selectedOptions) => {
        const selectedEmails = selectedOptions ? selectedOptions.map(opt => opt.value) : [];
        setFormData((prevData) => ({
            ...prevData,
            mailTo: selectedEmails,
        }));
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.mailTo.length === 0) {
            toast.warning("Please select at least one recipient.");
            return;
        }
        if (!formData.content || formData.content === "<p><br></p>") {
            toast.warning("Email content cannot be empty.");
            return;
        }
    

        try {
            const response = await postAPI("/send-email", formData, true);
    
            if (response.hasError) {
                // Display the error message from backend
                toast.error(response.message || "Failed to send email.");
            } else {
                toast.success(response.message || "Email sent successfully!");
                // Optional: Reset form if needed
                setFormData({
                    mailTo: [],
                    subject: "",
                    content: "",
                });
            }
    
        } catch (err) {
            toast.error("Something went wrong: " + err.message);
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
                                        Email Details
                                    </h4>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="emailTo" className="form-label">To</label>
                                            <CreatableSelect
                                                options={emailOptions}
                                                isMulti
                                                isClearable
                                                onChange={handleEmailChange}
                                                placeholder="Select or enter email(s)"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="subject" className="form-label">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                className="form-control"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card m-2">
                                            <div className="card-body custom-heading-padding">
                                                <div className="container">
                                                    <div className="card-header mb-2">
                                                        <h4 className="card-title text-center custom-heading-font">
                                                            Email Message
                                                        </h4>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <ReactQuill
                                                                theme="snow"
                                                                value={formData.content}
                                                                onChange={handleContentChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-end">
                                                    <button type="submit" className="btn btn-primary custom-submit-button">
                                                        Send
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingEmail;
