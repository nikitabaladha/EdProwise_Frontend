import React from 'react'

const UpdateBlacklistOffender = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body custom-heading-padding">
              <div className="container">
                <div className="card-header mb-2 d-flex flex-wrap align-items-center">
                  <h4 className="card-title flex-grow-1 text-center">
                    Update Blacklist Offender
                  </h4>

                  <button
                    type="button"
                    className="btn btn-primary custom-submit-button"
                    onClick={() => window.history.back()}
                  >
                    Back
                  </button>
                </div>
              </div>

              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="profileImage" className="form-label">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        className="form-control"
                        accept="image/*"
                        // onChange={handleChange}
                        // ref={profileImageRef}
                      />
                      <div className="d-flex justify-content-center mt-2">
                        {/* {renderFilePreview(
                          previewProfileImage,
                          false,
                          formData.profileImage
                            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${formData.profileImage}`
                            : null,
                          "Profile Preview"
                        )} */}
                        Profile Image
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="studentName" className="form-label">
                        Name of Visitor <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        className="form-control"
                        required
                        placeholder="Enter Visitor Name"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Document ID No <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Document ID Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="className" className="form-label">
                        Phone Number
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        placeholder="Enter Phone Number"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="section" className="form-label">
                        Blacklist Reason <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="section"
                        name="section"
                        className="form-control"
                        required
                        // placeholder="Enter  Purpose of Visit"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlacklistOffender