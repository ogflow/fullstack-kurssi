import React from 'react'
import Part from './Part'

const Content = (props) => {
  const items = props.data.map(({title, exercises}) => 
    <Part key={title}
      title={title}
      exercises={exercises} />
  )

  return (
    <>
      {items}
    </>
  )
}

export default Content