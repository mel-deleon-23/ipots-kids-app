import "../styles/signup/styles.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Auth"; // Import AuthContext

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login function from context
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost/ipots-kids-app/ipots-server/signin.php",
        formData
      );

      if (response.data.success) {
        // Save the token and other session data
        const expireTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        const sessionData = {
          token: response.data.token,
          expiration: expireTime,
        };
        localStorage.setItem("sessionData", JSON.stringify(sessionData));

        // Update Auth context
        login(response.data.token);

        navigate("/trivia");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="container-fluid space">
      <div className=" d-flex flex-column justify-content-center align-items-center">
        <h2>Login Information</h2>
        <div className=" signup-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="username" className="form-label input-label">
                Username <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control form-box input-placeholder"
                id="username"
                placeholder="Enter your Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container input-space">
              <label htmlFor="password" className="form-label input-label">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                className="form-control form-box input-placeholder"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className=" button-format buttonColor">
                Sign in
              </button>
              <Link to="/home">
                <button className="buttonEmpty button-format">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
