import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (message.includes('Added')) {
      return (
        <div className='success'>
          {message}
        </div>
      )
    }
    if (message.includes('Deleted')) {
      return (
        <div className='success'>
          {message}
        </div>
      )
    }
    if (message.includes('Updated')) {
      return (
        <div className='success'>
          {message}
        </div>
      )
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

export default Notification