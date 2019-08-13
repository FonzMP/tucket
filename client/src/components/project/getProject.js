import React, { Component } from "react";

import CreateTicket from "../ticket/createTicket";
import { ticketServices } from "../../services/ticket.service";
import { projectServices } from "../../services/project.service";
import GetTicket from "../ticket/getTicket";

class GetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTicket: false,
      project: this.props.project
    };
  }
  returnHome = () => {
    this.props.setHome();
  };
  showCreate = () => {
    this.setState({
      addTicket: !this.state.addTicket
    });
  };

  addTicket = ticket => {
    let project = this.props.project;
    ticketServices.createTicket(project, ticket).then(response => {
      this.setState({
        project: response,
        addTicket: false
      });
      this.props.refreshProjects();
    });
  };
  displayTickets = () => {
    return this.state.project.tickets.map(ticket => {
      return (
        <GetTicket
          ticket={ticket}
          key={ticket.title}
          editTicket={this.sendEditTicket}
        />
      );
    });
  };

  sendEditTicket = ticket => {
    projectServices.editTicket(this.state.project._id, ticket).then(project => {
      console.log("project here ", project);
      this.setState({
        project
      });
    });
  };

  render() {
    return (
      <div className="project-wrapper">
        <h4>{this.state.project.name}</h4>
        <div className="link-wrapper">
          <span className="mock-link" onClick={this.returnHome}>
            Back
          </span>
          <span className="mock-link" onClick={this.showCreate}>
            Add Ticket
          </span>
        </div>
        {this.state.addTicket ? (
          <CreateTicket addTicket={this.addTicket} />
        ) : null}
        {this.displayTickets()}
      </div>
    );
  }
}

export default GetProject;
