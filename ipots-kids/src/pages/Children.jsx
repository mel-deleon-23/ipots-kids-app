import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Children() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, username, action, accept, password, dateOfBirth } =
    location.state || {};
  const [numberOfChildren, setNumberOfChildren] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      navigate("/avatars", {
        state: {
          email,
          username,
          password,
          dateOfBirth,
          action,
          accept,
          numberOfChildren,
        },
      });
    } else {
      setIsInvalid(true); // Set invalid if form is not valid
    }
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>How many children will you supervise?</h2>
        <div className=" signup-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className={`code-input ${isInvalid ? "code-invalid" : ""} `}>
              <input
                type="text"
                className="form-control form-box code-placeholder num-space"
                id="numberOfChildren"
                placeholder="X"
                name="numberOfChildren"
                value={numberOfChildren}
                onChange={(e) => setNumberOfChildren(e.target.value)}
                required
                onInvalid={() => setIsInvalid(true)} // Set invalid when input is invalid
              />
              {isInvalid && (
                <p className="error-text">
                  Please enter number of children you supervise{" "}
                </p>
              )}
            </div>

            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className=" button-format buttonColor">
                Next
              </button>
              <Link
                to="/dateofbirth"
                state={{
                  email,
                  username,
                  password,
                  dateOfBirth,
                  action,
                  accept,
                }}
              >
                <button className="buttonEmpty button-format">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
