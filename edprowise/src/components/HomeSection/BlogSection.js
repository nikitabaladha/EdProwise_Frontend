import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    date: "25 Sep 2023",
    author: "Anne William",
    title: "The Surprising Reason College Tuition Is Crazy Expensive",
    image: "assets/website-images/blog/img-1.jpg",
    link: "blog-single.html",
  },
  {
    id: 2,
    date: "26 Sep 2023",
    author: "Robert Fox",
    title: "Become a great WordPress & PHP developer.",
    image: "assets/website-images/blog/img-2.jpg",
    link: "blog-single.html",
  },
  {
    id: 3,
    date: "28 Sep 2023",
    author: "Devon Lane",
    title: "A critical review of mobile learning integration",
    image: "assets/website-images/blog/img-3.jpg",
    link: "blog-single.html",
  },
];

const BlogItem = ({ date, author, title, image, link }) => (
  <div className="col col-lg-4 col-md-6 col-12 carousel-item-blog">
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
          <Link to="">{title}</Link>
        </h2>
        <Link to={link} className="more">
          Continue Reading
        </Link>
      </div>
    </div>
  </div>
);

const BlogSection = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".carousel-item-blog");
    const totalItems = items.length;
    let currentIndex = 0;
    const intervalTime = 4000;
    let autoplayInterval;

    // Update carousel position
    function updateCarousel() {
      carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    // Start autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(moveToNextSlide, intervalTime);
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth > 570) {
        stopAutoplay();
        carouselContainer.style.transform = "translateX(0)"; // Reset the carousel to the first item on larger screens
      } else {
        startAutoplay();
      }
    };

    // Initialize autoplay based on screen width
    if (window.innerWidth <= 570) {
      startAutoplay();
      updateCarousel();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="wpo-blog-section section-padding" id="blog">
      <div className="container">
        <div className="wpo-section-title-s2">
          <small className="font-family-web">Our Blogs</small>
          <h2 className="font-family-web">Our Latest News</h2>
        </div>
        <div className="wpo-blog-items">
          <div className="row-web row-blog" ref={carouselRef}>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
