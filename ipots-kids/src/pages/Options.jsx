import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Options() {
  const location = useLocation();
  const navigate = useNavigate();
  // Check if 'accept' is present in the state; otherwise, use a fallback value
  const accept = location.state?.accept ?? 0;
  const { email, username, action } = location.state || {};

  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img className="" src={`/images/logo.png`} alt="logo" />
        <div className="button-box d-flex flex-column justify-content-center align-items-center">
          {action === "iaccess" ? (
            <>
              <Link
                to="/username"
                state={{ email, username, action: "kids", accept }}
              >
                <button className="option-button buttonColor">
                  iPOTS KIDS
                </button>
              </Link>
              <Link
                to="/username"
                state={{ email, username, action: "teachers", accept }}
              >
                <button className="option-button buttonColor">
                  iPOTS TEACHERS
                </button>
              </Link>
              <Link
                to="/username"
                state={{ email, username, action: "parents", accept }}
              >
                <button className="option-button buttonColor">
                  iPOTS PARENTS
                </button>
              </Link>
            </>
          ) : (
            // Render all 4 buttons if action is not 'iaccess'
            <>
              <Link to="/username" state={{ action: "kids", accept }}>
                <button className="option-button buttonColor">
                  iPOTS KIDS
                </button>
              </Link>
              <Link to="/username" state={{ action: "teachers", accept }}>
                <button className="option-button buttonColor">
                  iPOTS TEACHERS
                </button>
              </Link>
              <Link to="/username" state={{ action: "parents", accept }}>
                <button className="option-button buttonColor">
                  iPOTS PARENTS
                </button>
              </Link>
              <Link
                to="/iaccess-confirmation"
                state={{ action: "iaccess", accept }}
              >
                <button className="option-button buttonColor">iACCESS</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
