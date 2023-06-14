import React, { useState } from "react";
import './Search.css'
import Navbar from "../../components/Navbar/Navbar";
import SearchResult from '../../components/SearchResult/SearchResult';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
	const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    //ngăn chặn hành vi submit form mặc định
    e.preventDefault();
    setQuery(searchInput);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchInput("");
    setQuery("");
  };

  return (
    <div className="search">
      <Navbar />
      <div className="searchContainer">
        <form className="form">
          <div className="formInput">
            <input
              className="input"
              type={"text"}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FontAwesomeIcon className="navBarSearch" icon={faSearch} />
          </div>
          <div className="buttonContainer">
            <button
              className="resetButton"
              type="button"
              onClick={(e) => {
                handleReset(e);
              }}
            >
              RESET
            </button>
            <button
              className="searchButton"
              type="submit"
              onClick={(e) => handleSearch(e)}
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
      <SearchResult search={query} />
    </div>
  );
};

export default Search;
