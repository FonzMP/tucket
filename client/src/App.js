import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./shared/home";
import Navbar from "./shared/navigation/navbar";
import "./App.css";
import AddTicket from "./ticket/addTicket";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="contentBody">
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addTicket" component={AddTicket} />
          </Switch>
        </React.Fragment>
      </div>
    </Router>
  );
}

export default App;
