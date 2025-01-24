import React from "react";

const ProcurementSection = () => {
  const items = [
    {
      id: "s1",
      icon: "fi flaticon-user-experience",
      title: "School Desk & Bench",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s2",
      icon: "fi flaticon-megaphone",
      title: "Playways Equipment",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s3",
      icon: "fi flaticon-code",
      title: "Building Construction",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s4",
      icon: "fi flaticon-knowledge",
      title: "Architecture Services",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s2",
      icon: "fi flaticon-megaphone",
      title: "Smart Class Equipments",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s3",
      icon: "fi flaticon-code",
      title: "Fire Extinguisher",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s4",
      icon: "fi flaticon-knowledge",
      title: "Computer & Accessories",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s2",
      icon: "fi flaticon-megaphone",
      title: "Air Cooling System",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s3",
      icon: "fi flaticon-code",
      title: "School Dairy",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
    {
      id: "s4",
      icon: "fi flaticon-knowledge",
      title: "Exam Writing Paper",
      description:
        "We are providing you the best UI/UX design guideline. That help you be professional and talented designer.",
    },
  ];

  return (
    <div className="row wpo-courses-wrap service-row">
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
              <h2 className="category-h2">
                <a href="#">{item.title}</a>
              </h2>
              <p className="category-text">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcurementSection;
