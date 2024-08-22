import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ReadStory/css/Story.css';

const Story = () => {
    const { level } = useParams(); 
    const [story, setStory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await fetch(`http://localhost:8888/ipots-kids-app/ipots-server/story.php?level=${level}`);
                const data = await response.json();

                if (data) {
                    setStory(data);
                } else {
                    throw new Error("Story not found");
                }
            } catch (error) {
                console.error("Error fetching story:", error);
                setError(error.message);
            }
        };

        fetchStory();
    }, [level]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!story) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container story-container">
            <h1 className="story-title text-center my-4">{story.title}</h1>
            <div className="story-content text-center">
                <p className="story-text">{story.text}</p>
                {story.images && story.images.map((image, index) => (
                    <img key={index} className="story-image" src={image} alt={`Story ${index}`} />
                ))}
            </div>
            <div className="story-buttons text-center mt-4">
                <Link className="btn btn-primary mx-2" to={`/story/level/${parseInt(level) + 1}`}>Next Story</Link>
                <Link className="btn btn-secondary mx-2" to={`/trivia/level/${level}`}>Play Trivia</Link>
                <Link className="btn btn-secondary mx-2" to={`/crossword/level/${level}`}>Play Crossword</Link>
                <Link className="btn btn-secondary mx-2" to="/">Home</Link>
            </div>
        </div>
    );
};

export default Story;
