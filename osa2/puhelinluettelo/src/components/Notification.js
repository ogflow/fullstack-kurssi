import React, { useState, useEffect } from 'react'

const Notification = ({ message, time }) => {
  if (message === null) return null

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default Notification