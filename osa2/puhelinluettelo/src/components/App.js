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

    const existing = persons.filter(p => p.name === newName)[0]
    if (existing)
      return existing.number !== newNumber
        ? handlePersonUpdating(existing)
        : alert(`"${newName}" on jo taulukossa!`)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length 
        ? persons[persons.length - 1].id + 1 
        : 1
    }
    personService
      .create(newPerson)
      .then(createdNote =>
        setPersons(persons.concat(createdNote))
      )
  }

  const handlePersonUpdating = existing => {
    if (window.confirm(`${existing.name} is exists already. Do you want to update number?`))
    return personService
      .update(existing.id, {...existing, number: newNumber})
      .then(updatedPerson => {
        setPersons(persons.map(person =>
          person.id === updatedPerson.id
            ? updatedPerson
            : person
        ))
      })
  }

  const handlePersonDelete = id => {
    if (window.confirm('Are you sure?'))
    return personService
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