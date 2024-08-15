import "../styles/signup/styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ParentalConsent() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    email,
    username,
    action,
    accept,
    password,
    dateOfBirth,
    firstname,
    lastname,
  } = location.state || {};

  useEffect(() => {
    if (accept !== 1) {
      navigate("/ineligible");
    }
  }, [accept, navigate]);

  const handleAccept = () => {
    if (action === "iaccess") {
      navigate("/location", {
        state: {
          email,
          username,
          password,
          action,
          accept,
          dateOfBirth,
          parental: 1,
          firstname,
          lastname,
        },
      });
    } else {
      navigate("/avatars", {
        state: {
          email,
          username,
          password,
          action,
          accept,
          dateOfBirth,
          parental: 1,
        },
      });
    }
  };

  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>Parental Consent Required</h2>
          <p className="sub">
            To continue, a parent or guardian must provide consent:
          </p>
          <div className="content">
            <h2>iPOTS KIDS Parental Consent</h2>
            <p>By proceeding, you acknowledge and agree to the following:</p>
            <p className="paragraph">
              Access and Management: As a registered user, you will have access
              to specific features and content tailored to your role (Teacher,
              Parent, or iAccess). You can manage your profile, access
              educational resources, and interact with the app's content.
            </p>
            <p className="paragraph">
              Privacy and Safety: We prioritize your privacy and data security.
              All personal information and activity data will be securely stored
              and only accessible by authorized app personnel. We will not share
              your information with third parties without your consent.
            </p>
            <p className="paragraph">
              Educational Purpose: The iPOTS app is designed to educate users
              about POTS syndrome through engaging and age-appropriate content.
              Your participation and feedback are crucial to enhancing the
              learning experience for all users.
            </p>
            <p className="paragraph">
              Contact Information: Should you have any questions or concerns
              regarding your use of the app, please contact our support team.
            </p>
          </div>
          <div className="buttonBox d-flex flex-column justify-content-center align-items-center">
            <button
              onClick={handleAccept}
              className=" button-format buttonConsent buttonAccept"
            >
              ACCEPT
            </button>
            <Link to="/parental-ineligible">
              <button className=" button-format buttonConsent buttonDecline">
                DECLINE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
