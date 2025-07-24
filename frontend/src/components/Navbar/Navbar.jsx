import './Navbar.css';
import logo from "../../assets/logo.jpg";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>

      <div className='logo'>
        <img src={logo} />
        Samaksh Arts
      </div>


      <ul>
        <li><Link to="/" className="nav-link">home</Link></li>
        <li><Link to="/gallery" className="nav-link">gallery</Link></li>
        <li><Link to="/shop" className="nav-link">shop</Link></li>
        <li><Link to="/kit" className="nav-link">my kit</Link></li>
        <li><Link to="/contact" className="nav-link">contact</Link></li>
      </ul>




    </nav>
  )
}

export default Navbar