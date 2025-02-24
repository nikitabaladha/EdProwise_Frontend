import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    date: "25 Sep 2023",
    author: "Anne William",
    title: "The Surprising Reason College Tuition Is Crazy Expensive",
    image: "assets/website-images/blog/img-1.webp",
    link: "blog-single.html",
  },
  {
    id: 2,
    date: "26 Sep 2023",
    author: "Robert Fox",
    title: "Become a great WordPress & PHP developer.",
    image: "assets/website-images/blog/img-2.webp",
    link: "blog-single.html",
  },
  {
    id: 3,
    date: "28 Sep 2023",
    author: "Devon Lane",
    title: "A critical review of mobile learning integration",
    image: "assets/website-images/blog/img-3.webp",
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

    // Determine slide width based on screen size
    const getSlideWidthPercentage = () => {
      if (window.innerWidth <= 767) {
        return 100; // Full width for very small screens
      } else if (window.innerWidth <= 991) {
        return 50; // Half width for medium screens
      }
      return 0; // Default for larger screens (no sliding)
    };

    // Update carousel position
    function updateCarousel() {
      const slideWidthPercentage = getSlideWidthPercentage();
      carouselContainer.style.transition = "transform 0.5s ease-in-out";
      carouselContainer.style.transform = `translateX(-${
        (currentIndex + 1) * slideWidthPercentage
      }%)`;
    }

    // Move to the next slide
    function moveToNextSlide() {
      currentIndex += 1;
      updateCarousel();

      // Reset position for infinite loop
      setTimeout(() => {
        if (currentIndex >= totalItems) {
          carouselContainer.style.transition = "none";
          currentIndex = 0;
          updateCarousel();
        }
      }, 500); // Match transition duration
    }

    // Start autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(moveToNextSlide, intervalTime);
    }

    // Stop autoplay
    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Clone the first and last slides for smaller screens
    const cloneSlides = () => {
      const firstSlide = items[0].cloneNode(true);
      const lastSlide = items[totalItems - 1].cloneNode(true);
      carouselContainer.appendChild(firstSlide);
      carouselContainer.insertBefore(lastSlide, items[0]);
    };

    // Remove cloned slides
    const removeClonedSlides = () => {
      const clonedSlides = carouselContainer.querySelectorAll(
        ".carousel-item-blog"
      );
      if (clonedSlides.length > totalItems) {
        clonedSlides.forEach((slide, index) => {
          if (index === 0 || index === clonedSlides.length - 1) {
            slide.remove();
          }
        });
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth > 992) {
        stopAutoplay();
        removeClonedSlides();
        carouselContainer.style.transition = "none";
        carouselContainer.style.transform = "translateX(0)"; // Reset to the first item
        currentIndex = 0; // Reset index
      } else {
        startAutoplay();
        updateCarousel();
        if (carouselContainer.children.length === totalItems) {
          cloneSlides();
        }
      }
    };

    // Initialize autoplay for smaller screens
    if (window.innerWidth <= 991) {
      startAutoplay();
      updateCarousel();
      cloneSlides();
    }

    // Set initial position to the first clone
    carouselContainer.style.transition = "none";
    carouselContainer.style.transform = `translateX(-${getSlideWidthPercentage()}%)`;

    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoplay();
      removeClonedSlides();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="wpo-blog-section section-padding pt-0 pb-1" id="blog"  style={{ background: "#fcf9ef" }}>
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
