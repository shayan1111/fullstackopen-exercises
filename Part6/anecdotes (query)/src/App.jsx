import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "../hooks/UseAnecdotes";
import { useContext } from "react";
import NotificationContext from "./components/NotificationContext";

const App = () => {
  const { anecdotes, isError, isPending, updateAnecdote } = useAnecdotes();
  const { setNotification } = useContext(NotificationContext)

  if (isPending) return <div>Loading data...</div>;
  if (isError)
    return <div>anecdote service not available due to problems in server</div>;

  const handleVote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    updateAnecdote(newAnecdote);
    
    setNotification(`Anecdote "${newAnecdote.content}" voted`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
