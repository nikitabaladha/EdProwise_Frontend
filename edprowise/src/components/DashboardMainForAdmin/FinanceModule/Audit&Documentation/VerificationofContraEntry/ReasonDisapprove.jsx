import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ReasonDisapprove = ({ onClose,entryData }) => {
    const [reason, setReason] = useState('');

    return (
        <Modal show={true} onHide={onClose} centered dialogClassName="custom-modal">
            <Modal.Body className="modal-body-scrollable">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body custom-heading-padding">
                                    <div className="container">
                                        <div className="card-header mb-2">
                                            <h4 className="card-title text-center custom-heading-font">
                                                 Reason of Disapprove 
                                            </h4>
                                            {entryData && (
                                                <p className="text-center pt-3">
                                                    Rejecting entry: {entryData.voucherNumber} ({entryData.accountingEntry})
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <form onSubmit="">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-2">
                                                    <label  className="form-label">
                                                        Reason for Disapprove
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="reasonDisapprove"
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="text-end">
                                                <Button
                                                    type="submit"
                                                    variant="success"
                                                >
                                                    Submit
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={onClose}
                                                    className="ms-2"
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ReasonDisapprove;