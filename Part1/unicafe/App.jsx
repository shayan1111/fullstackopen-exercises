import { useState } from 'react'

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === "positive" ? value * 100 + "%" : value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const average = (good - bad) / (good + bad + neutral)
  const positiveOnly = good / (good + bad + neutral)

  const lines = [
    {text: "good", value:good},
    {text: "neutral", value:neutral},
    {text: "bad", value:bad},
    {text: "total", value:good + bad + neutral},
    {text: "average", value:average},
    {text: "positive", value:positiveOnly}
  ]
  
  if ((good + bad + neutral) === 0) {
        return (
          <p>No feedback given.</p>
        )
      }
  else {
    return (
    <table>
      <tbody>
        {lines.map(line => (
          <StatisticsLine key={line.text} text={line.text} value={line.value} />
        ))}
      </tbody>
    </table>
  )
  }
}
const Button = ({ setValue, name }) => {
  return (
    <button onClick={setValue}>{name}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <table>
        {/* First the H1 text for table heading */}
        <tr>
          <th colSpan={3}>
            <h1>give feedback</h1>
          </th>
        </tr>
        {/* Now for the buttons */}
        <tr style={{ width: 'auto' }}>
          <td><Button setValue={() => setGood(good + 1)} name="good"/></td>
          <td><Button setValue={() => setNeutral(neutral + 1)} name="neutral"/></td>
          <td><Button setValue={() => setBad(bad + 1)} name="bad"/></td>
        </tr>
      {/* Then the statistics */}
      <tr>
        <th>
          <h1>statistics</h1>
        </th>
      </tr>
      {/* And finally it's data */}
      <tr>
        <td><Statistics good={good} bad={bad} neutral={neutral} /></td>
      </tr>
      </table>
    </div>
  )
}

export default App