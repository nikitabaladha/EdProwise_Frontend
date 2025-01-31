import React from "react";
import { Link } from "react-router-dom";

const PrepareQuoteTable = ({
  products,
  handleRemoveProduct,
  handleAddProduct,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  console.log("products form prepare quote table", products);
  return (
    <div className="row p-2">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center gap-1">
            <button
              type="button"
              className="btn btn-primary custom-submit-button"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
            <h4 className="card-title flex-grow-1 m-0 text-center">
              Prepare Quote
            </h4>
            <div className="text-end">
              <Link className="btn btn-sm btn-outline-light">Export</Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered table-nowrap text-center">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Action</th>
                    <th>Sr No.</th>
                    <th>Subcategory Name</th>
                    {/* <th>Quantity</th> */}
                    <th>Upload Sample Images of Products</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        {products.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-primary custom-submit-button"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                      <td>{index + 1}</td>

                      <td>
                        <input
                          type="text"
                          // name={`products[${index}].subcategoryName`}
                          name="subcategoryName"
                          className="form-control"
                          value={product.subcategoryName}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      {/* <td>
                        <input
                          type="number"
                          name={`products[${index}].quantity`}
                          // name="quantity"
                          className="form-control"
                          value={product.quantity}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td> */}
                      <td>
                        <input
                          type="file"
                          // name={`products[${index}].prepareQuoteImage`}
                          name="prepareQuoteImage"
                          className="form-control"
                          onChange={(e) => handleImageChange(index, e)}
                          accept="image/*"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end m-2">
              <button type="submit" className="btn btn-success me-2">
                Submit
              </button>
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrepareQuoteTable;
