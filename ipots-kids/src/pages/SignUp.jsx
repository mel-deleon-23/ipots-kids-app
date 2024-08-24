// SignUp.jsx
import "../styles/signup/styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const action = location.state?.action || "kids";
  const accept = location.state?.accept;
  const username = location.state?.username;
  const { firstname, lastname } = location.state || {};

  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // console.log(formData);
  };
  const handleClose = () => setShowModal(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setShowModal(true);
      return;
    }
    const sendData = {
      email: formData.email,
    };

    axios
      .post(
        "http://localhost/ipots-kids-app/ipots-server/sendVerificationCode.php",
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
          navigate("/confirmation", {
            state: {
              email: formData.email,
              username,
              action,
              accept,
              password: formData.password,
              firstname,
              lastname,
            },
          });
        } else {
          const errorMessage =
            result.data?.message || "An unexpected error occurred.";
          alert("Failed to send verification code: " + errorMessage);
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
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                className="form-control form-box input-placeholder"
                id="email"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-container input-space">
              <label htmlFor="password" className="form-label input-label">
                Create Password <span className="required">*</span>
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
              <Link to="/username" state={{ accept, action }}>
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
          <Modal.Title>PASSWORD MISMATCH</Modal.Title>
        </Modal.Header>
        <Modal.Body>Password do not match. Please re-enter.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
