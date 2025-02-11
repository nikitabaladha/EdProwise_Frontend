import React from 'react'
const coursesData = [
    { id: 1, title: "",description:"", classid: 1 },
    { id: 2, title: "",description:"", classid: 2 },
    { id: 3, title: "",description:"", classid: 3 },
    { id: 4, title: "",description:"", classid: 4 },
    { id: 5, title: "",description:"", classid: 5 },
  ];
const WhatWeSolveSchoolOps= () => {
  return (
    <div className="row-web wpo-courses-wrap service-row">
      {coursesData.map((course) => (
         <div className={`category-items col-lg-3 col-md-6 col-6 grid-web s${course.classid}`}>
         <div className="wpo-courses-item category-itemm">
           <div className="wpo-courses-text" >
             {/* <div className="courses-icon category-icons">{icon}</div> */}
             <h2 className="category-h2 font-weight-web-h2">
               <a >{course.title}</a>
             </h2>
           </div>
           <p className="all-info">
             {course.description}
           </p>
         </div>
       </div>
      ))}
    </div>
  )
}

export default WhatWeSolveSchoolOps;
