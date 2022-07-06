import axios from 'axios'
import { useEffect, useState } from 'react'

// API handler
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000
})

function Row(props) {
  return (
    <li>{props.aqsid}</li>
  )
}

const Observations = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    api.get('observations')
      .then((res) => setData(res.data))
  }, [])

  return (
    <>
      <h1>Observations</h1>
      <ul>{!data ? "Loading..." : data.map(({AQSID}) => <Row aqsid={AQSID} />)}</ul>
    </>
  )
}

export default Observations
