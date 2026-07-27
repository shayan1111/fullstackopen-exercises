import { create } from 'zustand'
import anecdoteServices from '../services/anecdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  stringVariables: {
    filter: '',
    anecdoteContentValue: '',
  },
  // Action for changing the anecdote title
  setContent: value => set(state => ({
    stringVariables: {
      ...state.stringVariables,
      anecdoteContentValue: value
    },
  })),

  // Action for updating the filter string
  setFilter: value =>
    set(state => ({
      stringVariables: {
        ...state.stringVariables,
        filter: value,
      },
    })),
  actions: {
    // Action for increasing a vote
    increaseVote: anecdoteObject => set(state => ({
      anecdotes: state.anecdotes.map(a => a.id === anecdoteObject.id ? anecdoteObject : a)
    })),

    // Action for retrieving the notes
    initialize: async () => {
      const anecdotes = await anecdoteServices.getAll()
      set(() => ({ anecdotes }))
    },

    // Action for creating an anecdote
    createAnecdote: async (anecdotetoAdd) => {
      // First add it to the backend
      const newAnecdote = await anecdoteServices.create(anecdotetoAdd)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },

    // Action for updating an anecdote
    updateAnecdote: async (anecdoteToChange) => {
      const updatedAnecdote = await anecdoteServices.update(anecdoteToChange)
      set(state => ({ anecdotes: state.anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote) }))
    },

    // Action for deleting an anecdote
    deleteAnecdote: async (idToDelete) => {
      const deletedAnecdoteId = await anecdoteServices.deleteAnecdote(idToDelete)
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id != deletedAnecdoteId) }))
    }
  },
}))

export default useAnecdoteStore
export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useAnecdoteSetFilter = () => useAnecdoteStore((state) => state.setFilter)
export const useAnecdoteSetContent = () => useAnecdoteStore((state) => state.setContent)
export const useAnecdoteStringVariables = () => useAnecdoteStore((state) => state.stringVariables)