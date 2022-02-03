import './App.scss';
import Login from './views/Login';
import { AnimatePresence } from 'framer-motion';
import Home from './views/Home/Home';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Workoutdetails from './views/WorkoutDetails/WorkoutDetails';
import { Switch, Route } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

function App() {
  const auth = getAuth();
  console.log(auth);
  const history = useHistory();
  const location = useLocation();
  function authObserver () {
    onAuthStateChanged( auth, (user) => {
      if (user) {
        history.push("/");
      } else {
        history.push("/login");
      }
    })
  }
  useEffect(function () {
    authObserver();
  }, [])

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
