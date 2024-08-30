import { useContext ,useEffect, useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import axios from "axios";
import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
import unsaveImg from '../../../public/iAccess/unsave.png';
import saveImg from '../../../public/iAccess/save.png';
import "../../styles/iAccess/medicalconditreview.css";
import Popup from "reactjs-popup";
import { AuthContext } from "../Auth";

const MedicalConditsReview = () => {
  const host = "http://localhost";
  const [userId , setUserId] = useState("1");
  const { user } = useContext(AuthContext);
  const [conditions, setConditions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const locat = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(locat.search);
  const method = queryParams.get("Method");
  const letter = queryParams.get("letter");
  const location = queryParams.get("location");
  //   popup for bookmark
  const [selectedLocation, setSelectedLocation] = useState(location);
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
    const fetchConditions = async () => {
      try {
        const url = host + '/ipots-kids-app/ipots-server/medical_conditions.php?method='+method +"&letter="+letter;
        const response = await axios.get(url);
        setConditions(response.data);
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

    fetchConditions();
    if(userId)
    {
        fetchBookmarks();
    }
  }, [method, letter]);

  const handleConditionClick = (condition) => {
    navigate(`/accessmenu?medicalCondition=${condition.term}&location=${location}`);
  };

  const handleBookmark = async (conditionId) => {
    const url = host + "/ipots-kids-app/ipots-server/myMedicalCondition.php";
    const params = {
      userId: userId, 
      medicalConditionId: conditionId,
      method: 'Add'
    };
    const response = await axios.get(url, { params });
    console.log(response);
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
    console.log(response);
    setBookmarks(bookmarks.filter(id => id !== conditionId));
  };

  const isBookmarked = (conditionId) => {
    return bookmarks.includes(conditionId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConditions = conditions.filter((condition) =>
    condition.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="all-page">
        <div className="title-page">
          <span className="icon">
            <img src="../../public/Caduceus.png" className="caduceus" />
          </span>
          <span className="name-page">Medical Conditions</span>
        </div>
        <div className="letter-area">
          <h1 className="letter-style">{letter}</h1>
        </div>
        <div className="search-bar-container">
          <div className="search-bar">
            <CiIcons.CiSearch className="search-icon" />
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
                <div className="condition" onClick={() => handleConditionClick(condition)}>{condition.term}</div>
                <div className="icons">
                  
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
            <p className='Error'>No medical conditions match your search.</p>
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

export default MedicalConditsReview;
