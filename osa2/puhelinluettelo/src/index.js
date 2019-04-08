import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Person from './Person'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (persons.some(person => person.name === newName))
      return alert(`"${newName}" on jo taulukossa!`)

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons( persons.concat(newPerson) )
  }

  const names = persons.filter(({ name }) => {
    return filter
      ? name.toLowerCase().includes(filter.toLowerCase())
      : true
  }).map(({ id, name, number }) =>
    <Person
      key={id}
      name={name}
      number={number} />
  )

  return (
    <>
      <h1>Contacts list</h1>
      <Filter 
        handleChange={(e) => setFilter(e.target.value)} />
      <h2>add new one</h2>
      <PersonForm
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        handleSubmit={handleFormSubmit} />
      <h2>contacts</h2>
      {names}
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)