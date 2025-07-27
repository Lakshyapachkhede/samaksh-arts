import React from 'react'
import { NavLink } from 'react-router-dom';
import './Footer.css'

export default function Footer() {
    return (
        <footer>
            <div className="footer-top">
                <div className="footer-icons">
                    <a href="https://youtube.com/@samaksh_arts_09?si=NXc2BV-3Lb3xh_wL" target='_blank'>
                        <i className="fa-brands fa-youtube fa-2x"></i>
                    </a>

                    <a href="https://www.instagram.com/samaksh_arts_?igsh=M3lyZmtja3QzbXJj" target='_blank'>
                        <i className="fa-brands fa-instagram fa-2x"></i>
                    </a>

                </div>

                <div className="footer-links">

                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>home</NavLink>
                    <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>gallery</NavLink>
                    <NavLink to="/kit" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>my kit</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>contact</NavLink>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Samaksh Kushwah</p>
                <p>Designed with <i className="fa-solid fa-heart"></i> by <a href="https://lakshyapachkhede.github.io/Lakshyapachkhede/" target='_blank'>Lakshya Pachkhede</a></p>
                <p></p>
            </div>

        </footer>
    )
}
