import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectServices from "../../services/project.service";

function GetProjects() {
  const [projects, setProjects] = useState([]);
  const [refreshProjects, setRefreshProjects] = useState(false);

  useEffect(() => {
    ProjectServices.getProjects()
      .then(resp => resp.json())
      .then(response => {
        setProjects(response.projects);
        setRefreshProjects(false);
      });
  }, [refreshProjects]);

  function renderProjects() {
    return projects.map(project => {
      return (
        <span>
          <Link to={"/projects/" + project._id} key={project.name}>
            <div className="project-item-wrap">
              <h4 className="project-name">{project.name}</h4>
            </div>
          </Link>
        </span>
      );
    });
  }

  return <span>{renderProjects()}</span>;
}

export default GetProjects;
