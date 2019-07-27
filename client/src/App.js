import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./shared/home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="contentBody">
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </div>
    </Router>
  );
}

export default App;
