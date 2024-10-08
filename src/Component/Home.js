import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import News from './News';

const Home = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch('/api/news') 
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div>
      <Slider />
      <div className="news-container">
        <h3 className="news-title fw-bold">TIN KHUYẾN MÃI</h3>  
        <p className="tell">
          <i class="fa-solid fa-quote-left"></i>
              Quà tặng trang sức tượng trưng cho sự gắn bó bền chặt. 
              KAJ gửi lời chúc hạnh phúc đến những người yêu thương
              và tôn vinh vẻ đẹp của tình yêu trong từng sản phẩm
          <i class="fa-solid fa-quote-right"></i>
        </p>
        <div className="news-list row">
          {news.map(item => (
            <News key={item.newsID} news={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
