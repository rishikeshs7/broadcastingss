import React from 'react';
import { useLocation } from 'react-router-dom';
import './resultpage.css';

const ResultPage = () => {
  const { state } = useLocation();
  const { image, website, personName } = state || {};

  return (
    <div className="result-container">
      <div className="result-box">
        {image && <img src={image} alt="Uploaded" className="result-image" />}
        <p className="result-message">
          Welcome aboard, {personName}. Thank you for opting in to stay in touch with us here. Watch this space for exclusive offers and updates delivered right at your fingertips!
          <br />
          Click here to go to our website: <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
        </p>
      </div>
    </div>
  );
};

export default ResultPage;
