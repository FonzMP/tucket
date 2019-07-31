import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Header from "./components/shared/header";
import Navbar from "./components/shared/navigation/navbar";
import Footer from "./components/shared/footer";
import "./App.css";
import NAVCONSTANTS from "./_constants/NavigationConstants";

class App extends Component {

  renderNavigations = () => {
    return NAVCONSTANTS.NAV.map(links => {
      return (
        <Route
          exact
          path={links.href}
          component={links.component}
          key={links.key}
        />
      );
    });
  };

  render() {
    return (
      <Router>
        <Header />
        <div className="content-wrapper">
          <Navbar links={NAVCONSTANTS.NAV} />
          <React.Fragment>
            <span>{this.renderNavigations()}</span>
          </React.Fragment>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
