import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "./SearchContext";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const { searchTerm } = useContext(SearchContext);
  const location = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query) {
      // Implement your search logic here
      // For example, you can fetch data from an API or filter local data
      // This is just a placeholder
      setResults([`Result 1 for ${query}`, `Result 2 for ${query}`]);
    }
  }, [location.search]);

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;