import { useAnecdotes } from "../../hooks/UseAnecdotes";
import NotificationContext from "./NotificationContext";
import useNotification from "../../hooks/useAnecdote";

const AnecdoteForm = () => {
  const { setNotification } = useNotification();

  const { addAnecdote } = useAnecdotes();

  const onCreate = (event) => {
    event.preventDefault();
    const contentString = event.target.anecdote.value;

    // Make sure the content's length is more than 5
    if (contentString.trim().length < 5) {
      setNotification("Too short anecdote, must have length 5 or more");
      setTimeout(() => {
        setNotification("");
      }, 5000);
      event.target.reset();
      return;
    }

    // Otherwise create it
    const anecdoteToCreate = {
      content: contentString,
      votes: 0,
    };

    addAnecdote(anecdoteToCreate);

    setNotification(`Anecdote "${contentString}" added`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
    event.target.reset();
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
