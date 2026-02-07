const ShowPhonebook = ({newName, handleNewName, newPhone, handleNewPhone}) => {
    return (
        <div>
            <h2>add a new</h2>
            {/* First the name input */}
            <div>
            name: <input value={newName} onChange={handleNewName}/>
            </div>
            {/* Then the number input */}
            <div>
            number: <input value={newPhone} onChange={handleNewPhone}/>
            </div>
            {/* And finally the number */}
            <div>
            <button type="submit">add</button>
            </div>
        </div>
    )
}

export default ShowPhonebook