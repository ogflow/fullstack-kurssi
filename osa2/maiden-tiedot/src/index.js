import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import SearchForm from './SearchForm'
import Content from './Content'

const App = () => {
  const [ data, setData ] = useState([])
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) =>
        setData(data)
      )
  }, [])

  return (
    <>
      <SearchForm
        handleChange={ e => setQuery(e.target.value) } />
      <Content
        data={data}
        query={query}
        handleSelect={setQuery} />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)