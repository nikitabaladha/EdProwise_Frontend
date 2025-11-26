import { useState } from 'react';
import { Modal, Button, Table, Form, Toast, ToastContainer } from 'react-bootstrap';

const FeeTypeModal = ({
  show,
  onClose,
  modalData,
  handleModalPaidAmountChange,
  getFeeTypeName,
  actionSelections,
  handleFineAmountChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!show || !modalData || !modalData.feeItems) {
    return null;
  }

  const selection = actionSelections[`${modalData.academicYear}-${modalData.installmentName}`];
  const isPartFeesSelected = selection === 'Part Fees' || selection === 'Full Fees';

  const { academicYear, installmentName, feeItems } = modalData;

  const totals = feeItems.reduce(
    (acc, item) => {
      if (item.isFine || item.isExcess) {
        return {
          ...acc,
          totalPaid: acc.totalPaid + (item.paidAmount || 0),
        };
      }
      const payable = item.amount - (item.concession || 0);
      const paid = selection === 'Full Fees' ? item.balance : (item.paidAmount || 0);
      const balance = Math.max(0, item.balance);
      const amountPaid = Math.max(0, item.amount - item.balance - (item.concession || 0));
      return {
        totalFees: acc.totalFees + item.amount,
        totalConcession: acc.totalConcession + (item.concession || 0),
        totalPayable: acc.totalPayable + payable,
        totalBalance: acc.totalBalance + balance,
        totalPaid: acc.totalPaid + paid,
        totalAmountPaid: acc.totalAmountPaid + amountPaid,
      };
    },
    { totalFees: 0, totalConcession: 0, totalPayable: 0, totalBalance: 0, totalPaid: 0, totalAmountPaid: 0 }
  );

  const sortedFeeItems = [...feeItems].sort((a, b) => {
    const isANormal = !a.isExcess && !a.isFine;
    const isBNormal = !b.isExcess && !b.isFine;
    if (isANormal && !isBNormal) return -1;
    if (!isANormal && isBNormal) return 1;
    if (a.isFine && !b.isFine) return -1;
    if (!a.isFine && b.isFine) return 1;
    if (isANormal && isBNormal) {
      const nameA = getFeeTypeName(a.feeTypeId) || '';
      const nameB = getFeeTypeName(b.feeTypeId) || '';
      return nameA.localeCompare(nameB);
    }
    return 0;
  });

  const headers = [
    'Type of Fees',
    'Fees',
    'Concession',
    'Total Payable',
    'Amount Paid',
    'Balance Payable',
    ...(isPartFeesSelected ? ['Amount'] : []),
  ];

  const formatAcademicYear = (year) => {
    const [start, end] = year.split("-");
    return `${start}-${end.slice(2)}`;
  };

  const validateAmounts = () => {
    if (!isPartFeesSelected) return true;
    return sortedFeeItems.some((item) => {
      const value = item.isFine ? item.amount : (selection === 'Full Fees' ? item.balance : item.paidAmount);
      return value !== '' && value !== undefined && value !== null && !isNaN(value) && Number(value) >= 0;
    });
  };

  const handleSaveClick = async () => {
    if (!validateAmounts()) {
      setShowToast(true);
      return;
    }
    setIsLoading(true);
    try {
      await onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseClick = async () => {
    if (isPartFeesSelected && !validateAmounts()) {
      setShowToast(true);
      return;
    }
    setIsLoading(true);
    try {
      await onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Please enter a valid amount for at least one fee item before saving.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal
        show={show}
        onHide={handleCloseClick}
        size="xl"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontSize: '2.0rem',
              textAlign: 'center',
              width: '100%',
            }}
          >
            Fee Types for {installmentName} {formatAcademicYear(academicYear)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table
              style={{
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      style={{
                        fontSize: '1.3rem',
                        backgroundColor: 'white',
                        textAlign: 'center',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                style={{
                  borderCollapse: 'collapse',
                }}
              >
                {sortedFeeItems.map((item, index) => {
                  const payable = item.isFine || item.isExcess ? 0 : item.amount - (item.concession || 0);
                  const balance = item.isFine || item.isExcess ? 0 : Math.max(0, item.balance);
                  const amountPaid = item.isFine || item.isExcess ? 0 : Math.max(0, item.amount - item.balance - (item.concession || 0));
                  const displayPaidAmount = selection === 'Full Fees' && !item.isFine && !item.isExcess ? item.balance : (item.paidAmount || '');
                  return (
                    <tr key={`${item.feeTypeId}-${index}`}>
                      <td
                        style={{
                          fontSize: '1.3rem',
                          backgroundColor: 'white',
                          textAlign: 'left',
                        }}
                      >
                        {item.isFine ? (
                          <span className="text-dark">Fine</span>
                        ) : item.isExcess ? (
                          <span className="text-dark">Excess</span>
                        ) : (
                          getFeeTypeName(item.feeTypeId) || 'Unknown'
                        )}
                      </td>
                      <td
                        style={{
                          fontSize: '1.3rem',
                          backgroundColor: 'white',
                          textAlign: 'right',
                        }}
                      >
                        {item.isFine || item.isExcess ? '0' : item.amount || '0'}
                      </td>
                      <td
                        style={{
                          fontSize: '1.3rem',
                          backgroundColor: 'white',
                          textAlign: 'right',
                        }}
                      >
                        {item.isFine || item.isExcess ? '0' : item.concession || '0'}
                      </td>
                      <td
                        style={{
                          fontSize: '1.3rem',
                          backgroundColor: 'white',
                          textAlign: 'right',
                        }}
                      >
                        {item.isFine || item.isExcess ? '0' : payable || '0'}
                      </td>
                      <td
                        style={{
                          fontSize: '1.3rem',
                          backgroundColor: 'white',
                          textAlign: 'right',
                        }}
                      >
                        {item.isFine || item.isExcess ? '0' : amountPaid || '0'}
                      </td>
                      <td
                        style={{
                          fontSize: '1.3rem',
                          backgroundColor: 'white',
                          textAlign: 'right',
                        }}
                      >
                        {item.isFine || item.isExcess ? '0' : balance || '0'}
                      </td>
                      {isPartFeesSelected && (
                        <td
                          style={{
                            backgroundColor: 'white',
                          }}
                        >
                          <Form.Control
                            style={{
                              fontSize: '1.3rem',
                              backgroundColor: 'white',
                              textAlign: 'right',
                              width: '140px',
                              border: '1px solid #f2be00',
                            }}
                            size="sm"
                            value={item.isFine ? (item.amount || '') : displayPaidAmount}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
                                if (item.isFine) {
                                  handleFineAmountChange(installmentName, item.feeTypeId, value, academicYear);
                                } else {
                                  handleModalPaidAmountChange(
                                    installmentName,
                                    item.feeTypeId,
                                    value,
                                    academicYear
                                  );
                                }
                              }
                            }}
                            min="0"
                            placeholder={item.isFine ? 'Enter fine' : 'Enter amount'}
                            aria-label={item.isFine ? 'Fine amount' : `Paid amount for ${getFeeTypeName(item.feeTypeId) || 'Unknown'}`}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th style={{ textAlign: 'left' }}>Total</th>
                  <th style={{ textAlign: 'right' }}>{totals.totalFees}</th>
                  <th style={{ textAlign: 'right' }}>{totals.totalConcession}</th>
                  <th style={{ textAlign: 'right' }}>{totals.totalPayable}</th>
                  <th style={{ textAlign: 'right' }}>{totals.totalAmountPaid}</th>
                  <th style={{ textAlign: 'right' }}>{totals.totalBalance}</th>
                  {isPartFeesSelected && <th style={{ textAlign: 'right' }}>{totals.totalPaid}</th>}
                </tr>
              </tfoot>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={isPartFeesSelected ? 'primary' : 'secondary'}
            onClick={isPartFeesSelected ? handleSaveClick : handleCloseClick}
            disabled={isLoading}
          >
            {isPartFeesSelected ? (isLoading ? 'Save & Continue...' : 'Save & Continue') : (isLoading ? 'Close...' : 'Close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FeeTypeModal;