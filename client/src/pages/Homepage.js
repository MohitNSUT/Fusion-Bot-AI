import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineFileText, AiOutlineAlignLeft, AiOutlineMessage, AiOutlineCode, AiOutlineCheckCircle } from "react-icons/ai"; 
import "./Homepage.css"; 

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="card-container">
        <div className="card" onClick={() => navigate("/summary")}>
          <h4 className="card-title">Text Generation</h4>
          <div className="icon-container">
            <AiOutlineFileText className="icon" />
          </div>
          <div className="card-content">
            <h5 className="card-heading">TEXT SUMMARY</h5>
            <p className="card-description">Summarize long text into short sentences</p>
          </div>
        </div>

        <div className="card" onClick={() => navigate("/paragraph")}>
          <h4 className="card-title">Paragraph Generation</h4>
          <div className="icon-container">
            <AiOutlineAlignLeft className="icon" />
          </div>
          <div className="card-content">
            <h5 className="card-heading">Paragraph</h5>
            <p className="card-description">Generate paragraphs with words</p>
          </div>
        </div>

        <div className="card" onClick={() => navigate("/chatbot")}>
          <h4 className="card-title">AI ChatBot</h4>
          <div className="icon-container">
            <AiOutlineMessage className="icon" />
          </div>
          <div className="card-content">
            <h5 className="card-heading">Chatbot</h5>
            <p className="card-description">Chat With AI Chatbot</p>
          </div>
        </div>

        <div className="card" onClick={() => navigate("/js-converter")}>
          <h4 className="card-title">JavaScript Converter</h4>
          <div className="icon-container">
            <AiOutlineCode className="icon" />
          </div>
          <div className="card-content">
            <h5 className="card-heading">JS CONVERTER</h5>
            <p className="card-description">Translate English to JavaScript code</p>
          </div>
        </div>

        <div className="card" onClick={() => navigate("/grammar")}>
          <h4 className="card-title">Grammatically Correct Text</h4>
          <div className="icon-container">
            <AiOutlineCheckCircle className="icon" />
          </div>
          <div className="card-content">
            <h5 className="card-heading">Grammarly</h5>
            <p className="card-description">Generate grammatically correct text</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;


