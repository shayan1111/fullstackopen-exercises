import { useAnecdotes } from "../hooks/useAnecdotes";

const AnecdoteList = () => {
  const { anecdotes, removeAnecdote } = useAnecdotes();
  const buttonStyle = { marginLeft: "10px" };

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content}
            <button
              style={buttonStyle}
              onClick={() => removeAnecdote(anecdote.id)}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
