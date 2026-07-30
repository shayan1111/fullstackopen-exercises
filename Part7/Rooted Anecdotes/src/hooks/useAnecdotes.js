import { useState, useEffect } from "react";
import anecdoteServices from "../services/anecdotes"

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteServices.getAll().then(data => setAnecdotes(data))
    }, [anecdotes])

    // Function for adding a new anecdote
    const addAnecdote = async (anecdoteObject) => {
        const newData = anecdoteServices.createNew(anecdoteObject)
        setAnecdotes(anecdotes.concat(newData))
    }

    // Function for removing an anecdote
    const removeAnecdote = async (idToDelete) => {
        const deletedAnecdoteId = anecdoteServices.remove(idToDelete)
        setAnecdotes(anecdotes.filter(a => a.id !== deletedAnecdoteId))
    }

    return {
        anecdotes,
        addAnecdote,
        removeAnecdote
    }
}