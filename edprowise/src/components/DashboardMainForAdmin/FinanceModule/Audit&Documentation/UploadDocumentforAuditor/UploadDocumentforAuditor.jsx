import React, { useState } from 'react';
import { FaUpload, FaDownload, FaTrashAlt } from 'react-icons/fa';

const UploadDocumentforAuditor = () => {
  const [data, setData] = useState({
    bankStatement: [{ 
      value1: 'Bank A/c No.', 
      value2: '500', 
      value3: '500', 
      saved: true, 
      file: null 
    }],
    fixedDeposit: [{ 
      value1: 'Fixed Deposit A/c No.', 
      value2: '1500', 
      value3: '1500', 
      saved: true, 
      file: null 
    }],
    fixedAssets: [{ 
      value1: 'Fixed Assets Invoice', 
      value2: '1000', 
      saved: true, 
      file: null 
    }],
  });

  const [editIndex, setEditIndex] = useState({
    bankStatement: null,
    fixedDeposit: null,
    fixedAssets: null,
  });

  const [editingValues, setEditingValues] = useState({});

  const handleAddRow = (section) => {
    const newData = { ...data };
    const newItem = section === 'fixedAssets' 
      ? { value1: '', value2: '', saved: false }
      : { value1: '', value2: '', value3: '', saved: false };
    
    newData[section].push(newItem);
    setData(newData);

    const newIndex = newData[section].length - 1;
    setEditIndex({ ...editIndex, [section]: newIndex });
    setEditingValues((prev) => ({
      ...prev,
      [`${section}-${newIndex}-value1`]: '',
      [`${section}-${newIndex}-value2`]: '',
      ...(section !== 'fixedAssets' && { [`${section}-${newIndex}-value3`]: '' })
    }));
  };

  const handleSave = (section, index) => {
    const newData = { ...data };
    const prefix = `${section}-${index}`;
    
    newData[section][index].value1 = editingValues[`${prefix}-value1`] || newData[section][index].value1;
    newData[section][index].value2 = editingValues[`${prefix}-value2`] || newData[section][index].value2;
    
    if (section !== 'fixedAssets') {
      newData[section][index].value3 = editingValues[`${prefix}-value3`] || newData[section][index].value3;
    }
    
    newData[section][index].saved = true;
    setData(newData);
    setEditIndex({ ...editIndex, [section]: null });
  };

  const handleCancel = (section, index) => {
    const newData = { ...data };
    newData[section].splice(index, 1);
    setData(newData);
    setEditIndex({ ...editIndex, [section]: null });
  };

  const handleDelete = (section, index) => {
    const newData = { ...data };
    newData[section].splice(index, 1);
    setData(newData);
  };

  const handleInputChange = (section, index, field, value) => {
    setEditingValues(prev => ({
      ...prev,
      [`${section}-${index}-${field}`]: value
    }));
  };

  const renderRows = (section) => {
    return data[section].map((row, index) => {
      const isEditing = editIndex[section] === index;
      const prefix = `${section}-${index}`;

      return (
        <tr key={index} className="payroll-table-body">
          <td className="text-center border border-dark p-2">
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={editingValues[`${prefix}-value1`] ?? row.value1}
                onChange={(e) => handleInputChange(section, index, 'value1', e.target.value)}
                placeholder="Enter value"
              />
            ) : (
              row.value1
            )}
          </td>
          <td className="text-center border border-dark p-2">
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={editingValues[`${prefix}-value2`] ?? row.value2}
                onChange={(e) => handleInputChange(section, index, 'value2', e.target.value)}
                placeholder="Enter value"
              />
            ) : (
              row.value2
            )}
          </td>
          {section !== 'fixedAssets' && (
            <td className="text-center border border-dark p-2">
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={editingValues[`${prefix}-value3`] ?? row.value3}
                  onChange={(e) => handleInputChange(section, index, 'value3', e.target.value)}
                  placeholder="Enter value"
                />
              ) : (
                row.value3
              )}
            </td>
          )}
          <td className="text-center border border-dark p-2">
            {isEditing ? (
              <>
                <button
                  className="btn btn-sm btn-success me-1"
                  onClick={() => handleSave(section, index)}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleCancel(section, index)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <label className="btn btn-sm btn-outline-primary me-1 mb-0">
                  <FaUpload />
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="d-none"
                    onChange={(e) => {
                      console.log(`Uploading in ${section}[${index}]`, e.target.files[0]);
                    }}
                  />
                </label>
                <button className="btn btn-sm btn-outline-info me-1">
                  <FaDownload />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(section, index)}
                >
                  <FaTrashAlt />
                </button>
              </>
            )}
          </td>
        </tr>
      );
    });
  };

  const renderSection = (title, sectionKey, firstColName, secondColName, thirdColName) => (
    <>
      <div className="container ps-0">
        <div className="card-header px-0 mb-1">
          <h4 className="text-center mb-0 payroll-title">{title} </h4>
        </div>
      </div>
      <div className="table-responsive mb-1 px-lg-7 px-md-5">
        <table className="table border border-dark text-dark mb-2">
          <thead>
            <tr className="payroll-table-header">
              <th className="text-center border border-dark p-2">{firstColName}</th>
              <th className="text-center border border-dark p-2">{secondColName}</th>
              {sectionKey !== 'fixedAssets' && (
                <th className="text-center border border-dark p-2">{thirdColName}</th>
              )}
              <th className="text-center border border-dark p-2">Action</th>
            </tr>
          </thead>
          <tbody>{renderRows(sectionKey)}</tbody>
        </table>
      </div>
      <div className="text-end mt-3">
        <button
          type="button"
          className="btn btn-primary me-3 custom-submit-button"
          onClick={() => handleAddRow(sectionKey)}
        >
          Add Row
        </button>
      </div>
    </>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              {renderSection('Bank Statement', 'bankStatement', 'Account Numbers', 'Opening Balance', 'Closing Balance')}
              {renderSection('Fixed Deposit', 'fixedDeposit', 'Bank A/c No.', 'Opening Balance', 'Closing Balance')}
              {renderSection('Fixed Assets Invoice', 'fixedAssets', 'Fixed Assets Invoice', 'Addition to FA', '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDocumentforAuditor;