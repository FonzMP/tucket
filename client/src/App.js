import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/shared/header";
import Navbar from "./components/shared/navigation/navbar";
import Footer from "./components/shared/footer";
import "./App.css";
import "./assets/stylesheets/projects.scss"
import "./assets/stylesheets/navigation.scss"
import NAVCONSTANTS from "./_constants/NavigationConstants";
import GetTickets from "./components/ticket/getTickets";
import GetTicket from "./components/ticket/getTicket";
import CreateTicket from './components/ticket/createTicket'
import GetProjects from "./components/project/getProjects";
import CreateProject from "./components/project/createProject";
import Home from "./components/shared/home";

class App extends Component {

  render() {
    return (
      <Router>
        <Header />
        <div className="content-wrapper">
          <Navbar links={NAVCONSTANTS.NAV} />
          <Switch>
            <Route
              exact
              path='/'
              component={Home}
            />
            <Route
              exact
              path='/tickets'
              component={GetTickets}
            />
            <Route
              exact
              path='/tickets/new'
              component={CreateTicket}
            />
            <Route
              exact
              path='/tickets/:id'
              component={GetTicket}
            />
            <Route
              exact
              path='/projects'
              component={GetProjects}
            />
            <Route
              exact
              path='/projects/all'
              component={GetProjects}
            />
            <Route
              exact
              path='/projects/new'
              component={CreateProject}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
