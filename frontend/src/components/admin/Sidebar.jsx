import React from 'react'
import { Link } from 'react-router-dom'


export const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
        <nav id="sidebar">
            <ul className="list-unstyled components">
                <li>
                    <Link to="/admin/dashboard"><i className='fa fa-tachometer-alt'></i> Dashboard</Link>
                </li>

                <li className='dropdown'>
                    <Link to="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropbtn"><i className='fa fa-box-open'></i> Products</Link>
                    <ul className="dropdown-content" id="productSubmenu">
                        <li>
                            <Link to="/admin/products"><i className='fa fa-clipboard-list'></i> All</Link>
                        </li>
                        <li>
                            <Link to="/admin/product"><i className='fa fa-plus'></i> Create</Link>
                        </li>
                    </ul>
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
