// In firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyApcEjqaIAWdRfNnWLqmOqskfrCYZJRCIw",
    authDomain: "ludwig-ai-dev.firebaseapp.com",
    projectId: "ludwig-ai-dev",
    storageBucket: "ludwig-ai-dev.appspot.com",
    messagingSenderId: "293971688053",
    appId: "1:293971688053:web:d5e2f9e34aa073842d163c",
    measurementId: "G-E8NV1XB1FP"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Optionally export auth for direct use
export const auth = getAuth();
