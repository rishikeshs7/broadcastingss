import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapTemplateVariable from './maptemplatevariable'
import BroadcastPage from './BroadcastPage'
import Message from './message';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapTemplateVariable />} />
        <Route path="/broadcast" element={<BroadcastPage />} />
        <Route path="/message" element={<Message />} />
      </Routes>
    </Router>
  );
};

export default App;
