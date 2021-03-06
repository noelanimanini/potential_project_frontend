import Login from "./Login";
import "./App.css";
import { Route, Router, Switch } from "react-router-dom";
import history from "./history";
import SignUp from "./SignUp";
import Home from "./Home";
import Profile from "./Profile";
import StudyGroup from "./StudyGroup";
import Account from "./Account";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/login"
            component={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/signup"
            component={(props) => <SignUp {...props} />}
          />
          <Route
            exact
            path="/home"
            component={(props) => <Home {...props} />}
          />
          <Route
            exact
            path="/profile"
            component={(props) => <Profile {...props} />}
          />
          <Route
            exact
            path="/studygroup"
            component={(props) => <StudyGroup {...props} />}
          />
          <Route
            exact
            path="/account"
            component={(props) => <Account {...props} />}
          />
          <Route
            exact
            path="/study_groups"
            component={(props) => <StudyGroup {...props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
