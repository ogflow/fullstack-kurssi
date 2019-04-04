import React from 'react'
import ReactDOM from 'react-dom'

import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const data = [
    {
      title: 'Reactin perusteet',
      exercises: 10
    },
    {
      title: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      title: 'Komponenttien tila',
      exercises: 14
    }
  ]
  const total = data.reduce((a, b) => ({exercises: a.exercises + b.exercises}))

  return (
    <>
      <Header title={course} />
      <Content data={data} />
      <Total total={total.exercises} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))