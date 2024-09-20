import React, { useContext, useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/iAccess/accountinfo.css';
import { AuthContext } from "../Auth";
import axios from "axios";

import plantImg from '../../../public/iAccess/Joseph.png'; 
import accommodationsImg from '../../../public/iAccess/save.png';
import medicalConditionsImg from '../../../public/iAccess/Caduceus.png';
import allergiesImg from '../../../public/iAccess/06-allergy.png';
import legalImg from "../../../public/iAccess/Law.png";
import dictionaryImg from '../../../public/iAccess//Dictionary.png';
import editProfileImg from '../../../public/iAccess/pen.512x512 3.png';
import locationImg from '../../../public/iAccess/Placeholder.png';
import languageImg from '../../../public/iAccess/Language.png';
import notificationsImg from '../../../public/iAccess/Notification.png';
import managePermissionsImg from '../../../public/iAccess/Shield.png';
import accountSettingsImg from '../../../public/iAccess/Add user.png';
import aboutPoliciesImg from '../../../public/iAccess/Info.png';
import backImg from "../../../public/iAccess/Back.png";

const ProfilePage = () => {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  // If user is not authenticated, redirect to sign in
  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, [user, navigate]);

  // Fetch user details from the server
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
            params: { username: user.data.username, action: user.data.action },
          }
        );

        if (response.data.status === "success") {
          setProfileData(response.data.user);
        } else {
          navigate("/signIn");
        }
      } catch (error) {
        navigate("/signIn");
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [navigate, user]);

  if (!profileData) {
    return <div>Loading...</div>;
  }
// Logout function to clear session and redirect to sign-in
const handleLogout = () => {
  localStorage.removeItem("sessionData"); // Clear session data
  navigate("/signIn"); // Redirect to sign-in page
};
  const handleOptionClick = (url) => {
    if (url) {
      navigate(url);
    }
  };

  const options = [
    { name: 'My Accommodations', img: accommodationsImg, url: "/myaccommodationsmenu"},
    { name: 'My Medical Conditions', img: medicalConditionsImg, url: "/mymedicalconditions"  },
    { name: 'My Allergies', img: allergiesImg, url: "/myallergies"  },
    { name: 'Legal', img: legalImg, url: "/legalpage" },
    { name: 'Dictionary', img: dictionaryImg, url: "/dictionary"},
    { name: 'Edit Profile', img: editProfileImg, url: "/iaccess-profile" },
    { name: 'Location', img: locationImg },
    { name: 'Language', img: languageImg },
    { name: 'Notifications', img: notificationsImg },
    { name: 'Manage Permissions', img: managePermissionsImg },
    { name: 'Account Settings', img: accountSettingsImg },
    { name: 'About & Policies', img: aboutPoliciesImg },
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={`/images/avartars/${user.data.action}/${profileData.image}.png`}
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
            action: user.data.action,
            isUpdate: true,
          }}
        >
          Change profile picture
        </Link>
        <h1 aria-label="Username" className='username'>@{profileData.username}</h1>
      </div>
      <ul className="options-list" aria-label='List of account info options' tabIndex="-1" ref={listRef}>
        {options.map((option, index) => (
          <li 
            key={index} 
            className="option" 
            onClick={() => handleOptionClick(option.url)}
            role="listitem"
            tabIndex="0"
            aria-label={`${option.name}, click to select`}
          >
            <img src={option.img} alt={option.name} className="option-icon" />
            <span className="option-name">{option.name}</span>
            <img src={backImg} alt="Right Arrow" className="option-arrow" />
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="logout-button" aria-label="Logout" tabIndex="0">Logout</button>
    </div>
  );
};

export default ProfilePage;
