import React, { Component } from "react";
import { ticketServices } from "../../services/ticket.service";

class CreateTicket extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: ""
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  sendTicket = () => {
    ticketServices
      .createTicket(this.state)
      .then(result => result);
  };
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="title">
            Title:
          <input
              id="title"
              type="text"
              value={this.state.title}
              onChange={this.handleOnChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description:
          <input
              id="description"
              type="text"
              value={this.state.description}
              onChange={this.handleOnChange}
            />
          </label>
        </div>
        <div className="form-group">
          <button onClick={this.sendTicket}>Create Ticket</button>
        </div>
      </div >
    );
  }
}

export default CreateTicket;
