import "../styles/signup/styles.css";
import { Link, useLocation } from "react-router-dom";

export default function Kidprofile() {
  const location = useLocation();
  const { email, username, password, imageName, action } = location.state || {};

  const maskPassword = (password) => {
    return "*".repeat(password.length);
  };

  return (
    <div className="App">
      <h2>User Profile</h2>
      <div className="profile-container">
        <img
          src={`/images/avartars/${action}/${imageName}.png`}
          alt="User Avatar"
        />
        <Link to="/avatars">
          <h2>Change profile picture</h2>
        </Link>
        <h3 className="userName">@{username}</h3>
        <div>
          <p className="profileInfor">{email}</p>
        </div>
        <div>
          <p className="profileInfor">{maskPassword(password)}</p>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Link
          to="/"
          state={{
            email,
            username,
            password,
            imageName,
            action,
          }}
        >
          <button className=" button-format buttonColor">Next</button>
        </Link>
        <Link to="/logout">
          <button className=" button-format buttonEmpty">Logout</button>
        </Link>
      </div>
    </div>
  );
}
