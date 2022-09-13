export default function Duration({ time, isoTime, className }) {
  const IsoConverter = (isoTime) => {
    let duration = isoTime
    duration = duration.replace('PT', '')
    let [h, m, s] = [0, 0, 0]
    if (duration.includes('H') == false) {
      h = 0
      m = parseInt(duration.slice(0, duration.indexOf('M'))) * 60
      s = parseInt(duration.slice(duration.indexOf('M') + 1, duration.indexOf('S')))
    } else if (duration.includes('H') == true) {
      h = parseInt(duration.slice(0, duration.indexOf('H'))) * 3600
      m = parseInt(duration.slice(duration.indexOf('H') + 1, duration.indexOf('M'))) * 60
      s = parseInt(duration.slice(duration.indexOf('M') + 1, duration.indexOf('S')))
    }
    h = !!h ? h : 0
    m = !!m ? m : 0
    s = !!s ? s : 0
    let result = h + m + s
    return result
  }
  const handleDuration = (timeInSeconds) => {
    let hours = parseInt(timeInSeconds / 3600)
    let minutes = parseInt((timeInSeconds - hours * 3600) / 60)
    let seconds = parseInt(timeInSeconds - hours * 3600 - minutes * 60)
    seconds = seconds < 10 ? '0' + seconds : seconds
    minutes = minutes < 10 ? '0' + minutes : minutes
    let result = hours > 0 ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds
    return result
  }
  let result = '00:00'
  if (isoTime) {
    const seconds = IsoConverter(isoTime)
    result = handleDuration(seconds)
  } else if (time) {
    result = handleDuration(time)
  }
  return <div className={className}>{result}</div>
}
