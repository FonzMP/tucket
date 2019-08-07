import React, { Component } from "react";

class GetTicket extends Component {

  render() {
    const { ticket } = this.props
    return ticket !== undefined ? (
      <div className="project-ticket-container">
        <h1>
          {ticket.title}
        </h1>
        <p>{ticket.description}</p>
      </div>
    ) : (
        <div>Error getting ticket</div>
      );
  }
}

export default GetTicket;
