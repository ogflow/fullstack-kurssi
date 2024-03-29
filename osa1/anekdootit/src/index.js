import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const handleShowNext = () => {
    let next = Math.floor(Math.random() * anecdotes.length)
    if (next === selected) {
      return handleShowNext()
    }
    setSelected(next)
  }

  const [votes, setVotes] = useState(anecdotes.map(i => 0))
  const upvoted = votes.indexOf(Math.max(...votes))
  const handleRating = (n) => {
    let updated = [...votes]
    updated[n] += 1
    setVotes(updated)
  }

  return (
    <>
      <Anecdote title="anecdote fo the day" 
        text={anecdotes[selected]} 
        votes={votes[selected]} />
      <br />
      <button onClick={() => handleRating(selected)}>
        upvote
      </button>
      <button onClick={() => handleShowNext()}>
        another joke please
      </button>
      <br />
      <Anecdote title="most upvoted joke" 
        text={anecdotes[upvoted]} 
        votes={votes[upvoted]} />
    </>
  )
}

const Anecdote = ({title, text, votes}) => {
  return (
    <>
      <h1>{title}</h1>
      {text}
      <br />
      Votes: {votes}
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)