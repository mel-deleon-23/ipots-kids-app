import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/iAccess/medicalcondits.css";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";
import homeImg from "../../../public/iAccess/01-home.png";
import briefcaseImg from "../../../public/iAccess/02-work.png";
import backpackImg from "../../../public/iAccess/03-school.png";
import transitImg from "../../../public/iAccess/04-transit.png";
import hospitalImg from "../../../public/iAccess/05-medical.png";
import earthImg from "../../../public/iAccess/06-all.png";
import Popup from "reactjs-popup";
import { AuthContext } from "../Auth";

import unsaveImg from '../../../public/iAccess/unsave.png';
import saveImg from '../../../public/iAccess/save.png';

const MedicalCondits = () => {
  const host = "http://localhost";
  const [userId , setUserId] = useState("1");
  const { user } = useContext(AuthContext); 
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get('location');
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
    navigate('/home'); // Redirect to /home
  };
  
  const openpopup = () => {
    setSignInOpen(true);
    return;   
  }
  //   set user id if user is logged in
  useEffect(() => {
    if (user) {
      console.log (user);
      setUserId(user.data.user_id);
    }
  }, [user]);

  useEffect(() => {
    const fetchMedicalConditions = async () => {
      try {
        const url = host + '/ipots-kids-app/ipots-server/medical_conditions.php?method=All';
        const response = await axios.get(url);
        setMedicalConditions(response.data);
        
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };
    const fetchBookmarks = async () => {
      const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php?method=All&userId=" + userId; 
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }           
    }

    fetchMedicalConditions();
    fetchBookmarks();
  }, []);

  const handleBookmark = async (conditionId) => {
    const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php";
    const params = {
      userId: userId, 
      medicalConditionId: conditionId,
      method: 'Add'
    };
    const response = await axios.get(url, { params });
    
    setBookmarks([...bookmarks, conditionId]);
  };

  const handleUnbookmark = async (conditionId) => {
    const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php";
    const params = {
      userId: userId,
      medicalConditionId: conditionId,
      method: "Delete"
    };
    const response = await axios.get(url, { params });
    
    setBookmarks(bookmarks.filter(id => id !== conditionId));
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
      const Url ="/medicalconditreview?Method=Letter&letter=" + letter + "&location=" + selectedLocation;
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
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
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
          <span className="medical-condit-logo">
            <img src="../../../public/iAccess/Caduceus.png" className="caduceus" />
          </span>
          <span className="medical-condit-name"> Medical Conditions</span>
        </div>
        <div className="nav-medical-condit-container">
          {locations.map((location) => (
            <div
              key={location.name}
              className={`location-condits ${
                selectedLocation === location.name ? "selected" : ""
              }`}
              onClick={() => handleLocationClick(location.name)}
            >
              <img
                src={location.img}
                alt={location.name}
                className="location-condits-img"
              />
              <span className="location-condits-name">{location.name}</span>
            </div>
          ))}
        </div>
        <div className="medical-search-bar-container">
          <div className="medical-search-bar">
            <CiSearch className="medical-search-icon" />
            <input
              type="search"
              className="medical-searchbox"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {searchTerm ? (
          <div className="medical-conditions-container">
            {filteredConditions.length > 0 ? (
              filteredConditions.map((condition) => (
                <div key={condition.id} className="medical-condition-box">
                  <div className="medical-condition" onClick={() => handleConditionClick(condition)}>{condition.term}</div>
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
                          onClick={() => openpopup()}
                          alt="Not Bookmarked"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="Error">No medical conditions matchs {searchTerm}.</p>
            )}
          </div>
        ) : (
          <div className="medical-letters-container">
            {letters.map((letter) => (
              <div
                key={letter.num}
                className={`medical-letter ${
                  selectedLetter === letter.num ? "selected" : ""
                }`}
                onClick={(event) => {
                  checkBeforeNavigate(letter.char, event);
                  handleLetterClick(letter.num);
                }}
              >
                <span className="medical-the-letters">{letter.char}</span>
              </div>
            ))}
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
