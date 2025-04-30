const Persons = ({persons, filteredName, handleDelete}) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase())).map(person =>
            <div style={{display: "flex"}} key={person.id}>
                <p style={{margin: 0}} >{person.name} {person.number}</p>
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
        )}
        </div>
    )
}

export default Persons