import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, Home, Observations, GetObservationFile, AddObservationFile, NoPage } from './pages/index.js'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="observations" element={<Observations />}>
            <Route path=":path" element={<Observations />} />
          </Route>
          <Route path="observations/get" element={<GetObservationFile />} />
          <Route path="observations/add" element={<AddObservationFile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />)
