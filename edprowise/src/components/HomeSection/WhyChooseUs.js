import React, { useState } from "react";

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState("buyer");

  const chooseDataBuyer = [
    {
      id: 1,
      iconClass: "fi flaticon-user-experience",
      title: "UI/UX Design",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s1",
    },
    {
      id: 2,
      iconClass: "fi flaticon-megaphone",
      title: "Digital Marketing",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s2",
    },
    {
      id: 3,
      iconClass: "fi flaticon-code",
      title: "Development",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s3",
    },
    {
      id: 4,
      iconClass: "fi flaticon-knowledge",
      title: "Self Improvement",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s4",
    },
  ];

  const chooseDataSupplier = [
    {
      id: 1,
      iconClass: "fi flaticon-user-experience",
      title: "our UI/UX Design",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s1",
    },
    {
      id: 2,
      iconClass: "fi flaticon-megaphone",
      title: "our Digital Marketing",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s2",
    },
    {
      id: 3,
      iconClass: "fi flaticon-code",
      title: "our Development",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s3",
    },
    {
      id: 4,
      iconClass: "fi flaticon-knowledge",
      title: "our Improvement",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
      classNameS: "s4",
    },
  ];

  return (
    <>
      <section
        className="wpo-courses-section-s2 section-padding"
        style={{ background: "white" }}
      >
        <div className="container">
          <div className="row-web">
            <div className="col-12">
              <div className="wpo-section-title-s2">
                <h2 className="font-family-web">Why Choose Us</h2>
              </div>
            </div>
          </div>
          <div className="tabs">
            <button
              id="buyerTab"
              className={` theme-choose-btn ${
                activeTab === "buyer" ? "active" : ""
              }`}
              onClick={() => setActiveTab("buyer")}
            >
              Buyer
            </button>
            <button
              id="supplierTab"
              className={` theme-choose-btn ${
                activeTab === "supplier" ? "active" : ""
              }`}
              onClick={() => setActiveTab("supplier")}
            >
              Supplier
            </button>
          </div>
          <div
            className={`show-tab ${activeTab === "buyer" ? "active" : ""}`}
            id="buyerSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataBuyer.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-6 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <div className="courses-icon category-icons">
                        <i className={item.iconClass}></i>
                      </div>
                      <h2 className="category-h2 font-family-web">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`show-tab ${activeTab === "supplier" ? "active" : ""}`}
            id="supplierSection"
          >
            <div className="row-web wpo-courses-wrap">
              {chooseDataSupplier.map((item) => (
                <div
                  key={item.id}
                  className={`category-items col-lg-3 col-md-6 col-6 grid-web ${item.classNameS}`}
                >
                  <div className="wpo-courses-item category-itemm">
                    <div className="wpo-courses-text">
                      <div className="courses-icon category-icons">
                        <i className={item.iconClass}></i>
                      </div>
                      <h2 className="category-h2 font-family-web">
                        <a>{item.title}</a>
                      </h2>
                      <p className="category-text font-family-web">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="shape-1">
          <img src="assets/website-images/shape/1.svg" alt="Shape 1" />
        </div>
        <div className="shape-2">
          <img src="assets/website-images/shape/2.svg" alt="Shape 2" />
        </div>
        <div className="shape-3">
          <img src="assets/website-images/shape/3.svg" alt="Shape 3" />
        </div>
        <div className="shape-4">
          <img src="assets/website-images/shape/4.svg" alt="Shape 4" />
        </div>
      </section>
      <section className="wpo-courses-section-s2 section-padding">
        <div className="container">
          <div className="row-web">
            <div className="col-12">
              <div className="wpo-section-title-s2">
                {/* <small>Our Courses</small> */}
                <h2 className="font-family-web">Served Best Institute</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
            <div className="slide">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png"
                height="100"
                width="250"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
