import React from 'react';
import { marked } from 'marked';
import '../css/News.css';

const News = ({ news }) => {
  //Do phía server em lưu tiêu đề tin tức dạng markdown nên bên phía gaio diện cũng render dạng markdown
  const renderMarkdown = (markdownText) => {
    return { __html: marked(markdownText) };
  };

  return (
    <div className="col-6 mb-4">
      <div className="news-item">
          <div className="news-image">
            <img src={`http://localhost:8080/img/news/${news.image}`} alt={news.title} className="img-fluid" />
          </div>
        <div className="news-content">
          <p dangerouslySetInnerHTML={renderMarkdown(news.title)}></p>
          <p className="content">{news.content}</p>
        </div>
      </div>
    </div>
  );
};

export default News;
