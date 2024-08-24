// ChangePassword.jsx
import "../styles/signup/styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, username, action, imageName } = location.state || {};
  const [showModal, setShowModal] = useState(false);

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
        if (result.data && result.data.status === "success") {
          setShowModal(true); // Show the modal
        } else {
          const errorMessage =
            result.data?.message || "An unexpected error occurred.";
          alert(errorMessage);
        }
      })
      .catch((error) => {
        alert("There was an error!", error);
      });
  };

  const handleClose = () => {
    setShowModal(false);
    // Navigate to the desired profile page after closing the modal
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
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Change Password</h2>
        <div className="signup-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor="currentPass" className="form-label input-label">
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
              <label htmlFor="newPass" className="form-label input-label">
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
              <button type="submit" className="button-format buttonColor">
                Change Password
              </button>
              <Link to={`/${action}-profile`}>
                <button className="buttonEmpty button-format">Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header>
          <Modal.Title>SUCCESSFULLY CHANGED</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your password has been changed successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
