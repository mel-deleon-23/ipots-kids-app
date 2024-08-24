import "../styles/signup/styles.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <img className="logoIpot" src={`/images/logo.png`} alt="logo" />
          <div className="button-box d-flex flex-column justify-content-center align-items-center">
            <Link to="/signIn">
              <button className=" button-format buttonColor">Sign in</button>
            </Link>
            <Link to="/consent">
              <button className=" button-format buttonEmpty">Sign up</button>
            </Link>
            <Link to="/google">
              <button className=" button-format buttonGoogle d-flex flex-row justify-content-center align-items-center">
                <img
                  className="google"
                  src={`/images/google.png`}
                  alt="google"
                />{" "}
                Sign up with Google
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
