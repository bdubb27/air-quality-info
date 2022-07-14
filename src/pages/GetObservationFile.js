import axios from 'axios'
import { useState, useEffect } from 'react'

const api = axios.create({
  baseURL: '/api',
  timeout: 300
})

export default function GetObservationFile() {
  const [data, setData] = useState([])
  const [axiosError, setAxiosError] = useState([])

  useEffect(() => {
    (async () => {
      setAxiosError([])
      setData([])

      try {
        let res = await api.get('observations/get')

        res.status === 200 && res.data.length === 0
        ? setAxiosError("No results...")
        : setData(res.data)

      } catch (error) {
        setAxiosError(error)
      }
    })()
  }, [])

  return (
    axiosError.length === 0
    ? data.length === 0
      ? <p>Loading...</p>
      : <p>{data.toString()}</p>
    : <p>{axiosError.toString()}</p>
  )
}
