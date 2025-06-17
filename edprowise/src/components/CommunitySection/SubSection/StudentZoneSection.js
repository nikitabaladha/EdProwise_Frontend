// import React from "react";
// import { Link, useLocation, } from "react-router-dom";

// const StudentZoneSection = () => {
//   const blogPosts = [
//     {
//       date: "25 Sep 2023",
//       author: "Anne William",
//       title: "Proposed Exam Reforms by CBSE: A Step Towards Reducing Academic Stress and Improving Learning Outcomes",
//       image: "/assets/website-images/blog-details/CBSE-exam-reform.jpg",
//       link: "/community-connect/student-zone/proposed-exam-reforms-by-cbse"
//     },
//     {
//       date: "26 Sep 2023",
//       author: "Robert Fox",
//       title: "How to Be Successful in the CBSE Board Exam: Tips and Strategies for Students",
//       image: "/assets/website-images/blog-details/howtosuccessfulstudent.jpg",
//       link: "/community-connect/student-zone/how-to-be-successful-in-the-cbse-board-exam"
//     },
    
//   ];

//   return (
//     <section className="wpo-blog-section section-padding pt-lg-3 pb-lg-2 pt-mb-2 pb-mb-1" id="blog">
//       <div className="container edprowise-choose-container">
//         <div className="wpo-blog-items">
//           <div className="row-web">
//             {blogPosts.map((post, index) => (

//               <div key={index} className="col col-lg-4 col-md-6 col-6 ">
//                 <Link to={post.link}>
//                   <div className="wpo-blog-item mb-lg-3 blog-item-custom">
//                     <div className="wpo-blog-img">
//                       <img src={post.image} alt={post.title} />
//                     </div>
//                     <div className="wpo-blog-content">
                     
//                       <h2 className="font-weight-web-h2">
//                         <a >{post.title}</a>
//                       </h2>
//                       <Link to={post.link} className="more">
//                         Continue Reading
//                       </Link>
//                     </div>
//                   </div>
//                 </Link>
//               </div>

//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StudentZoneSection;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAPI from "../../../api/getAPI"; 
import { toast } from "react-toastify";

const StudentZoneSection = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAPI("/get-student-blogs");
      setBlogs(response.data.data || []);
      console.log(response.data.data);
      
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
  };

  const navigateToView = (event,blog) => {
        event.preventDefault();
        navigate(`/community-connect/student-zone/${blog.blogSlug}`, { state: { blog } });
    };
// community-connect/student-zone/:slug
  return (
    <section className="wpo-blog-section section-padding pt-lg-3 pb-lg-2 pt-mb-2 pb-mb-1" id="blog">
      <div className="container edprowise-choose-container">
        <div className="wpo-blog-items">
          <div className="row-web">
            {blogs.map((blog, index) => (
              <div key={index} className="col col-lg-4 col-md-6 col-12 " >
                <Link  onClick={(event) => navigateToView(event, blog)}>
                  <div className="wpo-blog-item mb-lg-3 blog-item-custom">
                    <div className="wpo-blog-img">
                      <img
                        src={process.env.REACT_APP_API_URL_FOR_IMAGE + blog.featuredImage}
                        alt={blog.blogTitle}
                         style={{ width: '100%', borderRadius: '10px', maxHeight: '269px', objectFit: 'fill' }}
                      />
                    </div>
                    <div className="wpo-blog-content">
                      <h2 className="font-weight-web-h2">
                        <a>{blog.excerpt}</a>
                      </h2>
                      <Link className="more" onClick={(event) => navigateToView(event, blog)} >
                        Continue Reading
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentZoneSection;
