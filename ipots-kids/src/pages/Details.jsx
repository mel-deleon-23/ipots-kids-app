import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { action, accept, confirm } = location.state || {};

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
  });

  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      navigate("/signup", { state: { formData, action, accept, confirm } });
    } else {
      setIsInvalid(true); // Set invalid if form is not valid
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (e.target.value.trim() !== "") {
      setIsInvalid(false); // Reset invalid flag if input is not empty
    }
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Enter Details</h2>
        <div className="signup-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div
              className={`input-container ${isInvalid ? "input-invalid" : ""}`}
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
                value={formData.username}
                onChange={handleChange}
                required
                onInvalid={() => setIsInvalid(true)} // Set invalid when input is invalid
              />
            </div>

            <div className="input-container input-space">
              <label htmlFor="firstname" className="form-label input-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control form-box input-placeholder"
                id="firstname"
                placeholder="Enter your first name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="input-container input-space">
              <label htmlFor="lastname" className="form-label input-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control form-box input-placeholder"
                id="lastname"
                placeholder="Enter your last name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>

            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="button-format buttonColor">
                Next
              </button>
              <Link
                to="/iaccess-confirmation"
                state={{ action, accept, confirm }}
              >
                <button className="button-format buttonEmpty">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
