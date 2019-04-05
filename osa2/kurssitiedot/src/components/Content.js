import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  const items = parts.map(({id, name, exercises}) => 
    <Part 
      key={id}
      name={name}
      exercises={exercises} 
    />
  )

  return (
    <>
      {items}
    </>
  )
}

export default Content