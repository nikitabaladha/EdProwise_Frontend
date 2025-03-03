import React from 'react'
const edprowiseData = [
    {
      id: "edprowiseOne",
      headingId: "edprowiseHeadingOne",
      question: "What is EdProwise?",
      answer:
        "EdProwise is a platform designed to support schools, educators, and students by providing solutions that enhance education and administration.",
    },
    {
      id: "edprowiseTwo",
      headingId: "edprowiseHeadingTwo",
      question: "What services does EdProwise provide?",
      answer:
        "EdProwise offers a comprehensive range of services for schools, starting with software solutions for fee management, payroll processing, and financial management. Additionally, we provide recruitment services, Exam result system, Attendance Management, compliance consulting, and digital transformation to streamline school administration and enhance efficiency.",
    },
    {
      id: "edprowiseThree",
      headingId: "edprowiseHeadingThree",
      question: "Who can use EdProwise?",
      answer:
        "Schools, teachers, students, school administrators, and educational organizations can all use EdProwise.",
    },
    {
      id: "edprowiseFour",
      headingId: "edprowiseHeadingFour",
      question: "Is EdProwise available for all types of schools?",
      answer:
        "Yes, EdProwise is designed to support various types of schools, including private, public, and international institutions.",
    },
    {
      id: "edprowiseFive",
      headingId: "edprowiseHeadingFive",
      question: "Can individuals use EdProwise, or is it only for schools?",
      answer:
        "While EdProwise primarily serves schools, individuals such as teachers and students can also create accounts to access specific features.",
    },
    {
      id: "edprowiseSix",
      headingId: "edprowiseHeadingSix",
      question: "How does EdProwise ensure data security and privacy?",
      answer:
        "We follow strict data security measures to protect user information and comply with industry standards for privacy.",
    },
    {
      id: "edprowiseSeven",
      headingId: "edprowiseHeadingSeven",
      question: "How can I contact EdProwise for support?",
      answer:
        "You can reach out to our support team via email, phone, or through the contact form on our website.",
    },
  ];

const GeneralFaq = () => {
  return (
    <section className="wpo-faq-section section-padding pt-lg-2 pb-lg-2">
    <div className="container">
      <div className="row ">
        <div className="col-lg-12">
          <div className="wpo-faq-section">
            <div className="row">
              <div className="col-lg-12 col-12">
                <div className="wpo-benefits-item">
                  <div className="accordion" id="accordionExample">
                    {edprowiseData.map((faq, index) => (
                      <div className="accordion-item" key={index}>
                        <h3 className="accordion-header" id={faq.headingId}>
                          <button
                            className={`text-black fw-bold accordion-button  ${
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
                          <div className=" accordion-body">
                            <p className="text-black">{faq.answer}</p>
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
  )
}
export  default GeneralFaq;
