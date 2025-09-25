import React from 'react';

const MessengerHeader = () => {
  return (
    <div className="page-header d-none d-md-block">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="page-header-title">
              <h4 className="m-b-10">Messenger</h4>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">Messenger</li>
            </ul>
          </div>
          <div className="col">
            <div className="float-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerHeader;
