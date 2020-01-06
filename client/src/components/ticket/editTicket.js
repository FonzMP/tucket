import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import ProjectServices from "../../services/project.service";

function EditTicket({ match }) {
  const [updateTicket, setUpdateTicket] = useState({
    title: "",
    description: ""
  });
  const [successUpdate, setSuccessUpdate] = useState(false);
  useEffect(() => {
    ProjectServices.getTicket(match.params.projectId, match.params.ticketId)
      .then(resp => resp.json())
      .then(response => setUpdateTicket(response.ticket))
      .catch(err => console.log("error getting ticket"));
  }, []);

  function sendEdit() {
    ProjectServices.editTicket(match.params.projectId, updateTicket)
      .then(resp => resp.json())
      .then(response => setSuccessUpdate(true))
      .catch(err => console.log("error updating ticket ", err));
  }

  return (
    <div className="create-ticket-container">
      {successUpdate ? (
        <Redirect to={`/projects/${match.params.projectId}`} />
      ) : null}
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={updateTicket.title}
          onChange={e =>
            setUpdateTicket({
              ...updateTicket,
              [e.target.name]: e.target.value
            })
          }
          placeholder="Title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          rows="5"
          name="description"
          value={updateTicket.description}
          onChange={e =>
            setUpdateTicket({
              ...updateTicket,
              [e.target.name]: e.target.value
            })
          }
          placeholder="Description"
        />
      </div>
      <div className="form-group">
        <span className="mock-button" onClick={() => sendEdit()}>
          Edit
        </span>
        <Link
          to={`/projects/${match.params.projectId}/tickets/${match.params.ticketId}`}
          className="mock-button"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default EditTicket;
