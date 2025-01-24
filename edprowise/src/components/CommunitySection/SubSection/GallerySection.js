import React from "react";

const GallerySection = () => {
  const portfolioItems = [
    { id: 1, image: "/assets/website-images/portfolio/1.jpg" },
    { id: 2, image: "/assets/website-images/portfolio/2.jpg" },
    { id: 3, image: "/assets/website-images/portfolio/3.jpg" },
    { id: 4, image: "/assets/website-images/portfolio/5.jpg" },
    { id: 5, image: "/assets/website-images/portfolio/4.jpg" },
    { id: 6, image: "/assets/website-images/portfolio/6.jpg" },
    { id: 7, image: "/assets/website-images/portfolio/7.jpg" },
    { id: 8, image: "/assets/website-images/portfolio/8.jpg" },
  ];

  return (
    <section className="wpo-portfolio-section section-padding">
      <h2 className="hidden">hidden</h2>
      <div className="container">
        <div className="sortable-gallery">
          <div className="gallery-filters"></div>
          <div className="row">
            <div className="col-lg-12">
              <div className="portfolio-grids gallery-container clearfix">
                {portfolioItems.map((item) => (
                  <div className="grid" key={item.id}>
                    <div className="img-holder">
                      <a
                        href={item.image}
                        className="fancybox"
                        data-fancybox-group="gall-1"
                      >
                        <img
                          src={item.image}
                          alt="Portfolio"
                          className="img img-responsive"
                        />
                        <div className="hover-content">
                          <i className="ti-plus"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
