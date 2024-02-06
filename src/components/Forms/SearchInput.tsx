import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

interface SearchInputProps {
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  isFocused: boolean;
  searchQuery: string;
  onFocus: () => void;
  onBlur: () => void;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const {
    onSearchChange,
    onClearSearch,
    isFocused,
    searchQuery,
    onFocus,
    onBlur,
  } = props;

  return (
    <div className="search-wrapper">
      <label htmlFor="searchInput">Search</label>
      <div className={`search-container ${isFocused ? "focused" : ""}`}>
        <input
          type="text"
          id="searchInput"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => {
            onFocus();
            onClearSearch();
          }}
          onBlur={onBlur}
        />
        {searchQuery !== "" && (
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="clear-search"
            onClick={onClearSearch}
          />
        )}
        {!isFocused && searchQuery === "" && (
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
