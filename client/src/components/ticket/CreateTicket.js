import React, { useState } from "react";
import TICKETCONSTANTS from "../../_constants/TicketConstants";

const t = TICKETCONSTANTS;

function CreateTicket(props) {
  const [ticket, setTicket] = useState({ title: "", description: "" });

  function handleOnChange(e) {
    setTicket({ ...ticket, [e.target.id]: e.target.value });
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
            onChange={e => handleOnChange(e)}
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
            onChange={e => handleOnChange(e)}
            placeholder={t.DESCPLACE}
          />
        </label>
      </div>
      <div className="form-group">
        <button onClick={() => sendTicket()}>{t.CREATE_BUTTON}</button>
      </div>
    </div>
  );
}

export default CreateTicket;
