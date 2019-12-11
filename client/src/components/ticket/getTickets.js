import React, { useState } from "react";
import EditTicket from "./editTicket";

function GetTickets(props) {
  const [ticket, setTicket] = useState(props.ticket);
  const [currentId, setCurrentId] = useState(null);
  const [editView, setEditView] = useState(false);

  function setEdit() {
    const id = ticket._id;
    if (id === currentId) {
      setEditView(false);
      setCurrentId(null);
    } else {
      setEditView(true);
      setCurrentId(id);
    }
  }

  function setTicketsOne() {
    props.setTicket(ticket);
  }

  function getEdit(ticket) {
    props.editTicket(ticket);
    setEditView(false);
    setCurrentId(null);
  }

  function deleteTicket() {
    props.deleteTicket(ticket._id);
  }

  return ticket !== undefined ? (
    <div className="project-ticket-container">
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
      <span className="projectButtonWrap">
        <span>
          <span
            className="mock-button"
            id="first-link"
            onClick={() => setTicketsOne()}
          >
            View
          </span>
        </span>
        <div className="edit-delete">
          <span className="mock-button" onClick={() => setEdit()}>
            Edit
          </span>
          <span className="mock-button" onClick={() => deleteTicket()}>
            Delete
          </span>
        </div>
      </span>
      {editView && ticket._id === currentId ? (
        <EditTicket ticket={ticket} sendEdit={getEdit} />
      ) : null}
    </div>
  ) : (
    <div>Loading....</div>
  );
}

export default GetTickets;
