import './App.scss';
import Login from './views/Login/Login';
import { AnimatePresence } from 'framer-motion';
import Home from './views/Home/Home';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Workoutdetails from './views/WorkoutDetails/WorkoutDetails';
import { Switch, Route } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';



function App() {
  const auth = getAuth();
  const location = useLocation();
  const history = useHistory();
  var [user, setUser] = useState(undefined);

  const authListener = onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      setUser(authUser)
    } else {
      setUser(false);
    }
  })
  useEffect(function () {
    if (user == undefined) return;
    if (!user) {
      history.push("/login");
    } else {
      history.push("/");
    }
  }, [user])
  return (
    <div className="wrapper">
      <div className="view">
        <AnimatePresence initial={false}>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" children={<Home/>} />
            <Route path="/login" children={<Login />}/>
            <Route path="/workout/:id" children={<Workoutdetails />}/>
          </Switch>
        </AnimatePresence>
      </div>
      

    </div>

  );
}

export default App;
