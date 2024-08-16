import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Trivia/styles/TriviaMenu.css";
import { AuthContext } from "../../pages/Auth";

const TriviaMenu = () => {
  const navigate = useNavigate();
  const [triviaLevels, setTriviaLevels] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  // Log user data for debugging
  //   console.log("User Data:", JSON.stringify(user, null, 2));

  if (!user) {
    navigate("/signIn");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/ipots-kids-app/ipots-server/trivia.php"
        );
        const data = await response.json();

        if (Array.isArray(data.levels)) {
          setTriviaLevels(data.levels);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container trivia-menu">
      <h1 className="trivia-header text-center my-4">Trivia</h1>
      <div className="row justify-content-center">
        {triviaLevels.map((level, index) => (
          <div key={index} className="col-md-8 mb-4">
            <div className="card trivia-menu-card d-flex flex-row align-items-center">
              <div className="level-title">LEVEL {level.level}</div>
              <img
                className="trivia-image"
                src={level.image}
                alt={`${level.title} image`}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="trivia-card-content">
                  <h3 className="trivia-card-title">{level.title}</h3>
                  <p className="trivia-card-text">{level.description}</p>
                </div>
                <Link
                  className="btn play-button"
                  to={`/question/level/${level.level}`}
                >
                  &#9658; Play
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriviaMenu;
