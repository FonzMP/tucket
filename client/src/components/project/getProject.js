import React, { useState, useEffect } from "react";

import CreateTicket from "../ticket/createTicket";
import { ticketServices } from "../../services/ticket.service";
// import { projectServices } from "../../services/project.service";
import GetTicket from "../ticket/getTicket";

function GetProject({ match, props, history }) {
  const [project, setProject] = useState({ name: "", tickets: [] });
  const [addTicket, setAddTicket] = useState(false);

  useEffect(match => {
    fetch("http://localhost:4000/projects/" + match.params.id, {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(response => setProject(response.project));
  }, []);

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

  // function setTicket(ticket) {
  //   props.setTicket(ticket);
  // }

  // function deleteTicketProject() {
  //   projectServices.deleteProject(project._id).then(result => {
  //     setProject(result);
  //     setAddTicket(false);
  //   });
  // }

  function displayTickets() {
    return project.tickets.map(ticket => {
      return <GetTicket ticket={ticket} key={ticket.title} />;
    });
  }

  return (
    <div className="project-wrapper">
      <span className="projectButtonWrap heading">
        <span>
          <h1>
            <span>Project Name:</span> {project.name}
          </h1>
        </span>
        <span>
          <span
            className="mock-button"
            onClick={() => history.push("/projects")}
          >
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
