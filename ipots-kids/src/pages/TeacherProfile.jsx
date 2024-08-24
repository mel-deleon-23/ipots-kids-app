import "../styles/signup/styles.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import axios from "axios";

export default function TeacherProfile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate("/signIn");
  }

  const [profileData, setProfileData] = useState(null);

  // Fetch user details from server
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("sessionData"))?.token;
        if (!token) {
          navigate("/signIn");
          return;
        }

        const response = await axios.get(
          "http://localhost/ipots-kids-app/ipots-server/profile.php",
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              id: user.data.id,
              action: user.data.action,
              type: user.data.type,
            },
          }
        );

        if (response.data.status === "success") {
          setProfileData(response.data.user);
          // console.log("Profile Data:", response.data.user); // Log profileData
        } else {
          console.error("Failed to fetch user details:", response.data.message);
          navigate("/signIn");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/signIn");
      }
    };

    fetchUserDetails();
  }, [navigate, user.data.id, user.data.action, user.data.type]);

  //   const maskPassword = (password) => {
  //     return "*".repeat(password.length);
  //   };

  // Logout function to clear session and redirect to sign-in
  const handleLogout = () => {
    localStorage.removeItem("sessionData"); // Clear session data
    navigate("/signIn"); // Redirect to sign-in page
  };

  if (!profileData) {
    // Optionally, display a loading message or spinner
    return <div>Loading...</div>;
  }

  const handleManage = () => {
    navigate("/manage-kids", {
      state: {
        user_type: profileData.type,
      },
    });
  };

  return (
    <div className="App">
      <div className="profile-container">
        <img
          className="profileIm"
          src={`/images/avartars/${profileData.type}/${profileData.image}.png`} // Use user data from context
          alt="User Avatar"
        />
        <Link
          to="/avatars"
          className="changeProfile"
          state={{
            id: profileData.id,
            email: profileData.email,
            username: profileData.username,
            imageName: profileData.image,
            action: profileData.type,
            isUpdate: true,
          }}
        >
          Change profile picture
        </Link>
        <h3 className="userName">@{profileData.username}</h3>
        <div>
          <p className="profileInfor">{profileData.email}</p>
        </div>
        <div>
          <p className="profileInfor">**********</p>
        </div>
        <div>
          <Link
            to="/change-password"
            state={{
              id: profileData.id,
              email: profileData.email,
              username: profileData.username,
              imageName: profileData.image,
              action: profileData.type,
            }}
          >
            <p className="changepass">Change Password</p>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <button className=" button-format buttonColor" onClick={handleManage}>
          <img src={`/images/adduser.png`} alt="Add user" /> Manage Kid Accounts
        </button>
        <button className=" button-format buttonEmpty" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
