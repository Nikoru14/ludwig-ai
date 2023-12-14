// 404.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1><i class="fa-duotone fa-triangle-exclamation"></i> 404 - Page Not Found</h1>
            <p>The page you are looking for does not exist or has been moved.</p>
            <Link to="/">Go Home</Link>
        </div>
    );
};

export default NotFound;
