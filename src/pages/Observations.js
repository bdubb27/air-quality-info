import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
import Table from '../components/Table.js'

// API handler
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000
})

const Observations = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      let res = await api.get('observations')
      setData(res.data)
    })()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: "Site Name",
        accessor: "SiteName"
      },
      {
        Header: "Status",
        accessor: "Status"
      },
      {
        Header: "PM2.5 AQI",
        accessor: "PM25_AQI"
      }
    ],
    []
  )

  return (
      <Table columns={columns} data={data} />
  )
}

export default Observations
