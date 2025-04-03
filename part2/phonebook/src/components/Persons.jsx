const Persons = ({persons, filteredName}) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase())).map(person => <p style={{margin: 0}} key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default Persons