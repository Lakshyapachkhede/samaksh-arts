import './Navbar.css';
import logo from "../../assets/logo.jpg";
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>

      <div className='logo'>
        <Link to="/" className='d-f'>
          <img src={logo} />
        </Link>
        Samaksh Arts
      </div>


      <ul>
        <li><NavLink to="/" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>home</NavLink></li>
        <li><NavLink to="/gallery" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>gallery</NavLink></li>
        <li><NavLink to="/shop" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>shop</NavLink></li>
        <li><NavLink to="/kit" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>my kit</NavLink></li>
        <li><NavLink to="/contact" className={({isActive}) => isActive ? "nav-link nav-link-active" : "nav-link"}>contact</NavLink></li>
      </ul>




    </nav>
  )
}

export default Navbar