import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditTicket from "./editTicket";
import ProjectServices from "../../services/project.service";

function GetTicket({ project, ticket, updateProject }) {
  const [viewTicket] = useState(ticket);

  function deleteTicket() {
    ProjectServices.deleteTicket(project._id, ticket._id)
      .then(resp => resp.json())
      .then(response => updateProject())
      .catch(err => console.log("error deleting ticket"));
  }

  return ticket !== undefined ? (
    <div className="project-ticket-container">
      <h1>{viewTicket.title}</h1>
      <p>{viewTicket.description}</p>
      <span className="projectButtonWrap">
        <span>
          <Link
            className="mock-button"
            id="first-link"
            to={"/projects/" + project._id + "/tickets/" + ticket._id}
          >
            View
          </Link>
        </span>
        <div className="edit-delete">
          <Link
            to={`/projects/${project._id}/tickets/${ticket._id}/edit`}
            className="mock-button"
          >
            Edit
          </Link>
          <span className="mock-button" onClick={() => deleteTicket()}>
            Delete
          </span>
        </div>
      </span>
    </div>
  ) : (
    <div>Loading....</div>
  );
}

export default GetTicket;
