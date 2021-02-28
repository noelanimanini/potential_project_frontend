import Login from './Login'
import './App.css';
import {Route, Router, Switch} from 'react-router-dom'
import history from './history';
import SignUp from './SignUp'
import Home from './Home';

function App() {
  return (
    <div className="App">
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={props => <Login {...props}/>} />
        <Route exact path="/signup" component={props => <SignUp {...props}/>} />
        <Route exact path="/home" component={props => <Home {...props}/>}/>
      </Switch> 
    </Router>
    </div>
  );
}

export default App;
