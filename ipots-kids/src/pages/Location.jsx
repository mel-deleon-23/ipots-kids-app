import "../styles/signup/styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Location() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    email,
    username,
    password,
    action,
    accept,
    dateOfBirth,
    parental,
    firstname,
    lastname,
  } = location.state || {};

  const [formData, setFormData] = useState({
    city: "",
    country: "",
  });

  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the next page regardless of form validity
    navigate("/food-allergies", {
      state: {
        formData,
        email,
        username,
        password,
        action,
        accept,
        dateOfBirth,
        parental,
        firstname,
        lastname,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img className="" src={`/images/location.png`} alt="location" />
        <h2>Where do you live?</h2>
        <div className="signup-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="city" className="form-label input-label">
                City
              </label>
              <input
                type="text"
                className="form-control form-box input-placeholder"
                id="city"
                placeholder="Please enter your city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="input-container input-space">
              <label htmlFor="country" className="form-label input-label">
                Country
              </label>
              <input
                type="text"
                className="form-control form-box input-placeholder"
                id="country"
                placeholder="Enter your country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="button-format buttonColor">
                Next
              </button>
              <Link
                to="/parental"
                state={{
                  email,
                  username,
                  password,
                  action,
                  accept,
                  dateOfBirth,
                }}
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
