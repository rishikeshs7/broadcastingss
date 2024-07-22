// MapTemplateVariable.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './maptemplatevariable.css';

const MapTemplateVariable = () => {
  const [headerText, setHeaderText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(''); 
  const [prompt, setPrompt] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const navigate = useNavigate();

  const handleHeaderChange = (event) => setHeaderText(event.target.value);
  const handleBodyChange = (event) => setBodyText(event.target.value);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB.');
        setSelectedFile(null);
        setPrompt('Error: File size should be less than 5MB.');
      } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError('File type should be JPEG, JPG, or PNG.');
        setSelectedFile(null);
        setPrompt('Error: File type should be JPEG, JPG, or PNG.');
      } else {
        setError('');
        setSelectedFile(file);
        setPrompt('Image successfully added.');
      }

      setTimeout(() => setPrompt(''), 5000);
    }
  };

  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleWebsiteChange = (event) => setWebsite(event.target.value);
  const toggleAdvancedFeatures = () => setShowAdvanced(!showAdvanced);

  const handleNextClick = () => {
    navigate('/broadcast', {
      state: { selectedFile, website, phoneNumber } 
    });
  };

  return (
    <>
      <div className='headermedia'>
        <h1>Header Media</h1>
        <div>
          <button className='upload' onClick={() => document.getElementById('fileInput').click()}>
            Upload
          </button>
          <span> File types: JPEG, JPG, PNG within 5MB size</span>
        </div>
        <input
          id='fileInput'
          type='file'
          accept='image/jpeg, image/jpg, image/png'
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {prompt && <p className='prompt'>{prompt}</p>}
        {error && <p className='error'>{error}</p>} {''}

        <h1>Body Text</h1>
        <div className="variables">
          <p className='var'>Variables             Values </p>
          <p>Values</p>
        </div>

        <div className="text-input-row">
          <div className="small-box">1</div>
          <input 
            type="text" 
            value={headerText} 
            onChange={handleHeaderChange} 
            placeholder="Enter values here" 
          />
        </div>

        <div className="text-input-row">
          <div className="small-box">2</div>
          <input 
            type="text" 
            value={bodyText} 
            onChange={handleBodyChange} 
            placeholder="Enter values here" 
          />
        </div>

        <h2 
          onClick={toggleAdvancedFeatures} 
          className={showAdvanced ? 'advanced-active' : 'advanced-inactive'}
        >
          Advanced Features
        </h2>
        {showAdvanced && (
          <div>
            <div className="advanced-features-container">
              <div className="advanced-feature-row">
                <button className='add-call'>Call Now</button>
                <input 
                  type="text" 
                  value={phoneNumber} 
                  onChange={handlePhoneNumberChange} 
                  placeholder="Enter phone number" 
                />
              </div>
              <div className="advanced-feature-row">
                <button className='add-website'>Buy Now</button>
                <input 
                  type="text" 
                  value={website} 
                  onChange={handleWebsiteChange} 
                  placeholder="Enter website URL" 
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="next-button-container">
        <button className='next' onClick={handleNextClick}>
          Next
        </button>
      </div>
    </>
  );
};

export default MapTemplateVariable;
