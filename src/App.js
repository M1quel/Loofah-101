import './App.scss';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Router } from "@reach/router";
import Login from './views/Login';
import Home from './views/Home';
import { getAuth } from 'firebase/auth';
import { navigate } from '@reach/router';
import { useEffect } from 'react';

function App() {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  useEffect(function () {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [auth.currentUser]);


  return (
    <div className="wrapper">
      <div className="view">
        <Router>
          <Home path="/"/>
          <Login path="/login"/>
        </Router>
      </div>
      

    </div>

  );
}

export default App;
