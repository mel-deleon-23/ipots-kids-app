import React, { useContext, useState, useEffect, useRef } from "react";
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
  const listRef = useRef(null); // Create a ref for the list

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "l") {
        if (listRef.current) {
          listRef.current.focus(); // Focus the list when "L" is pressed
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      console.log(user.data.user_id);
      setUserId(user.data.user_id);
    }
  }, [user]); // Update userId only when the user changes

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (category, event) => {
    // Check if the user is trying to access "My Accommodations" or "My Allergies"
    if (
      (category.url === "/myaccommodationsmenu" ||
        category.url === "/myallergies") &&
      !userId
    ) {
      setSignInOpen(true);
      event.preventDefault();
      return;
    }

    // Skip location check if category is "Dictionary" or "Legal"
    if (
      category.name !== "Dictionary" &&
      category.name !== "Legal" &&
      category.name !== "My Allergies"
    ) {
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
    navigate("/home"); // Redirect to /home
  };

  const locations = [
    { name: "Home", img: homeImg, area: "Home" },
    { name: "Work", img: briefcaseImg, area: "Work" },
    { name: "School", img: backpackImg, area: "School" },
    { name: "Transit", img: transitImg, area: "Transit" },
    { name: "Medical", img: hospitalImg, area: "Medical" },
    { name: "All", img: earthImg, area: "All Locations" },
  ];

  const categories = [
    {
      name: "Accessibility Category",
      img: assistiveTechImg,
      url: "/accessmenu",
    },
    { name: "Medical Conditions", img: caduceusImg, url: "/medicalcondits" },
    { name: "Legal", img: lawImg, url: "/legalpage" },
    { name: "Dictionary", img: dictionaryImg, url: "/dictionary" },
    { name: "My Accommodations", img: saveImg, url: "/myaccommodationsmenu" },
    { name: "My Allergies", img: allergyImg, url: "/myallergies" },
  ];

  return (
    <div className="homepage">
      <h1 className="homepage-home-title">iACCESS</h1>
      <div className="navbar-home-container">
        {locations.map((location) => (
          <a
            key={location.name}
            href="#"
            aria-label={`${location.area}${
              selectedLocation === location.name ? " (selected)" : ""
            }`}
            className={`location-home ${
              selectedLocation === location.name ? "selected" : ""
            }`}
            onClick={(event) => {
              event.preventDefault();
              handleLocationClick(location.name);
            }}
          >
            <img
              src={location.img}
              alt={location.name}
              className="location-home-img"
            />
            <span className="location-home-name">{location.name}</span>
          </a>
        ))}
      </div>
      <div className="accessibility-categories-container">
        <ul aria-label="Main Menu Options " tabIndex="-1" ref={listRef}>
          {categories.map((category) => (
            <li key={category.name} className="accessibility-category-item">
              <a
                key={category.name}
                href="#"
                className="accessibility-category"
                onClick={(event) => {
                  event.preventDefault();
                  checkBeforeNavigate(category, event);
                }}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="accessibility-category-icon"
                />
                <span className="accessibility-category-name">
                  {category.name}
                </span>
                <img
                  src={backImg}
                  aria-label="Right Arrow"
                  alt="Right Arrow"
                  className="accessibility-category-back"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        overlayClassName="popup-overlay"
        contentClassName="popup-content"
      >
        <div className="popup-message">
          <p className="message">
            Select the location where these accommodations will be used
          </p>
          <ul aria-label="location options" className="popup-location-list">
            {locations.map((location) => (
              <li
                key={location.name}
                className="popup-location-item"
                aria-label={location.area}
              >
                <img
                  src={location.img}
                  alt={location.name}
                  className="popup-location-img"
                />
                <span className="popup-location-name">{location.name}</span>
              </li>
            ))}
          </ul>
          <div
            id="button-description"
            style={{ position: "absolute", left: "-9999px" }}
          >
            Button-
          </div>
          <button
            className="close"
            onClick={closeModal}
            aria-describedby="button-description"
          >
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
          <p className="message">Please sign in to access My Accommodation</p>
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
