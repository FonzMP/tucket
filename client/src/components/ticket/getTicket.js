import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTicket from "./editTicket";

function GetTicket({ ticket }) {
  const [viewTicket, setViewTicket] = useState(ticket);
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

  function getEdit(ticket) {
    // editTicket(ticket);
    setEditView(false);
    setCurrentId(null);
  }

  function deleteTicket() {
    deleteTicket(ticket._id);
  }

  return ticket !== undefined ? (
    <div className="project-ticket-container">
      <h1>{viewTicket.title}</h1>
      <p>{viewTicket.description}</p>
      <span className="projectButtonWrap">
        <span>
          <Link
            className="mock-button"
            id="first-link"
            // to={"/projects/" + id + "/tickets/" + ticket.id}
          >
            View
          </Link>
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
      {editView && viewTicket._id === currentId ? (
        <EditTicket ticket={viewTicket} sendEdit={getEdit} />
      ) : null}
    </div>
  ) : (
    <div>Loading....</div>
  );
}

export default GetTicket;
