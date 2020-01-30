import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectServices from "../../services/project.service";
import { AuthServices } from "../../services/auth.service";
import UserService from "../../services/user.service";

function GetProjects() {
  const [projects, setProjects] = useState([]);
  const [userInvites, setUserInvites] = useState([]);
  const [refreshProjects, setRefreshProjects] = useState(false);

  useEffect(() => {
    ProjectServices.getProjects()
      .then(resp => resp.json())
      .then(response => {
        setProjects(response.projects);
        setRefreshProjects(false);
      });
    let { _id } = AuthServices.getStorage();
    UserService.getUserInvites(_id)
      .then(resp => resp.json())
      .then(response => setUserInvites(response.invites));
  }, [refreshProjects]);

  function renderProjects() {
    return projects.map(project => {
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
    return userInvites.map(project => {
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

  return (
    <span>
      {userInvites.length > 0 ? (
        <span>
          <span>You've been invited to: {userInvites.length} Project</span>
          <span>{renderInvites()}</span>
        </span>
      ) : null}
      <span>{renderProjects()}</span>
    </span>
  );
}

export default GetProjects;
