import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Username() {
  const location = useLocation();
  const navigate = useNavigate();
  const action = location.state?.action || "kids";
  const accept = location.state?.accept;
  const [username, setUsername] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      navigate("/signup", { state: { username, action, accept } });
    } else {
      setIsInvalid(true); // Set invalid if form is not valid
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsInvalid(false); // Reset invalid flag if input is not empty
    }
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Select Username</h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div
              className={`input-container username-box ${
                isInvalid ? "input-invalid" : ""
              }`}
            >
              <label htmlFor="username" className="form-label input-label">
                Username <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control form-box input-placeholder"
                id="username"
                placeholder="Please enter your username"
                name="username"
                value={username}
                onChange={handleChange}
                required
                onInvalid={() => setIsInvalid(true)} // Set invalid when input is invalid
              />
            </div>

            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="button-format buttonColor">
                Next
              </button>
              <Link to="/">
                <button className="button-format buttonEmpty">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
