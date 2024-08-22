// SignUp.jsx
import "../styles/signup/styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username, action, imageName } = location.state || {};

  const [formData, setFormData] = useState({
    currentPass: "",
    newPass: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPass !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const sendData = {
      currentPass: formData.currentPass,
      newPass: formData.newPass,
      email: email,
      username: username,
      action: action,
    };

    axios
      .post(
        "http://localhost/ipots-kids-app/ipots-server/change_password.php",
        JSON.stringify(sendData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        // console.log("Response:", result.data);
        if (result.data && result.data.status === "success") {
          alert("Password is changed successfully");
          // If the password update is successful
          const profileRoute = `/${action}-profile`;
          navigate(profileRoute, {
            state: {
              email,
              username,
              action,
              imageName,
              password: formData.newPass,
            },
          });
        } else {
          // If there is an error, display the message
          const errorMessage =
            result.data?.message || "An unexpected error occurred.";
          //   console.error("Error Message from Server:", errorMessage);
          alert(errorMessage);
        }
      })
      .catch((error) => {
        alert("There was an error!", error);
      });
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Registration</h2>
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        {/* {success && <div className="alert alert-success">{success}</div>} */}
        <div className=" signup-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="email" className="form-label input-label">
                Current Password <span className="required">*</span>
              </label>
              <input
                type="password"
                className="form-control form-box input-placeholder"
                id="currentPass"
                placeholder="Enter your Current Password"
                name="currentPass"
                value={formData.currentPass}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container input-space">
              <label htmlFor="password" className="form-label input-label">
                New Password <span className="required">*</span>
              </label>
              <input
                type="password"
                className="form-control form-box input-placeholder"
                id="newPass"
                name="newPass"
                placeholder="Enter your new password"
                value={formData.newPass}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container input-space">
              <label
                htmlFor="confirmPassword"
                className="form-label input-label"
              >
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                className="form-control form-box input-placeholder"
                id="confirmPassword"
                placeholder="Re-enter your Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className=" button-format buttonColor">
                Next
              </button>
              <Link to={`/${action}-profile`}>
                <button className="buttonEmpty button-format">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
