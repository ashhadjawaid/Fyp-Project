import React, { Fragment } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './admin.css'
import logo from '../../../public/assets/paw-white.png'
const Admin = () => {
  return (

       <Fragment>
      <header>
        <div className="container">
          <nav className="sidebar">
          <img src={logo} alt="" />
            <ul>
              <li>
                <NavLink to="/admin/users" activeClassName="active">Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/rescue-request" activeClassName="active">Rescue Request</NavLink>
              </li>
              <li>
                <NavLink to="/admin/shelters" activeClassName="active">Shelters</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="dashboard">
        <div className="container">
          <Outlet/>
        </div>
      </main>
    </Fragment>

  )
}

export default Admin
