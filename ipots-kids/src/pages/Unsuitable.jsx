import "../styles/signup/styles.css";
import { Link, useLocation } from "react-router-dom";

export default function Unsuitable() {
  const location = useLocation();
  const { email, username, action, accept, password } = location.state || {};
  let platform = "";
  if (action === "teachers") {
    platform = "iPOTS TEACHERS";
  } else {
    platform = "iPOTS PARENTS";
  }

  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>You are Ineligible for {platform}</h2>
          <img className="" src="/images/sad.png" alt="sad" />
          <h2 className="title">
            Please choose other options or change date of birth
          </h2>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Link to="/home">
              <button className=" button-format buttonColor">Home</button>
            </Link>
            <Link
              to="/dateofbirth"
              state={{ email, username, password, accept, action }}
            >
              <button className=" button-format buttonEmpty">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
