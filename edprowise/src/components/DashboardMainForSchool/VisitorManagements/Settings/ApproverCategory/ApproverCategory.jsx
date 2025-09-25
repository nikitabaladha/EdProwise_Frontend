// import React from 'react'
// import { Link } from 'react-router-dom';
// const ApproverCategory = () => {
//   return (
//     <div className="container-fluid">
//       <div className="d-flex justify-content-end me-3 mb-2 gap-2 align-items-center"></div>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card m-2">
//             <div className="card-body custom-heading-padding">
//               <div className="container">
//                 <div className="card-header d-flex flex-wrap align-items-center">
//                   <h4 className="card-title flex-grow-1 text-center">
//                     Approver Category
//                   </h4>
//                   <Link
//                     // onClick={(event) => navigateToAddVisitor(event)}
//                     className="btn btn-sm btn-primary"
//                   >
//                     Add Category
//                   </Link>
//                 </div>
//               </div>

//               <div className="table-responsive">
//                 <table className="table align-middle mb-0 table-hover table-centered text-center">
//                   <thead className="bg-light-subtle">
//                     <tr className="payroll-table-header">
//                       <th className="">
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             id="customCheck1"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="customCheck1"
//                           />
//                         </div>
//                       </th>
//                       <th className="text-nowrap">Define Approver Category</th>
//                       <th className="text-nowrap">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="">
//                         <div className="form-check ms-1">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             // id={`check-${index}`}
//                           />
//                         </div>
//                       </td>
//                       <td>Management</td>
//                       <td>
//                         <div className="d-flex justify-content-center gap-2">
//                           <Link
//                             className="btn btn-soft-primary btn-sm"
//                             // onClick={(event) => navigateToUpdate(event)}
//                           >
//                             <iconify-icon
//                               icon="solar:pen-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                           <Link className="btn btn-soft-danger btn-sm">
//                             <iconify-icon
//                               icon="solar:trash-bin-minimalistic-2-broken"
//                               className="align-middle fs-18"
//                             />
//                           </Link>
//                           {/* <button className="btn btn-sm btn-outline-info me-1">
//                                                     <FaDownload />
//                                                   </button> */}
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ApproverCategory

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddApproverCategoryModal from "./AddApproverCategoryModal";

const ApproverCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Management" },
    { id: 2, name: "Finance" },
  ]);

  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
  const [selectedCategory, setSelectedCategory] = useState(null);

  // open add modal
  const handleAddClick = () => {
    setModalMode("add");
    setSelectedCategory(null);
  };

  // open edit modal
  const handleEditClick = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
  };

  // save category
  const handleSaveCategory = (name) => {
    if (modalMode === "add") {
      setCategories([...categories, { id: Date.now(), name }]);
    } else if (modalMode === "edit" && selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id ? { ...cat, name } : cat
        )
      );
    }
  };

  // delete
  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
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
                    Approver Category
                  </h4>
                  <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#categoryModal"
                    onClick={handleAddClick}
                  >
                    Add Category
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr className="payroll-table-header">
                       <th className="">
                         <div className="form-check ms-1">
                           <input
                             type="checkbox"
                             className="form-check-input"
                             id="customCheck1"
                           />
                           <label
                             className="form-check-label"
                             htmlFor="customCheck1"
                           />
                         </div>
                       </th>
                      <th>Define Approver Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr key={cat.id}>
                        <td>                    
                         <div className="form-check ms-1">
                           <input
                             type="checkbox"
                             className="form-check-input"
                             // id={`check-${index}`}
                           />
                         </div>
                        </td>
                        <td>{cat.name}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-soft-primary btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#categoryModal"
                              onClick={() => handleEditClick(cat)}
                            >
                              <iconify-icon
                                icon="solar:pen-2-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                            <button
                              className="btn btn-soft-danger btn-sm"
                              onClick={() => handleDelete(cat.id)}
                            >
                              <iconify-icon
                                icon="solar:trash-bin-minimalistic-2-broken"
                                className="align-middle fs-18"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddApproverCategoryModal
        mode={modalMode}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default ApproverCategory;
