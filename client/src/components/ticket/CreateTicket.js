import React, { useState } from "react";

import Ticket from "../../models/ticket";
import TICKETCONSTANTS from "../../_constants/TicketConstants";
import TicketServices from "../../services/ticket.service";

const t = TICKETCONSTANTS;

function CreateTicket({ project, removeCreate }) {
  const [useProject] = useState(project);
  const [ticket, setTicket] = useState(new Ticket());

  function handleOnChange(e) {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  }

  function createNewTicket() {
    TicketServices.createTicket(useProject, ticket)
      .then((resp) => resp.json())
      .then((response) => removeCreate())
      .catch((err) => console.log("error creating ticket"));
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
            name="title"
            autoComplete="off"
            onChange={(e) => handleOnChange(e)}
            placeholder={t.TITLEPLACE}
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor={t.DESCRIPTION}>
          Description:
          <textarea
            autoComplete="off"
            id={t.DESCRIPTION}
            type="text"
            rows="5"
            value={ticket.description}
            name="description"
            onChange={(e) => handleOnChange(e)}
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
