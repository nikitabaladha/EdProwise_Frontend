import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTrashAlt, FaCheck, FaTimes } from 'react-icons/fa';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import putAPI from '../../../../../api/putAPI';
import { toast } from "react-toastify";
import ConfirmationDialog from '../../../../ConfirmationDialog';

const CreateBlogTags = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [tagName, setTagName] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [deleteType, setDeleteType] = useState("");
    
    // State for editing
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [tagsPerPage] = useState(10); // Items per page

    // Fetch tags
    const fetchTags = async () => {
        setLoading(true);
        try {
            const response = await getAPI("/get-tags", {}, true);
            console.log("get-response:", response);

            if (response.success || response.data?.success) {
                const tagsList = response.data?.data || [];
                const filteredTags = tagsList.filter(tag =>
                    tag.tagName.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setTags(filteredTags);
                setCurrentPage(1); // Reset to first page when data changes
            } else {
                toast.error(response.message || 'Failed to fetch tags');
            }
        } catch (err) {
            toast.error('Failed to fetch tags');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load and when search term changes
    useEffect(() => {
        fetchTags();
    }, [searchTerm]);

    // Pagination logic
    const indexOfLastTag = currentPage * tagsPerPage;
    const indexOfFirstTag = indexOfLastTag - tagsPerPage;
    const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

    const totalPages = Math.ceil(tags.length / tagsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const pageRange = 1;
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    const pagesToShow = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    // Handle tag submission
    const handleAddTag = async () => {
        if (!tagName.trim()) {
            toast.error('Tag name is required');
            return;
        }

        setLoading(true);
        try {
            const response = await postAPI(
                "/create-tags",
                { tagName },
                { "Content-Type": "application/json" }
            );

            if (response.data.success) {
                toast.success(response.message || 'Tag created successfully');
                setTagName('');
                setShowAddModal(false);
                fetchTags();
            } else {
                toast.error(response.message || 'Error creating tag');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating tag');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit start
    const handleEditStart = (tag) => {
        setEditingId(tag._id);
        setEditValue(tag.tagName);
    };

    // Handle edit cancel
    const handleEditCancel = () => {
        setEditingId(null);
        setEditValue('');
    };

    // Handle edit save
    const handleEditSave = async () => {
        if (!editValue.trim()) {
            toast.error('Tag name cannot be empty');
            return;
        }

        setLoading(true);
        try {
            const response = await putAPI(
                `/update-blog-tags/${editingId}`,
                { tagName: editValue },
                { "Content-Type": "application/json" }
            );

            if (response.data.success) {
                toast.success(response.message || 'Tag updated successfully');
                setEditingId(null);
                setEditValue('');
                fetchTags();
            } else {
                toast.error(response.data.message || 'Error updating tag');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error updating tag');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openDeleteDialog = (tag) => {
        setSelectedTag(tag);
        setIsDeleteDialogOpen(true);
        setDeleteType("tag");
    };

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
        setSelectedTag(null);
    };

    const handleDeleteConfirmed = (_id) => {
        setTags(prevTags =>
            prevTags.filter(tag => tag._id !== _id)
        );
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body custom-heading-padding">
                                {/* Header */}
                                <div className="container">
                                    <div className="card-header d-flex justify-content-between align-items-center gap-1">
                                        <h4 className="payroll-title text-center mb-0 flex-grow-1">
                                            Blog Tags
                                        </h4>
                                    </div>
                                </div>

                                {/* Search and Add */}
                                <form className="app-search d-block me-2">
                                    <div className="row px-lg-7">
                                        <div className="col-md-9 align-content-center">
                                            <div className="my-3 d-flex">
                                                <div className="position-relative flex-grow-1">
                                                    <input
                                                        type="search"
                                                        className="form-control border border-dark"
                                                        placeholder="Search Blog Tags..."
                                                        autoComplete="off"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 align-content-center text-center">
                                            <div className="my-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary custom-submit-button"
                                                    onClick={() => setShowAddModal(true)}
                                                    disabled={loading}
                                                >
                                                    Add Tag
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                {/* Tags Table */}
                                <div className="table-responsive px-lg-7">
                                    <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                                        <thead className="bg-light-subtle">
                                            <tr className="payroll-table-header">
                                                <th style={{ width: 20 }}>
                                                    <div className="form-check ms-1">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="customCheck1"
                                                        />
                                                    </div>
                                                </th>
                                                <th>Tag Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && tags.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3}>Loading Tags...</td>
                                                </tr>
                                            ) : currentTags.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3}>No tags found.</td>
                                                </tr>
                                            ) : (
                                                currentTags.map((tag) => (
                                                    <tr className="payroll-table-body" key={tag._id}>
                                                        <td>
                                                            <div className="form-check ms-1">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`customCheck${tag._id}`}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {editingId === tag._id ? (
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={editValue}
                                                                    onChange={(e) => setEditValue(e.target.value)}
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                tag.tagName
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-center gap-2">
                                                                {editingId === tag._id ? (
                                                                    <>
                                                                        <button
                                                                            className="btn btn-success btn-sm"
                                                                            onClick={handleEditSave}
                                                                            disabled={loading}
                                                                        >
                                                                            <FaCheck />
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-danger btn-sm"
                                                                            onClick={handleEditCancel}
                                                                            disabled={loading}
                                                                        >
                                                                            <FaTimes />
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <button
                                                                            className="btn btn-light btn-sm"
                                                                            onClick={() => handleEditStart(tag)}
                                                                            disabled={loading}
                                                                        >
                                                                            <iconify-icon
                                                                                icon="solar:pen-2-broken"
                                                                                className="align-middle fs-18"
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            className="btn btn-sm btn-outline-danger"
                                                                            disabled={loading}
                                                                            onClick={() => openDeleteDialog(tag)}
                                                                        >
                                                                            <FaTrashAlt />
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {tags.length > 0 && (
                                    <div className="card-footer border-top">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-end mb-0">
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={handlePreviousPage}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Previous
                                                    </button>
                                                </li>
                                                {pagesToShow.map((page) => (
                                                    <li
                                                        key={page}
                                                        className={`page-item ${currentPage === page ? "active" : ""
                                                            }`}
                                                    >
                                                        <button
                                                            className={`page-link ${currentPage === page ? "active" : ""
                                                                }`}
                                                            onClick={() => handlePageClick(page)}
                                                        >
                                                            {page}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className="page-item">
                                                    <button
                                                        className="page-link"
                                                        onClick={handleNextPage}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Tag Modal */}
                <Modal show={showAddModal} onHide={() => {
                    setShowAddModal(false);
                    setTagName('');
                }} centered dialogClassName="custom-modal">
                    <Modal.Body className="modal-body-scrollable">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-body custom-heading-padding">
                                            <div className="card-header d-flex justify-content-between align-items-center gap-1 p-0 py-2">
                                                <h4 className="card-title text-center mb-0 flex-grow-1">
                                                    Add Blog Tag
                                                </h4>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="tagName" className="form-label">
                                                    Tag Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="tagName"
                                                    name="tagName"
                                                    className="form-control"
                                                    value={tagName}
                                                    onChange={(e) => setTagName(e.target.value)}
                                                    placeholder="Enter tag name"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="text-end mt-3">
                                                <Button
                                                    variant="secondary"
                                                    className="me-2"
                                                    onClick={() => {
                                                        setTagName('');
                                                        setShowAddModal(false);
                                                    }}
                                                    disabled={loading}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    onClick={handleAddTag}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Saving...' : 'Save Tag'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            {isDeleteDialogOpen && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType={deleteType}
                    id={selectedTag?._id}
                    onDeleted={() => handleDeleteConfirmed(selectedTag?._id)}
                />
            )}
        </>
    )
}

export default CreateBlogTags;