// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import dotenv from 'dotenv';
// dotenv.config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const retrieveAPIKeys = () => {
  return {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSENGER_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  }
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: retrieveAPIKeys().apiKey,
  authDomain: retrieveAPIKeys().authDomain,
  projectId: retrieveAPIKeys().projectId,
  storageBucket: retrieveAPIKeys().storageBucket,
  messagingSenderId: retrieveAPIKeys().messagingSenderId,
  appId: retrieveAPIKeys().appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth;
export default app;