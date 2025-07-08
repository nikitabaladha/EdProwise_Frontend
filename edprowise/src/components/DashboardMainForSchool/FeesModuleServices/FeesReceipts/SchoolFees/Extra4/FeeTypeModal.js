import React from 'react';

const FeeTypeModal = ({ show, onClose, modalData, handleModalPaidAmountChange, feeTypes, getFeeTypeName, actionSelections, handleFineAmountChange }) => {
  if (!show || !modalData || !modalData.feeItems) {
    // console.warn('FeeTypeModal: Invalid or missing modalData', { show, modalData });
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
      const paid = item.paidAmount || 0;
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

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="feeTypeModalLabel"
      aria-hidden={!show}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 id="feeTypeModalLabel">
              Fee Types for {installmentName} ({academicYear.split('-').map(year => year.slice(-2)).join('-')})
            </h3>
            {/* <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button> */}
          </div>
          <div className="modal-body">
            <div className="table-responsive">
              <table
                className="table table-bordered table-sm text-nowrap"
                style={{ border: '1px solid #343a40', borderCollapse: 'collapse' }}
              >
                <thead className="text-dark">
                  <tr>
                    <th scope="col" style={{ width: '20%', textAlign: 'left' }}>Type of Fees</th>
                    <th scope="col" style={{ width: '12%', textAlign: 'right' }}>Fees</th>
                    <th scope="col" style={{ width: '12%', textAlign: 'right' }}>Concession</th>
                    <th scope="col" style={{ width: '12%', textAlign: 'right' }}>Total Payable</th>
                    <th scope="col" style={{ width: '12%', textAlign: 'right' }}>Amount Paid</th>
                    <th scope="col" style={{ width: '12%', textAlign: 'right' }}>Balance Payable</th>
                    {isPartFeesSelected && <th scope="col" style={{ width: '20%', textAlign: 'right' }}>Amount</th>}
                  </tr>
                </thead>
                <tbody>
                  {sortedFeeItems.map((item, index) => {
                    const payable = item.isFine || item.isExcess ? 0 : item.amount - (item.concession || 0);
                    // const paid = item.isFine || item.isExcess ? 0 : item.paidAmount || 0;
                    const balance = item.isFine || item.isExcess ? 0 : Math.max(0, item.balance);
                    const amountPaid = item.isFine || item.isExcess ? 0 : Math.max(0, item.amount - item.balance - (item.concession || 0));
                    return (
                      <tr key={`${item.feeTypeId}-${index}`}>
                        <td style={{ textAlign: 'left', whiteSpace: 'normal' }}>
                          {item.isFine ? (
                            <span className="text-dark">Fine</span>
                          ) : item.isExcess ? (
                            <span className="text-dark">Excess</span>
                          ) : (
                            getFeeTypeName(item.feeTypeId) || 'Unknown'
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {item.isFine || item.isExcess ? (
                            '0'
                          ) : (
                            item.amount || '0'
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {item.isFine || item.isExcess ? '0' : item.concession || '0'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {item.isFine || item.isExcess ? '0' : payable || '0'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {item.isFine || item.isExcess ? '0' : amountPaid || '0'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          {item.isFine || item.isExcess ? '0' : balance || '0'}
                        </td>
                        {isPartFeesSelected &&
                          <td style={{ textAlign: 'right' }}>
                            <input
                              // type="number"
                              style={{ border: '1px solid #f2be00', textAlign: 'right', fontSize: '1.3rem' }}
                              className="form-control form-control-sm"
                              value={item.isFine ? (item.amount || '') : (item.paidAmount || '')}
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
                        }
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="sticky-bottom">
                  <tr>
                    <th style={{ textAlign: 'left' }}>Total</th>
                    <th style={{ textAlign: 'right' }}>{totals.totalFees}</th>
                    <th style={{ textAlign: 'right' }}>{totals.totalConcession}</th>
                    <th style={{ textAlign: 'right' }}>{totals.totalPayable}</th>
                    <th style={{ textAlign: 'right' }}>{totals.totalAmountPaid}</th>
                    <th style={{ textAlign: 'right' }}>{totals.totalBalance}</th>
                    {isPartFeesSelected &&
                      <th style={{ textAlign: 'right' }}>{totals.totalPaid}</th>
                    }
                  </tr>
                </tfoot>
              </table>
            </div>

          </div>
          <div className="modal-footer">
            {!isPartFeesSelected && (
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            )}
            {isPartFeesSelected && (
              <button type="button" className="btn btn-primary" onClick={onClose}>
                Save & Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeTypeModal;