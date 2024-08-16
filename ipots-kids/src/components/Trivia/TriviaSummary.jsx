import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Trivia/styles/TriviaSummary.css";
import { AuthContext } from "../../pages/Auth";

const TriviaSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { gemsEarned, totalQuestions, level } = location.state || {
    gemsEarned: 0,
    totalQuestions: 0,
    level: null,
  };
  const correctAnswers = gemsEarned;
  const incorrectAnswers = totalQuestions - gemsEarned;
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate("/signIn");
  }

  const handlePlayAgain = () => {
    if (level) {
      navigate(`/question/level/${level}`);
    } else {
      console.error("Level information is missing.");
    }
  };

  return (
    <div className="trivia-summary">
      <div className="summary-box">
        <div className="score">
          {correctAnswers}/{totalQuestions}
        </div>
        <div className="results">
          <div className="correct">
            <span className="number">{correctAnswers}</span>
            <span className="label">Correct</span>
          </div>
          <div className="incorrect">
            <span className="number">{incorrectAnswers}</span>
            <span className="label">Incorrect</span>
          </div>
        </div>
      </div>
      <div className="actions">

        <button className="action-button btn btn-primary mt-3"><img src="/images/trivia-menu/play-button.png" alt="play-button" className="play-button-icon" />  Next Game</button>
        <button className="action-button btn btn-info mt-3" onClick={handlePlayAgain}><img src="/images/trivia-question/try-again.png" alt="try-again" className="play-button-icon" />  Play Again</button>
        <Link className="home-button btn btn-secondary mt-3" to={`/trivia`}><img src="/images/trivia-menu/home-button.png" alt="home-button" className="play-button-icon" />  Home</Link>
      </div>
    </div>
  );
};

export default TriviaSummary;
