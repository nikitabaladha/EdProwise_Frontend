import React from "react";

const schoolAppData = [
  {
    id: "schoolAppOne",
    headingId: "schoolAppHeadingOne",
    question: "What is the School Application?",
    answer:
      "The School Application is a mobile app designed to enhance communication and streamline various administrative processes for principals, teachers, students, and parents. It provides a central platform for accessing important information, tracking progress, and managing school-related tasks.",
  },
  {
    id: "schoolAppTwo",
    headingId: "schoolAppHeadingTwo",
    question:
      "What features are available for principals in the School Application?",
    answer:
      "Principals can use the app to oversee school operations, manage staff and student attendance, track academic progress, communicate with teachers, parents, and students, generate reports, and manage events and school activities.",
  },
  {
    id: "schoolAppThree",
    headingId: "schoolAppHeadingThree",
    question: "How does the School Application benefit teachers?",
    answer:
      "Teachers can use the app to mark attendance, manage lesson plans, assign homework, grade assignments, communicate with students and parents, and monitor students' academic progress in real-time.",
  },
  {
    id: "schoolAppFour",
    headingId: "schoolAppHeadingFour",
    question:
      "Can parents access student performance through the School Application?",
    answer:
      "Yes, parents can track their child's academic progress, view exam results, monitor attendance, check assignments, and communicate directly with teachers through the app.",
  },
  {
    id: "schoolAppFive",
    headingId: "schoolAppHeadingFive",
    question: "How does the School Application support student use?",
    answer:
      "Students can use the app to view class schedules, track assignments and homework, access exam results, communicate with teachers, and receive notifications about school events or changes.",
  },
  {
    id: "schoolAppSix",
    headingId: "schoolAppHeadingSix",
    question: "Is the School Application available for both Android and iOS?",
    answer:
      "Yes, the School Application is available for both Android and iOS devices, ensuring easy access for all users regardless of their device preferences.",
  },
  {
    id: "schoolAppSeven",
    headingId: "schoolAppHeadingSeven",
    question: "Can the School Application be used for attendance tracking?",
    answer:
      "Yes, the app allows teachers and principals to mark and monitor attendance for students and staff, providing real-time updates and reports.",
  },
  {
    id: "schoolAppEight",
    headingId: "schoolAppHeadingEight",
    question: "Does the app include communication features?",
    answer:
      "Yes, the app includes messaging capabilities that allow principals, teachers, students, and parents to communicate efficiently, whether it’s for announcements, reminders, or one-on-one conversations.",
  },
  {
    id: "schoolAppNine",
    headingId: "schoolAppHeadingNine",
    question:
      "Can parents receive notifications about their child’s performance?",
    answer:
      "Yes, parents can receive notifications about their child’s attendance, grades, exam results, assignments, and upcoming events to stay updated on their child's progress.",
  },
  {
    id: "schoolAppTen",
    headingId: "schoolAppHeadingTen",
    question: "Is online fee payment available in the School Application?",
    answer:
      "Yes, the app integrates with secure online payment gateways, allowing parents to easily pay school fees, make donations, and handle other financial transactions directly through the app.",
  },
  {
    id: "schoolAppEleven",
    headingId: "schoolAppHeadingEleven",
    question: "Is the School Application secure and private?",
    answer:
      "Yes, the app follows strict security measures to protect user data and ensure compliance with privacy regulations, guaranteeing a safe and secure experience for all users.",
  },
  {
    id: "schoolAppTwelve",
    headingId: "schoolAppHeadingTwelve",
    question: "How can I get started with the School Application?",
    answer:
      "You can download the app from the Google Play Store or Apple App Store, depending on your device. After installation, you can log in using your school credentials or register with the school for access.",
  },
  {
    id: "schoolAppThirteen",
    headingId: "schoolAppHeadingThirteen",
    question: "Can the School Application be customized for my school’s needs?",
    answer:
      "Yes, the app can be customized to suit your school’s specific requirements, including user roles, branding, and the type of information you need to display.",
  },
];

const SchoolAppFAQSection = () => {
  return (
    <section className="wpo-faq-section section-padding pt-lg-2 pb-lg-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2">
            <div className="wpo-section-title mb-lg-3">
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>

          <div className="col-lg-8 offset-lg-2">
            <div className="wpo-faq-section">
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="wpo-benefits-item">
                    <div className="accordion" id="accordionExample">
                      {schoolAppData.map((faq, index) => (
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
    </section>
  );
};

export default SchoolAppFAQSection;
