import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog";

const BlogsInfoTable = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [deleteType, setDeleteType] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await getAPI("/get-all-blogs");
            setBlogs(response.data.data || []);
            console.log("Get response", response.data.data);
        } catch (error) {
            toast.error("Failed to fetch blogs");
        }
    };

    const navigateToAdd = () => {
        navigate("/admin-dashboard/blog/add-new-blog");
    };

    const navigateToEdit = (event, blog) => {
        event.preventDefault();
        navigate(`/admin-dashboard/blog/update-blog`, { state: { blog } });
    };


    const navigateToView = (event,blog) => {
        event.preventDefault();
        navigate(`/admin-dashboard/blog/view-blog/${blog.blogSlug}`, { state: { blog } });
    };

    const openDeleteDialog = (blog) => {
    setSelectedBlog(blog);
    setDeleteType("blog");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedBlog(null);
  };
    const handleDeleteConfirmed = (_id) => {
        setBlogs(prevBlog =>
            prevBlog.filter(blog => blog._id !== _id)
        );
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card m-2">
                            <div className="card-body custom-heading-padding">
                                <div className="card-header d-flex align-items-center gap-1">
                                    <h4 className="card-title text-center flex-grow-1">Blogs List</h4>
                                    <button onClick={navigateToAdd} className="btn btn-sm btn-primary">
                                        Add Blogs
                                    </button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0 table-hover text-center">
                                        <thead className="bg-light-subtle">
                                            <tr className="payroll-table-header">
                                                <th style={{ width: 20 }}>
                                                    <div className="form-check ms-1">
                                                        <input type="checkbox" className="form-check-input" />
                                                    </div>
                                                </th>
                                                <th>Blog No.</th>
                                                <th className="text-start">Blog Title</th>
                                                <th>Blog Type</th>
                                                <th>Blog Author</th>
                                                <th>Scheduled Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blogs.length > 0 ? (
                                                blogs.map((blog, index) => (
                                                    <tr key={blog._id} className='payroll-table-body'>
                                                        <td>
                                                            <div className="form-check ms-1">
                                                                <input type="checkbox" className="form-check-input" />
                                                            </div>
                                                        </td>
                                                        <td>{index + 1}</td>
                                                        <td className="text-start d-flex align-items-center gap-2">
                                                            {/* {blog.featuredImage && (
                                                                <img
                                                                    src={process.env.REACT_APP_API_URL_FOR_IMAGE + blog.featuredImage}
                                                                    alt="Blog"
                                                                    style={{
                                                                        width: "50px",
                                                                        height: "50px",
                                                                        objectFit: "cover",
                                                                        borderRadius: "10px",
                                                                    }}
                                                                />
                                                            )} */}
                                                            <span>{blog.blogTitle.length > 25
                                                                ? `${blog.blogTitle.slice(0, 25)}...`
                                                                : blog.blogTitle}</span>
                                                        </td>
                                                        <td>{blog.blogFor}</td>
                                                        <td>{blog.authorName}</td>
                                                        <td>{new Date(blog.scheduledDate).toLocaleDateString()}</td>
                                                        <td>
                                                            <span className={`badge ${blog.status ? 'bg-success' : 'bg-danger'} tex-white p-1`}>
                                                                {blog.status ? "Active" : "Inactive"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <Link
                                                                    onClick={(event) => navigateToView(event, blog)}
                                                                    className="btn btn-light btn-sm"
                                                                >
                                                                    <iconify-icon
                                                                        icon="solar:eye-broken"
                                                                        className="align-middle fs-18"
                                                                    />
                                                                </Link>
                                                                <Link
                                                                    onClick={(event) => navigateToEdit(event, blog)}
                                                                    className="btn btn-soft-primary btn-sm"
                                                                >

                                                                    <iconify-icon
                                                                        icon="solar:pen-2-broken"
                                                                        className="align-middle fs-18"
                                                                    />
                                                                </Link>
                                                                <Link
                                                                    className="btn btn-soft-danger btn-sm"
                                                                    onClick={() => openDeleteDialog(blog)}
                                                                >
                                                                    <iconify-icon
                                                                        icon="solar:trash-bin-minimalistic-2-broken"
                                                                        className="align-middle fs-18"
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center py-4">
                                                        No blogs available.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isDeleteDialogOpen && selectedBlog && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType={deleteType}
                    id={selectedBlog._id}
                    onDeleted={handleDeleteConfirmed}
                />
            )}
        </>
    );
};

export default BlogsInfoTable;