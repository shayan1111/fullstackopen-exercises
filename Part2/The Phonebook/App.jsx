import { useState, useEffect } from 'react'
import handleUser from './handleUser.jsx'
import ShowResults from './showResults.jsx'
import Numbers from './Numbers.jsx'
import ShowPhonebook from './ShowPhonebook.jsx'
import noteService from './services/notes.js'

// First simplify the url into a variable
const baseURL = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')



  useEffect(() => {
    console.log('event')
    noteService.getAll()
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  
  // The event handlers for name, phone numbers and search names
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  // Now consider only showing those that match in the search input
  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(newSearch.toLowerCase())
)

  // When the user types in the input, quickly update it
  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // Handle the user input for the phone numbers
  const handleNewPhone = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }
  
  // Handle the search input
  const handleNewSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }
  
  return (
    <div>
      {/* First show the results based on the search input*/}
      <ShowResults newSearch={newSearch} handleNewSearch={handleNewSearch} personsToShow={personsToShow} message={message} error={error}/>
      {/* Then show all the people alongside their numbers */}
      <form onSubmit={(event) => handleUser(event, newName, newPhone, setPersons, setNewName, setNewPhone, setMessage)}>
        <ShowPhonebook newName={newName} handleNewName={handleNewName} newPhone={newPhone} handleNewPhone={handleNewPhone}/>
      </form>
      {/* Then show the numbers */}
      <Numbers persons={persons} setPersons={setPersons} setError={setError}/>
    </div>
  )
}

export default App