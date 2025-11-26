import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddLocationModal from "./AddLocationModal";
const PickupDropLocationRecord = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      pickupLocation: "123 sai Apartment",
      dropLocation: "School",
      landmark: "Near AA Circle",
    },
  ]);

  const [modalMode, setModalMode] = useState("add"); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  // open add modal
  const handleAddClick = () => {
    setModalMode("add");
    setSelectedCategory(null);
  };

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
                    Pickup And Drop Location Record
                  </h4>
                  <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#locationModal"
                    onClick={handleAddClick}
                  >
                    Add Location
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
                      <th>Pickup Location</th>
                      <th>Drop Location</th>
                      <th>LandMark</th>
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
                        <td>{cat.pickupLocation}</td>
                        <td>{cat.dropLocation}</td>
                        <td>{cat.landmark}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-soft-primary btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#locationModal"
                              //   data-bs-target="#categoryModal"
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

      <AddLocationModal
        mode={modalMode}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />
    </div>
  );
};

export default PickupDropLocationRecord;
