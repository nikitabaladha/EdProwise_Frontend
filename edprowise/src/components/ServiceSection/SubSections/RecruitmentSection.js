import React from "react";

const RecruitmentSection = () => {
  const items = [
    {
      id: "s1",
      icon: "fi flaticon-user-experience",
      title: "End to End Hiring Solutions",
    },
    {
      id: "s2",
      icon: "fi flaticon-megaphone",
      title: "Search & Hire Teacher",
    },
    {
      id: "s3",
      icon: "fi flaticon-code",
      title: "Post Vacant Position",
    },
    {
      id: "s4",
      icon: "fi flaticon-knowledge",
      title: "Manage & Track Job",
    },
    {
      id: "s2",
      icon: "fi flaticon-megaphone",
      title: "Assessment of Candidate",
    },
    {
      id: "s3",
      icon: "fi flaticon-code",
      title: "No Yearly Subscription, Pay as per usage",
    },
  ];

  return (
    <div className="row-web wpo-courses-wrap service-row">
      {items.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className={`category-items col-lg-3 col-md-6 col-6 grid-web  ${item.id}`}
        >
          <div className="wpo-courses-item category-itemm">
            <div className="wpo-courses-text">
              <div className="courses-icon category-icons">
                <i className={item.icon}></i>
              </div>
              <h2 className="category-h2 font-weight-web-h2">
                <a>{item.title}</a>
              </h2>
              {/* <p className="category-text">{item.description}</p> */}
              <a className="all-info">Know More...</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecruitmentSection;
