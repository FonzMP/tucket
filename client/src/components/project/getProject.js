import React, { useState, useEffect } from "react";

import Project from "../../models/project";
import CreateTicket from "../ticket/createTicket";
import AlertModal from "../shared/alertModal";
import GetTicket from "../ticket/getTicket";
import ProjectServices from "../../services/project.service";
import { Redirect, Link } from "react-router-dom";

function GetProject({ match }) {
  const [project, setProject] = useState(new Project());
  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletedTicket, setDeletedTicket] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [addTicket, setAddTicket] = useState(false);

  useEffect(() => {
    ProjectServices.getProject(match.params.projectId)
      .then((resp) => resp.json())
      .then((response) => {
        setProject(response.project);
        setDeletedTicket(false);
      });
  }, [addTicket, deletedTicket, match]);

  function deleteProject() {
    if (confirm) {
      ProjectServices.deleteProject(project._id)
        .then((resp) => resp.json())
        .then((response) => setRedirect(true))
        .catch((err) => console.log("error deleting project"));
    } else {
      setShowModal(true);
      setConfirm(true);
    }
  }

  function cancelAndReset() {
    setShowModal(false);
    setConfirm(false);
  }

  function displayTickets() {
    return project.tickets.map((ticket) => {
      return (
        <GetTicket
          ticket={ticket}
          project={project}
          key={ticket.title}
          updateProject={() => setDeletedTicket(true)}
        />
      );
    });
  }

  return (
    <div>
      {showModal ? (
        <AlertModal
          message={"Delete this Project?"}
          confirm={() => deleteProject()}
          cancelAlert={() => cancelAndReset()}
        />
      ) : null}
      <div className="project-wrapper">
        {redirect ? <Redirect to="/projects" /> : null}
        <span className="projectButtonWrap heading">
          <span>
            <h1>
              <span>Project Name:</span> {project.name}
            </h1>
            {!!project.owner &&
            project.owner.username &&
            project.owner.username.length > 0 ? (
              <h3>
                <span>Owner:</span> {project.owner.username}
              </h3>
            ) : null}
          </span>
          <span>
            <Link className="mock-button" to={`/projects/${project._id}/edit`}>
              Edit
            </Link>
            <span
              className="mock-button"
              to="/projects"
              onClick={() => deleteProject()}
            >
              Delete
            </span>
            <Link className="mock-button" to="/projects">
              Back
            </Link>
            <span
              className="mock-button"
              onClick={() => setAddTicket(!addTicket)}
            >
              Add Ticket
            </span>
            <Link
              className="mock-button"
              to={`/projects/${match.params.projectId}/invite`}
            >
              Invite Member
            </Link>
          </span>
        </span>
        {addTicket ? (
          <CreateTicket
            project={project}
            removeCreate={() => setAddTicket(false)}
          />
        ) : null}
        {!!project.description ? (
          <span>
            <h4>Description:</h4>
            <p>{project.description}</p>
          </span>
        ) : null}
        {displayTickets()}
      </div>
    </div>
  );
}

export default GetProject;
