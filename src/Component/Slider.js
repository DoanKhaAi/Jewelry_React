import React, { useState, useEffect } from 'react';
import '../css/Slider.css';

import image1 from '../images/slide/daychuyen.jpg';
import image2 from '../images/slide/bongtai.jpg';
import image3 from '../images/slide/nhan.jpg';
import image4 from '../images/slide/vongtay.jpg';


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { id: 1, image: require("../images/banner/_banner4.jpg"), caption: "Caption for 1" },
    { id: 2, image: require("../images/banner/_banner2.jpg"), caption: "Caption for 2" },
    { id: 3, image: require("../images/banner/_banner3.jpg"), caption: "Caption for 3" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
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
        <div className="slogan">ĐA DẠNG LOẠI SẢN PHẨM VỚI NHIỀU THIẾT KẾ TINH TẾ CÙNG KAJ</div>
        <div className="option">
              <img src={image1} alt="Pic 1" />
              <img src={image2} alt="Pic 2" />
              <img src={image3} alt="Pic 3" />
              <img src={image4} alt="Pic 4" />
        </div>

    </div>
    
  );
};

export default Slider;
