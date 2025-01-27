import React from "react";

const EdprowiseTalkSection = () => {
  const blogPosts = [
    {
      date: "25 Sep 2023",
      author: "Anne William",
      title: "The Surprising Reason College Tuition Is Crazy Expensive",
      image: "/assets/website-images/blog/img-1.webp",
      link: "blog-single.html",
    },
    {
      date: "26 Sep 2023",
      author: "Robert Fox",
      title: "Become a great WordPress & PHP developer.",
      image: "/assets/website-images/blog/img-2.webp",
      link: "blog-single.html",
    },
    {
      date: "28 Sep 2023",
      author: "Devon Lane",
      title: "A critical review of mobile learning integration",
      image: "/assets/website-images/blog/img-3.webp",
      link: "blog-single.html",
    },
  ];

  return (
    <div className="row">
      {blogPosts.map((post, index) => (
        <div key={index} className="col col-lg-4 col-md-6 col-6">
          <div className="wpo-blog-item">
            <div className="wpo-blog-img">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="wpo-blog-content">
              <ul>
                <li>{post.date}</li>
                <li>
                  By <a href={post.link}>{post.author}</a>
                </li>
              </ul>
              <h2>
                <a href="blog.html">{post.title}</a>
              </h2>
              <a href={post.link} className="more">
                Continue Reading
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EdprowiseTalkSection;
