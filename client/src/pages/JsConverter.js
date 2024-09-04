import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./JsConverter.css"; 

const JsConverter = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/js-converter", { text });
      console.log(data);
      setCode(data);
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
    <div className="js-converter-container">
      {error && <div className="js-converter-alert">{error}</div>}
      <form onSubmit={handleSubmit} className="js-converter-form">
        <h2 className="js-converter-title">JS Converter</h2>
        <textarea
          placeholder="Add your text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="js-converter-input"
          rows="6"
        />
        <button type="submit" className="js-converter-button">
          Convert
        </button>
        <div className="js-converter-link">
          Not this tool? <Link to="/">Go Back</Link>
        </div>
      </form>

      {code ? (
        <div className="js-converter-card">
          <pre>{code}</pre>
        </div>
      ) : (
        <div className="js-converter-card">
          <div className="js-converter-placeholder">
            Your Code Will Appear Here
          </div>
        </div>
      )}
    </div>
  );
};

export default JsConverter;
