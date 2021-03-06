import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthServices } from "../../services/auth.service";
import UserService from "../../services/user.service";
import { AuthContext } from "../shared/auth/authContext";

function GetProjects() {
  const [userInvites, setUserInvites] = useState([]);
  const [userMembers, setUserMembers] = useState([]);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    let invites = [];
    let members = [];
    if (!!context.user._id) {
      UserService.getUserInvites(context.user._id)
        .then((resp) => resp.json())
        .then((response) => {
          response.projects.map((project) => {
            if (project.invited.includes(context.user._id)) {
              invites.push(project);
            } else {
              members.push(project);
            }
          });
          setUserMembers(members);
          setUserInvites(invites);
          setRefreshProjects(false);
        })
        .catch((err) => {
          setRefreshProjects(false);
        });
    }
  }, [refreshProjects]);

  function sendInvResponse(projectId, didAccept) {
    UserService.sendInviteResponse(context.user._id, projectId, didAccept)
      .then((resp) => resp.json())
      .then((response) => setRefreshProjects(true))
      .catch((err) => console.log("error sending invite response"));
  }

  function renderProjects() {
    return userMembers.map((project) => {
      return (
        <span key={project.name}>
          <Link to={"/projects/" + project._id}>
            <div className="project-item-wrap">
              <h4 className="project-name">{project.name}</h4>
            </div>
          </Link>
        </span>
      );
    });
  }

  function renderInvites() {
    return userInvites.map((project) => {
      return (
        <span key={project.name}>
          <div className="project-item-wrap">
            <h4 className="project-name">{project.name}</h4>
            <Link to={"/projects/" + project._id} className="mock-button">
              Details
            </Link>
            <div>
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
          </div>
        </span>
      );
    });
  }

  return (
    <span>
      {userInvites.length > 0 ? (
        <span>
          <span>You've been invited to: {userInvites.length} Project</span>
          <span>{renderInvites()}</span>
        </span>
      ) : null}
      {userMembers.length > 0 ? (
        <span>
          <span>You're a member of the following projects: </span>
          <span>{renderProjects()}</span>
        </span>
      ) : null}
    </span>
  );
}

export default GetProjects;
