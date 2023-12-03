import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
}

export default App;
