import React, { Component } from "react";
import EditTicket from "./editTicket";
import { projectServices } from "../../services/project.service";

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
    const { ticket } = this.props;
    return ticket !== undefined ? (
      <div className="project-ticket-container">
        <h1>{ticket.title}</h1>
        <p>{ticket.description}</p>
        <span
          className="mock-link"
          id="first-link"
          onClick={() => this.setTicketsOne(ticket)}
        >
          View
        </span>
        <div className="edit-delete">
          <span className="mock-link" onClick={() => this.setEdit(ticket._id)}>
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
    ) : (
      <div>Error getting ticket</div>
    );
  }
}

export default GetTicket;
