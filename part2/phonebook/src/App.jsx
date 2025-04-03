import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [formData, setFormData] = useState({ newName: '', newNumber: '' });
  const [filteredName, setFilteredName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some( person => person.name === formData.newName)) {
      alert(`${formData.newName} is already added to phonebook`)
      return
    }

    setPersons([
      ...persons,
      { name: formData.newName, number: formData.newNumber, id: persons.length + 1 }
    ]);

    setFormData({ newName: '', newNumber: '' });
    console.log(persons)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredName={filteredName} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm formData={formData} handleInputChange={handleInputChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filteredName={filteredName}/>
    </div>
  )
}

export default App