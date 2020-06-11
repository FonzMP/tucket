import React, { useState, useEffect } from "react";

import Project from "../../models/project";
import CreateTicket from "../ticket/createTicket";
import AlertModal from "../shared/alertModal";
import GetTicket from "../ticket/getTicket";
import ProjectServices from "../../services/project.service";
import UserService from "../../services/user.service";
import { Redirect, Link } from "react-router-dom";
import { AuthServices } from "../../services/auth.service";

function GetProject({ match }) {
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [project, setProject] = useState(new Project());
  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletedTicket, setDeletedTicket] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [addTicket, setAddTicket] = useState(false);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [userId, setUserId] = useState();
  const [leftProject, setLeftProject] = useState(false);

  useEffect(() => {
    ProjectServices.getProject(match.params.projectId)
      .then((resp) => resp.json())
      .then((response) => {
        setUserId(AuthServices.getUserID());
        if (!!response.error) {
          setMessage(response.error);
          setShowError(true);
        } else if (!!response.success && !response.success) {
          setMessage("Sorry, there seems to have been an error.");
          setShowError(true);
        } else {
          setProject(response.project);
          setDeletedTicket(false);
        }
      });
  }, [refreshProjects, addTicket, deletedTicket, match]);

  function deleteProject() {
    if (!confirm) {
      setShowModal(true);
      setConfirm(true);
    } else {
      ProjectServices.deleteProject(project._id)
        .then((resp) => resp.json())
        .then((response) => setRedirect(true))
        .catch((err) => console.log("error deleting project"));
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

  function sendInvResponse(projectId, didAccept) {
    const id = AuthServices.getUserID();
    UserService.sendInviteResponse(id, projectId, didAccept)
      .then((resp) => resp.json())
      .then((response) => setRefreshProjects(true))
      .catch((err) => console.log("error sending invite response"));
    console.log("accepted ", didAccept);
  }

  function leaveProject() {
    ProjectServices.leaveProject(project._id)
      .then((resp) => resp.json())
      .then((response) => {
        setRefreshProjects(true);
        setLeftProject(true);
      });
  }

  return (
    <div>
      {leftProject ? <Redirect to="/projects" /> : null}
      {showModal ? (
        <AlertModal
          message={"Delete this Project?"}
          confirm={() => deleteProject()}
          cancelAlert={() => cancelAndReset()}
        />
      ) : null}
      {showError ? (
        <div>{message}</div>
      ) : (
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
              <Link
                className="mock-button"
                to={`/projects/${project._id}/edit`}
              >
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
          {project.invited.includes(userId) ? (
            <div>
              <div>Invite accept?</div>
              <span
                className="mock-button"
                onClick={() => sendInvResponse(project._id, true)}
              >
                Accept
              </span>
              <span
                className="mock-button"
                onClick={() => sendInvResponse(project._id, false)}
              >
                Decline
              </span>
            </div>
          ) : null}
        </div>
      )}
      {project.members.includes(userId) ? (
        <div class="mock-button" onClick={() => leaveProject()}>
          Leave Project
        </div>
      ) : null}
    </div>
  );
}

export default GetProject;
