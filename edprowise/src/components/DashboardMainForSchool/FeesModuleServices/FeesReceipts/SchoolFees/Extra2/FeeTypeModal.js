import { Modal, Button } from 'react-bootstrap';

const FeeTypeModal = ({ show, onHide, modalData, handleModalPaidAmountChange }) => {
  if (!modalData) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg" dialogClassName="fee-type-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          Fee Types for {modalData.academicYear} - Installment {modalData.installmentNumber}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="bg-light">
              <tr>
                <th>Fees Type</th>
                <th>Fees Amount</th>
                <th>Concession</th>
                <th>Fine</th>
                <th>Total Payable</th>
                <th>Balance Payable</th>
                <th>Amount Paid</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {modalData.feeItems.map((item, index) => {
                const feesAmount = item.feesAmount || 0;
                const concession = item.concession || 0;
                const fine = item.fine || 0;
                const payable = item.payable || 0;
                const payableBalance = item.payableBalanceAmount || 0;
                const paid = parseFloat(item.inputPaid) || 0;
                const balance = payableBalance - paid;

                return (
                  <tr
                    key={`${modalData.academicYear}-${modalData.installmentNumber}-${item.feeTypeId}-${index}`}
                  >
                    <td>{item.feesType}</td>
                    <td>{feesAmount}</td>
                    <td>{concession}</td>
                    <td>{fine}</td>
                    <td>{payable}</td>
                    <td>{payableBalance}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={item.inputPaid}
                        onChange={(e) =>
                          handleModalPaidAmountChange(
                            item.feeTypeId,
                            e.target.value,
                            modalData.academicYear,
                            modalData.installmentNumber
                          )
                        }
                        min="0"
                        max={payableBalance}
                        style={{ width: '100px', margin: '0 auto' }}
                        placeholder="0.00"
                      />
                    </td>
                    <td>{balance}</td>
                  </tr>
                );
              })}
              <tr className="fw-bold bg-light">
                <td>Total</td>
                <td>{modalData.totals.totalFeesAmount}</td>
                <td>{modalData.totals.totalConcession}</td>
                <td>{modalData.feeItems.reduce((sum, item) => sum + (item.fine || 0), 0)}</td>
                <td>{modalData.totals.totalPayable}</td>
                <td>{modalData.totals.totalBalance}</td>
                <td>{modalData.totals.totalPaid}</td>
                <td>{modalData.totals.totalBalance}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeeTypeModal;