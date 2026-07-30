import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { useAnecdotes } from '../hooks/useAnecdotes'

const CreateNew = () => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')
  const navigate = useNavigate()

  const { addAnecdote } = useAnecdotes()


  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: content.value, author: author.value, info: info.value, votes: 0 })
    navigate('/')
  }

  // Reset function for the values
  const handleReset = () => {
    content.resetValue()
    author.resetValue()
    info.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
