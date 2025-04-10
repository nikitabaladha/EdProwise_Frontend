import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    date: "25 Sep 2023",
    author: "Anne William",
    title: "The Surprising Reason College Tuition Is Crazy Expensive",
    image: "assets/website-images/blog/img-1.webp",
    link: "/blog/1",
  },
  {
    id: 2,
    date: "26 Sep 2023",
    author: "Robert Fox",
    title: "Become a great WordPress & PHP developer.",
    image: "assets/website-images/blog/img-2.webp",
    link: "/blog/2",
  },
  {
    id: 3,
    date: "28 Sep 2023",
    author: "Devon Lane",
    title: "A critical review of mobile learning integration",
    image: "assets/website-images/blog/img-3.webp",
    link: "/blog/3",
  },
];

const BlogItem = ({ date, author, title, image, link }) => (
  <div className="carousel-item-blog">
    <div className="wpo-blog-item">
      <div className="wpo-blog-img">
        <img src={image} alt={title} />
      </div>
      <div className="wpo-blog-content">
        <ul>
          <li>{date}</li>
          <li>
            By <Link to={link}>{author}</Link>
          </li>
        </ul>
        <h2 className="font-weight-web-h2">
          <Link to={link}>{title}</Link>
        </h2>
        <Link to={link} className="more">
          Continue Reading
        </Link>
      </div>
    </div>
  </div>
);

const BlogSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

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
        infinite: false, // No looping
        autoplay: false, // Disable autoplay
        slidesToShow: 3, // Show 3 items
        slidesToScroll: 1, // Keep it consistent
        arrows: false, // Hide arrows
        dots: false, // Hide dots
      };

  return (
    <section
      className="wpo-blog-section section-padding pt-0 pb-1"
      id="blog"
      style={{background:"#fafaff",boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px"}}
    >
      <div className="container edprowise-choose-container">
        <div className="wpo-section-title-s2 mb-2">
          <h2 className="font-family-web">Our Latest News</h2>
        </div>
        <div className="wpo-blog-items">
          <Slider {...settings}>
            {blogPosts.map((post) => (
              <BlogItem
                key={post.id}
                date={post.date}
                author={post.author}
                title={post.title}
                image={post.image}
                link={post.link}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
