import { useSelector, useDispatch } from 'react-redux'
import { increaseValue } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const dispatch = useDispatch()

	const anecdotes = useSelector(state => state.anecdotes.toSorted((a, b) => b.votes - a.votes))
	const filter = useSelector(state => state.filter)
	const filterAnecdotes = anecdotes.filter(a =>
		a.content.toLowerCase().includes(filter.toLowerCase())
	)
	

	const increaseVote = anecdote => {
		dispatch(increaseValue(anecdote.id))
		dispatch(displayNotification(`You voted '${anecdote.content}' `))
	}

	return (
		<div>
			{filterAnecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => increaseVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AnecdoteList