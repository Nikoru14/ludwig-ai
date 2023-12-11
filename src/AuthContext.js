import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const localStorageKey = 'authState';

        // Check for user authentication in localStorage
        const storedAuthState = JSON.parse(localStorage.getItem(localStorageKey));
        if (storedAuthState && storedAuthState.isAuthenticated) {
            setIsAuthenticated(true);
            setUserEmail(storedAuthState.userEmail);
        }

        // Set up Firebase auth state listener and store the unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUserEmail(user.email);

                // Persist user authentication state in localStorage
                const authState = { isAuthenticated: true, userEmail: user.email };
                localStorage.setItem(localStorageKey, JSON.stringify(authState));
            } else {
                setIsAuthenticated(false);
                setUserEmail('');

                // Clear user authentication state from localStorage
                localStorage.removeItem(localStorageKey);
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userEmail, setUserEmail }}>
            {children}
        </AuthContext.Provider>
    );
};
