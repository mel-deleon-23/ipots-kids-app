import { useContext , useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth";
import "../../styles/iAccess/myMedicalConditions.css";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";
import homeImg from "../../../public/iAccess/01-home.png";
import briefcaseImg from "../../../public/iAccess/02-work.png";
import backpackImg from "../../../public/iAccess/03-school.png";
import transitImg from "../../../public/iAccess/04-transit.png";
import hospitalImg from "../../../public/iAccess/05-medical.png";
import earthImg from "../../../public/iAccess/06-all.png";

import unsaveImg from "../../../public/iAccess/unsave.png";
import saveImg from "../../../public/iAccess/save.png";

const myMedicalCondits = () => {
  const host = "http://localhost";
  const [userId , setUserId] = useState("1");
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

//  set user id if user is signed in else navigate to signin
  useEffect(() => {
    if (user) {
      setUserId(user.data.user_id);
    }
    else {
      navigate('/home');
    }
  }, [user]);
  useEffect(() => {
    const fetchMyMedicalConditions = async () => {
      try {
        const url =
          host +
          "/ipots-kids-app/ipots-server/myMedicalCondition.php?method=showAll&userId=" +
          userId;
        const response = await axios.get(url);
        setMedicalConditions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };
    const fetchBookmarks = async () => {
      const url =
        host +
        "/ipots-kids-app/ipots-server/myMedicalCondition.php?method=All&userId=" +
        userId;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }
    };

    fetchBookmarks();
    fetchMyMedicalConditions();
  }, []);

  const handleBookmark = async (conditionId) => {
    const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php";
    const params = {
      userId: userId,
      medicalConditionId: conditionId,
      method: "Add",
    };
    const response = await axios.get(url, { params });

    setBookmarks([...bookmarks, conditionId]);
  };

  const handleUnbookmark = async (conditionId) => {
    const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php";
    const params = {
      userId: userId,
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConditionClick = (condition) => {
    navigate(
      `/myaccessmenu?medicalCondition=${condition.term}&location=${location}`
    );
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

  return (
    <>
      <div className="total-page">
        <div className="page-title">
          <span className="logo">
            <img src="../../../public/iAccess/Caduceus.png" className="caduceus" />
          </span>
          <span className="page-name">My Medical Conditions</span>
        </div>
        <div className="nav-container">
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
                <div className="icons">
                  {isBookmarked(condition.id) ? (
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
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="Error">No medical conditions match "{searchTerm}".</p>
          )}
        </div>
      </div>
    </>
  );
};

export default myMedicalCondits;
