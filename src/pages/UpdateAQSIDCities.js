import axios from 'axios'
import { useState, useEffect } from 'react'

const api = axios.create({
  baseURL: '/api',
  timeout: 6e4
})

export default function UpdateAQSIDCities() {
  const [data, setData] = useState([])
  const [axiosError, setAxiosError] = useState([])

  useEffect(() => {
    (async () => {
      setAxiosError([])
      setData([])

      try {
        let res = await api.patch('aqsid/cities')
        setData(res.data)
      } catch (error) {
        setAxiosError(error)
      }
    })()
  }, [])

  return (
    axiosError.length === 0
    ? data.length === 0
      ? <p>Updating...</p>
      : <p>{data.toString()}</p>
    : <p>{axiosError.toString()}</p>
  )
}
