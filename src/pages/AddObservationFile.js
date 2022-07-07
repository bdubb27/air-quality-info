import axios from 'axios'
import { useState, useEffect } from 'react'

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000
})

const AddObservationFile = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      let res = await api.get('observations/add')
      setData(res.data)
    })()
  }, [])

  return (
    <p>{data.length === 0 ? "Loading..." : JSON.stringify(data)}</p>
  )
}

export default AddObservationFile
