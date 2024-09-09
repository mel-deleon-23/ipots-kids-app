import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";
import { AuthContext } from "../Auth";

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

const myAccommodations = () => {
  const host = "http://localhost:8888";
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext);
  const [accommodations, setAccommodations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");
  const category = queryParams.get("category");
  const medicalCondition = queryParams.get("medicalCondition");
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  //  set user id if user is signed in else navigate to signin
  useEffect(() => {
    if (user) {
      setUserId(user.data.user_id);
    } else {
      navigate("/home");
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
    const bookmark = async () => {
      // Fetch the user's accessibilty
      const url =
        host +
        "/ipots-kids-app/ipots-server/myAccessibility.php?method=All&userId=" +
        user.data.user_id;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }
    };
    // for fetching data from database when page loads
    const fetchData = async () => {
      try {
        const params = {
          method: "showAll",
          userId: user.data.user_id,
          location: location,
          category: category,
        };

        // Checking if the user is coming from the medical page
        if (medicalCondition) {
          params.medicalCondition = medicalCondition;
        }

        const url = host + "/ipots-kids-app/ipots-server/myAccessibility.php";
        const response = await axios.get(url, { params });

        setAccommodations(response.data);
      } catch (error) {
        console.error("Error fetching Accommodation:", error);
      }
    };

    bookmark();
    fetchData();
  }, [location, category]);

  // to add accommodation to myAccessibility
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

  // to add accommodation to myAccessibility
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
  // to handle the location change
  const handleLocationClick = async (location) => {
    setSelectedLocation(location);
    try {
      const url = host + "/ipots-kids-app/ipots-server/myAccessibility.php";
      const response = await axios.get(url, {
        params: {
          method: "showAll",
          userId: user.data.user_id,
          location: location,
          category: category,
        },
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
    setSearchQuery(event.target.value);
  };

  const filteredAccommodations = accommodations.filter((accommodation) =>
    accommodation.accommodation
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
      <div className="header-container2">
        <img src={iconImg} alt="Vision" className="vision-image" />
        <h1 className="accommodation-title">{category} </h1>
        {medicalCondition && (
          <h2 className="accommodation-title"> ({medicalCondition})</h2>
        )}
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
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="item-list">
        {filteredAccommodations.length > 0 ? (
          filteredAccommodations.map((accommodation) => (
            <div
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
                {isBookmarked(accommodation.id) ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleUnbookmark(accommodation.id);
                    }}
                    aria-label="Click to remove bookmark from this item"
                  >
                    <img className="bookmark-img" src={saveImg} alt="Save" />
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
                )}
              </div>
              {selectedItem === accommodation.id && (
                <div
                  className="item-details"
                  onClick={() => handleItemClick(accommodation)}
                >
                  <img
                    src={iconImg}
                    alt={accommodation.title}
                    className="item-image"
                  />
                  <p>{accommodation.description}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="Error">
            No My Accommodations available for {category} at {selectedLocation}.
          </p>
        )}
      </div>
    </div>
  );
};

export default myAccommodations;
