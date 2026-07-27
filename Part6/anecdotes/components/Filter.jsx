import {
  useAnecdoteStringVariables,
  useAnecdoteSetFilter,
} from "../store/anecdoteStore";

const Filter = () => {
  const { filter } = useAnecdoteStringVariables();
  const setFilter = useAnecdoteSetFilter();

  const handleChange = (event) => {
    let title = event.target.value;
    // the value of the input field is in event.target.value
    console.log(title);
    setFilter(title);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  );
};

export default Filter;
