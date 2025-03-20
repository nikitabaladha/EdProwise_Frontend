import React, { useState } from "react";

const CreateClassAndSection = () => {
  const [className, setClassName] = useState("");
  const [numberOfSections, setNumberOfSections] = useState("1");
  const [sections, setSections] = useState([]);

  const handleGenerateSections = (e) => {
    e.preventDefault();
    const numSections = parseInt(numberOfSections) || 1; // Default to 1 if input is empty or invalid
    setSections(Array.from({ length: numSections }, () => ""));
  };

  const handleSectionChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = value;
    setSections(updatedSections);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-12">
          <div className="card m-2">
            <div className="card-body">
              <div className="container">
                <div className="card-header mb-2">
                  <h4 className="card-title text-center custom-heading-font">
                    Add Class & Section
                  </h4>
                </div>
              </div>
              <form onSubmit={handleGenerateSections}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="class" className="form-label">
                        Class
                      </label>
                      <input
                        type="text"
                        id="class"
                        name="class"
                        className="form-control"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="numberOfSection" className="form-label">
                        Number Of Sections
                      </label>
                      <input
                        type="text"
                        id="numberOfSection"
                        name="numberOfSection"
                        className="form-control"
                        value={numberOfSections}
                        onChange={(e) => setNumberOfSections(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary custom-submit-button"
                  >
                    Generate Class & Section
                  </button>
                </div>
              </form>

              {sections.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-center">
                    Sections for {className} Class
                  </h5>
                  <form>
                    {sections.map((section, index) => (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3" key={index}>
                            <label className="form-label">
                              Section {index + 1} Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={section}
                              onChange={(e) =>
                                handleSectionChange(index, e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="shift" className="form-label">
                        Section Shift
                      </label>
                      <select
                        id="shift"
                        name="shift"
                        className="form-control"
                        // value={formData.schoolId}
                        // onChange={handleChange}
                        required
                      >
                        <option value="">Select School</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>
                  </div>
                      </div>
                    ))}
                    <div className="text-end">
                      <button type="submit" className="btn btn-success">
                        Save Sections
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassAndSection;
