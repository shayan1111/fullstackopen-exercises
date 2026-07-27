const baseURL = 'http://localhost:3001/anecdotes'

// Function for retrieving the anecdotes
const getAll = async () => {
    // First the response for the base url
    const response = await fetch(baseURL)

    // Then make sure it's response is ok
    if (!response.ok) throw new Error("Failed to fetch anecdotes.")

    // Otherwise return the response in a json format
    return await response.json()
}

// Function for creating a new anecdote
const create = async (anecdoteToAdd) => {
    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdoteToAdd)
    }

    const response = await fetch(baseURL, option)
    if (!response.ok) throw new Error("Failed to create anecdote")

    return await response.json()
}

// Function for updating an object
const update = async (anecdoteToChange) => {
    const option = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdoteToChange)
    }

    const response = await fetch(`${baseURL}/${anecdoteToChange.id}`, option)
    if (!response.ok) throw new Error("Failed to update anecdote")

    return await response.json()
}

// Function for deleting an anecdote
const deleteAnecdote = async (idToDelete) => {
    const response = await fetch(`${baseURL}/${idToDelete}`, {
        method: 'DELETE'
    })

    if (!response.ok) throw new Error("Failed to delete anecdote")
    return idToDelete
}

export default { getAll, create, update, deleteAnecdote }