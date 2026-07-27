import {
  useAnecdotes,
  useAnecdoteActions,
  useAnecdoteStringVariables,
} from "../store/anecdoteStore";
import { useNotificationsActions } from "../store/notificationStore";


const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { updateAnecdote, deleteAnecdote } = useAnecdoteActions();
  const { setNotification } = useNotificationsActions();
  const { filter } = useAnecdoteStringVariables();

  // Make an anecdote list that shows the votes in DESC order
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);
  const anecdotesToShow = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );

  const vote = (currentAnecdote) => {
    const newAnecdote = {
      ...currentAnecdote,
      votes: currentAnecdote.votes + 1,
    };
    updateAnecdote(newAnecdote);
    // Inform what which anecdote has been voted with a timeout
    setNotification(`You voted '${currentAnecdote.content}' `);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button name="vote button" onClick={() => vote(anecdote)}>vote</button>{" "}
            <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
