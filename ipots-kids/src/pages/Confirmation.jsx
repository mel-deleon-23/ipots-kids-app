// SignUp.jsx
import "../styles/signup/styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    email,
    username,
    action,
    accept,
    password,
    confirm,
    firstname,
    lastname,
  } = location.state || {};

  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const [code, setCode] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isError, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [nextPage, setNextPage] = useState(null);

  const formatNumber = (value) => {
    // Remove non-numeric characters
    const cleaned = value.replace(/\D/g, "").slice(0, 6); // Limit to 6 digits
    // Format to `123-456` pattern
    const match = cleaned.match(/^(\d{1,3})(\d{0,3})$/);
    if (match) {
      return `${match[1]}${match[2] ? "-" + match[2] : ""}`;
    }
    return value;
  };

  const handleChange = (e) => {
    const formattedValue = formatNumber(e.target.value);
    setCode(formattedValue);
    if (formattedValue.trim() !== "") {
      setIsInvalid(false); // Reset invalid flag if input is not empty
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() === "") {
      setIsInvalid(true); // Set invalid if input is empty
    } else {
      // Remove dashes from the code
      const cleanCode = code.replace(/-/g, "");

      const sendData = {
        email: email,
        code: cleanCode,
      };
      axios
        .post(
          "http://localhost/ipots-kids-app/ipots-server/verified_code.php",
          sendData
        )
        .then((result) => {
          if (result.data.status === "success") {
            setModalContent("CONFIRMATION SUCCESSFUL"); // Set modal content
            setShowModal(true);
            setNextPage("/dateofbirth"); // Set the next page
          } else {
            setError(true);
            // alert("Invalid verification code. Please try again.");
          }
        })
        .catch((error) => {
          alert("There was an error!", error);
        });
    }
  };

  const handleResend = () => {
    axios
      .post("http://localhost/ipots-kids-app/ipots-server/resend_code.php", {
        email,
      })
      .then((result) => {
        if (result.data.status === "success") {
          setModalContent("RESENT CONFIRMATION CODE");
          setShowModal(true);
        } else {
          alert("Failed to resend verification code. Please try again.");
        }
      })
      .catch((error) => {
        alert("There was an error!", error);
      });
  };

  const handleClose = () => {
    setShowModal(false);
    if (nextPage) {
      navigate(nextPage, {
        state: {
          email,
          username,
          action,
          accept,
          password,
          firstname,
          lastname,
          confirm,
        },
      });
    }
  };

  return (
    <div className="container-fluid space">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Confirm Your Email</h2>
        <img className="mailIm" src={`/images/mail.png`} alt="mail" />
        <p className="confirmP">
          A confirmation email has been sent to {email}
        </p>
        <div className=" signup-box d-flex flex-column justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div
              className={`code-input ${isInvalid ? "code-invalid" : ""} ${
                isError ? "code-invalid" : ""
              }`}
            >
              <input
                type="text"
                className="form-control form-box code-placeholder"
                id="code"
                placeholder="XXX-XXX"
                name="code"
                value={code}
                onChange={handleChange}
                required
                onInvalid={() => setIsInvalid(true)} // Set invalid when input is invalid
              />
              {isInvalid && (
                <p className="error-text">Please type the verification code</p>
              )}
              {isError && (
                <p className="error-text">Incorrect code. Please retype.</p>
              )}
            </div>

            <div className="button-box d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className=" button-format buttonColor">
                Next
              </button>
              <Link to="/signup" state={{ username, action, accept, confirm }}>
                <button className="buttonEmpty button-format">Back</button>
              </Link>
              <button
                type="button"
                className="buttonEmpty button-format"
                onClick={handleResend}
              >
                Resend Confirmation
              </button>
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
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "CONFIRMATION SUCCESSFUL" ? (
            <>
              <img className="icon-modal" src="/images/check.png" alt="check" />
            </>
          ) : (
            <p>Your confirmation code has been resent.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
