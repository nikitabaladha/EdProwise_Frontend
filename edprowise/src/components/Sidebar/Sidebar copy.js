import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import { GiMoneyStack } from "react-icons/gi";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [rotatedMenu, setRotatedMenu] = useState(null);

  const toggleMenu = (menuId) => {
    setOpenMenu((prev) => (prev === menuId ? null : menuId));
    setRotatedMenu((prev) => (prev === menuId ? null : menuId));
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "solar:widget-5-bold-duotone",
      link: "",
    },
    {
      id: "client",
      label: "School",
      icon: "solar:users-group-rounded-bold-duotone",
      children: [
        { label: "Add New Client", link: "" },
        { label: "Clients", link: "" },
        // here table of all clients and give button for view all client detail and update client detail view , edit , delete
      ],
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      icon: "solar:wallet-money-bold",
      children: [
        { label: "Add New Subscription", link: "" },
        { label: "Subscriptions", link: "" },
        // here table of all subscriptions will be seen  and give button for view all detail of that perticular subscription and update Subscription detail
      ],
    },

    {
      id: "feesManagement",
      label: "Fees Management",
      icon: "game-icons:money-stack",
      children: [
        { label: " Fees Management", link: "" },

        // here table of all fees will be seen  and give button for update that perticular fee and block button to block that fee
      ],
    },
    {
      id: "payrollManagement",
      label: "Payroll Management",
      icon: "solar:hand-money-bold",
      children: [
        { label: "Payroll Login", link: "" },

        // here table of all Payroll  will be seen  and give button for update that perticular Payroll  and block button to block that Payroll
      ],
    },
    {
      id: "finance",
      label: "Finance Management",
      icon: "solar:graph-up-bold",
      children: [
        { label: "Finance Login", link: "" },

        // here table of all Finance  will be seen  and give button for update that perticular Finance  and block button to block that Finance
      ],
    },
    {
      id: "schoolManagement",
      label: "School Management",
      icon: "solar:buildings-2-bold-duotone",
      children: [
        { label: "School Management Login", link: "" },

        // here table of all School Management Login will be seen  and given button for update that perticular School Management Login and block button to block that School Management

        // on click of student button table of students will be shown
        // onclick of employee button table of employees will be shown
        // on click of Hrms button table of Hrms will be shown
      ],
    },
  ];

  return (
    <div className="main-nav">
      {/* Sidebar Logo */}
      <div className="logo-box">
        <Link to="" className="logo-dark">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            className="logo-sm"
            alt="logo sm"
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            className="logo-lg"
            alt="logo dark"
          />
        </Link>
        <Link to="" className="logo-light">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
            className="logo-sm"
            alt="logo sm"
          />
          <span>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              className="logo-lg"
              alt="logo light"
              style={{ height: "40px", marginRight: "20px" }}
            />
            <span className="logo-font">EdProwise</span>
          </span>
        </Link>
      </div>

      <div className="scrollbar" data-simplebar="">
        <ul className="navbar-nav" id="navbar-nav">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.id}>
              {item.children ? (
                <>
                  <div
                    className="nav-link menu-arrow collapsed"
                    onClick={() => toggleMenu(item.id)}
                  >
                    <span className="nav-icon">
                      <Icon icon={item.icon} />
                    </span>
                    <span className="nav-text"> {item.label} </span>
                  </div>
                  {openMenu === item.id && (
                    <div className="collapse show">
                      <ul className="nav sub-navbar-nav">
                        {item.children.map((subItem, subIndex) => (
                          <li className="sub-nav-item" key={subIndex}>
                            <Link className="sub-nav-link" to={subItem.link}>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link className="nav-link" to={item.link}>
                  <span className="nav-icon">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="nav-text"> {item.label} </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
