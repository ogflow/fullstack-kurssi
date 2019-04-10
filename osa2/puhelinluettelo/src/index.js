import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import App from './components/App'
import Notification from './components/Notification'

const AddressBook = () => {
  const [ notification, setNotification ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('default')

  const showNotification = (message, type) => {
    setNotification(message)
    setNotificationType(type || 'default')
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <>
      <App
        showNotification={showNotification} />
      <Notification
        message={notification}
        type={notificationType} />
    </>
  )
}

ReactDOM.render(
  <AddressBook />,
  document.getElementById('root')
)