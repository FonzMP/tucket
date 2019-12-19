import React, { useState, useEffect } from "react";

import CreateTicket from "../ticket/createTicket";
import TicketServices from "../../services/ticket.service";
import GetTicket from "../ticket/getTicket";
import ProjectServices from "../../services/project.service";
import { Redirect } from "react-router-dom";

function GetProject({ match }) {
  const [project, setProject] = useState({ name: "", tickets: [] });
  const [redirect, setRedirect] = useState(false);
  const [addTicket, setAddTicket] = useState(false);

  useEffect(() => {
    ProjectServices.getProject(match.params.projectId)
      .then(resp => resp.json())
      .then(response => setProject(response.project));
  }, []);

  function showCreate() {
    setAddTicket(!addTicket);
  }

  function addingTicket(ticket) {
    TicketServices.createTicket(project, ticket)
      .then(resp => resp.json())
      .then(response => setProject(response.project))
      .catch(err => console.log("error fetching project"));
  }

  function displayTickets() {
    return project.tickets.map(ticket => {
      return <GetTicket ticket={ticket} key={ticket.title} />;
    });
  }

  return (
    <div className="project-wrapper">
      {redirect ? <Redirect to="/projects" /> : null}
      <span className="projectButtonWrap heading">
        <span>
          <h1>
            <span>Project Name:</span> {project.name}
          </h1>
        </span>
        <span>
          <span className="mock-button" onClick={() => setRedirect(true)}>
            Back
          </span>
          <span className="mock-button" onClick={showCreate}>
            Add Ticket
          </span>
        </span>
      </span>
      {addTicket ? <CreateTicket addTicket={addingTicket} /> : null}
      {displayTickets()}
    </div>
  );
}

export default GetProject;
