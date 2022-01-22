import './App.scss';
import { Router } from "@reach/router";
import Login from './views/Login';
import Home from './views/Home/Home';


function App() {

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
