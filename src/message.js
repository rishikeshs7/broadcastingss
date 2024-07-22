// Message.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './resultpage.css';

const Message = () => {
  const { state } = useLocation();
  const { image, website, personName, } = state || {};
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    setShowPrompt(true);
    const timer = setTimeout(() => setShowPrompt(false), 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="result-container">
      {showPrompt && (
        <div className="prompt-message">
          <span className="prompt-icon">✔</span>
          Your Message Has Been Successfully Sent
        </div>
      )}
      <div className="result-box">
        {image && <img src={image} alt="Uploaded" className="result-image" />}
        <p className="result-message">
          Welcome aboard, {personName}. Thank you for opting in to stay in touch with us here. Watch this space for exclusive offers and new updates delivered right at your fingertips!
          Click here to go to our website: <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
        </p>
      </div>
    </div>
  );
};

export default Message;
