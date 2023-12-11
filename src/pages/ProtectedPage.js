import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const ProtectedPage = () => {
    const { isAuthenticated, userEmail, setIsAuthenticated, setUserEmail } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUserEmail(user.email);
            } else {
                setIsAuthenticated(false);
                setUserEmail('');
                navigate('/');
            }

            setIsLoading(false); // Set loading to false once authentication state is determined
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, [navigate, setIsAuthenticated, setUserEmail])

    if (isLoading) {
        // Optionally, render a loading spinner or a redirect message
        return <div>Loading...</div>;
    }

    // Render the protected content once authentication state is determined
    return (
        <div>
            <h2>Welcome, you have successfully logged in!</h2>
            <p>Email: {userEmail}</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );

    function handleLogout() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setIsAuthenticated(false);
                setUserEmail('');
                navigate('/');
            })
            .catch((error) => {
                // An error happened.
                console.error('Logout error:', error);
            });
    }
};

export default ProtectedPage;
