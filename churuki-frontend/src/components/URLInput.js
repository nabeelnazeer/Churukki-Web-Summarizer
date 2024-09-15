import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './URLInput.css';

const URLInput = () => {
  const [url, setURL] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/summarize', { url });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error:', error);
      setSummary('Failed to retrieve summary. Please check the URL.');
    }
    setLoading(false);
  };

  const handleReload = () => {
    setURL('');
    setSummary('');
  };

  return (
    <div className="container">
      <h1 className={`title ${summary ? 'shrink' : ''}`}>
        <i className="fas fa-lightbulb"></i> Churukki
      </h1>
      <div className="input-container">
        <input
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          placeholder="Enter URL"
          className="input"
        />
        <div className="button-container">
          <button onClick={handleSubmit} disabled={loading} className="button">
            {loading ? 'Processing...' : 'Scrape and Summarize'}
          </button>
          <button onClick={handleReload} className="reload-button">
            Reload
          </button>
        </div>
      </div>
      <div className="summary-container">
        <h3 className="summary-title">Summary:</h3>
        <div className="summary-box">
          <ReactMarkdown className="summary-text">{summary}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default URLInput;
