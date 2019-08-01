import React, { Component } from "react";
import { ticketServices } from "../../services/ticket.service";

class GetTicket extends Component {
  constructor() {
    super();
    this.state = {
      ticket: undefined
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.getTicket(id);
  }

  getTicket = (id) => {
    ticketServices.getTicket(id).then(ticket => {
      this.setState({
        ticket
      });
    }).catch(err => console.log('error on get ticket ', err));
  };

  render() {
    return this.state.ticket !== undefined ? (
      <div>
        <h1>
          {this.state.ticket.title}
        </h1>
        <p>{this.state.ticket.description}</p>
      </div>
    ) : (
        <div>Loading....</div>
      );
  }
}

export default GetTicket;
