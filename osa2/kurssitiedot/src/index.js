import React from 'react'
import ReactDOM from 'react-dom'

import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          id: 1,
          name: 'Reactin perusteet',
          exercises: 10
        },
        {
          id: 2,
          name: 'Tiedonvälitys propseilla',
          exercises: 7
        },
        {
          id: 3,
          name: 'Komponenttien tila',
          exercises: 14
        }
      ]
    },
    {
      name: 'Hustling with React',
      id: 2,
      parts: [
        {
          id: 1,
          name: 'Do flow with me',
          exercises: 6
        },
        {
          id: 2,
          name: 'Slap kitty to look sexy',
          exercises: 7
        },
        {
          id: 3,
          name: 'Annoyiah Blah',
          exercises: 12
        }
      ]
    }
  ]

  const items = courses.map(course =>
    <Course 
      key={course.id}
      course={course} 
    />
  )

  return (
    <>
      {items}
    </>
  );
};

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)