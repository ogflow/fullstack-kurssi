import React, { useState, useEffect } from 'react'
import personService from '../services/personService'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Person from './Person'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFormSubmit = e => {
    e.preventDefault()
    if (newName === '' || newNumber === '') 
      return showNotification('Please, write something')

    const existing = persons.filter(p => p.name === newName)[0]
    if (existing)
      return existing.number !== newNumber
        ? handlePersonUpdating(existing)
        : showNotification(`${newName} already exists!`)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length 
        ? persons[persons.length - 1].id + 1 
        : 1
    }
    personService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        showNotification(`${createdPerson.name} was created succesfully`)
      })
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
        showNotification(`${updatedPerson.name}'s number was updated`)
      })
  }

  const handlePersonDelete = (id, name) => {
    if (window.confirm('Are you sure?'))
    return personService
      .deleteBy(id)
      .then(success => {
        if (!success) 
          return showNotification(`Can't delete ${name}`)

        showNotification(`${name} was deleted succesfully`)
        setPersons(persons.filter(person =>
          person.id !== id ? person : false
        ))
      })
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  const names = () => persons.filter(({ name }) => {
    return filter
      ? name.toLowerCase().includes(filter.toLowerCase())
      : true
  }).map(({ id, name, number }) =>
    <Person
      key={id}
      name={name}
      number={number}
      deletePerson={() => handlePersonDelete(id, name)} />
  )

  return (
    <>
      <Notification 
        message={notification} />
      <h1>Contacts list</h1>
      <Filter 
        handleChange={(e) => setFilter(e.target.value)} />
      <h2>add new one</h2>
      <PersonForm
        handleNameChange={(e) => setNewName(e.target.value)}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
        handleSubmit={ handleFormSubmit } />
      <h2>contacts</h2>
      {names()}
    </>
  )
}

export default App