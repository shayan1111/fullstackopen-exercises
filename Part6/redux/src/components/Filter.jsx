import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  

  const handleChange = (event) => {
    // Make sure to only consider the input with the name 'filter'
    if (event.target.name === 'filter') {
      // Consider the user input as a variable
      const userInput = event.target.value
      console.log(userInput)
      // Send the action, and then clear the input
      dispatch(setFilter(userInput))
    }
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        <h2>Anecdotes</h2>
        filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter