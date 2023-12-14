import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFound from './pages/404';
import Home from './pages/home';
import SignUp from './pages/SignUp';
import ProtectedPage from './pages/ProtectedPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthContext';

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/main-app" element={<ProtectedPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
