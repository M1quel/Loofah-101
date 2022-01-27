import './App.scss';
import { Router } from "@reach/router";
import Login from './views/Login';
import Home from './views/Home/Home';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { navigate } from '@reach/router';
import { useEffect } from 'react';
import Workoutdetails from './views/WorkoutDetails/WorkoutDetails';


function App() {
  var auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
    } else {
      navigate("/login");
    }
  });

  return (
    <div className="wrapper">
      <div className="view">
        <Router>
          <Home path="/"/>
          <Login path="/login"/>
          <Workoutdetails path="/workout/:id"/>
        </Router>
      </div>
      

    </div>

  );
}

export default App;
