import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // button-set
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>rate us</h1>
      <Button text="good" clickHandler={() => setGood(good + 1)} />
      <Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
      <Button text="bad" clickHandler={() => setBad(bad + 1)} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad} />
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  return (
    <>
      <h1>statistic</h1>
      {(total) ? (
        <table>
          <tbody>
            <StatRow text="good" value={good} />
            <StatRow text="neutral" value={neutral} />
            <StatRow text="bad" value={bad} />
            <StatRow text="total" value={total} />
            <StatRow text="average" value={total / 3} />
            <StatRow text="positive" value={good / total * 100} />
          </tbody>
        </table>
      ) : (
        <p>no rating yet</p>
      )}
    </>
  )
}

const StatRow = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({text, clickHandler}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
)