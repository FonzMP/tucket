import React, { Component } from "react";
import { ticketServices } from "../../services/ticket.service";

class CreateTicket extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: ""
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  sendTicket = () => {
    ticketServices
      .createTicket(this.state)
      .then(result => console.log("result from creation ", result));
  };
  render() {
    return (
      <div>
        <label htmlFor="title">
          Title:
          <input
            id="title"
            type="text"
            value={this.state.title}
            onChange={this.handleOnChange}
          />
        </label>
        <label htmlFor="content">
          Content:
          <input
            id="content"
            type="text"
            value={this.state.content}
            onChange={this.handleOnChange}
          />
        </label>
        <button onClick={this.sendTicket}>Create Ticket</button>
      </div>
    );
  }
}

export default CreateTicket;
