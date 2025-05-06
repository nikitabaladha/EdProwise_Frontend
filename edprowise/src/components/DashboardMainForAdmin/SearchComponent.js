import React, { useContext, useState } from "react";
import { SearchContext } from "./SearchContext";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
    navigate(`/search-results?query=${inputValue}`);
  };

  return (
    <form className="app-search d-none d-md-block ms-2" onSubmit={handleSearch}>
      <div className="position-relative">
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <iconify-icon
          icon="solar:magnifer-linear"
          className="search-widget-icon"
        />
      </div>
    </form>
  );
};

export default SearchComponent;
