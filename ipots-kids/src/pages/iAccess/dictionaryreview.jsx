import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
// import unsaveImg from "../../../public/unsave.png";
// import saveImg from "../../public/save.png";
import dictionaryImg from "../../../public/iAccess/Dictionary.png";
import "../../styles/iAccess/dictionaryreview.css";

const DictionaryReview = () => {
  const host = "http://localhost";
  const [dictionary, setdictionary] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const locat = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(locat.search);
  const method = queryParams.get("Method");
  const letter = queryParams.get("letter");

  useEffect(() => {
    const fetchterm = async () => {
      try {
        const url =
          host +
          "/ipots-kids-app/ipots-server/dictionary.php?method=" +
          method +
          "&letter=" +
          letter;
        const response = await axios.get(url);
        setdictionary(response.data);
      } catch (error) {
        console.error("Error fetching medical term:", error);
      }
    };
    fetchterm();
  }, [method, letter]);
  const [selectedDictionary, setSelectedDictionary] = useState(null);

  const handleDictionaryClick = (dictionary) => {
    setSelectedDictionary(selectedDictionary === dictionary.id ? null : dictionary.id);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDictionaries = dictionary.filter((dictionary) =>
    dictionary.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="dictionary-all-page">
        <div className="dictionary-title-page">
          <span className="icon">
            <img src={dictionaryImg} className="dictionary" />
          </span>
          <span className="dictionary-name-page">Dictionary</span>
        </div>
        <div className="dictionary-letter-area">
          <h1 className="dictionary-letter-style">{letter}</h1>
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
            {/* <PiIcons.PiMicrophoneFill className="microphone-icon" /> */}
          </div>
        </div>
        <div className="dictionary-container">
            {filteredDictionaries.length > 0 ? (
              filteredDictionaries.map((dictionary) => (
                <div key={dictionary.id} className="item dictionary-box " onClick={() => handleDictionaryClick(dictionary)}>
                  <div
                    className={`dictionary item-header ${selectedDictionary === dictionary.id ? 'expanded' : ''}`}
                    
                  >
                    {dictionary.term}
                  </div>
                  {selectedDictionary === dictionary.id && (
                      <div className="item-details">
                        <p>{dictionary.definition}</p>
                      </div>                    
                  )}
                </div>
              ))
            ) : (
              <p className="Error">No Term matches {searchTerm}.</p>
            )}
          </div>
      </div>
    </>
  );
};

export default DictionaryReview;
