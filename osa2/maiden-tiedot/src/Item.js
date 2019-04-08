import React from 'react';

const Item = ({ data: { name, capital, population, languages, flag } }) => {
  const languagesList = languages.map(({ name }) =>
    <li key={name}>{name}</li>
  )

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languagesList}
      </ul>
      <img alt="flag"
        src={flag}
        width="200px" />
    </div>
  );
};

export default Item;