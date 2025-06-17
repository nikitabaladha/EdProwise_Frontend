import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CommonHeader from "../../CommonHeader";

const EducatorCategoryAndTagRelatedBlog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const stateData = location.state;
        if (stateData?.relatedBlogs?.length) {
            setBlogs(stateData.relatedBlogs);
        } else {
            toast.error("No related blogs to show.");
        }
        console.log("the blog for category",blogs);
        
    }, [location.state]);

    const navigateToView = (event, blog) => {
        event.preventDefault();
        navigate(`/community-connect/educator-zone/${blog.blogSlug}`, {
            state: { blog }
        });
    };

    return (
        <>
        <CommonHeader/>
        <section className="wpo-blog-section section-padding pt-lg-3 pb-lg-2 pt-mb-2 pb-mb-1" id="blog">
            <div className="container edprowise-choose-container">
                <div className="wpo-blog-items">
                    <div className="row-web">
                        {blogs.length > 0 ? (
                            blogs.map((blog, index) => (
                                <div key={index} className="col col-lg-4 col-md-6 col-12">
                                    <Link onClick={(event) => navigateToView(event, blog)}>
                                        <div className="wpo-blog-item mb-lg-3 blog-item-custom">
                                            <div className="wpo-blog-img">
                                                <img
                                                    src={process.env.REACT_APP_API_URL_FOR_IMAGE + blog.featuredImage}
                                                    alt={blog.blogTitle}
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: '10px',
                                                        maxHeight: '269px',
                                                        objectFit: 'fill'
                                                    }}
                                                />
                                            </div>
                                            <div className="wpo-blog-content">
                                                <h2 className="font-weight-web-h2">
                                                    <a>{blog.excerpt}</a>
                                                </h2>
                                                <Link
                                                    className="more"
                                                    onClick={(event) => navigateToView(event, blog)}
                                                >
                                                    Continue Reading
                                                </Link>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4">
                                <h4>No related blogs available.</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default EducatorCategoryAndTagRelatedBlog;
