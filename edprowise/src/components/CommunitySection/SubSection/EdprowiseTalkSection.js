import React from "react";

const EdprowiseTalkSection = () => {
  
  const handleVideoClick = (e) => {
    e.preventDefault();
    const videoUrl = e.currentTarget.getAttribute("href");
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <section className="wpo-choose-section-s2 section-padding pt-3 pb-3 "  style={{ background: "white" }}>
    <div className="container edprowise-choose-container">
      {/* <div className="row"  >
        <div className="col-12">
          <div className="wpo-section-title-s2">
            <h2 className="font-family-web">Edprowise Talk</h2>
          </div>
        </div>
      </div> */}
      <div className="right-img mb-0 ">
        <img src="/assets/website-images/choose2.webp" alt="Choose Us" />
        <a
          href="https://www.youtube.com/embed/r5sw-6lJmTA?autoplay=1"
          className="video-btn"
          onClick={handleVideoClick}
        >
          <i className="fi flaticon-play-1"></i>
        </a>
      </div>
      
    </div>
  </section>
  );
};

export default EdprowiseTalkSection;
