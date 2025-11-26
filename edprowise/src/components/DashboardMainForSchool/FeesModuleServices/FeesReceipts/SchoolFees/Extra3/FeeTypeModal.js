const FeeTypeModal = ({ show, onClose, modalData, handleModalPaidAmountChange, feeTypes, getFeeTypeName, actionSelections }) => {
  if (!show || !modalData) return null;

  const { academicYear, installmentNum, feeItems } = modalData;
  const isPartFeesSelected = actionSelections[`${modalData.academicYear}-${modalData.installmentNum}`] === 'Part Fees';

  const totals = feeItems.reduce(
    (acc, item) => {
      const payable = item.isExcess ? item.amount : item.amount - (item.concession || 0);
      const paid = item.isFine ? item.amount : item.paidAmount || 0;
      const balance = item.isFine || item.isExcess ? item.amount - paid : item.balance - (item.concession || 0) - paid;
      return {
        totalFees: acc.totalFees + item.amount,
        totalConcession: acc.totalConcession + (item.concession || 0),
        totalPayable: acc.totalPayable + payable,
        totalBalance: acc.totalBalance + balance,
        totalPaid: acc.totalPaid + paid,
      };
    },
    { totalFees: 0, totalConcession: 0, totalPayable: 0, totalBalance: 0, totalPaid: 0 }
  );

  
  const sortedFeeItems = [...feeItems].sort((a, b) => {

    const isANormal = !a.isExcess && !a.isFine;
    const isBNormal = !b.isExcess && !b.isFine;
    if (isANormal && !isBNormal) return -1;
    if (!isANormal && isBNormal) return 1;
 
    if (a.isExcess && b.isFine) return -1;
    if (b.isExcess && a.isFine) return 1;

    if (isANormal && isBNormal) {
      const nameA = getFeeTypeName(a.feeTypeId);
      const nameB = getFeeTypeName(b.feeTypeId);
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
              Fee Types for Installment {installmentNum} ({academicYear})
            </h3>
          </div>
          <div className="modal-body">
            <div className="table-responsive">
              <table
                className="table table-bordered table-sm text-nowrap"
                style={{ border: '1px solid #343a40', borderCollapse: 'collapse' }}
              >
                <thead className="text-dark">
                  <tr>
                    <th scope="col">Fees Type</th>
                    <th scope="col">Fees Amount</th>
                    <th scope="col">Concession</th>
                    <th scope="col">Total Payable</th>
                    <th scope="col">Balance Payable</th>
                    {isPartFeesSelected && <th scope="col">Amount Paid</th>}
                  </tr>
                </thead>
                <tbody>
                  {sortedFeeItems.map((item, index) => {
                    const payable = item.isExcess ? item.amount : item.amount - (item.concession || 0);
                    const paid = item.isFine ? item.amount : item.paidAmount || 0;
                    const balance = item.isFine || item.isExcess ? item.amount - paid : item.balance - (item.concession || 0) - paid;
                    return (
                      <tr key={`${academicYear}-${installmentNum}-${item.feeTypeId}-${index}`}>
                        <td>{item.isFine ? 'Fine' : item.isExcess ? 'Excess Fees' : getFeeTypeName(item.feeTypeId)}</td>
                        <td style={{ textAlign: 'right' }}>{item.amount}</td>
                        <td style={{ textAlign: 'right' }}>{item.concession || 0}</td>
                        <td style={{ textAlign: 'right' }}>{payable}</td>
                        <td style={{ textAlign: 'right' }}>{balance}</td>
                        {isPartFeesSelected && (
                          <td style={{ textAlign: 'right' }}>
                            {item.isFine ? (
                              <span>{item.amount}</span>
                            ) : (
                              <input
                                style={{ border: '1px solid #f2be00', textAlign: 'right', fontSize: '1.3rem' }}
                                className="form-control form-control-sm"
                                value={item.paidAmount || ''}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
                                    handleModalPaidAmountChange(
                                      installmentNum,
                                      item.feeTypeId,
                                      value,
                                      academicYear
                                    );
                                  }
                                }}
                                min="0"
                                placeholder="Enter amount"
                                aria-label={`Paid amount for ${getFeeTypeName(item.feeTypeId)}`}
                              />
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                  <tr className="text-dark">
                    <td scope="row"><strong>Total</strong></td>
                    <td style={{ textAlign: 'right' }}><strong>{totals.totalFees}</strong></td>
                    <td style={{ textAlign: 'right' }}><strong>{totals.totalConcession}</strong></td>
                    <td style={{ textAlign: 'right' }}><strong>{totals.totalPayable}</strong></td>
                    <td style={{ textAlign: 'right' }}><strong>{totals.totalBalance}</strong></td>
                    {isPartFeesSelected && (
                      <td style={{ textAlign: 'right' }}>
                        <strong>{totals.totalPaid}</strong>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeTypeModal;