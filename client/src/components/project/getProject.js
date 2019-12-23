import React, { useState, useEffect } from "react";

import CreateTicket from "../ticket/createTicket";
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
  }, [addTicket]);

  function addTicketToProject(ticket) {
    ProjectServices.addTicket(project._id, ticket)
      .then(resp => resp.json())
      .then(response => {
        setProject(response.project)
        setAddTicket(!addTicket)
      })
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
          <span className="mock-button" onClick={() => setAddTicket(!addTicket)}>
            Add Ticket
          </span>
        </span>
      </span>
      {addTicket ? (
        <CreateTicket
          project={project}
          removeCreate={() => setAddTicket(false)}
        />
      ) : null}
      {displayTickets()}
    </div>
  );
}

export default GetProject;
