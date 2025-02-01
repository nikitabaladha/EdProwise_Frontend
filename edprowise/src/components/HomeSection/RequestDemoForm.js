import React, { useState } from "react";

const coursesData = [
  {
    id: 1,
    title: "School Fees Management Software - Pixel Fees",
  },
  {
    id: 2,
    title: "Payroll Management Software – Ease Payroll",
  },
  {
    id: 3,
    title: "Financial Management Software – Book Sync",
  },
  {
    id: 4,
    title: "School Operational Management Software",
  },
  {
    id: 5,
    title: "School Mobile Application",
  },
  {
    id: 6,
    title: "School Website Design",
  },
  {
    id: 7,
    title: "Digital Exam Result System",
  },
  {
    id: 8,
    title: "Digital Student Attendance",
  },
  {
    id: 9,
    title: "Digital Staff Attendance",
  },
  {
    id: 10,
    title: "Library Management Software",
  },
  {
    id: 11,
    title: "Entrance Management Software",
  },

  {
    id: 12,
    title: "Online Payment Gateway",
  },
  {
    id: 13,
    title: "SMS & Whats App Integration Services",
  },
];
const RequestDemoForm = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices([...selectedServices, value]); // Add to selected services
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service !== value)
      ); // Remove from selected services
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Request For Demo</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wpo-contact-pg-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col col-lg-10 offset-lg-1">
              <div className="wpo-contact-title">
                <h2>
                  Experience the future of school solutions - Request a Demo
                  Today!
                </h2>
                <p className="text-black">
                  Fill out the form below, and our team will get in touch with
                  you shortly!
                </p>
              </div>
              <div className="wpo-contact-form-area">
                <form
                  method="post"
                  className="contact-validation-active"
                  id="contact-form-main"
                >
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Your Full Name*"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="schoolname"
                      placeholder="Enter School Name*"
                      required
                    />
                  </div>
                  <div>
                    <select
                      name="designation"
                      className="form-control"
                      required
                    >
                      <option disabled selected>
                        Choose Designation
                      </option>
                      <option>Principal</option>
                      <option>Administrator</option>
                      <option>HR</option>
                      <option>Teacher</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email id*"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Contact No*"
                      required
                    />
                  </div>
                  <div className="fullwidth">
                    <label className="text-black">
                      Preferred Demo Date & Time*
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="demoDateTime"
                      required
                    />
                  </div>

                  {/* <div className="fullwidth">
                  <label className="text-black">Services Interested In</label>
                  <div className="checkbox-group d-flex flex-wrap justify-content-between mt-2 ">
                  <label className="text-black mr-3"> <input className="check-box-demo" type="checkbox" name="services" value="Student Management" />  Digital Services</label>
                  <label className="text-black mr-3"><input className="check-box-demo" type="checkbox" name="services" value="Attendance Tracking" />   Acadmic & Admin</label>
                  <label className="text-black mr-3"> <input className="check-box-demo" type="checkbox" name="services" value="Fee Management" />Get Goods For Your School</label>
                  <label className="text-black mr-3"> <input className="check-box-demo" type="checkbox" name="services" value="Online Classes" />Hire School Teacher</label>
                  <label className="text-black"> <input className="check-box-demo" type="checkbox" name="services" value="Other" />          Other</label>
                  </div>
                </div> */}

                  <div className="fullwidth">
                    <label className="text-black">Select Services*</label>
                    <div className="custom-multi-select">
                      <div
                        className="dropdown-header-web"
                        onClick={toggleDropdown}
                      >
                        {selectedServices.length > 0
                          ? `${selectedServices.length} services selected`
                          : "Select services"}
                        <span className="arrow">
                          {isDropdownOpen ? "▲" : "▼"}
                        </span>
                      </div>
                      {isDropdownOpen && (
                        <div className="dropdown-options">
                          {coursesData.map((service) => (
                            <label
                              key={service.id}
                              className="dropdown-option text-black"
                            >
                              <input
                                type="checkbox"
                                className="check-box-demo"
                                value={service.title}
                                checked={selectedServices.includes(
                                  service.title
                                )}
                                onChange={handleCheckboxChange}
                              />
                              {service.title}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedServices.length >= 1 && (
                    <div className="fullwidth mt-4">
                      <h4>Selected Services:</h4>
                      <ul>
                        {selectedServices.map((service, index) => (
                          <li key={index} style={{ color: "#4e545c" }}>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="fullwidth">
                    <textarea
                      className="form-control"
                      name="note"
                      placeholder="Additional requirements or questions..."
                    ></textarea>
                  </div>
                  <div className="submit-area">
                    <button type="submit" className="theme-btn">
                      Get in Touch
                    </button>
                  </div>
                  <div className="clearfix error-handling-messages">
                    <div id="success">Thank you</div>
                    <div id="error">
                      Error occurred while sending email. Please try again
                      later.
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestDemoForm;
