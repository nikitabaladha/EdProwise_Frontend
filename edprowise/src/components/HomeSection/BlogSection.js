import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import getAPI from "../../api/getAPI";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await getAPI(`/get-all-blogs-for-home`, {}, true);
        console.log("Full API response:", result);

        if (result?.data?.success && result?.data?.data) {
          console.log("Fetched blogs:", result.data.data);
          setBlogs(result.data.data);
        } else {
          toast.warn("Blog details not found");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = isMobile
    ? {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              swipe: true,
              touchMove: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      }
    : {
        infinite: false,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      };

  const getBlogRoute = (blog) => {
    if (blog.blogFor === "Educator Zone" && blog.blogSlug) {
      return `/community-connect/educator-zone/${blog.blogSlug}`;
    } else if (blog.blogFor === "Student Zone" && blog.blogSlug) {
      return `/community-connect/student-zone/${blog.blogSlug}`;
    } else {
      // Fallback route if no slug or unknown blogFor
      return `/blog/${blog._id}`;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-4">
        <h2>Latest Blogs</h2>
        <p>No blog content available.</p>
      </div>
    );
  }

  // Display only first 3 blogs
  const recentBlogs = blogs.slice(0, 3);

  const BlogItem = ({ blog }) => {
    const blogRoute = getBlogRoute(blog);

    return (
      <div className="carousel-item-blog">
        <Link
          to={blogRoute}
          state={{ blog }} // Pass the blog data via state
        >
          <div className="wpo-blog-item">
            <div className="wpo-blog-img">
              <img
                src={
                  blog.featuredImage
                    ? process.env.REACT_APP_API_URL_FOR_IMAGE +
                      blog.featuredImage
                    : "/assets/website-images/blog/default-blog.jpg"
                }
                alt={blog.blogTitle || "Blog Image"}
              />
            </div>
            <div className="wpo-blog-content">
              <h2 className="font-weight-web-h2">
                <Link to={blogRoute} state={{ blog }}>
                  {blog.blogTitle || "Untitled Blog"}
                </Link>
              </h2>
              <Link to={blogRoute} state={{ blog }} className="more">
                Continue Reading
              </Link>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section
      className="wpo-blog-section section-padding section-background-box-shadow pt-2 pb-0"
      id="blog"
    >
      <div className="container edprowise-choose-container">
        <div className="wpo-section-title-s2 mb-2">
          <h2 className="font-family-web">Our Latest News & Articles</h2>
        </div>
        <div className="wpo-blog-items">
          <Slider {...settings}>
            {recentBlogs.map((blog) => (
              <BlogItem key={blog._id} blog={blog} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
