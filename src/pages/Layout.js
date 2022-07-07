import { Outlet, Link } from "react-router-dom"
import '../Layout.css'

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/observations">Observations</Link>
          </li>
          <li>
            <Link to="/observations/get">Get Latest File</Link>
          </li>
          <li>
            <Link to="/observations/add">Add Latest to DB</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}
