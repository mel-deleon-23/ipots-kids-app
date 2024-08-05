import "../styles/signup/styles.css";
import { Link } from "react-router-dom";

export default function Ineligible() {
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>You are Ineligible for iPOTS KIDS</h2>
          <img className="" src="/images/sad.png" alt="sad" />
          <h2 className="title">Consent is Needed</h2>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Link to="/">
              <button className=" button-format buttonColor">Home</button>
            </Link>
            <Link to="/consent">
              <button className=" button-format buttonEmpty">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
