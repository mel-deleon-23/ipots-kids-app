import "../styles/signup/styles.css";
import { Link } from "react-router-dom";

export default function Consent() {
  return (
    <>
      <div className="container-fluid space">
        <div className=" d-flex flex-column justify-content-center align-items-center">
          <h2>User Consent Required</h2>
          <p className="sub">
            To continue, please review and accept the terms below.
          </p>
          <div className="content">
            <h2>General User Consent</h2>
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
            <Link to="/options" state={{ action: 1 }}>
              <button className=" button-format buttonConsent buttonAccept">
                ACCEPT
              </button>
            </Link>
            <Link to="/ineligible">
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
