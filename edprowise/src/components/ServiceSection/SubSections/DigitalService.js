import React, { useState } from "react";
import {
  FaMoneyBillTrendUp,
  FaBusinessTime,
  FaLaptopCode,
} from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { MdInstallMobile } from "react-icons/md";
import {
  TbDeviceMobileCog,
  TbDeviceMobileDollar,
  TbDeviceMobileMessage,
} from "react-icons/tb";
import { AiOutlineReconciliation } from "react-icons/ai";
import { IoLibrarySharp } from "react-icons/io5";
import { RiFilePaperFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";        // Visitor check-in
import { FaUsers } from "react-icons/fa";            // CRM / customers
import { PiBrainBold } from "react-icons/pi";        // AI / Teacher GPT

const coursesData = [
  {
    id: 1,
    icon: <FaMoneyBillTrendUp />,
    title: "School Fees Management Software - Pixel Fees",
    classid: 1,
    send: "/services/digital-services/school-fees-management",
  },
  {
    id: 2,
    icon: <GiReceiveMoney />,
    title: "Payroll Management Software – Ease Payroll",
    classid: 2,
    send: "/services/digital-services/school-payroll",
  },
  {
    id: 3,
    icon: <FcMoneyTransfer />,
    title: "Financial Management Software – Book Sync",
    classid: 3,
    send: "/services/digital-services/school-financial-management",
  },
  {
    id: 4,
    icon: <FaBusinessTime />,
    title: "School Operational Management Software",
    classid: 4,
    send: "/services/digital-services/school-operation-management",
  },
  {
    id: 5,
    icon: <MdInstallMobile />,
    title: "School Mobile Application",
    classid: 5,
    send: "/services/digital-services/school-mobile-application",
  },
  {
    id: 6,
    icon: <FaLaptopCode />,
    title: "School Website Design",
    classid: 6,
    send: "/services/digital-services/school-website-design",
  },

  // ----------------------------
  // Digital Exam Result System
  // ----------------------------
  {
    id: 7,
    icon: <TbDeviceMobileCog />,
    title: "Digital Exam Result System",
    classid: 1,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Result Calculation & Grading",
        featureDescription:
          "Automatically calculates and posts results based on customizable grading systems.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Real-Time Result Access",
        featureDescription:
          "Students and parents can access results instantly with detailed analytics.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Secure Access & Verification",
        featureDescription:
          "Secure login for students and parents with result verification.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Comprehensive Performance Analytics",
        featureDescription:
          "Performance insights including grade trends and subject analysis.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Integration & Report Generation",
        featureDescription:
          "Integrates with school systems and generates downloadable reports.",
      },
    ],
  },

  // ----------------------------
  // Digital Student Attendance
  // ----------------------------
  {
    id: 8,
    icon: <AiOutlineReconciliation />,
    title: "Digital Student Attendance",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Attendance Processing",
        featureDescription:
          "Records attendance via biometric, RFID, or mobile apps.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Real-Time Attendance Analytics",
        featureDescription:
          "Real-time data with instant notifications for absentees.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Leave Management",
        featureDescription:
          "Students can apply for leave and updates sync automatically.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Attendance Reports & Analytics",
        featureDescription:
          "Tracks attendance patterns and generates detailed reports.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Secure Access & Notifications",
        featureDescription:
          "Secure data access and automated parent alerts.",
      },
    ],
  },

  // ----------------------------
  // Digital Staff Attendance
  // ----------------------------
  {
    id: 9,
    icon: <AiOutlineReconciliation />,
    title: "Digital Staff Attendance",
    classid: 3,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Biometric/Face Recognition & RFID",
        featureDescription:
          "Accurate automated staff attendance logging.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Real-Time Attendance Monitoring",
        featureDescription:
          "Live tracking of arrival and departure.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Leave Management & Approval",
        featureDescription:
          "Apply and manage staff leave digitally.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Attendance Reports & Analytics",
        featureDescription:
          "Detailed staff attendance insights and trends.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Notifications & Alerts",
        featureDescription:
          "Alerts for tardiness, absenteeism, and leave status.",
      },
    ],
  },

  // ----------------------------
  // Library Management Software
  // ----------------------------
  {
    id: 10,
    icon: <IoLibrarySharp />,
    title: "Library Management Software",
    classid: 4,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Book Cataloging & Search",
        featureDescription:
          "Catalogs and searches books with detailed metadata.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Barcode/QR Code Integration",
        featureDescription:
          "Quick check-in/out using barcode or QR code.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Reporting & Analytics",
        featureDescription:
          "Reports on usage, overdue items, and trends.",
      },
    ],
  },

  // ----------------------------
  // Entrance Management Software
  // ----------------------------
  {
    id: 11,
    icon: <RiFilePaperFill />,
    title: "Entrance Management Software",
    classid: 5,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Online Registration & Application",
        featureDescription:
          "Register and upload documents online.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Admit Card Generation",
        featureDescription:
          "Auto-generates digital admit cards.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Exam Scheduling & Slot Management",
        featureDescription:
          "Efficient scheduling with no conflicts.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Secure Exam Environment",
        featureDescription:
          "Monitors attendance and prevents unauthorized access.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Result Processing & Reporting",
        featureDescription:
          "Automated grading and result generation.",
      },
    ],
  },

  // ----------------------------
  // Online Payment Gateway
  // ----------------------------
  {
    id: 12,
    icon: <TbDeviceMobileDollar />,
    title: "Online Payment Gateway",
    classid: 1,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Multiple Payment Methods",
        featureDescription:
          "Supports UPI, cards, net banking, wallets.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Secure Transactions",
        featureDescription:
          "Encrypted, PCI-DSS compliant secure payments.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Instant Payment Confirmation",
        featureDescription:
          "Instant confirmation and receipt.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "System Integration",
        featureDescription:
          "Auto-updates fee records in ERP.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Payment History & Reports",
        featureDescription:
          "Full transaction history with downloadable reports.",
      },
    ],
  },

  // ----------------------------
  // SMS & WhatsApp Integration
  // ----------------------------
  {
    id: 13,
    icon: <TbDeviceMobileMessage />,
    title: "SMS & WhatsApp Integration Services",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Automated Notifications",
        featureDescription:
          "Send instant alerts and updates.",
      },
      {
        idFeature: 2,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Attendance Alerts",
        featureDescription:
          "Instant parent alerts for absences.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Fee Payment Reminders",
        featureDescription:
          "Auto-reminders for due fees.",
      },
      {
        idFeature: 4,
        featureIcon: <AiOutlineReconciliation />,
        featureTitle: "Parent-Teacher Communication",
        featureDescription:
          "Direct communication channel.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Bulk Messaging",
        featureDescription:
          "Send personalized messages in bulk.",
      },
    ],
  },

  // ----------------------------
  // Transport Management
  // ----------------------------
  {
    id: 14,
    icon: <FaTruck />,
    title: "Transport Management",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Smart Transport Management System for Schools",
        featureDescription:
          "Real-time GPS tracking, routes, RFID attendance, notifications.",
      },
      {
        idFeature: 2,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Safer, Smarter & Fully Automated School Transport",
        featureDescription:
          "SOS alerts, speed violation reports, transparent communication.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Track Every Bus. Protect Every Child.",
        featureDescription:
          "AI-powered monitoring, boarding reports, trip records.",
      },
      {
        idFeature: 4,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Digital School Transport Powered by AI & GPS",
        featureDescription:
          "Automated route planning, fee collection, full visibility.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "End-to-End Transport Automation for Schools & Parents",
        featureDescription:
          "Driver insights, compliance tracking, paperless communication.",
      },
    ],
  },

  // ----------------------------
  // Visitor Management
  // ----------------------------
  {
    id: 15,
    icon: <FiUserCheck />,
    title: "Visitor Management System",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Smart Visitor Management System for Schools",
        featureDescription:
          "Pre-approved appointments, OTP, visitor badges, real-time logs.",
      },
      {
        idFeature: 2,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Secure, Verified & Hassle-Free Campus Visits",
        featureDescription:
          "Instant identification, purpose logging, staff approvals.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Track Every Visitor. Protect Every Student.",
        featureDescription:
          "OTP, ID scan, photo logs, transparency in entry records.",
      },
      {
        idFeature: 4,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "Digital Campus Gate Pass Powered by AI & Automation",
        featureDescription:
          "Blacklist alerts, automated check-ins, visitor history.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "End-to-End Visitor Control for Schools & Parents",
        featureDescription:
          "Tracks parents, vendors, and service personnel securely.",
      },
    ],
  },

  // ----------------------------
  // CRM for Schools
  // ----------------------------
  {
    id: 16,
    icon: <FaUsers />,
    title: "CRM for School",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Smart CRM System for Schools",
        featureDescription:
          "Lead tracking, automated follow-ups, counsellor insights.",
      },
      {
        idFeature: 2,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Convert More Enquiries into Admissions",
        featureDescription:
          "Lead capture, nurture campaigns, WhatsApp/SMS automation.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Track Every Lead. Grow Every Admission.",
        featureDescription:
          "Monitor interactions, assign counsellors, avoid missed leads.",
      },
      {
        idFeature: 4,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "AI-Powered CRM for School Admissions & Parent Engagement",
        featureDescription:
          "Lead scoring, analytics, automated marketing.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "End-to-End Admission CRM for Schools & Counsellors",
        featureDescription:
          "Auto lead capture, distribution, nurturing, conversions.",
      },
    ],
  },

  // ----------------------------
  // TeacherGPT
  // ----------------------------
  {
    id: 17,
    icon: <PiBrainBold />,
    title: "AI for Teacher - Teacher GPT",
    classid: 2,
    keyFeatures: [
      {
        idFeature: 1,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "TeacherGPT: AI Teaching Assistant for Every Classroom",
        featureDescription:
          "Generates lesson plans, worksheets, question papers.",
      },
      {
        idFeature: 2,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "AI That Teaches, Supports & Enhances Learning",
        featureDescription:
          "Solves doubts, generates personalized study material.",
      },
      {
        idFeature: 3,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Teach Smarter. Learn Faster.",
        featureDescription:
          "Automated assessments, reports, personalized support.",
      },
      {
        idFeature: 4,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle:
          "AI-Powered Support for Teachers & Students",
        featureDescription:
          "Quizzes, activities, explanations, revision tools.",
      },
      {
        idFeature: 5,
        featureIcon: <TbDeviceMobileCog />,
        featureTitle: "Your Personal AI Tutor & Teaching Partner",
        featureDescription:
          "AI-driven guidance, practice questions, revision support.",
      },
    ],
  },
];


const DigitalSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (course) => {
    if (course.send) {
      navigate(course.send);
    } else {
      setModalContent(course);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="page-wrapper">
      <div className="row-web wpo-courses-wrap service-row">
        {coursesData.map((course, index) => (
          <div
            key={course.id}
            className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.classid}`}
          >
            <div
              className="wpo-courses-item category-itemm"
              onClick={() => handleItemClick(course)}
            >
              <div className="wpo-courses-text">
                <div className="courses-icon category-icons">{course.icon}</div>
                <h2 className="category-h2 font-weight-web-h2">
                  {course.title}
                </h2>
              </div>
              <Link to={course.send} className="all-info">
                Know More...
              </Link>
            </div>
          </div>
        ))}
        {showModal && (
          <div className="image-modal">
            <div className="modal-content overflow-auto">
              {/* <div>{modalContent}</div> */}
              {/* <ServiceTabs/> */}
              {/* <img src={modalContent} alt="Modal" className="modal-image" /> */}
              <div className="mint-container overflow-auto">
                <h1 className="mint-header">Features</h1>
                <div className="col-12 ">
                  <div className="mint-steps ">
                    {modalContent &&
                      modalContent.keyFeatures &&
                      modalContent.keyFeatures.map((step, index) => (
                        <div className="mint-card col-lg-6 col-12">
                          <div
                            key={step.idFeature}
                            className="mint-card-content"
                          >
                            {/* <div className="mint-icon">{step.featureIcon}</div> */}
                            {/* <img className="mint-icon" src={step.featureIcon} /> */}
                            <div className="mint-text-content">
                              <h3 className="mint-title text-center">
                                {step.featureTitle}
                              </h3>
                              <p className="mint-description">
                                {step.featureDescription}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="text-white modal-close" onClick={closeModal}>
                <IoMdCloseCircle />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalSection;
