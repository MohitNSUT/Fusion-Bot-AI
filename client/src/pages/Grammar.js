import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import "./Grammar.css"; 

const Grammar = () => {

  // States
  const [text, setText] = useState("");
  const [para, setPara] = useState("");
  const [error, setError] = useState("");

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/openai/grammar", { text });
      console.log(data);
      setPara(data);
    } catch (err) {
      console.log(error);
      if (err.response?.data?.error) {
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
    <div className="container">
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <h3>Correct the Typos and Grammar</h3>

        <textarea
          placeholder="Add your text"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button type="submit">Generate</button>
        <p>
          Not this tool? <Link to="/">Go Back</Link>
        </p>
      </form>

      {para ? (
        <div className="result">
          <p>{para}</p>
        </div>
      ) : (
        <div className="result">
          <h5>Your Paragraph Will Appear Here</h5>
        </div>
      )}
    </div>
  );
};

export default Grammar;
