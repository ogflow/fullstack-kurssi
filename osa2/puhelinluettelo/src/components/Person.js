import React from 'react';

const Person = ({ name, number, deletePerson }) => {
  return (
    <p>
      {name} {number}
      <button
        type="button"
        onClick={ deletePerson }>
        delete
      </button>
    </p>
  );
};

export default Person;