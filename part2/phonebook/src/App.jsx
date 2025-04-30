import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [formData, setFormData] = useState({ newName: '', newNumber: '' });
  const [filteredName, setFilteredName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    // Check if the name is already in the phonebook
    if (persons.some( person => person.name === formData.newName)) {
      if (confirm(`${formData.newName} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(p => p.name === formData.newName)
        const updatedPerson = { ...personToUpdate, number: formData.newNumber }
        personService
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
            setFormData({ newName: '', newNumber: '' })
            setMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
        })
          .catch(error => {
            setMessage(
              `Information of ${personToUpdate.name} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            console.log('error', error)
            setPersons(persons.filter(p => p.id !== personToUpdate.id))
            setFormData({ newName: '', newNumber: '' })
        })
      } else {
        setFormData({ newName: '', newNumber: '' })
      }
      return
    }

    const personObject = {
      name: formData.newName,
      number: formData.newNumber,
    }

    //Create a new person
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setFormData({ newName: '', newNumber: '' })
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  //Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //Filter the persons
  const handleFilterChange = (event) => {
    setFilteredName(event.target.value)
  }

  //Delete a person
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Deleted ${persons.find(p => p.id === id).name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filteredName={filteredName} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm formData={formData} handleInputChange={handleInputChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filteredName={filteredName} handleDelete={handleDelete}/>
    </div>
  )
}

export default App