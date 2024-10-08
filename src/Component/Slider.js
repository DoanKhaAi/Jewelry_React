import React, { useState, useEffect } from 'react';
import '../css/Slider.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { id: 1, image: "http://localhost:8080/img/banner/_banner1.jpg", caption: "Caption for Slide 1" },
    { id: 2, image: "http://localhost:8080/img/banner/_banner2.jpg", caption: "Caption for Slide 2" },
    { id: 3, image: "http://localhost:8080/img/banner/_banner3.jpg", caption: "Caption for Slide 3" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={`Slide ${slide.id}`} />
          </div>
        ))}
      </div>
      <div className="controls">
        {slides.map((_, index) => (
          <button key={index} className={`dot ${currentIndex === index ? 'active' : ''}`} onClick={() => setCurrentIndex(index)}></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
