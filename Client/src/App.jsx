import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AssignedProjects from './Components/ProjectList';
import Navbar from './Components/Navbar';
import ProgressTracker from './Components/ProgressTracker';
import Footer from './Components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<AssignedProjects />} />
          <Route path="/Progress-Tracker" element={<ProgressTracker />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
};

export default App;
