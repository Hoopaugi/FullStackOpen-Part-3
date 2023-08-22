import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (person) {
      // eslint-disable-next-line no-restricted-globals
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }

        personsService
          .update(person.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id ? person : updatedPerson))
            setNotification(`Updated ${response.data.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(err => {
            setError(`Person ${person.name} was already removed from the server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      personsService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification(`Added ${response.data.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleRemove = (person) => {
    // eslint-disable-next-line no-restricted-globals
    if(confirm(`Remove ${person.name} from phonebook?`)) {
      personsService
        .remove(person.id)
        .then(_response => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotification(`Removed ${person.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(err => {
          setPersons(persons.filter(p => p.id !== person.id))
          setError(`Person ${person.name} was already removed from the server`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        }) 
    }
  }

  const personsToShow = filter !== '' ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Notification message={error} error={true} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} name={newName} number={newNumber} />
      <Persons persons={personsToShow} handleRemove={handleRemove}/>
    </>
  )
}

export default App