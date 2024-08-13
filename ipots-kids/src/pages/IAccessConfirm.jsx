import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function IAccessConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const action = location.state?.action || "kids";
  const accept = location.state?.accept;
  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>Would you like to create an account?</h2>
          <img className="vector" src={`/images/Vector.png`} alt="vector" />
          <div className="content">
            <p>Creating an account allows you to:</p>
            <ul className="paragraph list">
              <li>
                Save your <strong>medical conditions.</strong>
              </li>
              <li>
                Save relevant <strong>accessibility accommodations.</strong>
              </li>
              <li>Easily refer to your saved content in your profile.</li>
            </ul>
          </div>
          <div className="button-box d-flex flex-column justify-content-center align-items-center">
            <Link to="/details" state={{ action, accept, confirm: 1 }}>
              <button type="submit" className="button-format buttonColor">
                Yes, Please
              </button>
            </Link>
            <Link to="/options">
              <button className="buttonEmpty button-format">
                No, I’m okay
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
