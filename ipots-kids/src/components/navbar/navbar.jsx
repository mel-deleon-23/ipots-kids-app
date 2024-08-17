import "./navbar.css";
import logo from "../../assets/iPOTS logo.png"
import login_logo from "../../assets/login-logo.png"

const Navbar = () => {
  return(
    <nav>
        <a href="/home" className="logo-img"><img src={logo} alt="logo" /></a>
        <label htmlFor="btn" className="icon"><span className="fa fa-bars"></span></label>
        <input type="checkbox" id="btn" />
        <ul>
          <li>
          <label htmlFor="homebtn-1" className="show">HOME</label>
            <a href="/">HOME</a></li>
          <li>
          <label htmlFor="btn-1" className="show">iPOTS +</label>
            <a href="/ipots">iPOTS</a>
            <input type="checkbox" id="btn-1" />
              <ul>
                <li><a href="">Articles</a></li>
              </ul>
          </li>
          <li>
            <label htmlFor="btn-2" className="show">iACCESS +</label>
            <a href="/iaccess">iACCESS</a>
            <input type="checkbox" id="btn-2" />
            <ul>
              <li><a href="">My Accommodation</a></li>
              <li><a href="">Disability Category</a></li>
              <li><a href="">Medical Conditions</a></li>
              <li><a href="">About iACCESS</a></li>
            </ul>
          </li>
          <li>
            <label htmlFor="btn-3" className="show">iPOTS KIDS +</label>
            <a href="/contact">iPOTS KIDS</a>
            <input type="checkbox" id="btn-3" />
            <ul>
              <li><a href="">Read</a></li>
              <li><a href="">Play</a></li>
              <li><a href="/benefits">About iPOTS KIDS</a></li>
              <li><a href="">Store</a></li>
            </ul>
          </li>
          <li>
            <label htmlFor="btn-4" className="show">ABOUT +</label>
            <a href="/about">ABOUT</a>
            <input type="checkbox" id="btn-4" />
            <ul>
              <li><a href="">About Us</a></li>
              <li><a href="">Impact</a></li>
              <li><a href="">Get Involved</a></li>
              <li><a href="">Store</a></li>
              <li><a href="">Policies</a></li>
              <li><a href="">Contact Us</a></li>
            </ul>
          </li>
          <li><a href="/" className="login-logo"><img src={login_logo} alt="" /></a></li>
        </ul>
    </nav>
  );   
}
export default Navbar;