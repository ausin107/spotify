export default function DateConvert({ data, className }) {
  const year = data.slice(0, 4)
  const month = data.slice(6, 7)
  const day = data.slice(9, 11)
  const date = day + '/' + month + '/' + year
  return <div className={className}>{date}</div>
}
