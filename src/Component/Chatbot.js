import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../css/Chatbot.css"; 

function Chatbot() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [firstOpen, setFirstOpen] = useState(true);
  const chatBoxRef = useRef(null); // Tạo ref cho chat box

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
    if (firstOpen) {
      setFirstOpen(false);
      sendGreeting();
    }
  };

  const sendGreeting = () => {
    const greetingMessage = { type: "bot", text: "Chào bạn! Mình có thể giúp gì cho bạn?" };
    setMessages((prevMessages) => [...prevMessages, greetingMessage]);
  };

  const sendMessage = async () => {
    if (userMessage.trim() !== "") {
      const newMessage = { type: "user", text: userMessage };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setUserMessage("");

      try {
        const response = await axios.post("http://localhost:5005/webhooks/rest/webhook", {
          sender: "user",
          message: userMessage,
        });
        const botMessages = response.data.map((m) => ({
          type: "bot",
          text: m.text,
        }));
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: "Không thể kết nối với chatbot." },
        ]);
      }
    }
  };

  // Cuộn xuống cuối mỗi khi có tin nhắn mới
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <button id="chatbot-icon" onClick={toggleChatbot}>
        <i className="fa-brands fa-rocketchat"></i>
      </button>

      {isChatbotVisible && (
        <div id="chatbot-container">
          <div id="chatbot-header">
            <i className="fa-brands fa-bots"></i>
          </div>
          <div id="chatBox" ref={chatBoxRef}> 
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            id="userMessage"
            placeholder="Nhập tin nhắn..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.which === 13) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button id="sendBtn" onClick={sendMessage}>
            Gửi
          </button>
        </div>
      )}
    </>
  );
}

export default Chatbot;
