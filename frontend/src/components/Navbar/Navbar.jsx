import './Navbar.css';
import logo from "../../assets/logo.jpg";
import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';


function Navbar() {

  const [navOpen, setNavOpen] = useState(false);

  



  return (
    <nav>

      <div className='logo'>
        <Link to="/" className='d-f'>
          <img src={logo} />
        </Link>
        Samaksh Arts
      </div>

      <div onClick={()=>{setNavOpen(true);}}><i className="fa-solid fa-bars fa-2x navbar-icon"  style={{ color: "#ffffff" }}></i></div>

      <ul className={navOpen? "nav-bar-open": ""}>
        <li><i className="fa-solid fa-xmark fa-2x navbar-icon" onClick={()=>{setNavOpen(false)}} style={{ color: "#ffffff" }}></i></li>
        <li onClick={()=>{setNavOpen(false)}}><NavLink to="/" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>home</NavLink></li>
        <li onClick={()=>{setNavOpen(false)}}><NavLink to="/gallery" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>gallery</NavLink></li>
        <li onClick={()=>{setNavOpen(false)}}><NavLink to="/kit" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>my kit</NavLink></li>
        <li onClick={()=>{setNavOpen(false)}}><NavLink to="/contact" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>contact</NavLink></li>
      </ul>




    </nav>
  )
}

export default Navbar