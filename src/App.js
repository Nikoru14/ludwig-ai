import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import ProtectedPage from './pages/ProtectedPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/protected" element={<ProtectedPage />} />
        {/* Additional routes can be added here */}
      </Routes>
    </Router>
  );
};

export default App;
