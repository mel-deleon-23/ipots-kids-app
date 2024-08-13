import "../styles/signup/styles.css";
import { Link } from "react-router-dom";

export default function ParentalIneligible() {
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>You are Ineligible for iPOTS KIDS</h2>
          <img className="" src="/images/sad.png" alt="sad" />
          <h2 className="title">Parental Consent Needed</h2>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Link to="/">
              <button className=" button-format buttonColor">Next</button>
            </Link>
            <Link to="/parental">
              <button className=" button-format buttonEmpty">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
