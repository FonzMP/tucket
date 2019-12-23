import React, { useState } from "react";
import TICKETCONSTANTS from "../../_constants/TicketConstants";
import TicketServices from "../../services/ticket.service";

const t = TICKETCONSTANTS;

function CreateTicket({ project, removeCreate }) {
  const [useProject] = useState(project);
  const [ticket, setTicket] = useState(project);

  function createNewTicket() {
    TicketServices.createTicket(useProject, ticket)
      .then(resp => resp.json())
      .then(response => removeCreate())
      .catch(err => console.log("error creating ticket"));
  }
  function sendTicket() {
    props.addTicket(ticket);
  }
  return (
    <div className="create-ticket-container">
      <div className="form-group">
        <label htmlFor={t.TITLE}>
          Title:
          <input
            id={t.TITLE}
            type="text"
            value={ticket.title}
            name="name"
            onChange={e =>
              setTicket({ ...ticket, [e.target.name]: e.target.value })
            }
            placeholder={t.TITLEPLACE}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor={t.DESCRIPTION}>
          Description:
          <textarea
            id={t.DESCRIPTION}
            type="text"
            rows="5"
            value={ticket.description}
            name="description"
            onChange={e =>
              setTicket({ ...ticket, [e.target.name]: e.target.value })
            }
            placeholder={t.DESCPLACE}
          />
        </label>
      </div>
      <div className="form-group">
        <div className="mock-button" onClick={() => createNewTicket()}>
          {t.CREATE_BUTTON}
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
