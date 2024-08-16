import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ReadStory/css/ReadStoryMenu.css';

const ReadStoryMenu = () => {
    const [storyLevels, setStoryLevels] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8888/ipots-kids-app/ipots-server/trivia.php");
          const data = await response.json();
  
          if (Array.isArray(data.levels)) {
            setStoryLevels(data.levels);
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
      <div className="container readstory-menu">
        <h1 className="readstory-header text-center my-4">Read a Story</h1>
        <div className="row justify-content-center readstory-levels">
          {storyLevels.map((level, index) => (
            <div key={index} className="readstory-cards col-md-8 mb-4">
              <div className="card readstory-menu-card d-flex flex-row align-items-center">
                <div className="readstory-title">LEVEL {level.level}</div>
                <img className="readstory-image" src={level.image} alt={`${level.title} image`} />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="readstory-card-content">
                    <h3 className="readstory-card-title">{level.title}</h3>
                    <p className="readstory-card-text">{level.description}</p>
                  </div>
                  <Link className="btn read-button" to={`/story/level/${level.level}`}>
                  <img src="/images/story-menu/read-icon.png" alt="play-button" className="read-button-icon" /> 
                  <p className="read-text">Read</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
  
export default ReadStoryMenu;