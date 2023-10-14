import React from 'react'
import { Link } from 'react-router-dom'


export const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
        <nav id="sidebar">
            <ul className="list-unstyled components">
                <li>
                    <Link to="/dashboard"><i className='fa fa-tachometer-alt'></i> Dashboard</Link>
                </li>

                <li>
                    <Link to="/admin/users"><i className='fa fa-users'></i> Users</Link>
                </li>

                </ul>
            <ul className="list-unstyled CTAs">
                <li>
                    <Link to="/"><i className='fa fa-home'></i> Home</Link>
                </li>
            </ul>
                            
        </nav>
    </div>
  )
}
