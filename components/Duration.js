import React from 'react'

export default function Duration({ time, className }) {
  const handleDuration = () => {
    let hours = parseInt(time / 3600)
    let minutes = parseInt((time - hours * 3600) / 60)
    let seconds = time - hours * 3600 - minutes * 60
    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 10 ? '0' + minutes : minutes
    let result = hours > 0 ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds
    return result
  }
  return <div className={className}>{handleDuration()}</div>
}
