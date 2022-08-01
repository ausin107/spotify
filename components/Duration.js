import React from 'react'

export default function Duration({ time }) {
  const handleDuration = () => {
    let minutes = parseInt(time / 60)
    let seconds = time - parseInt(time / 60) * 60
    seconds = seconds < 10 ? '0' + seconds : seconds
    let result = minutes + ':' + seconds
    return result
  }
  return <div className='text-navbarColor text-xs'>{handleDuration()}</div>
}
