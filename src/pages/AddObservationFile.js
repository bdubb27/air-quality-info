import axios from 'axios'
import { useState, useEffect } from 'react'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000
})

export default function AddObservationFile() {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      let res = await api.post('observations/add')
      setData(res.data)
    })()
  }, [])

  return (
    <p>{data.length === 0 ? "Loading..." : JSON.stringify(data)}</p>
  )
}
