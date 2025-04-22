import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationDialog from "../../../../ConfirmationDialog";
import getAPI from '../../../../../api/getAPI';
import { toast } from "react-toastify";

const FeeStructureList = () => {
  const navigate = useNavigate();

  const [feeStructures, setFeeStructures] = useState([]);
  const [classMap, setClassMap] = useState({});
  const [sectionMap, setSectionMap] = useState({});
  const [feesTypeMap, setFeesTypeMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [schoolId, setSchoolId] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const id = userDetails?.schoolId;

    if (!id) {
      toast.error("School ID not found. Please log in again.");
      return;
    }

    setSchoolId(id);
  }, []);

  useEffect(() => {
    if (!schoolId) return;

    const fetchData = async () => {
      try {
        // Fee structures
        const feeRes = await getAPI(`/get-fees-structure/${schoolId}`, {}, true);
        setFeeStructures(feeRes?.data?.data || []);

        // Class & Section Maps
        const classRes = await getAPI(`/get-class-and-section/${schoolId}`, {}, true);
        const classMap = {};
        const sectionMap = {};

        classRes?.data?.data?.forEach(cls => {
          classMap[cls._id] = cls.className;

          cls.sections?.forEach(section => {
            sectionMap[section._id] = section.name;
          });
        });

        setClassMap(classMap);
        setSectionMap(sectionMap);

        // Fee Type Map
        const feesTypeRes = await getAPI(`/getall-fess-type/${schoolId}`, {}, true);
        const feesMap = {};
        feesTypeRes?.data?.data?.forEach(ft => {
          feesMap[ft._id] = ft.feesTypeName;
        });
        setFeesTypeMap(feesMap);

      } catch (error) {
        toast.error("Error fetching data.");
      }
    };

    fetchData();
  }, [schoolId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feeStructures.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(feeStructures.length / itemsPerPage);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageClick = (page) => setCurrentPage(page);

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
    setDeleteType("feesstructure");
  };

  const handleDeleteCancel = () => setIsDeleteDialogOpen(false);
  const handleDeleteConfirmed = (_id) => {
    setFeeStructures(prev => prev.filter(item => item._id !== _id));
  };

  const navigateToAddNew = (event) => {
    event.preventDefault();
    navigate(`/school-dashboard/fees-module/admin-setting/fees-structure/add-fees-structure`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center gap-1">
                <h4 className="card-title flex-grow-1">All Fee Structures</h4>
                <Link onClick={navigateToAddNew} className="btn btn-sm btn-primary">Create Fee Structure</Link>
                <div className="text-end">
                  <Link className="btn btn-sm btn-outline-light">Export</Link>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered text-center">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{ width: 20 }}>
                        <div className="form-check ms-1">
                          <input type="checkbox" className="form-check-input" />
                        </div>
                      </th>
                      <th>Class</th>
                      <th>Section(s)</th>
                      <th>Total Amount</th>
                      <th># Installments</th>
                      <th className="text-start">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((structure) => (
                      <tr key={structure._id}>
                        <td>
                          <div className="form-check ms-1">
                            <input type="checkbox" className="form-check-input" />
                          </div>
                        </td>
                        <td>{classMap[structure.classId] || "N/A"}</td>
                        <td>{structure.sectionIds?.map(id => sectionMap[id] || "N/A").join(", ") || "N/A"}</td>

                        <td>
                          ₹
                          {Array.isArray(structure.installments)
                            ? structure.installments.reduce((sum, inst) =>
                              sum + (inst.fees?.reduce((subSum, fee) => subSum + fee.amount, 0) || 0), 0)
                            : 0}
                        </td>
                        <td>{structure.installments?.length || 0}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              onClick={() =>
                                navigate("/school-dashboard/fees-module/admin-setting/fees-structure/view-fees-structure", {
                                  state: { structure }
                                })
                              }
                              className="btn btn-light btn-sm"
                            >
                              <iconify-icon icon="solar:eye-broken" className="align-middle fs-18" />
                            </button>
                            <button
                              className="btn btn-soft-primary btn-sm"
                              onClick={() =>
                                navigate("/school-dashboard/fees-module/admin-setting/fees-structure/update-fees-structure", {
                                  state: { structure }
                                })
                              }
                            >
                              <iconify-icon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </button>
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                openDeleteDialog(structure);
                              }}
                              className="btn btn-soft-danger btn-sm"
                            >
                              <iconify-icon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              <div className="card-footer border-top">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end mb-0">
                    <li className="page-item">
                      <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    </li>
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => currentPage - 1 + i)
                      .filter(p => p >= 1 && p <= totalPages)
                      .map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                          <button className="page-link" onClick={() => handlePageClick(page)}>{page}</button>
                        </li>
                      ))}
                    <li className="page-item">
                      <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedItem._id}
          onDeleted={() => handleDeleteConfirmed(selectedItem._id)}
        />
      )}
    </>
  );
};

export default FeeStructureList;
