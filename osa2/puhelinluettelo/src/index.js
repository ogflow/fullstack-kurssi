import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Person from './Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

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

  const names = () => persons.filter(({ name }) => {
    return filter
      ? name.toLowerCase().includes(filter.toLowerCase())
      : true
    
  }).map(({ name, number }) =>
    <Person
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
      {names()}
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)