import React, { useState, useEffect } from 'react'
import personService from '../services/personService'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Person from './Person'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFormSubmit = e => {
    e.preventDefault()

    if (persons.some(person => person.name === newName))
      return alert(`"${newName}" on jo taulukossa!`)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length ? persons[persons.length - 1].id + 1 : 1
    }
    personService
      .create(newPerson)
      .then(createdNote =>
        setPersons(persons.concat(createdNote))
      )
  }

  const handlePersonDelete = id => {
    if (window.confirm('Are you sure?'))
      personService
        .deleteBy(id)
        .then(res => {
          console.log(`person with id ${id} was deleted`)
          setPersons(persons.filter(person =>
            person.id !== id ? person : false
          ))
        })
  }

  const names = persons.filter(({ name }) => {
    return filter
      ? name.toLowerCase().includes(filter.toLowerCase())
      : true
  }).map(({ id, name, number }) =>
    <Person
      key={id}
      name={name}
      number={number}
      deletePerson={() => handlePersonDelete(id)} />
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

export default App