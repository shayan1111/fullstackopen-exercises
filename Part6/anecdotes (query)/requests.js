const baseURL = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
    const response = await fetch(baseURL)
    if (!response.ok) throw new Error("Failed to fetch anecdotes")

    return await response.json()
}

export const createAnecdote = async (newAnecdoteObject) => {
    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdoteObject)
    }
    const response = await fetch(baseURL, option)
    if (!response.ok) throw new Error("Failed to create anecdote")

    return await response.json()
}

export const updateAnecdote = async (anecdoteToUpdate) => {
    const option = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anecdoteToUpdate)
    }

    const response = await fetch(`${baseURL}/${anecdoteToUpdate.id}`, option)
    if (!response.ok) throw new Error("Failed to update anecdote")

    return await response.json()
}