import { useStatisticsControls } from "../store";

const Controls = () => {
  const { goodIncrement, badIncrement, neutralIncrement } =
    useStatisticsControls();
  return (
    <div>
      <h2>give feedback</h2>
      <br></br>

      {/* Now the buttons */}
      <button onClick={goodIncrement}>good</button>
      <button onClick={badIncrement}>bad</button>
      <button onClick={neutralIncrement}>neutral</button>
    </div>
  );
};

export default Controls;
