import React from 'react';

const SearchForm = ({ handleChange }) => {


  return (
    <form>
      <label htmlFor="search">
        Country Finder:
      </label>
      <input
        onChange={handleChange}
        name="search"
        placeholder="start typing" />
    </form>
  )
}

export default SearchForm