import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./shared/navigation/navbar";
import "./App.css";
import NAVCONSTANTS from "./_constants/NavigationConstants";

class App extends Component {
  renderNavigations = () => {
    return NAVCONSTANTS.NAV.map((links, index) => {
      return (
        <Route
          exact
          path={links.href}
          component={links.component}
          key={index}
        />
      );
    });
  };
  render() {
    return (
      <Router>
        <Navbar />
        <React.Fragment>
          <span>{this.renderNavigations()}</span>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
