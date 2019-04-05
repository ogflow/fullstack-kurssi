import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((a, b) => (
    { exercises: a.exercises + b.exercises }
  ))

  return (
    <p>
      yhteensä {total.exercises} tehtävää
    </p>
  )
}

export default Total