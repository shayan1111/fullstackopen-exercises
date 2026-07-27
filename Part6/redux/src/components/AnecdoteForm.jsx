import { useDispatch } from 'react-redux'
import { handleNewAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
    // Make the variable that use the dispatch and the selectors
    const dispatch = useDispatch()
    
    // Implement the function of creating a new note
    const createNewAnecdote = (event) => {
        // Prevent default action
        event.preventDefault()
        // Simplify the long line into one variable
        let content = event.target.content.value
        // Send the action into that 
        dispatch(handleNewAnecdote(content))
        // Clear the input
        content = ''
    }

    return (
        <div>
            {/* First the headline */}
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote} >
                <div>
                {/* Then the input */}
                <input name='content' />
                </div>
                {/* Then the buttom */}
                <button type='submit' >create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm