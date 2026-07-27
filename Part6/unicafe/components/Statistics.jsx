import { useStatisticsCounter } from "../store";

const Statistics = () => {
  const { good, bad, neutral } = useStatisticsCounter();
  let statisticSum = good + bad + neutral;
  let average = statisticSum === 0 ? 0 : (good - bad) / statisticSum;
  let positivePercent = statisticSum === 0 ? 0 : (good / statisticSum) * 100;
  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
          {/* The good variable */}
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>

          {/* The neutral variable */}
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>

          {/* The bad variable */}
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>

          {/* the sum total of the variables */}
          <tr>
            <td>all</td>
            <td>{statisticSum}</td>
          </tr>

          {/* the average of the statistics */}
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>

          {/* the positive percent */}
          <tr>
            <td>positive</td>
            <td>{positivePercent}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
