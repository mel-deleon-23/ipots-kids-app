import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TriviaSummary from "./TriviaSummary";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Trivia/styles/TriviaQuestion.css";
import { AuthContext } from "../../pages/Auth";

const TriviaQuestion = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // Log user data for debugging
  //   console.log("User Data:", JSON.stringify(user, null, 2));

  if (!user) {
    navigate("/signIn");
  }
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gems, setGems] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(
          `http://localhost/ipots-kids-app/ipots-server/trivia_question.php?level=${level}`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setQuestions(data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };

    fetchQuestionData();
  }, [level]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (!hasAnsweredCorrectly) {
        setGems(gems + 1);
        setHasAnsweredCorrectly(true);
      }
      setStreak(streak + 1);
    } else {
      setStreak(0);
      setHasAnsweredCorrectly(true); // Ensure the user can't earn the gem on try again
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setHasAnsweredCorrectly(false);
    } else {
      setCompleted(true);
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleFinish = () => {
    navigate("/summary", {
      state: { gemsEarned: gems, totalQuestions: questions.length, level },
    });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Error loading question. Please try again.</div>;
  }

  if (completed) {
    return <TriviaSummary />;
  }

  return (
    <div className="trivia-question-container">
      <div className="stats-header">
        <div className="stats">
          <div className="gems">
            <span role="img" aria-label="gems">
              {gems}
            </span>
            <img
              src="/images/trivia-question/system-uicons_diamond.png"
              className="icon-gems"
              alt="gems"
            />
            <div>
              <p className="stats-text-gems">gems</p>
            </div>
          </div>
          <div className="streak">
            <img
              src="/images/trivia-question/ph_fire.png"
              className="icon-streak"
              alt="streak"
            />
            <span role="img" aria-label="streak">
              x{streak}
            </span>
            <div className="streak-text">
              <p className="stats-text-streak">streak</p>
            </div>
          </div>
          <div className="sound">
            <img
              src="/images/trivia-question/Vector-sound.png"
              className="icon-sound"
              alt="sound"
            />
            <div className="sound-text">
              <p className="stats-text-sound">sound</p>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-bar-container mt-2">
        {Array.from({ length: questions.length }).map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${
              index <= currentQuestionIndex ? "active" : ""
            }`}
          />
        ))}
      </div>

      <div className="trivia-question-card">
        <div className="trivia-card-body">
          <h2 className="question-title text-center">
            {currentQuestion.question}
          </h2>
          <ul className="options list-unstyled">
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                className={`option-trivia-button btn ${
                  selectedOption === option
                    ? isCorrect
                      ? "btn-success"
                      : "btn-danger"
                    : "btn-light"
                } my-2`}
                onClick={() => handleOptionClick(option)}
                style={{
                  display:
                    selectedOption &&
                    isCorrect &&
                    option !== questions[currentQuestionIndex].correctAnswer
                      ? "none"
                      : "block",
                }}
              >
                {option}
              </li>
            ))}
          </ul>
          {selectedOption && isCorrect && (
            <div className="explanation mt-3">
              <h3>EXPLANATION</h3>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
          {selectedOption && !isCorrect && (
            <button
              className="try-again-button btn btn-info mt-3"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          )}
          <button className="read-story-button btn btn-info mt-3">
            <img src="/images/trivia-question/read-icon.png" alt="book" /> Read
            Story
          </button>
          {selectedOption &&
            isCorrect &&
            (currentQuestionIndex === questions.length - 1 ? (
              <button
                className="finish-button btn btn-info mt-3"
                onClick={handleFinish}
              >
                Finish
              </button>
            ) : (
              <button
                className="next-question-button btn btn-info mt-3"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TriviaQuestion;
