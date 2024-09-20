import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // added useNavigate
import axios from "axios";
import Popup from "reactjs-popup";
import { AuthContext } from "../Auth";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";

import "../../styles/iAccess/accommodation.css";
import homeImg from "../../../public/iAccess/01-home.png";
import briefcaseImg from "../../../public/iAccess/02-work.png";
import backpackImg from "../../../public/iAccess/03-school.png";
import transitImg from "../../../public/iAccess/04-transit.png";
import hospitalImg from "../../../public/iAccess/05-medical.png";
import earthImg from "../../../public/iAccess/06-all.png";

import unsaveImg from "../../../public/iAccess/unsave.png";
import saveImg from "../../../public/iAccess/save.png";
import visionImg from "../../../public/iAccess/01-vision.png";
import earImg from "../../../public/iAccess/02-hearing.png";
import mobilityImg from "../../../public/iAccess/03-mobility.png";
import brainImg from "../../../public/iAccess/04-cognitive.png";
import sensorImg from "../../../public/iAccess/05-sensory.png";
import allergyImg from "../../../public/iAccess/06-allergy.png";
import safetyImg from "../../../public/iAccess/07-safety.png";
import stomachImg from "../../../public/iAccess/08-digestion.png";
import painImg from "../../../public/iAccess/9-pain.png";
import medicalImg from "../../../public/iAccess/10-medical devices.png";
import mentalImg from "../../../public/iAccess/11-mental health.png";
import medicationImg from "../../../public/iAccess/12-medication.png";

const Accommodation2 = () => {
  const host = "http://localhost";
  const [userId, setUserId] = useState(null); // set initial userId as null
  const { user } = useContext(AuthContext);
  const [accommodations, setAccommodations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");
  const category = queryParams.get("category");
  const medicalCondition = queryParams.get("medicalCondition");
  const [selectedLocation, setSelectedLocation] = useState(location);
  const navigate = useNavigate(); // added navigate hook

  // popup for bookmark
  const [signInOpen, setSignInOpen] = useState(false); // changed initial state to false
  const closeSignInModal = () => setSignInOpen(false);
  const handleSignIn = () => {
    closeSignInModal(); // Close the modal
    navigate("/home"); // Redirect to /home
  };

  const openpopup = () => {
    setSignInOpen(true);
    console.log("open");
  };

  useEffect(() => {
    if (user) {
      setUserId(user.data.user_id);
    }
  }, [user]);

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
    const fetchBookmarks = async () => {
      const url =
        host +
        "/ipots-kids-app/ipots-server/myAccessibility.php?method=All&userId=" +
        user.data.user_id;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }
    };

    const fetchData = async () => {
      try {
        const params = { category: category, location: location };
        if (medicalCondition) {
          params.medicalCondition = medicalCondition;
        }
        const url = host + "/ipots-kids-app/ipots-server/accommodation.php";
        const response = await axios.get(url, { params });
        if (Array.isArray(response.data)) {
          setAccommodations(response.data);
        } else {
          console.error("The fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    if (userId) {
      fetchBookmarks();
    }
    fetchData();
  }, [location, category, userId]);

  const handleBookmark = async (accommodationId) => {
    const url = host + "/ipots-kids-app/ipots-server/myAccessibility.php";
    const params = {
      userId: user.data.user_id,
      accommodationId: accommodationId,
      method: "Add",
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks([...bookmarks, accommodationId]);
  };

  const handleUnbookmark = async (accommodationId) => {
    const url = host + "/ipots-kids-app/ipots-server/myAccessibility.php";
    const params = {
      userId: user.data.user_id,
      accommodationId: accommodationId,
      method: "Delete",
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks(bookmarks.filter((id) => id !== accommodationId));
  };

  const isBookmarked = (accommodationId) => {
    return bookmarks.includes(accommodationId);
  };

  const handleLocationClick = async (location) => {
    setSelectedLocation(location);
    try {
      const url = host + "/ipots-kids-app/ipots-server/accommodation.php";
      const response = await axios.get(url, {
        params: { category: category, location: location },
      });
      if (Array.isArray(response.data)) {
        setAccommodations(response.data);
      } else {
        console.error("The fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleItemClick = (accommodation) => {
    setSelectedItem(
      accommodation.id === selectedItem ? null : accommodation.id
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccommodations = accommodations.filter((accommodation) =>
    accommodation.accommodation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const locations = [
    { name: "Home", img: homeImg, area: "Home" },
    { name: "Work", img: briefcaseImg, area: "Work" },
    { name: "School", img: backpackImg, area: "School" },
    { name: "Transit", img: transitImg, area: "Transit" },
    { name: "Medical", img: hospitalImg, area: "Medical" },
    { name: "All", img: earthImg, area: "All Locations" },
  ];

  const categories = [
    { name: "Mobility", img: mobilityImg },
    { name: "Hearing", img: earImg },
    { name: "Cognitive", img: brainImg },
    { name: "Mental Health", img: mentalImg },
    { name: "Sensory", img: sensorImg },
    { name: "Allergy", img: allergyImg },
    { name: "Vision", img: visionImg },
    { name: "Pain", img: painImg },
    { name: "Digestion", img: stomachImg },
    { name: "Safety", img: safetyImg },
    { name: "Medical Devices", img: medicalImg },
    { name: "Medication", img: medicationImg },
  ];

  const categoryObject = categories.find((cat) => cat.name === category);
  const iconImg = categoryObject ? categoryObject.img : null;

  return (
    <div className="accommodations-page">
      {medicalCondition ? (
        <>
          <h1 className="accommodation-title">{medicalCondition}</h1>
          <div className="header-container2">
            <img src={iconImg} alt={category} className="category-image" />
            <h2 className="accommodation-title">{category}</h2>
          </div>
        </>
      ) : (
        <div className="header-container2">
          <img src={iconImg} alt={category} className="category-image" />
          <h1 className="accommodation-title">{category}</h1>
        </div>
      )}
      <div className="navbar-container">
        {locations.map((location) => (
          <a
            key={location.name}
            s
            href="#"
            aria-label={`${location.area}${
              selectedLocation === location.name ? " (selected)" : ""
            }`}
            className={`location ${
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
              className="location-img"
            />
            <span className="location-name">{location.name}</span>
          </a>
        ))}
      </div>
      <div className="search-bar-container">
        <div className="search-bar">
          <CiSearch className="search-icon" />
          <input
            type="search"
            className="searchbox"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label={`Search for accommodations for ${category}`}
          />
        </div>
      </div>
      <div className="item-container">
        {filteredAccommodations.length > 0 ? (
          <ul
            className="item-list"
            aria-label="List of accommodations"
            tabIndex="-1"
            ref={listRef}
          >
            {filteredAccommodations.map((accommodation) => (
              <li
                key={accommodation.id}
                className={`item ${
                  selectedItem === accommodation.id ? "selected" : ""
                }`}
              >
                <div
                  className={`item-header ${
                    selectedItem === accommodation.id ? "expanded" : ""
                  }`}
                >
                  <span onClick={() => handleItemClick(accommodation)}>
                    {accommodation.accommodation}
                  </span>
                  {/* bookmark works only if user is logged in */}
                  {userId ? (
                    isBookmarked(accommodation.id) ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUnbookmark(accommodation.id);
                        }}
                        aria-label="Click to remove bookmark from this item"
                      >
                        <img
                          className="bookmark-img"
                          src={saveImg}
                          alt="Save"
                        />
                      </a>
                    ) : (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookmark(accommodation.id);
                        }}
                        aria-label="Click to bookmark this item"
                      >
                        <img
                          className="unbookmarkimg"
                          src={unsaveImg}
                          alt="UnSave"
                        />
                      </a>
                    )
                  ) : (
                    // else popup for signup appears
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        openpopup();
                      }}
                      aria-label="Click to bookmark this item"
                    >
                      <img
                        className="unbookmarkimg"
                        src={unsaveImg}
                        alt="UnSave"
                      />
                    </a>
                  )}
                </div>
                {selectedItem === accommodation.id && (
                  <div
                    className="item-details"
                    onClick={() => handleItemClick(accommodation)}
                  >
                    <img
                      src={iconImg}
                      alt={accommodation.accommodation}
                      className="item-image"
                    />
                    <p>{accommodation.description}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="Error">
            No accommodations available for {category} at {selectedLocation}.
          </p>
        )}
      </div>
      <Popup
        open={signInOpen}
        closeOnDocumentClick
        onClose={closeSignInModal}
        overlayClassName="popup-overlay"
        contentClassName="popup-content"
      >
        <div className="popup-message">
          <h2 className="popup-title">SIGN IN REQUIRED</h2>
          <div className="message">Please sign in to use BookMark Feature</div>
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

export default Accommodation2;
