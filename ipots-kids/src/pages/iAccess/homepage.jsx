import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "../../styles/iAccess/homepage.css";
import { AuthContext } from "../Auth";

import homeImg from "../../../public/iAccess/01-home.png";
import briefcaseImg from "../../../public/iAccess/02-work.png";
import backpackImg from "../../../public/iAccess/03-school.png";
import transitImg from "../../../public/iAccess/04-transit.png";
import hospitalImg from "../../../public/iAccess/05-medical.png";
import earthImg from "../../../public/iAccess/06-all.png";

import assistiveTechImg from "../../../public/iAccess/Assistive Technology.png";
import caduceusImg from "../../../public/iAccess/Caduceus.png";
import lawImg from "../../../public/iAccess/Law.png";
import dictionaryImg from "../../../public/iAccess/Dictionary.png";
import allergyImg from "../../../public/iAccess/06-allergy.png";
import saveImg from "../../../public/iAccess/unsave.png";
import backImg from "../../../public/iAccess/Back.png";

const HomePage = () => {
  const [userId, setUserId] = useState(null); // Set initial state to null
  const { user } = useContext(AuthContext);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState("");
  const closeModal = () => setOpen(false);
  const closeSignInModal = () => setSignInOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log (user);
      setUserId(user.data.user_id);
    }
  }, [user]); // Update userId only when the user changes

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (category, event) => {
    // Check if the user is trying to access "My Accommodations" or "My Allergies"
    if ((category.url === "/myaccommodationsmenu" || category.url === "/myallergies") && !userId) {
      setSignInOpen(true);
      event.preventDefault();
      return;
    }

    // Skip location check if category is "Dictionary" or "Legal"
    if (category.name !== "Dictionary" && category.name !== "Legal" && category.name !== "My Allergies") {
      // Check if the user selected the location
      if (!selectedLocation) {
        setOpen(true);
        event.preventDefault(); // Prevent the default link click behavior
        return;
      }
      const newUrl = category.url + "?location=" + selectedLocation;
      navigate(newUrl);
      return;
    }

    navigate(category.url);
  };

  const handleSignIn = () => {
    closeSignInModal(); // Close the modal
    navigate('/home'); // Redirect to /home
  };

  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  const categories = [
    { name: "Accessibility Category", img: assistiveTechImg, url: "/accessmenu" },
    { name: "Medical Conditions", img: caduceusImg, url: "/medicalcondits" },
    { name: "Legal", img: lawImg, url: "" },
    { name: "Dictionary", img: dictionaryImg, url: "/dictionary" },
    { name: "My Accommodations", img: saveImg, url: "/myaccommodationsmenu" },
    { name: "My Allergies", img: allergyImg, url: "/myallergies" },
  ];

  return (
    <div className="homepage">
      <h1 className="homepage-home-title">iAccess</h1>
      <div className="navbar-home-container">
        {locations.map((location) => (
          <div
            key={location.name}
            className={`location-home ${
              selectedLocation === location.name ? "selected" : ""
            }`}
            onClick={() => handleLocationClick(location.name)}
          >
            <img
              src={location.img}
              alt={location.name}
              className="location-home-img"
            />
            <span className="location-home-name">{location.name}</span>
          </div>
        ))}
      </div>
      <div className="accessibility-categories-container">
        {categories.map((category) => (
          <div
            key={category.name}
            className="accessibility-category"
            onClick={(event) => checkBeforeNavigate(category, event)}
          >
            <img
              src={category.img}
              alt={category.name}
              className="accessibility-category-icon"
            />
            <span className="accessibility-category-name">{category.name}</span>
            <img
              src={backImg}
              alt="Back"
              className="accessibility-category-back"
            />
          </div>
        ))}
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        overlayClassName="popup-overlay"
        contentClassName="popup-content"
      >
        <div className="popup-message">
          <ul className="popup-location-list">
            {locations.map((location) => (
              <li key={location.name} className="popup-location-item">
                <img
                  src={location.img}
                  alt={location.name}
                  className="popup-location-img"
                />
                <span className="popup-location-name">{location.name}</span>
              </li>
            ))}
          </ul>
          <div className="message">
            Select the location where these accommodations will be used
          </div>
          <button className="close" onClick={closeModal}>
            OK
          </button>
        </div>
      </Popup>
      <Popup
        open={signInOpen}
        closeOnDocumentClick
        onClose={closeSignInModal}
        overlayClassName="popup-overlay"
        contentClassName="popup-content"
      >
        <div className="popup-message">
          <h2 className="popup-title">SIGN IN REQUIRED</h2>
          <div className="message">
            Please sign in to access My Accommodation
          </div>
          <button className="sign-in" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="cancel" onClick={closeSignInModal}>
            Cancel
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default HomePage;
