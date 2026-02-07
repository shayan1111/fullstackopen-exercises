import noteService from './services/notes.js'

// The function that adds the names
const handleUser = (event, newName, newPhone, setPersons, setNewName, setNewPhone, setMessage) => {
    // prevent the page from loading
    event.preventDefault()
    
    // The condition for when it's not a duplicate
    noteService.getAll().then(allUsers => {
    const names = allUsers.data.map(u => u.name);
    const numbers = allUsers.data.map(u => u.number);
    const existingUser = allUsers.data.find(u => u.name === newName);
    
    // If the username is the same but the number is different
    if (existingUser) {
        // If the username clicks cancel
        if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) return;
        
        // If the username clicks ok
        noteService.updateUser(existingUser.id, {...existingUser, number: newPhone})
        .then(response => {
        setPersons(prev => prev.map(p => p.id !== existingUser.id ? p : response.data));
        setMessage(`Updated ${newName}'s number to ${newPhone}`)
        setTimeout(() => {
            setMessage(''); // clear the message after 5 seconds
        }, 5000); 

        setNewName('');
        setNewPhone('');
        })

        return;
    }

    // If both username and number is the same => reject it
    if (names.includes(newName) && numbers.includes(newPhone)) {
        return window.alert(`${newName} with the phone number ${newPhone} is already in the phonebook.`);
    }
});
    // Add new data (where username and number are different)
    return noteService.createUser({ name: newName, number: newPhone })
        .then(response => {
            setPersons(prev => prev.concat(response.data));
            setMessage(`Added ${newName}`)
        setTimeout(() => {
            setMessage(''); // clear the message after 5 seconds
        }, 5000); 
            setNewName('');
            setNewPhone('');
        });
}

export default handleUser