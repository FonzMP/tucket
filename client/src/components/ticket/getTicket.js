import React, { Component } from "react";
import EditTicket from "./editTicket";

class GetTicket extends Component {
  constructor() {
    super();
    this.state = {
      editView: false,
      currentId: null
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

  sendProjectReset = () => {
    this.props.resetWindow();
  };

  render() {
    const { ticket } = this.props;
    return ticket !== undefined ? (
      <div>
        <span className="mock-link" onClick={() => this.sendProjectReset()}>
          Back
        </span>
        <div className="project-ticket-container">
          <h1>{ticket.title}</h1>
          <p>{ticket.description}</p>
          <div className="edit-delete">
            <span
              className="mock-link"
              onClick={() => this.setEdit(ticket._id)}
            >
              Edit
            </span>
            <span
              className="mock-link"
              onClick={() => this.deleteTicket(ticket._id)}
            >
              Delete
            </span>
          </div>
          {this.state.editView && ticket._id === this.state.currentId ? (
            <EditTicket ticket={ticket} sendEdit={this.getEdit} />
          ) : null}
        </div>
      </div>
    ) : (
      <div>Error getting ticket</div>
    );
  }
}

export default GetTicket;
