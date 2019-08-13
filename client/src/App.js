import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/shared/header";
import Navbar from "./components/shared/navigation/navbar";
import Footer from "./components/shared/footer";
import "./App.css";
import "./assets/stylesheets/projects.scss";
import "./assets/stylesheets/navigation.scss";
import "./assets/stylesheets/tickets.scss";
import NAVCONSTANTS from "./_constants/NavigationConstants";
import GetTicket from "./components/ticket/getTicket";
import GetTickets from "./components/ticket/getTickets";
import CreateTicket from "./components/ticket/createTicket";
import GetProject from "./components/project/getProject";
import Home from "./components/shared/home";
import ProjectHome from "./components/project/projectHome";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="content-wrapper">
          <Navbar links={NAVCONSTANTS.NAV} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tickets" component={GetTickets} />
            <Route exact path="/tickets/new" component={CreateTicket} />
            <Route exact path="/tickets/:id" component={GetTicket} />
            <Route exact path="/projects" component={ProjectHome} />
            <Route exact path="/projects/:id" component={GetProject} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
