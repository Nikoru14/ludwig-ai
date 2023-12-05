import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setIsAuthenticated(true);
                setUserEmail(user.email);
            } else {
                // No user is signed in
                setIsAuthenticated(false);
                setUserEmail('');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userEmail, setUserEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
