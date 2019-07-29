import React, { Component } from "react";
import { ticketServices } from "../../services/ticket.service";

class GetTickets extends Component {
  constructor() {
    super();
    this.state = {
      tickets: undefined
    };
  }

  componentDidMount() {
    this.getTickets();
  }

  getTickets = () => {
    ticketServices.getTickets().then(tickets => {
      this.setState({
        tickets
      });
    });
  };

  renderTickets = () => {
    return this.state.tickets.map(ticket => {
      return (
        <div key={ticket.title}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
        </div>
      );
    });
  };

  render() {
    return this.state.tickets !== undefined ? (
      <div>{this.renderTickets()}</div>
    ) : (
      <div>Loading....</div>
    );
  }
}

export default GetTickets;
