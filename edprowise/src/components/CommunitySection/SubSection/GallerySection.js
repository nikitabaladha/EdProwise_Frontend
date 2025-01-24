// import React from "react";

// const GallerySection = () => {
//   const portfolioItems = [
//     { id: 1, image: "/assets/website-images/portfolio/1.jpg" },
//     { id: 2, image: "/assets/website-images/portfolio/2.jpg" },
//     { id: 3, image: "/assets/website-images/portfolio/3.jpg" },
//     { id: 4, image: "/assets/website-images/portfolio/5.jpg" },
//     { id: 5, image: "/assets/website-images/portfolio/4.jpg" },
//     { id: 6, image: "/assets/website-images/portfolio/6.jpg" },
//     { id: 7, image: "/assets/website-images/portfolio/7.jpg" },
//     { id: 8, image: "/assets/website-images/portfolio/8.jpg" },
//   ];

//   return (
//     <section className="wpo-portfolio-section section-padding">
//       <h2 className="hidden">hidden</h2>
//       <div className="container">
//         <div className="sortable-gallery">
//           <div className="gallery-filters"></div>
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="portfolio-grids gallery-container clearfix">
//                 {portfolioItems.map((item) => (
//                   <div className="grid" key={item.id}>
//                     <div className="img-holder">
//                       <a
//                         href={item.image}
//                         className="fancybox"
//                         data-fancybox-group="gall-1"
//                       >
//                         <img
//                           src={item.image}
//                           alt="Portfolio"
//                           className="img img-responsive"
//                         />
//                         <div className="hover-content">
//                           <i className="ti-plus"></i>
//                         </div>
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GallerySection;

import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox-plus-jquery.js";

const GallerySection = () => {
  const [shuffledItems, setShuffledItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

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

  // Function to shuffle the images
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    // Shuffle the portfolio items when the component mounts
    setShuffledItems(shuffleArray([...portfolioItems]));
  }, []);

  // Handle image click to show in the modal
  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <section className="wpo-portfolio-section section-padding">
      <h2 className="hidden">hidden</h2>
      <div className="container">
        <div className="sortable-gallery">
          <div className="gallery-filters"></div>
          <div className="row">
            <div className="col-lg-12">
              <div className="portfolio-grids gallery-container clearfix">
                {shuffledItems.map((item) => (
                  <div className="grid-web" key={item.id}>
                    <div className="img-holder-web">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleImageClick(item.image);
                        }}
                        className="fancybox"
                        data-fancybox-group="gall-1"
                      >
                        <img
                          src={item.image}
                          alt="Portfolio"
                          className="img img-responsive"
                        />
                        <div className="hover-content hover-content-web">
                          <FaPlus />
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

      {/* Modal Popup */}
      {showModal && (
        <div className="image-modal">
          <div className="modal-content">
            <img src={modalImage} alt="Modal" className="modal-image" />
            <div className="modal-close" onClick={closeModal}>
              <IoMdCloseCircle />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
