import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import getAPI from '../../../../api/getAPI';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const EducatorZoneBlog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { blog } = location.state || {};

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [relatedCategoryBlogs, setRelatedCategoryBlogs] = useState([]);
    const [relatedTagBlogs, setRelatedTagBlogs] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const result = await getAPI(`/get-blog/${blog._id}`, {}, true);
                if (result?.data?.blog) {
                    console.log("Fetched blog details:", result.data.blog);
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        if (blog) {
            fetchBlog();
            fetchCategories();
            fetchTags();
        }
    }, [blog]);

     const handleCategoryClick = async (categoryId) => {
        try {
            const res = await getAPI(`/get-blogs-by-category/${categoryId}?blogFor=Educator Zone`, {}, true);
            if (res.success || res.data?.success) {
                 const relatedBlogs = res.data?.data || [];
                 navigate("/community-connect/educator-zone/category-tag-related-blogs", {
                state: {
                    relatedBlogs,
                    categoryId
                }
            });
            }
        } catch (err) {
            toast.error("Failed to load related blogs");
        }
    };

      const handleTagsClick = async (tagId) => {
            try {
                const res = await getAPI(`/get-blogs-by-tag/${tagId}?blogFor=Educator Zone`, {}, true);
                if (res.success || res.data?.success) {
                     const relatedBlogs = res.data?.data || [];
                     navigate("/community-connect/educator-zone/category-tag-related-blogs", {
                    state: {
                        relatedBlogs,
                        tagId
                    }
                });
                }
            } catch (err) {
                toast.error("Failed to load related blogs");
            }
        };

    const fetchCategories = async () => {
        try {
            const response = await getAPI("/get-category", {}, true);
            console.log("Category API Response:", response);
            if (response.success || response.data?.success) {
                const options = (response.data?.data || []).map(category => ({
                    value: category._id,
                    label: category.categoryName
                }));
                setCategoryOptions(options);
                console.log("Formatted Category Options:", options);
            }
        } catch (err) {
            toast.error('Failed to fetch categories');
        }
    };

    const fetchTags = async () => {
        try {
            const response = await getAPI("/get-tags", {}, true);
            if (response.success || response.data?.success) {
                const options = (response.data?.data || []).map(tag => ({
                    value: tag._id,
                    label: tag.tagName
                }));
                setTagOptions(options);
                console.log("Tags loaded:", options);
            }
        } catch (err) {
            toast.error('Failed to fetch tags');
        }
    };

    if (!blog) return null;


    return (
        <>
            <Helmet>
                <title>{`${blog.blogTitle} | Blog`}</title>
                <meta name="description" content={blog.content} />
                <meta name="author" content={blog.authorName || 'User'} />
                <meta property="og:type" content="blog" />
                <meta property="og:title" content={blog.blogTitle} />
                <meta property="og:description" content={blog.content} />
                <meta property="og:url" content={window.location.href} />
                {blog.blogImage && (
                    <meta
                        property="og:image"
                        content={`${process.env.REACT_APP_API_URL_FOR_IMAGE}/${blog.featuredImage}`}
                    />
                )}
            </Helmet>

            <section className="wpo-page-title service-sub-page-title">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-breadcumb-wrap">
                                <h2>{blog.blogFor}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                {[1, 2, 3, 4].map(n => (
                    <div key={n} className={`shape-${n}`}>
                        <img src={`/assets/website-images/shape/${n}.svg`} alt="" />
                    </div>
                ))}
            </section>

            <section className="wpo-terms-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="wpo-terms-wrap">
                                {blog.featuredImage && (
                                    <div className="wpo-terms-img">
                                        <img
                                            src={process.env.REACT_APP_API_URL_FOR_IMAGE + blog.featuredImage}
                                            alt="Blog"
                                            style={{ width: '100%', borderRadius: '10px', maxHeight: '457px', objectFit: 'fill' }}
                                        />
                                    </div>
                                )}

                                <div className="entry-meta my-3">
                                    <ul style={{ listStyleType: "none" }} className='d-flex'>
                                        <li className='me-2 align-content-center'>
                                            <CiUser /> By {blog.authorName || 'Admin'}
                                        </li>
                                        <li className='me-2 align-content-center'>
                                            <FaRegCalendarAlt /> {new Date(blog.scheduledDate).toLocaleDateString()}
                                        </li>
                                    </ul>
                                </div>

                                <div className="wpo-terms-text pt-1">
                                    <h2 className="text-black fw-bold">{blog.blogTitle}</h2>

                                    <div className='flex-wrap'>
                                        <strong>Category : </strong>
                                        {blog.categories.map((catObj) => {

                                            const category = categoryOptions.find(
                                                (c) => String(c.value) === String(catObj._id)
                                            );
                                            console.log("Matched category:", category);

                                            return (
                                                <>

                                                    <span
                                                        key={catObj._id}
                                                        className="badge bg-primary text-white me-2"
                                                        onClick={() => handleCategoryClick(catObj._id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {category?.label || catObj.categoryName || "Unknown"}
                                                    </span>
                                                </>
                                            );
                                        })}
                                    </div>
                                    <div
                                        className="wpo-terms-text pt-2"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    />


                                    <div className='flex-wrap'>
                                        <strong>Tags : </strong>
                                        {blog.tags.map((tagObj) => {
                                            const tags = tagOptions.find(
                                                (c) => String(c.value) === String(tagObj._id)
                                            );
                                            console.log("Matched category:", tags);

                                            return (
                                                <span
                                                    key={tagObj._id}
                                                    className="badge bg-primary text-white me-2"
                                                    onClick={() => handleTagsClick(tagObj._id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {tags?.label || tagObj.tagName || "Unknown"}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EducatorZoneBlog;
