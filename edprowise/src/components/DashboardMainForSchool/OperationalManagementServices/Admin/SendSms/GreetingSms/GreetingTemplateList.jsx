
// import React, { useState , useEffect} from "react";
// import CreatableSelect from "react-select/creatable";
// import TextareaAutosize from "react-textarea-autosize";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";
// const GreetingTemplateList = () => {
//   const navigate = useNavigate();
// const location = useLocation();
// const { schoolId, academicYear, role } = location.state || {};
//  const [schoolsId, setSchoolsId] = useState("");
//  const [roles, setRoles] = useState("");
// const [templates, setTemplates] = useState([]);
// const [selectedTexts, setSelectedTexts] = useState([]);

//   useEffect(() => {
//     if (schoolId && academicYear && role){
//       setSchoolsId(schoolId);
//       setRoles(role);
//       fetchTemplates();
//     }
//   }, [schoolId, academicYear, role]);
 
//   const fetchTemplates = async () => {
//     try {
//       const res = await getAPI(
//         `/get-greeting-template?schoolId=${schoolId}&academicYear=${academicYear}&role=${role}`
//       );

//       console.log("get greeting template",res);
      
//       if (!res.hasError) {
//         setTemplates(res.data.data || []);
//       } else {
//         toast.error(res.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load templates");
//     }
//   };

//   const handleTemplateChange = (selectedOption) => {
//     if (selectedOption) {
//       const foundTemplate = templates.find(
//         (t) => t.templateValue === selectedOption.value
//       );
//       if (foundTemplate) {
//         setSelectedTexts(foundTemplate.templateTexts);
//       }
//     } else {
//       setSelectedTexts([]);
//     }
//   };

//   const handleTextChange = (index, newValue) => {
//     const updated = [...selectedTexts];
//     updated[index] = newValue;
//     setSelectedTexts(updated);
//   };



// //   const templates = [
// //     {
// //       label: "Birthday Wishes",
// //       value: "birthday",
// //       texts: [
// //         `Happy Birthday, {employeeName}! 
// //  Wishing you a year filled with amazing adventures, exciting discoveries, and lots of laughter. 
// //  May your special day be as awesome as you are and your year ahead be full of success and happiness. 
// //  Keep reaching for the stars!
// //  Blessing from {school} !!!`,
// //         // `Wishing you a day full of happiness, {employeeName}! 🎈 Cheers from {school}.`,
// //       ],
// //     },
// //     {
// //       label: "Anniversary Wishes",
// //       value: "anniversary",
// //       texts: [
// //         `Happy Anniversary, {employeeName}! 
// //  Wishing you a year filled with amazing adventures, exciting discoveries, and lots of laughter. 
// //  May your special day be as awesome as you are and your year ahead be full of success and happiness. 
// //  Keep reaching for the stars!
// //  Blessing from {school} !!!`,
// //       ],
// //     },
// //     {
// //       label: "Congratulations",
// //       value: "congratulations",
// //       texts: [
// //         `Congratulations, {employeeName}! 🎊 Keep shining bright! - {school}`,
// //       ],
// //     },
// //     {
// //       label: "Best Wishes",
// //       value: "best_wishes",
// //       texts: [
// //         `Best wishes, {employeeName}! 🌟 May every step lead to success. - {school}`,
// //       ],
// //     },
// //   ];

//   // const [selectedTexts, setSelectedTexts] = useState([]);
//   const [templateTexts, setTemplateTexts] = useState({});

//   const navigateToCreate = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/send-sms/greeting-sms/templates/create`,
//       { state: { schoolsId, roles } }
//     );
//   };

//   // const handleTemplateChange = (selectedOption) => {
//   //   if (selectedOption) {
//   //     const foundTemplate = templates.find(
//   //       (t) => t.value === selectedOption.value
//   //     );
//   //     if (foundTemplate) {
//   //       setSelectedTexts(foundTemplate.texts); 
//   //     }
//   //   } else {
//   //     setSelectedTexts([]);
//   //   }
//   // };

//   // const handleTextChange = (index, newValue) => {
//   //   const updated = [...selectedTexts];
//   //   updated[index] = newValue;
//   //   setSelectedTexts(updated);
//   // };

//   const getTemplateText = (template, index) => {
//     console.log("template", template);
//     console.log("index", index);
//     if (
//       templateTexts[template.value] &&
//       templateTexts[template.value][index] !== undefined
//     ) {
//       console.log(
//         "templateTexts[template.value][index]",
//         templateTexts[template.value][index]
//       );
      
//       return templateTexts[template.value][index];
//     }
//     console.log("template.texts[index]", template.texts[index]);
//     return template.texts[index];
//   };
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Greeting SMS Templates
//                   </h4>
//                   <button
//                     onClick={(event) => navigateToCreate(event)}
//                     className="btn btn-sm btn-primary me-2"
//                   >
//                     Create
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-secondary"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>

//               <form className="mt-3">
//                 <div className="row">
//                   <div className="col-md-12 mb-3">
//                     <div className="d-flex col-md-12 flex-grow-1 align-items-center gap-2">
//                       <label className="fw-bold">
//                         Select Default Template :
//                       </label>
//                       {/* <CreatableSelect
//                         isClearable
//                         placeholder="Templates"
//                         options={templates.map((t) => ({
//                           label: t.label,
//                           value: t.value,
//                         }))}
//                         className="email-select border border-dark operational-creatableselect"
//                         onChange={handleTemplateChange}
//                       /> */}
//                       <CreatableSelect
//                         isClearable
//                         placeholder="Templates"
//                         options={templates.map((t) => ({
//                           label: t.templateLabel,
//                           value: t.templateValue,
//                         }))}
//                         onChange={handleTemplateChange}
//                         className="email-select border border-dark operational-creatableselect"
//                       />
//                     </div>
//                   </div>

//                   {
//                     //   selectedTexts.length >= 0 &&
//                     selectedTexts.map((text, index) => (
//                       <div className="col-md-12 mb-3" key={index}>
//                         <TextareaAutosize
//                           className="form-control"
//                           value={text}
//                           required
//                           // onChange={(e) =>
//                           //   handleTextChange(index, e.target.value)
//                           // }
//                           onChange={(e) =>
//                             handleTextChange(index, e.target.value)
//                           }
//                           minRows={4}
//                           maxRows={12}
//                         />
//                       </div>
//                     ))
//                   }
//                 </div>
//               </form>

//               {templates.map((template, templateIndex) => (
//                 <div key={template.value} id={`template-${template.value}`}>
//                   <h4 className="template-label mb-2 fw-bold">
//                     {template.label}
//                   </h4>

//                   {template.texts.map((text, textIndex) => (
//                     <div className="col-md-12 mb-3" key={textIndex}>
//                       <TextareaAutosize
//                         className="form-control"
//                         // value={getTemplateText(template, textIndex)}
//                         onChange={(e) =>
//                           handleTextChange(
//                             template.value,
//                             textIndex,
//                             e.target.value
//                           )
//                         }
//                         minRows={2}
//                         maxRows={12}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GreetingTemplateList;

// import React, { useState, useEffect } from "react";
// import CreatableSelect from "react-select/creatable";
// import TextareaAutosize from "react-textarea-autosize";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import getAPI from "../../../../../../api/getAPI";

// const GreetingTemplateList = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { schoolId, academicYear, role } = location.state || {};

//   const [schoolsId, setSchoolsId] = useState("");
//   const [roles, setRoles] = useState("");
//   const [templates, setTemplates] = useState([]);
//   const [selectedTexts, setSelectedTexts] = useState([]);

//   useEffect(() => {
//     if (schoolId && academicYear && role) {
//       setSchoolsId(schoolId);
//       setRoles(role);
//       fetchTemplates();
//     }
//   }, [schoolId, academicYear, role]);

//   const fetchTemplates = async () => {
//     try {
//       const res = await getAPI(
//         `/get-greeting-template?schoolId=${schoolId}&academicYear=${academicYear}&role=${role}`
//       );

//       console.log("get greeting template", res);

//       if (!res.hasError) {
//         setTemplates(res.data.data || []);
//       } else {
//         toast.error(res.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load templates");
//     }
//   };

//   const handleTemplateChange = (selectedOption) => {
//     if (selectedOption) {
//       const foundTemplate = templates.find(
//         (t) => t.templateValue === selectedOption.value
//       );
//       if (foundTemplate) {
//         setSelectedTexts(foundTemplate.templateTexts);
//       }
//     } else {
//       setSelectedTexts([]);
//     }
//   };

//   const handleTextChange = (index, newValue) => {
//     const updated = [...selectedTexts];
//     updated[index] = newValue;
//     setSelectedTexts(updated);
//   };

//   const navigateToCreate = (event) => {
//     event.preventDefault();
//     navigate(
//       `/school-dashboard/operational-service/send-sms/greeting-sms/templates/create`,
//       { state: { schoolsId, roles } }
//     );
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Greeting SMS Templates
//                   </h4>
//                   <button
//                     onClick={(event) => navigateToCreate(event)}
//                     className="btn btn-sm btn-primary me-2"
//                   >
//                     Create
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-secondary"
//                     onClick={() => navigate(-1)}
//                   >
//                     Back
//                   </button>
//                 </div>
//               </div>

//               <form className="mt-3">
//                 <div className="row">
//                   <div className="col-md-12 mb-3">
//                     <div className="d-flex col-md-12 flex-grow-1 align-items-center gap-2">
//                       <label className="fw-bold">
//                         Select Default Template :
//                       </label>

//                       <CreatableSelect
//                         isClearable
//                         placeholder="Templates"
//                         options={templates.map((t) => ({
//                           label: t.templateLabel,
//                           value: t.templateValue,
//                         }))}
//                         onChange={handleTemplateChange}
//                         className="email-select border border-dark operational-creatableselect"
//                       />
//                     </div>
//                   </div>

//                   {/* Show selected template texts if any */}
//                   {selectedTexts.length > 0 &&
//                     selectedTexts.map((text, index) => (
//                       <div className="col-md-12 mb-3" key={index}>
//                         <TextareaAutosize
//                           className="form-control"
//                           value={text}
//                           required
//                           onChange={(e) =>
//                             handleTextChange(index, e.target.value)
//                           }
//                           minRows={4}
//                           maxRows={12}
//                         />
//                       </div>
//                     ))}
//                 </div>
//               </form>

//               {/* Show all templates below for reference */}
//               <hr />

//               {templates.length > 0 ? (
//                 templates.map((template) => (
//                   <div
//                     key={template._id}
//                     // className="mb-4 p-3 border rounded shadow-sm"
//                   >
//                     <div className="d-flex">
//                       <h3 className="template-label mb-0 fw-bold">
//                         {template.templateLabel}
//                       </h3>

//                       {/* <button
//                         className="btn btn-sm btn-soft-danger btn-sm"
//                         // onClick={() => openDeleteDialog(row)}
//                       >
//                         <iconify-icon
//                           icon="solar:trash-bin-minimalistic-2-broken"
//                           className="align-middle fs-15"
//                         />
//                       </button> */}
//                     </div>
//                     {template.templateTexts.map((text, textIndex) => (
//                       <>
//                         <div className="d-flex justify-content-end py-1">
//                           <button
//                             className="btn btn-sm btn-soft-danger btn-sm"
//                             // onClick={() => openDeleteDialog(row)}
//                           >
//                             <iconify-icon
//                               icon="solar:trash-bin-minimalistic-2-broken"
//                               className="align-middle fs-15"
//                             />
//                           </button>
//                         </div>
//                         <div className="col-md-12 mb-3" key={textIndex}>
//                           <TextareaAutosize
//                             className="form-control"
//                             value={text}
//                             readOnly
//                             minRows={2}
//                             maxRows={12}
//                           />
//                         </div>
//                       </>
//                     ))}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-muted">
//                   No templates found for this role.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GreetingTemplateList;

import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import TextareaAutosize from "react-textarea-autosize";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAPI from "../../../../../../api/getAPI";
import ConfirmationDialog from "../../../../../ConfirmationDialog";
const GreetingTemplateList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId, academicYear, role } = location.state || {};

  const [schoolsId, setSchoolsId] = useState("");
  const [roles, setRoles] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTexts, setSelectedTexts] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  useEffect(() => {
    if (schoolId && academicYear && role) {
      setSchoolsId(schoolId);
      setRoles(role);
      fetchTemplates();
    }
  }, [schoolId, academicYear, role]);

  const fetchTemplates = async () => {
    try {
      const res = await getAPI(
        `/get-greeting-template?schoolId=${schoolId}&academicYear=${academicYear}&role=${role}`
      );

      console.log("get greeting template", res);

      if (!res.hasError) {
        setTemplates(res.data.data || []);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load templates");
    }
  };

  // Normalize possible shapes to a string of HTML
  const getHtmlString = (maybe) => {
    if (!maybe && maybe !== "") return "";
    if (typeof maybe === "string") return maybe;
    if (typeof maybe === "object") {
      // common server shape: { _id, text }
      if ("text" in maybe) return maybe.text || "";
      if ("html" in maybe) return maybe.html || "";
      // fallback: if value is actually an array or object, stringify minimally
      return String(maybe);
    }
    return String(maybe);
  };

  // const stripHtml = (html) => {
  //   if (!html) return "";

  //   let cleanHtml = html
  //     .replace(/<br\s*\/?>/gi, "\n")
  //     .replace(/<\/p>\s*<p>/gi, "\n")
  //     .replace(/<p>/gi, "")
  //     .replace(/<\/p>/gi, "\n");

  //   const doc = new DOMParser().parseFromString(cleanHtml, "text/html");
  //   return doc.body.textContent || "";
  // };

  // Convert HTML string -> plain text while preserving line breaks
  const stripHtml = (htmlLike) => {
    const html = getHtmlString(htmlLike);
    if (!html) return "";

    // Turn common block/line tags into newlines before parsing
    const cleanHtml = html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p>/gi, "\n")
      .replace(/<\/div>\s*<div>/gi, "\n")
      .replace(/<li>/gi, "\n• ") // optional: mark list items
      .replace(/<p[^>]*>/gi, "")
      .replace(/<\/p>/gi, "\n")
      .replace(/<div[^>]*>/gi, "")
      .replace(/<\/div>/gi, "\n");

    // Parse and return textContent (browser DOMParser)
    try {
      const doc = new DOMParser().parseFromString(cleanHtml, "text/html");
      // Collapse multiple consecutive newlines to max 2 (keeps paragraph spacing)
      return (doc.body.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
    } catch (err) {
      // Fallback: remove tags naively
      return cleanHtml
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    }
  };
  
  const handleTemplateChange = (selectedOption) => {
    if (selectedOption) {
      const foundTemplate = templates.find(
        (t) => t.templateValue === selectedOption.value
      );
      if (foundTemplate) {
        // convert each HTML string to plain text
        const plainTexts = foundTemplate.templateTexts.map((html) =>
          stripHtml(html)
        );
        setSelectedTexts(plainTexts);
      }
    } else {
      setSelectedTexts([]);
    }
  };

  const handleTextChange = (index, newValue) => {
    const updated = [...selectedTexts];
    updated[index] = newValue;
    setSelectedTexts(updated);
  };

  const navigateToCreate = (event) => {
    event.preventDefault();
    navigate(
      `/school-dashboard/operational-service/send-sms/greeting-sms/templates/create`,
      { state: { schoolsId, roles } }
    );
  };
  const openDeleteDialog = (record) => {
    setSelectedRecord(record);
    console.log("record delete", record);

    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRecord(null);
  };
  const handleDeleteConfirmed = async () => {
    fetchTemplates();
    handleDeleteCancel();
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
                    Greeting SMS Templates
                  </h4>
                  <button
                    onClick={(event) => navigateToCreate(event)}
                    className="btn btn-sm btn-primary me-2"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
              </div>

              <form className="mt-3">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="d-flex col-md-12 flex-grow-1 align-items-center gap-2">
                      <label className="fw-bold">
                        Select Default Template :
                      </label>

                      <CreatableSelect
                        isClearable
                        placeholder="Templates"
                        options={templates.map((t) => ({
                          label: t.templateLabel,
                          value: t.templateValue,
                        }))}
                        onChange={handleTemplateChange}
                        className="email-select border border-dark operational-creatableselect"
                      />
                    </div>
                  </div>

                  {/* Show selected template texts if any */}
                  {selectedTexts.length > 0 &&
                    selectedTexts.map((text, index) => (
                      <div className="col-md-12 mb-3" key={index}>
                        <TextareaAutosize
                          className="form-control"
                          value={text}
                          required
                          onChange={(e) =>
                            handleTextChange(index, e.target.value)
                          }
                          minRows={4}
                          maxRows={12}
                        />
                      </div>
                    ))}
                </div>
              </form>

              {/* Show all templates below for reference */}
              <hr />

              {templates.length > 0 ? (
                templates.map((template) => (
                  <div key={template._id}>
                    <div className="d-flex">
                      <h3 className="template-label mb-0 fw-bold">
                        {template.templateLabel} {template._id}
                      </h3>
                    </div>
                    {template.templateTexts.map((html, textIndex) => (
                      <React.Fragment key={html._id}>
                        <div className="d-flex justify-content-end py-1">
                          <button
                            className="btn btn-sm btn-soft-danger btn-sm"
                            onClick={() => openDeleteDialog(html)}
                          >
                            <iconify-icon
                              icon="solar:trash-bin-minimalistic-2-broken"
                              className="align-middle fs-15"
                            />
                          </button>
                        </div>
                        <div className="col-md-12 mb-3">
                          <TextareaAutosize
                            className="form-control"
                            value={stripHtml(html.text)} // strip HTML here too
                            readOnly
                            minRows={2}
                            maxRows={12}
                          />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">
                  No templates found for this role.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && selectedRecord && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="greetingTemplate"
          id={selectedRecord._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default GreetingTemplateList;
