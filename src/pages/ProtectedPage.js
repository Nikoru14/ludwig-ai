import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({ userEmail, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Perform logout logic
        navigate('/'); // Redirect to home
    };

    return (
        <div>
            <h2>Welcome, you have successfully logged in!</h2>
            <p>Email: {userEmail}</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default ProtectedPage;
