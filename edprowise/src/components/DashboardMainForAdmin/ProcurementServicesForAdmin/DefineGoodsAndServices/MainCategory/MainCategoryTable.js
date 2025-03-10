import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { exportToExcel } from "../../../../export-excel";
import getAPI from "../../../../../api/getAPI";
const MainCategoryTable = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const fetchMainCategoryData = async () => {
    try {
      const response = await getAPI(`/main-category`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setMainCategories(response.data.data);
        console.log("Main Category data", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School List:", err);
    }
  };

  useEffect(() => {
    fetchMainCategoryData();
  }, []);

  const navigate = useNavigate();

  const navigateToAddNewMainCategory = (event) => {
    event.preventDefault();
    navigate(
      `/admin-dashboard/procurement-services/define-goods-services/main-category/add-main-category`
    );
  };

  const navigateToUpdateMainCategory = (event, good) => {
    event.preventDefault();
    navigate(`/admin-dashboard/procurement-services/update-main-category`, {
      state: { good },
    });
  };

  const handleExport = () => {};

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">
                  All Main Category List
                </h4>
                <Link
                  className="btn btn-sm btn-primary"
                  onClick={(event) => navigateToAddNewMainCategory(event)}
                >
                  Add New Main Category
                </Link>

                <div className="text-end">
                  <Link onClick={handleExport} class="text-primary">
                    Export
                    <i class="bx bx-export ms-1"></i>
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

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mainCategories.map((mainCategory) => (
                        <tr key={mainCategory._id}>
                          <td>
                            <div className="form-check ms-1">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`customCheck${mainCategory._id}`}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`customCheck${mainCategory._id}`}
                              >
                                &nbsp;
                              </label>
                            </div>
                          </td>
                          <td>{mainCategory.mainCategoryName}</td>

                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                className="btn btn-soft-primary btn-sm"
                                title="Update"
                                data-bs-toggle="popover"
                                data-bs-trigger="hover"
                                onClick={(event) =>
                                  navigateToUpdateMainCategory(
                                    event,
                                    mainCategory
                                  )
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

export default MainCategoryTable;
