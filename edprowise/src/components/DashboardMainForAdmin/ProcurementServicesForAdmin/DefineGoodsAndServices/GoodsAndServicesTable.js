import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../export-excel";
const GoodsAndServicesTable = () => {
  const [goods, setGoods] = useState([
    {
      id: 1,
      mainCategory: "Procurement Services",
      category: "School Desk & Bench (Senior School)",
      subCategory: "School Desk & Bench - Wooden",
    },
    {
      id: 2,
      mainCategory: "Procurement Services",
      category: "School Desk & Bench (Senior School)",
      subCategory: "School Desk & Bench - Steel",
    },
    {
      id: 3,
      mainCategory: "Procurement Services",
      category: "School Desk & Bench (Senior School)",
      subCategory: "School Desk & Bench - Wooden & Steel Combine",
    },
    {
      id: 4,
      mainCategory: "Procurement Services",
      category: "School Desk & Bench (Senior School)",
      subCategory: "Others",
    },
    {
      id: 5,
      mainCategory: "Procurement Services",
      category: "School Desk & Bench (Play School & KG)",
      subCategory: "Kids School Desk & Bench - Wooden",
    },
  ]);

  const navigate = useNavigate();

  const navigateToAddGoodServices = (event) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/add-good-services`);
  };

  const navigateToUpdateGoodServices = (event, good) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/update-good-service`, {
      state: { good },
    });
  };

  const handleExport = () => {
    const filteredData = goods.map((good) => ({
      Id: good.id,
      "Main Category": good.mainCategory,
      Category: good.category,
      "Sub Category": good.subCategory,
    }));

    exportToExcel(filteredData, "Goods & Services", "Goods & Services Data");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Goods And Services List
                </h4>
                <Link
                  className="btn btn-sm btn-primary"
                  onClick={(event) => navigateToAddGoodServices(event)}
                >
                  Add New Good
                </Link>

                <div className="text-end">
                  <Link
                    onClick={handleExport}
                    className="btn btn-sm btn-outline-light"
                    title="Export Excel File"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                  >
                    Export
                  </Link>
                </div>
              </div>
              <div>
                <div className="table-responsive">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                    <thead className="bg-light-subtle">
                      <tr>
                        <th style={{ width: 20 }}>
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
                        <th>Main Category </th>
                        <th>Category</th>
                        <th>Sub Category</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {goods.map((good) => (
                        <tr key={good.id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${good.id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${good.id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{good.mainCategory}</td>
                          <td>{good.category}</td>
                          <td>{good.subCategory}</td>

                          <td>
                            <div className="d-flex gap-2">
                              {/* <Link
                                className="btn btn-light btn-sm"
                                title="View"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(event) =>
                                  navigateToViewGoodsAndServicesQuote(event, good)
                                }
                              >
                                <iconify-icon
                                  icon="solar:eye-broken"
                                  className="align-middle fs-18"
                                />
                              </Link> */}

                              <Link
                                className="btn btn-soft-primary btn-sm"
                                title="Update"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(event) =>
                                  navigateToUpdateGoodServices(event, good)
                                }
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                              <Link
                                className="btn btn-soft-danger btn-sm"
                                title="Delete"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                              >
                                <iconify-icon
                                  icon="solar:trash-bin-minimalistic-2-broken"
                                  className="align-middle fs-18"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* end table-responsive */}
              </div>
              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <Link className="page-link">Previous</Link>
                    </li>
                    <li className="page-item active">
                      <Link
                        className="page-link"
                        style={{ backgroundColor: "red", borderColor: "red" }}
                      >
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">2</Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">3</Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link">Next</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoodsAndServicesTable;
