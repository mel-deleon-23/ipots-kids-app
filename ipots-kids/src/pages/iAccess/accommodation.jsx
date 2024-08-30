import React, { useContext, useState, useEffect } from "react";
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
    navigate('/home'); // Redirect to /home
  };

  const openpopup = () => {
    setSignInOpen(true);
  };

  useEffect(() => {
    if (user) {
      setUserId(user.data.user_id);
    }
  }, [user]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const url =
        host +
        "/ipots-kids-app/ipots-server/myAccessibility.php?method=All&userId=" +
        userId;
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
    const url = host + "/iPots/iAccess-Server/myAccessibility.php";
    const params = {
      userId: userId,
      accommodationId: accommodationId,
      method: "Add",
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks([...bookmarks, accommodationId]);
  };

  const handleUnbookmark = async (accommodationId) => {
    const url = host + "/iPots/iAccess-Server/myAccessibility.php";
    const params = {
      userId: userId,
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
      const url = host + "/iPots/iAccess-Server/accommodation.php";
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
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
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
      <div className="acc-header-container">
        <img src={iconImg} alt="Vision" className="vision-image" />
        {medicalCondition && (
          <h1 className="accommodation-title"> ({medicalCondition})</h1>
        )}
        <h1 className="accommodation-title">{category}</h1>
      </div>
      <div className="navbar-container">
        {locations.map((location) => (
          <div
            key={location.name}
            className={`location ${
              selectedLocation === location.name ? "selected" : ""
            }`}
            onClick={() => handleLocationClick(location.name)}
          >
            <img
              src={location.img}
              alt={location.name}
              className="location-img"
            />
            <span className="location-name">{location.name}</span>
          </div>
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
          />
        </div>
      </div>
      <div className="item-list">
        {filteredAccommodations.length > 0 ? (
          filteredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className={`item-container ${
                selectedItem === accommodation.id ? "selected" : ""
              }`}
              onClick={() => handleItemClick(accommodation)}
            >
              <div className="item-content">
                <h3 className="item-name">{accommodation.accommodation}</h3>
                {selectedItem === accommodation.id && (
                  <>
                    <p className="item-description">
                      {accommodation.description}
                    </p>
                    <div className="item-buttons">
                      {isBookmarked(accommodation.id) ? (
                        <img
                          src={unsaveImg}
                          alt="Unsave"
                          className="bookmark"
                          onClick={() => handleUnbookmark(accommodation.id)}
                        />
                      ) : (
                        <img
                          src={saveImg}
                          alt="Bookmark"
                          className="bookmark"
                          onClick={() => {
                            if (!userId) {
                              openpopup(); // Open the sign-in modal
                            } else {
                              handleBookmark(accommodation.id);
                            }
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No accommodations found.</p>
        )}
      </div>

      <Popup open={signInOpen} onClose={closeSignInModal} modal>
        <div className="modal">
          <h2 className="modal-title">Sign In Required</h2>
          <p className="modal-description">
            Please sign in to bookmark accommodations.
          </p>
          <button className="modal-button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Accommodation2;
