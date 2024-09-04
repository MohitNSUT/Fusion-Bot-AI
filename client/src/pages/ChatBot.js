import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import "./ChatBot.css"; 

const ChatBot = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/chatbot", { text });
      console.log(data);
      setResponse(data);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="chatbot-container">
      {error && <div className="chatbot-alert">{error}</div>}
      <form onSubmit={handleSubmit} className="chatbot-form">
        <h2 className="chatbot-title">Ask with Chatbot</h2>
        <textarea
          placeholder="Add your text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="chatbot-input"
          rows="6"
        />
        <button type="submit" className="chatbot-button">
          Chat
        </button>
        <div className="chatbot-link">
          Not this tool? <Link to="/">Go Back</Link>
        </div>
      </form>

      {response ? (
        <div className="chatbot-card">
          <pre>{response}</pre>
        </div>
      ) : (
        <div className="chatbot-card">
          <div className="chatbot-placeholder">Bot Response</div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
