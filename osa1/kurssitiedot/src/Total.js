import React from 'react'

const Total = (props) => {
  return (
    <p>
      yhteensä {props.parts.reduce((a, b) => ({exercises: a.exercises + b.exercises}))} tehtävää
    </p>
  )
}

export default Total