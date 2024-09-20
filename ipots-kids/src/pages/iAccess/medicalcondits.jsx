import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/iAccess/medicalcondits.css";
import { CiSearch } from "react-icons/ci";
import caduceusImg from "../../../public/iAccess/Caduceus.png";
import homeImg from "../../../public/iAccess/01-home.png";
import briefcaseImg from "../../../public/iAccess/02-work.png";
import backpackImg from "../../../public/iAccess/03-school.png";
import transitImg from "../../../public/iAccess/04-transit.png";
import hospitalImg from "../../../public/iAccess/05-medical.png";
import earthImg from "../../../public/iAccess/06-all.png";
import Popup from "reactjs-popup";
import { AuthContext } from "../Auth";

import unsaveImg from "../../../public/iAccess/unsave.png";
import saveImg from "../../../public/iAccess/save.png";

const MedicalCondits = () => {
  const host = "http://localhost";
  const [userId, setUserId] = useState(null);
  const { user } = useContext(AuthContext);
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();
  //   popup for bookmark
  const [signInOpen, setSignInOpen] = useState("");
  const closeSignInModal = () => setSignInOpen(false);
  const handleSignIn = () => {
    closeSignInModal(); // Close the modal
    navigate("/home"); // Redirect to /home
  };

  const openpopup = () => {
    setSignInOpen(true);
    return;
  };
  //   set user id if user is logged in
  useEffect(() => {
    if (user) {
      console.log(user);
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
    const fetchMedicalConditions = async () => {
      try {
        const url =
          host +
          "/ipots-kids-app/ipots-server/medical_conditions.php?method=All";
        const response = await axios.get(url);
        setMedicalConditions(response.data);
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };
    const fetchBookmarks = async () => {
      const url =
        host +
        "/ipots-kids-app/ipots-server/myMedicalCondition.php?method=All&userId=" +
        user.data.user_id;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }
    };

    fetchMedicalConditions();
    fetchBookmarks();
  }, []);

  const handleConditionClick = (condition) => {
    navigate(
      `/accessmenu?medicalCondition=${condition.term}&location=${location}`
    );
  };
  const handleBookmark = async (conditionId) => {
    const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php";
    const params = {
      userId: user.data.user_id,
      medicalConditionId: conditionId,
      method: "Add",
    };
    const response = await axios.get(url, { params });

    setBookmarks([...bookmarks, conditionId]);
  };

  const handleUnbookmark = async (conditionId) => {
    const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php";
    const params = {
      userId: user.data.user_id,
      medicalConditionId: conditionId,
      method: "Delete",
    };
    const response = await axios.get(url, { params });

    setBookmarks(bookmarks.filter((id) => id !== conditionId));
  };

  const isBookmarked = (conditionId) => {
    return bookmarks.includes(conditionId);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (letter, event) => {
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault();
      return;
    } else {
      const Url =
        "/medicalconditreview?Method=Letter&letter=" +
        letter +
        "&location=" +
        selectedLocation;
      navigate(Url);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConditions = medicalConditions.filter((condition) =>
    condition.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const locations = [
    { name: "Home", img: homeImg, area: "Home" },
    { name: "Work", img: briefcaseImg, area: "Work" },
    { name: "School", img: backpackImg, area: "School" },
    { name: "Transit", img: transitImg, area: "Transit" },
    { name: "Medical", img: hospitalImg, area: "Medical" },
    { name: "All", img: earthImg, area: "All Locations" },
  ];

  const letters = [
    { num: 1, char: "A" },
    { num: 2, char: "B" },
    { num: 3, char: "C" },
    { num: 4, char: "D" },
    { num: 5, char: "E" },
    { num: 6, char: "F" },
    { num: 7, char: "G" },
    { num: 8, char: "H" },
    { num: 9, char: "I" },
    { num: 10, char: "J" },
    { num: 11, char: "K" },
    { num: 12, char: "L" },
    { num: 13, char: "M" },
    { num: 14, char: "N" },
    { num: 15, char: "O" },
    { num: 16, char: "P" },
    { num: 17, char: "Q" },
    { num: 18, char: "R" },
    { num: 19, char: "S" },
    { num: 20, char: "T" },
    { num: 21, char: "U" },
    { num: 22, char: "V" },
    { num: 23, char: "W" },
    { num: 24, char: "X" },
    { num: 25, char: "Y" },
    { num: 26, char: "Z" },
  ];

  return (
    <>
      <div className="medical-condit-page">
        <div className="medical-condit-title">
          <img
            src={caduceusImg}
            alt="Medical Conditions"
            className="medical-condit-logo"
          />
          <h1 className="medical-condit-name"> Medical Conditions</h1>
        </div>
        <div className="nav-medical-condit-container">
          {locations.map((location) => (
            <a
              key={location.name}
              href="#"
              aria-label={`${location.area}${
                selectedLocation === location.name ? " (selected)" : ""
              }`}
              className={`location-condits ${
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
                className="location-condits-img"
              />
              <span className="location-condits-name">{location.name}</span>
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
              aria-label="Search for medical conditions"
            />
          </div>
        </div>
        {searchTerm ? (
          <div className="conditions-container">
            {filteredConditions.length > 0 ? (
              filteredConditions.map((condition) => (
                <div key={condition.id} className="condition-box">
                  <div
                    className="condition"
                    onClick={() => handleConditionClick(condition)}
                  >
                    {condition.term}
                  </div>
                  <div className="medical-icons">
                    {/* bookmark works only if user is logged in */}
                    {userId ? (
                      isBookmarked(condition.id) ? (
                        <img
                          className="img"
                          src={saveImg}
                          onClick={() => handleUnbookmark(condition.id)}
                          alt="Bookmarked"
                        />
                      ) : (
                        <img
                          className="img"
                          src={unsaveImg}
                          onClick={() => handleBookmark(condition.id)}
                          alt="Not Bookmarked"
                        />
                      )
                    ) : (
                      // else popup for signup appears
                      <img
                        className="img"
                        src={unsaveImg}
                        onClick={openpopup}
                        alt="Not Bookmarked"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="Error">
                No medical conditions matchs {searchTerm}.
              </p>
            )}
          </div>
        ) : (
          <div className="medical-letters-container">
            <ul aria-label="List of letters" tabIndex="-1" ref={listRef}>
              {letters.map((letter) => (
                <li key={letter.num} className="letter-items">
                  <a
                    key={letter.num}
                    href="#"
                    aria-label={`Search with ${letter.char}`}
                    className={`medical-letter ${
                      selectedLetter === letter.num ? "selected" : ""
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      checkBeforeNavigate(letter.char, event);
                      handleLetterClick(letter.num);
                    }}
                  >
                    <span className="medical-the-letters">{letter.char}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
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
              Please sign in to use BookMark Feature
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
    </>
  );
};

export default MedicalCondits;
