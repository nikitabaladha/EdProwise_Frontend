import react from "react";

const PrivacyPage = () => {
  return (
    <>
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <h2>Privacy Policy</h2>
                <ol className="wpo-breadcumb-wrap">
                  <li>
                    <a>Home</a>
                  </li>
                  <li>Privacy Policy</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="/assets/website-images/shape/1.svg" alt="" />
        </div>
        <div className="shape-2">
          <img src="/assets/website-images/shape/2.svg" alt="" />
        </div>
        <div className="shape-3">
          <img src="/assets/website-images/shape/3.svg" alt="" />
        </div>
        <div className="shape-4">
          <img src="/assets/website-images/shape/4.svg" alt="" />
        </div>
      </section>
      <section className="wpo-terms-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="wpo-terms-wrap">
                <div className="wpo-terms-img">
                  <img
                    src="/assets/website-images/terms/terms.webp"
                    alt="Terms"
                  />
                </div>
                <div className="wpo-terms-text">
                  <h2>Reasons for Using Website Privacy Policy</h2>
                  <p>
                    When you are planning to create a website, it’s very easy to
                    overlook creating and adding a website Privacy Policy
                    template. This is because when you are browsing through
                    sites, you may not look at this part unless you really have
                    to – and even then, you might not actually read all the
                    content! However, it’s very important to have the terms page
                    on your website, for a number of reasons. Once you’ve
                    learned all about these reasons, you may realize that adding
                    this part to your website is really essential.
                  </p>
                  <p>
                    Even a short Privacy Policy agreement should include several
                    key clauses to safeguard your business. For example, if
                    you’re selling online and incorrectly price an item, your
                    Privacy Policy are what will enable you to cancel the order.
                  </p>

                  <ul>
                    <li>
                      Acceptable use of your website and all of its content.
                    </li>
                    <li>Rules on uploading any content in your website.</li>
                    <li>Any and all websites which are linked to your own.</li>
                    <li>The availability of your website.</li>
                    <li>Returns and Guarantees for Customers</li>
                  </ul>

                  <p>
                    If any estimates of how long it will take the cleaning
                    operatives to complete the job are being provided those are
                    only estimates based on the average time it takes to clean a
                    home or an office of similar size to the Client’s, it being
                    difficult to calculate precisely how long such tasks may
                    take and that a degree of flexibility may be required.
                    Please note that one off cleans may take longer to complete
                    due to longer intervals between cleaning sessions, number
                    and type of cleaning tasks required, when compared to the
                    regular maintenance cleaning of the same property.
                  </p>

                  <div className="row t-sub">
                    <div className="col-md-6 col-sm-6 col-12">
                      <div className="pf-p-details-img">
                        <img
                          src="/assets/website-images/terms/1.webp"
                          alt="Terms Detail 1"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-12">
                      <div className="pf-p-details-img">
                        <img
                          src="/assets/website-images/terms/2.webp"
                          alt="Terms Detail 2"
                        />
                      </div>
                    </div>
                  </div>

                  <p>
                    Post Construction Cleaning (Builders Cleaning), Event
                    Cleaning or badly neglected homes may take up to three times
                    longer than a well maintained home requiring general
                    cleaning. Therefore the Company advises the Client to ask
                    for our specialist cleaning services: Builders Cleaning or
                    Event Cleaning.
                  </p>
                </div>

                <div className="pf-faq-section">
                  <h4>Frequently Asked Questions</h4>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                      <div className="accordion" id="accordionExample">
                        {[
                          {
                            id: "One",
                            title:
                              "Modern Equipment We Use and support from our experts.",
                            content:
                              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
                          },
                          {
                            id: "Two",
                            title:
                              "Planning can help alleviate workplace stress and increase productivity.",
                            content:
                              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
                          },
                          {
                            id: "Three",
                            title:
                              "Those who experiment the most, are able to innovate the best.",
                            content:
                              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
                          },
                          {
                            id: "Four",
                            title:
                              "Understand Your Problem, You must understand the issue.",
                            content:
                              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum exercitationem pariatur iure nemo esse repellendus est quo recusandae. Delectus, maxime.",
                          },
                        ].map((item, index) => (
                          <div className="accordion-item" key={item.id}>
                            <h3
                              className="accordion-header"
                              id={`heading${item.id}`}
                            >
                              <button
                                className={`accordion-button ${
                                  index === 0 ? "" : "collapsed"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${item.id}`}
                                aria-expanded={index === 0}
                                aria-controls={`collapse${item.id}`}
                              >
                                {item.title}
                              </button>
                            </h3>
                            <div
                              id={`collapse${item.id}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              aria-labelledby={`heading${item.id}`}
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <p>{item.content}</p>
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
    </>
  );
};

export default PrivacyPage;
