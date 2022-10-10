export default function DateConvert({ data, className }) {
  const [year, month, day] = data.split('-')
  const result = `${Number(day)}/${Number(month)}/${Number(year)}`
  return <div className={className}>{result}</div>
}
