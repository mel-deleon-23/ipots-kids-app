import React, { useState, useEffect } from 'react';

const QuestionCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const questionCells = {
    "1": {
      "question": "A famous doctor",
      "direction": "down"
    },
    "2": {
      "question": "A large snake",
      "direction": "across"
    },
    "3": {
      "question": "The largest city",
      "direction": "down"
    }
  };

  const totalSlides = Object.keys(questionCells).length;

  const populateQuestion = (index) => {
    const questionContainer = document.querySelector('#questionIndex');
    if (questionContainer) {
      questionContainer.innerText = index;
    }

    const direction = document.querySelector('#direction');
    if (direction) {
      direction.innerText = questionCells[index]['direction'];
    }

    const questionBox = document.querySelector('#question');
    if (questionBox) {
      questionBox.innerText = questionCells[index]['question'];
    }
  };

  const showSlide = (index) => {
    let newSlideIndex = index;

    if (index > totalSlides) {
      newSlideIndex = 1;
    } else if (index < 1) {
      newSlideIndex = totalSlides;
    }

    setCurrentSlide(newSlideIndex);
    populateQuestion(newSlideIndex);
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  useEffect(() => {
    showSlide(currentSlide);
  }, [currentSlide]);

  return (
    <div>
      <div id="questionContainer">
        <h2>Question {currentSlide}</h2>
        <div id="questionIndex"></div>
        <div id="direction"></div>
        <div id="question"></div>
      </div>
      <div className="carousel-controls">
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
};

export default QuestionCarousel;
