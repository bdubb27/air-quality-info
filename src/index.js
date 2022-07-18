import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, Home, Observations, GetObservationFile, AddObservationFile, UpdateAQSIDCities, NoPage } from './pages/index.js'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="observations">
            <Route index element={<Observations />} />
            <Route path=":path" element={<Observations />} />
            <Route path="get" element={<GetObservationFile />} />
            <Route path="add" element={<AddObservationFile />} />
          </Route>
          <Route path="aqsid">
            <Route index element={<NoPage />} />
            <Route path="cities" element={<UpdateAQSIDCities />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />)
