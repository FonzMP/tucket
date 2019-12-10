import React, { useState } from "react";

import CreateTicket from "../ticket/createTicket";
import { ticketServices } from "../../services/ticket.service";
import { projectServices } from "../../services/project.service";
import GetTickets from "../ticket/getTickets";

function GetProject(props) {
  const [project, setProject] = useState(props.project);
  const [addTicket, setAddTicket] = useState(false);
  function returnHome() {
    props.setHome();
  }
  function showCreate() {
    setAddTicket(!addTicket);
  }

  function addingTicket(ticket) {
    ticketServices.createTicket(project, ticket).then(response => {
      setProject(response);
      setAddTicket(false);
      props.refreshProjects();
    });
  }

  function setTicket(ticket) {
    props.setTicket(ticket);
  }

  function deleteTicketProject() {
    projectServices.deleteProject(project._id).then(result => {
      setProject(result);
      setAddTicket(false);
    });
  }

  function displayTickets() {
    return project.tickets.map(ticket => {
      return (
        <GetTickets
          ticket={ticket}
          key={ticket.title}
          setTicket={setTicket}
          deleteTicket={deleteTicketProject}
        />
      );
    });
  }

  return (
    <div className="project-wrapper">
      <h4>{project.name}</h4>
      <div className="link-wrapper">
        <span className="mock-link" onClick={returnHome}>
          Back
        </span>
        <span className="mock-link" onClick={showCreate}>
          Add Ticket
        </span>
      </div>
      {addTicket ? <CreateTicket addTicket={addingTicket} /> : null}
      {displayTickets()}
    </div>
  );
}

export default GetProject;
