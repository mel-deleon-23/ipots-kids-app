import "./navbar.css";
import logo from "../../assets/iPOTS logo.png"
import login_logo from "../../assets/login-logo.png"
import {FaBars, FaTimes} from "react-icons/fa"
import { useRef } from "react";

const Navbar = () => {
  const navRef = useRef();  

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }
  return(
    <header>
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
        <nav ref={navRef}>
            <a href="/">Home</a>
            <a href="/ipotskids">iPOTS KIDS</a>
            <a href="/iaccess">iACCESS</a>
            <a href="/benefits">About</a>
            <a href="/contact">Contact</a>
            <a href="/" className="login-logo"><img src={login_logo} alt="" /></a>
            <button className="nav-btn nav-close-btn" onClick={showNavBar}>
              <FaTimes/>
            </button>
        </nav>
        <button className="nav-btn" onClick={showNavBar}>
            <FaBars/>
        </button>
    </header>
  );
    
}
  
  export default Navbar;