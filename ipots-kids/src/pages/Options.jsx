import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Options() {
  const location = useLocation();
  const navigate = useNavigate();
  const accept = location.state?.action;
  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <img className="" src={`/images/logo.png`} alt="logo" />
          <div className="button-box d-flex flex-column justify-content-center align-items-center">
            <Link to="/username" state={{ action: "kids", accept }}>
              <button className=" option-button buttonColor">iPOTS KIDS</button>
            </Link>
            <Link to="/username" state={{ action: "teachers", accept }}>
              <button className=" option-button buttonColor">
                iPOTS TEACHERS
              </button>
            </Link>
            <Link to="/username" state={{ action: "parents", accept }}>
              <button className=" option-button buttonColor">
                iPOTS PARENTS
              </button>
            </Link>
            <Link to="/username" state={{ action: "iAccess", accept }}>
              <button className=" option-button buttonColor">iACCESS</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
