import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
    return (
        <>
            <div className='admin-con'>
                <div className="left">
                    <div className="admin-links">
                        <NavLink to="paintings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-image fa-lg"></i> Paintings
                        </NavLink>
                        <NavLink to="manage-kit" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-palette fa-lg"></i> Manage Kit
                        </NavLink>
                        <NavLink to="contacts" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fa-solid fa-address-book fa-lg"></i> Contacts
                        </NavLink>

                    </div>


                </div>
                <div className="right">

                    <Outlet />

                </div>

            </div>


        </>


    )
}
