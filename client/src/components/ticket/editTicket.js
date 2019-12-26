import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import TICKETCONSTANTS from "../../_constants/TicketConstants";
import ProjectServices from "../../services/project.service";

const t = TICKETCONSTANTS;

function EditTicket({ match }) {
  const [ticket, setTicket] = useState({ title: "", description: "" });
  const [successUpdate, setSuccessUpdate] = useState(false);
  useEffect(() => {
    ProjectServices.getTicket(match.params.projectId, match.params.ticketId)
      .then(resp => resp.json())
      .then(response => setTicket(response.ticket))
      .catch(err => console.log("error getting ticket"));
  }, []);

  function sendEdit() {
    ProjectServices.editTicket(match.params.projectId, ticket)
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
        <label htmlFor={t.TITLE}>Title:</label>
        <input
          id={t.TITLE}
          type="text"
          name="title"
          value={ticket.title}
          onChange={e =>
            setTicket({ ...ticket, [e.target.id]: e.target.value })
          }
          placeholder={t.TITLEPLACE}
        />
      </div>
      <div className="form-group">
        <label htmlFor={t.DESCRIPTION}>Description:</label>
        <textarea
          id={t.DESCRIPTION}
          type="text"
          rows="5"
          name="description"
          value={ticket.description}
          onChange={e =>
            setTicket({ ...ticket, [e.target.id]: e.target.value })
          }
          placeholder={t.DESCPLACE}
        />
      </div>
      <div className="form-group">
        <button onClick={() => sendEdit()}>{t.EDIT_BUTTON}</button>
      </div>
    </div>
  );
}

export default EditTicket;
