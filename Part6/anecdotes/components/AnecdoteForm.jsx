import {
  useAnecdoteActions,
  useAnecdoteStringVariables,
  useAnecdoteSetContent
} from "../store/anecdoteStore";
import { useNotificationsActions } from "../store/notificationStore";

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdoteActions();
  const { setNotification } = useNotificationsActions();
  const { anecdoteContentValue } = useAnecdoteStringVariables();
  const setContent = useAnecdoteSetContent()
  

  const createAnecdoteAndAdd = async (event) => {
    event.preventDefault();
    // First make the anecdote object to add
    const anecdoteObject = { content: anecdoteContentValue, votes: 0 };
    await createAnecdote(anecdoteObject);
    setContent("");

    // Inform the user the created anecdote
    setNotification(`You created '${anecdoteObject.content}' `);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdoteAndAdd}>
        <div>
          <input
            name="title"
            value={anecdoteContentValue}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
