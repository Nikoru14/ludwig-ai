import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProtectedPage = () => {
    const { isAuthenticated, userEmail, setIsAuthenticated, setUserEmail } = useContext(AuthContext);
    const iframeRef = useRef(null);
    const navigate = useNavigate();
    const [hideEmail, setHideEmail] = useState(true);

    const [iframeSrc, setIframeSrc] = useState(''); // Control iframe loading

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                setUserEmail(user.email);
                sendMessageToIframe('initialize');
                setIframeSrc('https://nikoru14.github.io/BithovenAI/');
            } else {
                setIsAuthenticated(false);
                setUserEmail('');
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate, setIsAuthenticated, setUserEmail]);

    const sendMessageToIframe = (message) => {
        console.log("Sending Message to Iframe")
        if (iframeRef.current) {
            const targetOrigin = new URL(iframeRef.current.src).origin;
            iframeRef.current.contentWindow.postMessage(message, targetOrigin);
        }
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setIsAuthenticated(false);
            setUserEmail('');
            navigate('/');
        }).catch((error) => {
            console.error('Logout error:', error);
        });
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleToggleEmailVisibility = () => {
        setHideEmail(!hideEmail);
    };

    const getDisplayEmail = () => {
        if (!hideEmail || !userEmail) return userEmail;
        const atIndex = userEmail.indexOf('@');
        if (atIndex === -1) return userEmail; // No '@' found
        const firstChar = userEmail[0];
        const lastCharBeforeAt = userEmail[atIndex - 1];
        const maskedPart = '*'.repeat(atIndex - 2);
        return `${firstChar}${maskedPart}${lastCharBeforeAt}${userEmail.substring(atIndex)}`;
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <nav className="navbar-protected">
                <div className='navbar-p-content'>
                    <div className="navbar-left">
                        <div onClick={handleBack} className="back-button">
                            <FontAwesomeIcon icon={faBackward} className="button-icon" />
                        </div>
                        <span>Welcome, {getDisplayEmail()}</span>
                        <div onClick={handleToggleEmailVisibility} className="hide-email-button">
                            <FontAwesomeIcon icon={hideEmail ? faEyeSlash : faEye} className="button-icon" />
                        </div>
                    </div>
                    <div className="navbar-right">
                        <div onClick={handleLogout} className="logout-button">Log Out</div>
                    </div>
                </div>
            </nav>
            <iframe className='iframe-main'
                ref={iframeRef}
                allow='midi'
                onLoad={() => sendMessageToIframe('initialize')}
                src={iframeSrc}
                title="Ludwig AI Main app"
            // other necessary attributes
            />
        </div>
    );
};

export default ProtectedPage;
