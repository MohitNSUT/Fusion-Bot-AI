import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import "./Paragraph.css"; 

const Paragraph = () => {

  const [text, setText] = useState("");
  const [para, setPara] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/paragraph", { text });
      console.log(data);
      setPara(data);
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
    <div className="paragraph-container">
      {error && <div className="paragraph-alert">{error}</div>}
      <form onSubmit={handleSubmit} className="paragraph-form">
        <h2 className="paragraph-title">Generate Paragraph</h2>
        <textarea
          placeholder="Add your text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="paragraph-input"
          rows="6"
        />
        <button type="submit" className="paragraph-button">
          Generate
        </button>
        <div className="paragraph-link">
          Not this tool? <Link to="/">Go Back</Link>
        </div>
      </form>

      {para ? (
        <div className="paragraph-card">
          <pre>{para}</pre>
        </div>
      ) : (
        <div className="paragraph-card">
          <div className="paragraph-placeholder">
            Your Paragraph Will Appear Here
          </div>
        </div>
      )}
    </div>
  );
};

export default Paragraph;
