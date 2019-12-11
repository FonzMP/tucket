import React, { useState } from "react";
import EditTicket from "./editTicket";

function GetTicket(props) {
  const [editView, setEditView] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [ticket, setTicket] = useState(props.ticket);

  function setEdit(id) {
    if (id === currentId) {
      setEditView(false);
      setCurrentId(null);
    } else {
      setEditView(true);
      setCurrentId(id);
    }
  }

  function setTicketsOne(ticket) {
    props.setTicket(ticket);
  }

  function getEdit(ticket) {
    props.editTicket(ticket);
    setEditView(false);
    setCurrentId(null);
  }

  function deleteTicket(id) {
    props.deleteTicket(id);
  }

  function sendProjectReset() {
    props.resetWindow();
  }

  return ticket !== undefined ? (
    <div>
      <span className="mock-button" onClick={() => sendProjectReset()}>
        Back
      </span>
      <div className="project-ticket-container">
        <h1>{ticket.title}</h1>
        <p>{ticket.description}</p>
        <div className="edit-delete">
          <span className="mock-button" onClick={() => setEdit(ticket._id)}>
            Edit
          </span>
          <span
            className="mock-button"
            onClick={() => deleteTicket(ticket._id)}
          >
            Delete
          </span>
        </div>
        {editView && ticket._id === currentId ? (
          <EditTicket ticket={ticket} sendEdit={getEdit} />
        ) : null}
      </div>
    </div>
  ) : (
    <div>Error getting ticket</div>
  );
}

export default GetTicket;
