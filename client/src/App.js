import "./App.css";
import { Browserrouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";

function App() {
  return (
    <Browserrouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
        </Switch>
        <h1>Henry Countries</h1>
      </div>
    </Browserrouter>
  );
}

export default App;
