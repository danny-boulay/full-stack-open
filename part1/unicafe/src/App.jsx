import { useState } from 'react'

const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const Statistics = ({good, bad, neutral}) => {
  if(!(good || bad || neutral)){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad}/>
          <StatisticsLine text="average" value={((good - bad) / (good + neutral + bad)).toFixed(2)}/>
          <StatisticsLine text="positive" value={(good / (good + neutral + bad) * 100).toFixed(2) + " %"} />
        </tbody>
    </table>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
)
}

export default App
