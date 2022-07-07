import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
import MaterialPaginationReactTable from '../components/Table.js'

// API handler
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000
})

const AQIColor = ({ value }) => {
  let className = 'aqi-badge '
  switch (true) {
    default:
    case (value == null):
      return
    case (value <= 50):
      className += 'green'
      break
    case (value <= 100):
      className += 'yellow'
      break
    case (value <= 150):
      className += 'orange'
      break
    case (value <= 200):
      className += 'red'
      break
    case (value <= 300):
      className += 'purple'
      break
    case (value > 300):
      className += 'maroon'
      break
  }

  return (
    <span className={className}>
      {value}
    </span>
  )
}

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
        accessor: "SiteName",
        Header: "Site Name"
      },
      {
        accessor: "Status",
        Header: "Status"
      },
      {
        accessor: "PM25_AQI",
        Header: "PM2.5 AQI",
        Cell: ({ value }) => <AQIColor value={value} />
      }
    ],
    []
  )

  return (
      <MaterialPaginationReactTable columns={columns} data={data} />
  )
}

export default Observations
