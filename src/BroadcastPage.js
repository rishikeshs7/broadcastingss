import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './broadcastpage.css';

const BroadcastPage = () => {
  const [time, setTime] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [showScheduleFields, setShowScheduleFields] = useState(false);
  const [showTestFields, setShowTestFields] = useState(false);
  const [maxDate, setMaxDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');
  const [personName, setPersonName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const maxDate = new Date(today.setMonth(today.getMonth() + 2));
    const formattedMaxDate = maxDate.toISOString().split('T')[0];
    setMaxDate(formattedMaxDate);
  }, []);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date > maxDate) {
      setError('Selected date cannot be more than two months from today.');
    } else {
      setError('');
    }
  };

  const handleTimeChange = (event) => setTime(event.target.value);
  const handleAmpmChange = (event) => setAmpm(event.target.value);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (value === 'schedule') {
      setShowScheduleFields(true);
    } else {
      setShowScheduleFields(false);
    }
  };

  const handleTestFieldsChange = (event) => setShowTestFields(event.target.checked);
  const handlePersonNameChange = (event) => setPersonName(event.target.value);
  const handleCustomerPhoneChange = (event) => setCustomerPhone(event.target.value);

  const handleSend = () => {
    navigate('/message', {
      state: {
        personName,
        website: location.state?.website || '',
        image: location.state?.selectedFile ? URL.createObjectURL(location.state.selectedFile) : ''
      }
    });
  };

  return (
    <div className='page-container'>
      <div className='broadcast-container'>
        <h1>Broadcast Name</h1>
        <input
          type='text'
          placeholder='Enter broadcast name'
          className='broadcast-input smaller-font'
        />
        <div className='broadcast-and-toggle'>
          <div className='broadcast-options'>
            <label>
              <input
                type='radio'
                name='option'
                value='sendNow'
                onChange={handleOptionChange}
              />
              Send Now
            </label>
            <label>
              <input
                type='radio'
                name='option'
                value='schedule'
                onChange={handleOptionChange}
              />
              Schedule
            </label>
          </div>
          <div className="switch-container">
            <label className="switch">
              <input type="checkbox" checked={showTestFields} onChange={handleTestFieldsChange} />
              <span className="slider"></span>
            </label>
            <span className="label-text">Test Broadcasting</span>
          </div>
        </div>
        {showScheduleFields && (
          <div className='schedule-info'>
            <div className='schedule-fields'>
              <div className='schedule-field'>
                <label htmlFor='date'>Date</label>
                <input
                  type='date'
                  id='date'
                  min={new Date().toISOString().split('T')[0]}
                  max={maxDate}
                  value={selectedDate}
                  onChange={handleDateChange}
                  className='schedule-input'
                />
                {error && <p className='error-message'>{error}</p>}
              </div>
              <div className='schedule-field'>
                <label htmlFor='time'>Time</label>
                <div className='time-container'>
                  <input
                    type='time'
                    id='time'
                    value={time}
                    onChange={handleTimeChange}
                    className='schedule-time-input'
                  />
                  <select
                    value={ampm}
                    onChange={handleAmpmChange}
                    className='ampm-select'
                  >
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
        {showTestFields && (
          <div className='test-broadcast'>
            <div className='test-fields'>
              <div className='test-field'>
                <label htmlFor='personName'>Person Name</label>
                <input
                  type='text'
                  id='personName'
                  placeholder='Enter person name'
                  value={personName}
                  onChange={handlePersonNameChange}
                  className='test-input'
                />
              </div>
              <div className='test-field'>
                <label htmlFor='customerPhone'>Customer Phone</label>
                <input
                  type='text'
                  id='customerPhone'
                  placeholder='Enter customer phone'
                  value={customerPhone}
                  onChange={handleCustomerPhoneChange}
                  className='test-input'
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='button-container'>
        <button className='button back-button'>Back</button>
        <button className='button send-button' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default BroadcastPage;
