import noteService from './services/notes.js'

const Numbers = ({ persons, setPersons, setError }) => {

    const deletePerson = (personToDelete, idToDelete) => {
    // Confirm if the user is sure to delete the person in the phonebook
    if (window.confirm(`Delete ${personToDelete} ?`)) {
        noteService
        .deleteUser(idToDelete)
        .then(() => {
            setPersons(prev => prev.filter(p => p.id !== idToDelete))
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                setError(`Information of ${personToDelete} has already been removed from the server`);
                setPersons(prev => prev.filter(p => p.id !== idToDelete))
            }
        });
        setTimeout(() => {
            setError('')
        }, 5000)
    }
}
    
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map(person => <p key={person.id}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
                </p>)}
        </div>
    )
}


export default Numbers