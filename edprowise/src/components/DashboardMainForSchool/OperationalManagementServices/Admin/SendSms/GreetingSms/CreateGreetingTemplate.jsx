
// import React, { useState, useEffect } from "react";
// import CreatableSelect from "react-select/creatable";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const CreateGreetingTemplate = () => {
//   const navigate = useNavigate()
//   const location = useLocation();
//   const { schoolsId, roles } = location.state || {};
//   //  const [schoolsId, setSchoolsId] = useState("");
//   //  const [roles, setRoles] = useState("");
  
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Create Greeting SMS Templates
//                   </h4>
//                   <button
//                     type="button"
//                     className="btn btn-primary custom-submit-button"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>

//               <form className="mt-3">
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <div className="mb-6">
//                       <label htmlFor="templateLabel" className="form-label">
//                         Template Label <span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         id="templateLabel"
//                         name="templateLabel"
//                         className="form-control"
//                         placeholder="Enter Template Label"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-7">
//                     <div className="mb-3">
//                       <ReactQuill
//                         theme="snow"
//                         className="bg-white"
//                         style={{ height: "200px" }}
//                       />
//                     </div>
//                   </div>

//                   <div className="col-md-5">
//                     <div className="table-responsive">
//                       <table className="table align-middle mb-0 table-hover table-centered text-center">
//                         <thead className="bg-light-subtle">
//                           <tr className="">
//                             <th className="text-nowrap">Tag </th>
//                             <th className="text-nowrap">Description</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td className="text-start">{"{schoolName}"}</td>
//                             <td>School Name</td>
//                           </tr>
//                           <tr>
//                             <td className="text-start">{"{employeeName}"}</td>
//                             <td>Name of the Employee</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//               <div className="d-flex justify-content-end mt-3">
//                 <button
//                   type="submit"
//                   className="btn btn-primary custom-submit-button"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateGreetingTemplate;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import postAPI from "../../../../../../api/postAPI";
const CreateGreetingTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolsId, roles } = location.state || {};

  // -------------------- STATES --------------------
  const [templateLabel, setTemplateLabel] = useState("");
  const [templateValue, setTemplateValue] = useState("");
  const [templateText, setTemplateText] = useState(""); 
  const [loading, setLoading] = useState(false);

  // -------------------- ROLE-BASED TAGS --------------------
  const studentTags = [
    { tag: "{schoolName}", description: "School Name" },
    { tag: "{firstName}", description: "First Name of the Student" },
    { tag: "{middleName}", description: "Parent Name of the Student" },
    { tag: "{lastName}", description: "Surname of the Student" },
    {
      tag: "{AdmissionNumber}",
      description: "Admission No. of the Student",
    },
    { tag: "{className}", description: "Class of the Student" },
    { tag: "{sectionName}", description: "Section of the Student" },
    { tag: "{dateOfBirth}", description: "Date of Birth of Student" },
  ];

  const employeeTags = [
    { tag: "{schoolName}", description: "School Name" },
    { tag: "{employeeName}", description: "Name of the Employee" },
    { tag: "{designation}", description: "Designation" },
    { tag: "{dateOfBirth}", description: "Date of Birth of Employee" },
  ];

  const roleTags = roles === "Student" ? studentTags : employeeTags;

  // -------------------- SAVE HANDLER --------------------
  const handleSave = async (e) => {
    e.preventDefault();

    if (!templateLabel.trim()) {
      toast.error("Template Label is required");
      return;
    }
    if (!templateText.trim()) {
      toast.error("Template Text is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        schoolId: schoolsId,
        academicYear: localStorage.getItem("selectedAcademicYear"),
        role: roles,
        templateLabel,
        templateValue: templateLabel, 
        // templateValue: templateLabel.toLowerCase().replace(/\s+/g, "_"), 
        templateTexts: [templateText], 
      };

      const res = await postAPI("/create-greeting-template", payload, {}, true);

      if (res?.hasError) {
        toast.error(res.message || "Failed to create template");
      } else {
        toast.success(res.message || "Template created successfully");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Create Greeting SMS Template ({roles})
                  </h4>
                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              <form className="mt-3" onSubmit={handleSave}>
                {/* Template Label */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="templateLabel" className="form-label">
                      Template Label <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="templateLabel"
                      name="templateLabel"
                      className="form-control"
                      placeholder="Enter Template Label"
                      value={templateLabel}
                      onChange={(e) => setTemplateLabel(e.target.value)}
                    />
                  </div>
                </div>

                {/* Template Editor + Tags */}
                <div className="row">
                  <div className="col-md-7">
                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Template Message <span className="text-danger">*</span>
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={templateText}
                        onChange={setTemplateText}
                        className="bg-white"
                        style={{ height: "200px" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table align-middle mb-0 table-hover table-centered text-center">
                        <thead className="bg-light-subtle">
                          <tr>
                            <th className="text-nowrap">Tag</th>
                            <th className="text-nowrap">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {roleTags.map((tagItem, index) => (
                            <tr key={index}>
                              <td className="text-start">{tagItem.tag}</td>
                              <td>{tagItem.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGreetingTemplate;
