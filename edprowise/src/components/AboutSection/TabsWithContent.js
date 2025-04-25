import React, { useState } from 'react';

const tabs = [
  { id: 'tab1', label: 'Digital Services - Advance ERP', content: (
    <>
      <p>Our robust suite of digital services is designed to bring schools into the modern era of education management. We provide custom school applications for principals, teachers, students, and parents, along with professionally designed websites that enhance a school’s digital presence.</p>
      <p>Our Fees Management System helps schools track collections, send daily notifications, and streamline approval workflows. With our Payroll Management Software, schools can automate salary disbursement, manage staff attendance, handle leave records, and ensure compliance with ease. Our Financial Management tools provide insights through detailed reports like monthly profit & loss, key performance indicators (KPIs), and real-time dashboards for effective decision-making.</p>
      <p>Additional digital solutions include online payment systems, digital exam result generation, library and admission management, attendance tracking, SMS and WhatsApp communication services, MIS reporting, and more—all aimed at simplifying operations and enhancing productivity.</p>
    </>
  )  },

  { id: 'tab2', label: 'Academic & Admin', content: (<>
      <p>In addition, we provide academic and administrative services that support the daily functions of schools, including a recruitment portal for hiring staff, payroll and financial management software, PF & ESI consultancy, and entrance management solutions.Every solution is designed to reduce administrative burdens and improve institutional performance.</p>
      </>
    ) },

  { id: 'tab3', label: 'Our Expertise', content: (<>
    <p>Our team brings together years of experience in education management, procurement, technology, and logistics, allowing us to deliver high-quality solutions with precision and professionalism. Our goal is to simplify school operations, reduce costs, improve service quality, and enable educators to focus on what matters most — teaching and nurturing students.</p>
  </>) },

  { id: 'tab4', label: 'Relationship Management', content:(<>
    <p>At EdProwise, we don’t just offer services we build long-term partnerships. Our dedicated relationship managers work closely with each school to understand their needs, provide tailored solutions, and ensure a smooth, responsive service experience. Your success is our priority.</p>
  </>) }
];

const TabsWithContent = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (id) => {
    setActiveTab(prev => (prev === id ? null : id));
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="tabs-container">
      <div className="tab-buttons-scroll">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab && (
        <div className="tab-content-box">
          <div className="tab-content-inner">
            {activeTabContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabsWithContent;
