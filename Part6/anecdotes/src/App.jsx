import { useEffect } from "react";
import Filter from "../components/Filter";
import AnecdoteList from "../components/AnecdoteList";
import AnecdoteForm from "../components/AnecdoteForm";
import Notification from "../components/Notification";
import { useAnecdoteActions } from "../store/anecdoteStore";

const App = () => {
  const { initialize } = useAnecdoteActions()
  
  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
