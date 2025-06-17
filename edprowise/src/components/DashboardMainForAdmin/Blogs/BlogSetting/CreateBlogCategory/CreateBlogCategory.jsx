import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import getAPI from '../../../../../api/getAPI';
import postAPI from '../../../../../api/postAPI';
import putAPI from '../../../../../api/putAPI'
import { toast } from "react-toastify";
import ConfirmationDialog from '../../../../ConfirmationDialog';

const CreateBlogCategory = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deleteType, setDeleteType] = useState("");
    const [selectedBlogCategory, setSelectedBlogCategory] = useState(null);

    // State for editing
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(10); // Items per page

    // Fetch categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAPI("/get-category", {}, true);
            console.log("get-response:", response);

            if (response.success || response.data?.success) {
                const categoriesList = response.data?.data || []; // Safely extract array
                const filteredCategories = categoriesList.filter(cat =>
                    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setCategories(filteredCategories);
                setCurrentPage(1); // Reset to first page when data changes
            } else {
                toast.error(response.message || 'Failed to fetch categories');
            }
        } catch (err) {
            toast.error('Failed to fetch categories');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load and when search term changes
    useEffect(() => {
        fetchCategories();
    }, [searchTerm]);

    // Pagination logic
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(
        indexOfFirstCategory,
        indexOfLastCategory
    );

    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const pageRange = 1; // How many pages to show around current page
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    const pagesToShow = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    // Handle category submission
    const handleAddCategory = async () => {
        if (!categoryName.trim()) {
            toast('Category name is required');
            return;
        }

        setLoading(true);
        try {
            const response = await postAPI(
                "/create-category",
                { categoryName },
                { "Content-Type": "application/json" }
            );

            if (response.data.success) {
                toast(response.message || 'Category created successfully');
                setCategoryName('');
                setShowAddModal(false);
                fetchCategories();
            } else {
                toast(response.message || 'Error creating category');
            }
        } catch (err) {
            toast(err.response?.data?.message || 'Error creating category');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle edit start
    const handleEditStart = (category) => {
        setEditingId(category._id);
        setEditValue(category.categoryName);
    };

    // Handle edit cancel
    const handleEditCancel = () => {
        setEditingId(null);
        setEditValue('');
    };

    // Handle edit save
const handleEditSave = async () => {
    if (!editValue.trim()) {
        toast.error('Category name cannot be empty');
        return;
    }

    setLoading(true);
    try {
        const response = await putAPI(
            `/update-blog-category/${editingId}`,
            { categoryName: editValue },
            { "Content-Type": "application/json" }
        );

        if (response.data.success) {
            toast.success(response.message || 'Category updated successfully');
            setEditingId(null);
            setEditValue('');
            fetchCategories();
        } else {
            toast.error(response.data.message || 'Error updating category');
        }
    } catch (err) {
        toast.error(err.response?.data?.message || 'Error updating category');
        console.error(err);
    } finally {
        setLoading(false);
    }
};

    const openDeleteDialog = (blogCategory) => {
        setSelectedBlogCategory(blogCategory);
        setIsDeleteDialogOpen(true);
        setDeleteType("blogCategory");
    };

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
        setSelectedBlogCategory(null);
    };

    const handleDeleteConfirmed = (_id) => {
        setCategories(prevCategories =>
            prevCategories.filter(category => category._id !== _id)
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
                                            Blogs Category
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
                                                        placeholder="Search Blog Category..."
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
                                                    Add Category
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                {/* Categories Table */}
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
                                                <th>Category Title</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && categories.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3}>Loading categories...</td>
                                                </tr>
                                            ) : currentCategories.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3}>No categories found.</td>
                                                </tr>
                                            ) : (
                                                currentCategories.map((cat) => (
                                                    <tr className="payroll-table-body" key={cat._id}>
                                                        <td>
                                                            <div className="form-check ms-1">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id={`customCheck${cat._id}`}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {editingId === cat._id ? (
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={editValue}
                                                                    onChange={(e) => setEditValue(e.target.value)}
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                cat.categoryName
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-center gap-2">
                                                                {editingId === cat._id ? (
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
                                                                        {/* <button 
                                                                            className="btn btn-light btn-sm"
                                                                            onClick={() => handleEditStart(cat)}
                                                                            disabled={loading}
                                                                        >
                                                                            <FaEdit />
                                                                        </button> */}
                                                                        <button className="btn btn-light btn-sm"
                                                                         onClick={() => handleEditStart(cat)}
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
                                                                            onClick={() => openDeleteDialog(cat)}
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

                                {/* Pagination - Only show if there are items */}
                                {categories.length > 0 && (
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

                {/* Add Category Modal */}
                <Modal show={showAddModal} onHide={() => {
                    setShowAddModal(false);
                    setCategoryName('');
                }} centered dialogClassName="custom-modal">
                    <Modal.Body className="modal-body-scrollable">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-body custom-heading-padding">
                                            <div className="card-header d-flex justify-content-between align-items-center gap-1 p-0 py-2">
                                                <h4 className="card-title text-center mb-0 flex-grow-1">
                                                    Add Blog Category
                                                </h4>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="categoryName" className="form-label">
                                                    Category Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="categoryName"
                                                    name="categoryName"
                                                    className="form-control"
                                                    value={categoryName}
                                                    onChange={(e) => setCategoryName(e.target.value)}
                                                    placeholder="Enter category name"
                                                    required
                                                    disabled={loading}
                                                />
                                            </div>

                                            <div className="text-end mt-3">
                                                <Button
                                                    variant="secondary"
                                                    className="me-2"
                                                    onClick={() => {
                                                        setCategoryName('');
                                                        setShowAddModal(false);
                                                    }}
                                                    disabled={loading}
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    onClick={handleAddCategory}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Saving...' : 'Save Category'}
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
                    id={selectedBlogCategory?._id}
                    onDeleted={() => handleDeleteConfirmed(selectedBlogCategory?._id)}
                />
            )}
        </>
    );
};

export default CreateBlogCategory;