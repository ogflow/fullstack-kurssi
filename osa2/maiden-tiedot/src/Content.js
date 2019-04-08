import React, { useState } from 'react';

import Item from './Item'

const Content = ({ data, query, handleClick }) => {
  const [ item, setItem ] = useState(null)

  const filtered = data.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  )

  const message = (txt, alt) => (
    <div>
      <h3>{txt}</h3>
      <p>{alt}</p>
    </div>
  )

  const listView = () => filtered.map(({ name }) =>
    <div key={name}>
      <span>{name}</span>
      <button 
        onClick={handleClick}
        type="button">
        ⟶
      </button>
    </div>
  )
  const singleItem = () => (
    <Item data={filtered[0]} />
  )

  return (
    <>
      { query
        ? filtered.length
          ? filtered.length < 10
            ? filtered.length === 1
              ? singleItem()
              : listView()
            : message('too many results', 'specify country name')
          : message('no results')
        : null }
    </>
  );
};

export default Content;