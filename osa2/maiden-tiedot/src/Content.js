import React, { useState } from 'react';

import Item from './Item'
import WeatherForecast from './WeatherForecast'

const Content = ({ data, query, handleSelect }) => {
  const filtered = data.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  )

  console.dir(filtered)
  
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
        onClick={ () => handleSelect(name) }
        type="button">
        ⟶
      </button>
    </div>
  )
  const singleItem = () => (
    <>
      <Item data={filtered[0]} />
      <WeatherForecast cityName={filtered[0].capital} />
    </>
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