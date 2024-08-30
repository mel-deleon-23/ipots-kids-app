import { useContext ,useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/iAccess/dictionary.css";
import { CiSearch } from "react-icons/ci";
import dictionaryImg from "../../../public/iAccess/Dictionary.png";

const Dictionary = () => {
  const host = "http://localhost";
  const [selectedLetter, setSelectedLetter] = useState("");
  const [dictionary, setdictionary] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdictionaries = async () => {
      try {
        const url = host + "/ipots-kids-app/ipots-server/dictionary.php?method=All";
        const response = await axios.get(url);
        setdictionary(response.data);
      } catch (error) {
        console.error("Error fetching medical dictionarys:", error);
      }
    };
    fetchdictionaries();
  }, []);

  const checkBeforeNavigate = (letter, event) => {
    const Url = "/dictionaryreview?Method=Letter&letter=" + letter;
    navigate(Url);
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDictionaries = dictionary.filter((dictionary) =>
    dictionary.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedDictionary, setSelectedDictionary] = useState(null);

  const handleDictionaryClick = (dictionary) => {
    setSelectedDictionary(
      selectedDictionary === dictionary.id ? null : dictionary.id
    );
  };

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
      <div className="dictionary-total-page">
        <div className="dictionary-page-title">
          <span className="logo">
            <img src={dictionaryImg} />
          </span>
          <span className="page-name"> Dictionary</span>
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
            {/* <PiMicrophoneFill className="microphone-icon" /> */}
          </div>
        </div>
        {searchTerm ? (
          <div className="dictionary-container">
            {filteredDictionaries.length > 0 ? (
              filteredDictionaries.map((dictionary) => (
                <div
                  key={dictionary.id}
                  className="item dictionary-box "
                  onClick={() => handleDictionaryClick(dictionary)}
                >
                  <div
                    className={`dictionary item-header ${
                      selectedDictionary === dictionary.id ? "expanded" : ""
                    }`}
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
        ) : (
          <div className="dictionary-letters-container">
            {letters.map((letter) => (
              <div
                key={letter.num}
                className={`dictionary-letter ${
                  selectedLetter === letter.num ? "selected" : ""
                }`}
                onClick={(event) => {
                  checkBeforeNavigate(letter.char, event);
                  handleLetterClick(letter.num);
                }}
              >
                <span className="dictionary-the-letters">{letter.char}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dictionary;
