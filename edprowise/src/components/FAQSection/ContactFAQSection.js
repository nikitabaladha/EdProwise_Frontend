import React from "react";
const edprowiseContactData = [
    {
      id: "edprowiseContactOne",
      headingId: "edprowiseContactHeadingOne",
      question: "How can I contact EdProwise for support?",
      answer:
        "You can reach us via email, phone, or through our contact form on the website. Our support team is available to assist you.",
    },
    {
      id: "edprowiseContactTwo",
      headingId: "edprowiseContactHeadingTwo",
      question: "Where is EdProwise located?",
      answer:
        "EdProwise operates online, serving schools and educational institutions across different regions.",
    },
  ];
const ContactFAQSection = () => {
  return (
    <section className="wpo-faq-section section-padding pt-lg-2 pb-lg-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2">
            <div className="wpo-section-title mb-lg-3">
              <h2>Contact and Support FAQs</h2>
            </div>
          </div>

          <div className="col-lg-8 offset-lg-2">
            <div className="wpo-faq-section">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="wpo-benefits-item">
                    <div className="accordion" id="accordionExample">
                      {edprowiseContactData.map((faq, index) => (
                        <div className="accordion-item" key={faq.id}>
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
    </section>
  );
};

export default ContactFAQSection;