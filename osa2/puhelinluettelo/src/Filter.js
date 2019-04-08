import React from 'react';

const Filter = ({ handleChange }) => {
  return (
    <div>
      filter contacts: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;