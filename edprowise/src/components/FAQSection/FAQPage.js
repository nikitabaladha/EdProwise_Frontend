import react, { useState } from "react";
import FaqMainSection from "./FaqMainSection";
import TestimonialSection from "../HomeSection/Testimonial";
const FaqPage = () => {
  const faqData = [
    {
      id: "collapseOne",
      headingId: "headingOne",
      question: "What types of cases does your console firm handle?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
    {
      id: "collapseTwo",
      headingId: "headingTwo",
      question: "Before hiring a console, what kind of questions should I ask?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
    {
      id: "collapseThree",
      headingId: "headingThree",
      question:
        "Should I meet with multiple Consultancy and shop around before hiring one?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
    {
      id: "collapseFour",
      headingId: "headingFour",
      question:
        "In addition to billable hours, what other costs can console's charge for?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const [formStatus, setFormStatus] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true });

    // Simulating form submission
    setTimeout(() => {
      setFormStatus({ success: true, error: false, loading: false });
      setFormData({ name: "", email: "", phone: "", note: "" });
    }, 2000);
  };

  return (
    <>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>FAQ</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/website-images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="assets/website-images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="assets/website-images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="assets/website-images/shape/4.svg" alt="" />
        </div>
      </section>
      <FaqMainSection />
      <TestimonialSection />

      {/* <section className="wpo-faq-section section-padding pt-lg-2 pb-lg-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 offset-lg-2">
              <div className="wpo-section-title mb-lg-3">
                <h2>Frequently Asked Question</h2>
              </div>
            </div>

            <div className="col-lg-8 offset-lg-2">
              <div className="wpo-faq-section">
                <div className="row">
                  <div className="col-lg-12 col-12">
                    <div className="wpo-benefits-item">
                      <div className="accordion" id="accordionExample">
                        {faqData.map((faq, index) => (
                          <div className="accordion-item" key={index}>
                            <h3 className="accordion-header" id={faq.headingId}>
                              <button
                                className={`accordion-button ${
                                  index === 0 ? "" : "collapsed"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${faq.id}`}
                                aria-expanded={index === 0 ? "true" : "false"}
                                aria-controls={faq.id}
                              >
                                {faq.question}
                              </button>
                            </h3>
                            <div
                              id={faq.id}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              aria-labelledby={faq.headingId}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p>{faq.answer}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <div className="question-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wpo-section-title">
                <h2>Do You Have Any Question?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="question-touch">
                <h2>Get In Touch</h2>
                <form
                  className="contact-validation-active"
                  id="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="half-col">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="half-col">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="half-col">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                      placeholder="Subject"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="half-col">
                    <textarea
                      className="form-control"
                      name="note"
                      id="note"
                      placeholder="Your Question"
                      value={formData.note}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="submit-btn-wrapper">
                    <button
                      type="submit"
                      className="theme-btn"
                      disabled={formStatus.loading}
                    >
                      {formStatus.loading ? "Submitting..." : "Submit Now"}
                    </button>
                    {formStatus.loading && (
                      <div id="loader">
                        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                      </div>
                    )}
                  </div>
                  <div className="clearfix error-handling-messages">
                    {formStatus.success && <div id="success">Thank you</div>}
                    {formStatus.error && (
                      <div id="error">
                        Error occurred while sending email. Please try again
                        later.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default FaqPage;
