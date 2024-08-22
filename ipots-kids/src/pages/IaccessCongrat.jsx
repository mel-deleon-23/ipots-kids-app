import "../styles/signup/styles.css";
import { Link, useLocation } from "react-router-dom";

export default function IaccessCongratulation() {
  const location = useLocation();
  const {
    email,
    username,
    password,
    firstname,
    lastname,
    imageName,
    action,
    accept,
  } = location.state || {};
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>Congratulations!</h2>
          <img className="" src={"/images/congrat/iaccess.png"} alt="iaccess" />
          <h2 className="title">Welcome to iACCESS!</h2>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Link
              to="/iaccess-profile"
              state={{
                email,
                username,
                password,
                firstname,
                lastname,
                imageName,
                action,
                accept,
              }}
            >
              <button className=" button-format buttonColor">Next</button>
            </Link>
            <Link to="/options" state={{ email, username, action, accept }}>
              <button className=" button-format buttonEmpty">
                iPOTS KIDS Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
