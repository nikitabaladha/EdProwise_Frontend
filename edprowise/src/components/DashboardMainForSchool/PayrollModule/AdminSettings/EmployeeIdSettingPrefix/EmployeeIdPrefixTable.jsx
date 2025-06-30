import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from "../../../../../api/getAPI";
import postAPI from "../../../../../api/postAPI";
import putAPI from "../../../../../api/putAPI";
import { useNavigate } from "react-router-dom";

const EmployeeIdPrefixTable = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [academicYear, setAcademicYear] = useState("2025-26");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;
    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }
    setSchoolId(id);
    fetchData(id, academicYear);
  }, [academicYear]);

  const fetchData = async (schoolId) => {
    try {
      const res = await getAPI(`/getall-employeeid-setting/${schoolId}`, {}, true);
      const categories = res?.data?.data?.categories;
      if (!res.hasError && categories?.length > 0) {
        const formatted = categories.map((item) => ({
          id: item._id,
          prefix: item.prefix,
          suffixLength: item.suffixLength,
          suffix: '0'.repeat(item.suffixLength),
          employeeIdValue: `${item.prefix}${'0'.repeat(item.suffixLength)}`
        }));
        setEmployeeId(formatted);
      } else {
        setEmployeeId([]);
      }
    } catch (error) {
      toast.error("Failed to fetch employee ID settings.");
      console.error("Fetch error:", error);
    }
  };


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getAPI(`/getall-employeeid-setting/${schoolId}`, {}, true);
        const categories = response?.data?.data?.categories;

        if (!response.hasError && categories?.length > 0) {
          const existing = categories[0];
          setPrefix(existing.prefix);
          setSuffix('0'.repeat(existing.suffixLength));
        }
      } catch (err) {
        toast.error("Failed to load employee ID settings");
      }
    };


    if (schoolId) {
      fetchSettings();
    }
  }, [schoolId]);

  const navigateToAddNewPrefix = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/payroll-module/admin-setting/employee-id-setting/add-setting`, {
      state: { schoolId },
    });
  };

  const navigateToEditPrefix = (event, prefixId) => {
  event.preventDefault();
  navigate(`/school-dashboard/payroll-module/admin-setting/employee-id-setting/edit-setting`, {
    state: { schoolId, prefixId },
  });
};


  const openDeleteDialog = (comp) => {
    setSelectedCategory(comp);
    setDeleteType("employeeIdSetting");
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteConfirmed = (id) => {
    setEmployeeId(prevCat =>
      prevCat.filter(categorie => categorie.id !== id)
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card m-2">
              <div className="card-body custom-heading-padding">
                <div className="container">
                  <div className="card-header border border-0 mb-2 d-flex align-items-center">
                    <h4 className="card-title flex-grow-1 text-center">
                      Employee ID Settings
                    </h4>
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={employeeId.length > 0}
                      onClick={navigateToAddNewPrefix}
                    >
                      Add EmployeeId
                    </button>
                  </div>
                </div>

                <div className="table-responsive px-lg-7 px-md-5">
                  <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                    <thead className="bg-light-subtle">
                      <tr className="payroll-table-header">
                        <th style={{ width: 20 }}>
                          <div className="form-check ms-1">
                            <input type="checkbox" className="form-check-input" />
                          </div>
                        </th>
                        <th>EmployeeID</th>
                        <th>EmployeeID Prefix</th>
                        <th>EmployeeID Suffix</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeId.map((comp) => (
                        <tr key={comp.id} className="payroll-table-body text-center">
                          <td>
                            <div className="form-check ms-1">
                              <input type="checkbox" className="form-check-input" />
                            </div>
                          </td>
                          <td>{comp.employeeIdValue}</td>
                          <td>{comp.prefix}</td>
                          <td>{comp.suffix}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                className="btn btn-soft-primary btn-sm"
                                onClick={(event) => navigateToEditPrefix(event, comp.id)} 
                              >
                                <iconify-icon
                                  icon="solar:pen-2-broken"
                                  className="align-middle fs-18"
                                />
                              </button>

                              <button
                                className="btn btn-soft-danger btn-sm"
                                onClick={() => openDeleteDialog(comp)}
                              >
                                <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {employeeId.length === 0 && (
                        <tr>
                          <td colSpan="5">No Employee ID Settings found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && selectedCategory && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedCategory.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default EmployeeIdPrefixTable;
