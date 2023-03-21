import './App.css';
import Pay1 from "./components/Pay1"
import Success from "./components/Success"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/pay">
          <Checkout/>
        </Route>
        <Route exact path="/success">
          <Success/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
