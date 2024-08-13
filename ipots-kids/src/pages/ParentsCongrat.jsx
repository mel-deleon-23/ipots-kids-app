import "../styles/signup/styles.css";
import { Link, useLocation } from "react-router-dom";

export default function ParentsCongratulation() {
  const location = useLocation();
  const { email, username, password, imageName, action } = location.state || {};
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>Congratulations!</h2>
          <img className="" src={"/images/congrat/parents.png"} alt="kids" />
          <h2 className="title">Welcome to iPOTS PARENTS!</h2>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Link
              to="/parents-profile"
              state={{
                email,
                username,
                password,
                imageName,
                action,
              }}
            >
              <button className=" button-format buttonColor">Next</button>
            </Link>
            <Link to="/iaccess">
              <button className=" button-format buttonEmpty">
                Sign Up for iACCESS
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
