import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { getAuth, signOut } from 'firebase/auth';

const ProtectedPage = () => {
    const { isAuthenticated, userEmail, setIsAuthenticated, setUserEmail } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            setIsAuthenticated(false);
            setUserEmail('');
            navigate('/');
        }).catch((error) => {
            // An error happened.
            console.error('Logout error:', error);
        });
    };

    if (!isAuthenticated) {
        // Optionally, render a loading spinner or a redirect message
        return null;
    }

    return (
        <div>
            <h2>Welcome, you have successfully logged in!</h2>
            <p>Email: {userEmail}</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default ProtectedPage;
