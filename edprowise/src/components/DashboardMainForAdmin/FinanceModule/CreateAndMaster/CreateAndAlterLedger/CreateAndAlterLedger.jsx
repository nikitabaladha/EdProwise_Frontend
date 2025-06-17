import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
const CreateAndAlterLedger = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'create', 'update', 'delete'
    const [ledgerType, setLedgerType] = useState(''); // 'head', 'bs', 'group', 'ledger'
    const [selectedOption, setSelectedOption] = useState('');

    // const handleCreateClick = (type) => {
    //     setModalType('create');
    //     setLedgerType(type);
    //     setShowModal(true);
    // };

    // const handleUpdateClick = (type) => {
    //     setModalType('update');
    //     setLedgerType(type);
    //     setShowModal(true);
    // };

    // const handleDeleteClick = (type) => {
    //     setModalType('delete');
    //     setLedgerType(type);
    //     setShowModal(true);
    // };

    const handleCreateClick = (type) => {
        const path = getCorrectPath('create', type);
        if (path) {
            navigate(path);
        }
    };

    const handleUpdateClick = (type) => {
        setModalType('update');
        setLedgerType(type);
        setShowModal(true);
    };

    const handleDeleteClick = (type) => {
        const path = getCorrectPath('delete', type);
        if (path) {
            navigate(path);
        }
    };

    const getCorrectPath = (modalType, ledgerType) => {
        const typeMap = {
            head: 'head-of-ledger',
            'bs-ledger': 'bs-ledger',
            group: 'group-ledger',
            ledger: 'ledger'
        };

        const basePath = '/admin-dashboard/finance-module/master/create-and-alter-ledger';
        const formattedLedgerType = typeMap[ledgerType];
        if (!formattedLedgerType) return '';

        return `${basePath}/${modalType}-${formattedLedgerType}`;
    };

    const handleConfirmAction = () => {
        setShowModal(false);
        const path = getCorrectPath(modalType, ledgerType);
        if (path) {
            navigate(path, { state: { selectedOption } });
        }
    };


    const getModalTitle = () => {
        const typeMap = {
            'head': 'Head of Account',
            'bs-ledger': 'BS & P&L Ledger',
            'group': 'Group Ledger',
            'ledger': 'Ledger'
        };

        const actionMap = {
            'create': 'Create',
            'update': 'Update',
            'delete': 'Delete'
        };

        return `${actionMap[modalType]} ${typeMap[ledgerType]}`;
    };

    const getOptions = () => {
        switch (ledgerType) {
            case 'head':
                return ['Asset', 'Liability', 'Income', 'Expense'];
            case 'bs-ledger':
                return ['Balance Sheet', 'Profit & Loss'];
            case 'group':
                return ['Current Assets', 'Fixed Assets', 'Current Liabilities', 'Long-term Liabilities'];
            case 'ledger':
                return ['Bank Accounts', 'Cash', 'Accounts Receivable', 'Accounts Payable'];
            default:
                return [];
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="card m-2">
                        <div className="card-body custom-heading-padding">
                            <div className="container">
                                <div className="card-header d-flex align-items-center gap-1">
                                    <h4 className="create-alter-header text-center mb-0 flex-grow-1">
                                        Ledger
                                    </h4>
                                </div>
                            </div>
                            <div className='d-lg-flex justify-content-center'>
                                <div className="table-responsive py-3 w-lg-40" >
                                    <table className="table align-middle mb-0 table-hover table-centered text-center border border-dark table-nowrap">
                                        <thead className="bg-light-subtle">
                                            <tr className="create-alter-head">
                                                <th className="w-30 border border-dark">Ledger</th>
                                                <th className="w-30 border border-dark">Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr className="create-alter">
                                                <td className="border border-dark">Head of Account</td>
                                                <td className="border border-dark">
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            className="btn btn-soft-primary btn-sm payroll-table-body"
                                                            onClick={() => handleCreateClick('head')}
                                                        >
                                                            Create
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleUpdateClick('head')}
                                                        >
                                                            Alter
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleDeleteClick('head')}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="create-alter">
                                                <td className="border border-dark">BS & P&L Ledger</td>
                                                <td className="border border-dark">
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            className="btn btn-soft-primary btn-sm payroll-table-body"
                                                            onClick={() => handleCreateClick('bs-ledger')}
                                                        >
                                                            Create
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleUpdateClick('bs-ledger')}
                                                        >
                                                            Alter
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleDeleteClick('bs-ledger')}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="create-alter">
                                                <td className="border border-dark">Group Ledger</td>
                                                <td className="border border-dark">
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            className="btn btn-soft-primary btn-sm payroll-table-body"
                                                            onClick={() => handleCreateClick('group')}
                                                        >
                                                            Create
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleUpdateClick('group')}
                                                        >
                                                            Alter
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleDeleteClick('group')}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="create-alter">
                                                <td className="border border-dark">Ledger</td>
                                                <td className="border border-dark">
                                                    <div className="d-flex gap-2">
                                                        <button
                                                            className="btn btn-soft-primary btn-sm payroll-table-body"
                                                            onClick={() => handleCreateClick('ledger')}
                                                        >
                                                            Create
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleUpdateClick('ledger')}
                                                        >
                                                            Alter
                                                        </button>
                                                        <button
                                                            className="btn btn-soft-danger btn-sm payroll-table-body"
                                                            onClick={() => handleDeleteClick('ledger')}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for selecting ledger options */}
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setSelectedOption('');
                }}
                centered
                dialogClassName="custom-modal"
            >
                <Modal.Header >
                    <Modal.Title>{getModalTitle()}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-scrollable">
                    <div className="row">
                        <div className="card-body custom-heading-padding">
                            <div className="mb-3">
                                <label htmlFor="ledgerOption" className="form-label">
                                    Select Option
                                </label>
                                <select
                                    id="ledgerOption"
                                    className="form-select"
                                    value={selectedOption}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    required
                                >
                                    <option value="">Select an option</option>
                                    {getOptions().map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setSelectedOption('');
                            setShowModal(false);
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleConfirmAction}
                        disabled={!selectedOption}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateAndAlterLedger;