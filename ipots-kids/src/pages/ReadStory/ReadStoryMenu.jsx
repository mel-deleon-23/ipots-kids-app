import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ReadStory/css/ReadStoryMenu.css';

const ReadStoryMenu = () => {
    const [stories, setStories] = useState([]);
  
    useEffect(() => {
        fetch('http://localhost:8888/ipots-kids-app/ipots-server/story_menu.php') 
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging step to check fetched data
            if (data.stories) {
                setStories(data.stories);
            } else {
                console.error('Invalid data format:', data);
            }
        })
        .catch(error => console.error('Error fetching stories:', error));
    }, []);
  
    return (
        <div className="trivia-menu">
          <h1 className="trivia-header">Read a Story</h1>
          {stories.length > 0 ? (
            stories.map(story => (
                <div key={story.id} className="trivia-menu-card">
                    <img src={story.image} alt={story.title} className="trivia-image" />
                    <div>
                        <h2 className="trivia-card-title">{story.title}</h2>
                        <p className="trivia-card-text">{story.description}</p>
                        <a href={`/read-story/${story.id}`} className="play-button">
                            <span className="play-text">Read</span>
                        </a>
                    </div>
                </div>
            ))
          ) : (
            <p>No stories available.</p>
          )}
        </div>
    );
  };

export default ReadStoryMenu;