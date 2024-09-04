
import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import "./Summary.css";

const Summary = () => {

  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/summary", { text });
      console.log(data);
      setSummary(data);
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
    <div className="summary-container">
      {error && <div className="summary-alert">{error}</div>}
      <form onSubmit={handleSubmit} className="summary-form">
        <h2 className="summary-title">Summarize Text</h2>
        <textarea
          placeholder="Add your text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="summary-input"
          rows="6"
        />
        <button type="submit" className="summary-button">
          Submit
        </button>
        <div className="summary-link">
          Not this tool? <Link to="/">Go Back</Link>
        </div>
      </form>

      {summary ? (
        <div className="summary-card">
          <pre>{summary}</pre>
        </div>
      ) : (
        <div className="summary-card">
          <div className="summary-placeholder">
            Summary Will Appear Here
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
