const ShowResults = ({ newSearch, handleNewSearch, personsToShow, message, error }) => {
    return (
        <div>
            <h2>Phonebook</h2>
            {message && <div className="notification">{message}</div>}
            {error && <div className="error">{error}</div>}
            filter shown with <input value={newSearch} onChange={handleNewSearch}/>
            {newSearch !== '' && personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}

export default ShowResults