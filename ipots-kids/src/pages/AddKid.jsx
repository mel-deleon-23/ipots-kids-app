import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"; // Import AuthContext
import axios from "axios";

export default function AddKids() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Add state for checkbox
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate("/signIn");
  }

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsInvalid(false); // Reset invalid flag if input is not empty
    }
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tokenData = JSON.parse(localStorage.getItem("sessionData"));
    const token = tokenData?.token;
    const supervisor_id = user.data.id; // Extract supervisor_id from user context

    if (!token || !supervisor_id) {
      navigate("/signIn");
      return;
    }

    if (!isCheckboxChecked) {
      setIsInvalid(true); // Show red border if checkbox is not checked
      return;
    }

    const sendData = {
      username: username,
      supervisor_id: supervisor_id, // Include supervisor_id in the request
    };
    axios
      .post(
        "http://localhost/ipots-kids-app/ipots-server/kids_adding.php",
        JSON.stringify(sendData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        if (result.data && result.data.status === "success") {
          navigate("/manage-kids");
        } else {
          const errorMessage =
            result.data?.message || "An unexpected error occurred.";
          alert("Failed to add kid: " + errorMessage);
        }
      })
      .catch((error) => {
        alert("There was an error!", error);
      });
  };

  const handleBack = () => {
    navigate("/manage-kids");
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Connect iPOTS KIDS User</h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="username-box">
              <div
                className={`input-container  ${
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
                  value={username}
                  onChange={handleChange}
                  required
                  onInvalid={() => setIsInvalid(true)}
                />
              </div>
              <div
                className={`form-check form-check-inline ${
                  isInvalid && !isCheckboxChecked ? "checkbox-invalid" : ""
                }`}
                style={{ margin: "20px 20px" }}
              >
                <input
                  className="form-check-input"
                  style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                  id="certify"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label label-allergies"
                  style={{ margin: "3px 0" }}
                  htmlFor="certify"
                >
                  <h5>I certify this is my child</h5>
                </label>
              </div>
            </div>
            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="button-format buttonColor">
                Next
              </button>
              <button
                className="button-format buttonEmpty"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
