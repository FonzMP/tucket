import React, { useState, useEffect } from "react";
import ProjectServices from "../../services/project.service";

function ViewTicket({ match }) {
  const [ticket, setTicket] = useState({ title: "", description: "" });
  useEffect(() => {
    ProjectServices.getTicket(match.params.projectId, match.params.ticketId)
      .then(resp => resp.json())
      .then(response => setTicket(response.ticket))
      .catch(err => console.log("error getting ticket ", err));
  }, []);
  return (
    <div>
      <p>Title: </p>
      <h4>{ticket.title}</h4>
      <p>Description: </p>
      <p>{ticket.description}</p>
    </div>
  );
}

export default ViewTicket;
