import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditProject from "./editProject";
import ProjectServices from "../../services/project.service";

function GetProjects() {
  const [projects, setProjects] = useState([]);
  const [refreshProjects, setRefreshProjects] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    ProjectServices.getProjects()
      .then(resp => resp.json())
      .then(response => {
        setProjects(response.projects);
        setRefreshProjects(false);
      });
  }, [refreshProjects, editId]);

  function deleteProject(id) {
    ProjectServices.deleteProject(id)
      .then(resp => resp.json())
      .then(response => setRefreshProjects(true))
      .catch(err => console.log("error deleting project"));
  }

  function setEdit(id) {
    if (id === editId) {
      setEditId(null);
    } else {
      setEditId(id);
    }
  }

  function renderProjects() {
    return projects.map(project => {
      return (
        <div className="project-item-wrap" key={project.name}>
          <h4 className="project-name">{project.name}</h4>
          <div className="projectButtonWrap">
            <Link className="mock-button" to={"/projects/" + project._id}>
              View
            </Link>
            <div className="edit-delete">
              <span
                className="mock-button"
                onClick={() => setEdit(project._id)}
              >
                Edit
              </span>
              <span
                className="mock-button"
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </span>
            </div>
          </div>
          {editId === project._id ? (
            <EditProject project={project} cancelEdit={() => setEditId(null)} />
          ) : null}
        </div>
      );
    });
  }

  return <span>{renderProjects()}</span>;
}

export default GetProjects;
