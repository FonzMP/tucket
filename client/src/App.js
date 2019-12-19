import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/shared/header";
import Navbar from "./components/shared/navigation/navbar";
import Footer from "./components/shared/footer";
import "./App.css";
import "./assets/stylesheets/navigation.scss";
import "./assets/stylesheets/shared.scss";
import "./assets/stylesheets/tickets.scss";
import "./assets/stylesheets/projects.scss";

import NAVCONSTANTS from "./_constants/NavigationConstants";
import GetTickets from "./components/ticket/getTickets";
import Home from "./components/shared/home";
import Login from "./components/shared/auth/login";
import Signup from "./components/shared/auth/signup";
const ProjectRouting = lazy(() =>
  import("./components/project/ProjectRouting")
);

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="content-wrapper">
          <Navbar links={NAVCONSTANTS.NAV} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/tickets" component={GetTickets} />
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/projects" component={ProjectRouting} />
            </Suspense>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
