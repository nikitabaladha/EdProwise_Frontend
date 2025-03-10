import React, { useEffect, useRef, useState } from "react";
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
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    const carouselContainer = carouselRef.current;
    const items = carouselContainer.querySelectorAll(".carousel-item-blog");
    const totalItems = items.length;
    let currentIndex = 1; // Start at the first real item
    const intervalTime = 4000; // Time between slides in milliseconds
    let autoplayInterval;

    // Clone first and last items for infinite loop effect
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);

    // Add clones to the DOM for mobile view
    if (isMobile) {
      carouselContainer.appendChild(firstClone);
      carouselContainer.insertBefore(lastClone, items[0]);
    }

    // Update carousel position
    function updateCarousel() {
      const itemWidth = items[0].offsetWidth;
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        currentIndex * itemWidth
      }px)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      const itemWidth = items[0].offsetWidth;
      currentIndex++;
      updateCarousel();

      if (currentIndex === totalItems + 1) {
        // Reset to the first real item
        setTimeout(() => {
          carouselContainer.style.transition = "none";
          currentIndex = 1;
          carouselContainer.style.transform = `translateX(-${
            currentIndex * itemWidth
          }px)`;
        }, 500); // Match transition duration
      }
    }

    // Start autoplay only for mobile
    function startAutoplay() {
      if (isMobile) {
        autoplayInterval = setInterval(moveToNextSlide, intervalTime);
      }
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    // Initialize autoplay if mobile
    if (isMobile) {
      startAutoplay();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <section className="wpo-blog-section section-padding pt-0 pb-1" id="blog" style={{ background: "#fcf9ef" }}>
      <div className="container edprowise-choose-container">
        <div className="wpo-section-title-s2 mb-2">
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