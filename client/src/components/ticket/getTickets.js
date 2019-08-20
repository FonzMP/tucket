import React, { Component } from "react";
import EditTicket from "./editTicket";

class GetTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: this.props.ticket
    };
  }

  setEdit = id => {
    if (id === this.state.currentId) {
      this.setState({
        editView: false,
        currentId: null
      });
    } else {
      this.setState({
        editView: true,
        currentId: id
      });
    }
  };

  setTicketsOne = ticket => {
    this.props.setTicket(ticket);
  };

  getEdit = ticket => {
    this.props.editTicket(ticket);
    this.setState({
      editView: false,
      currentId: null
    });
  };

  deleteTicket = id => {
    this.props.deleteTicket(id);
  };

  render() {
    return this.state.ticket !== undefined ? (
      <div className="project-ticket-container">
        <h1>{this.state.ticket.title}</h1>
        <p>{this.state.ticket.description}</p>
        <span
          className="mock-link"
          id="first-link"
          onClick={() => this.setTicketsOne(this.state.ticket)}
        >
          View
        </span>
        <div className="edit-delete">
          <span
            className="mock-link"
            onClick={() => this.setEdit(this.state.ticket._id)}
          >
            Edit
          </span>
          <span
            className="mock-link"
            onClick={() => this.deleteTicket(this.state.ticket._id)}
          >
            Delete
          </span>
        </div>
        {this.state.editView &&
        this.state.ticket._id === this.state.currentId ? (
          <EditTicket ticket={this.state.ticket} sendEdit={this.getEdit} />
        ) : null}
      </div>
    ) : (
      <div>Loading....</div>
    );
  }
}

export default GetTickets;
