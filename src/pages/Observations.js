import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import timezone from 'dayjs/plugin/timezone'
import MaterialPaginationReactTable from '../components/Table.js'
dayjs.extend(utc)
dayjs.extend(advancedFormat)
dayjs.extend(timezone)

// API handler
const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

const DateTime = ({ value }) => {
  return dayjs(value).utc(true).format('M/D/YYYY - h:mm A z')
}

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
    <div className={className}>
      {value}
    </div>
  )
}

export default function Observations({ path }) {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries([...searchParams])
  console.log(params); // DEBUG:

  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      let res = await api.get(('observations'), {
        params: {
          path: path,
          params: params
        }
      })
      setData(res.data)
    })()
  }, [])

  const columns = useMemo(
    () => [
      {
        accessor: "DateTime",
        Header: "Date & Time",
        Cell: ({ value }) => <DateTime value={value} />
      },
      {
        accessor: "Status",
        Header: () => (<div style={{ textAlign: "center" }}>Status</div>),
        Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div>
      },
      {
        accessor: "AQSID",
        Header: "AQSID"
      },
      {
        accessor: "SiteName",
        Header: "Site Name"
      },
      {
        accessor: "City",
        Header: "City"
      },
      {
        accessor: "State",
        Header: "State"
      },
      {
        accessor: "PM25_AQI",
        Header: () => (<div style={{ textAlign: "center" }}>PM2.5 AQI</div>),
        Cell: ({ value }) => <AQIColor value={value} />
      }
    ],
    []
  )

  return (
      <MaterialPaginationReactTable columns={columns} data={data} />
  )
}
