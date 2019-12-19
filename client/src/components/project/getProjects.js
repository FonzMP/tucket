import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditProject from "./editProject";
import { projectServices } from "../../services/project.service";

function GetProjects(props) {
  const [projects, setProjects] = useState([]);
  const [editView, setEditView] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    projectServices
      .getProjects()
      .then(resp => resp.json())
      .then(response => setProjects(response.projects));
  }, []);

  function setEdit(id) {
    if (id === currentId) {
      setEditView(false);
      setCurrentId(null);
    } else {
      setEditView(true);
      setCurrentId(id);
    }
  }
  function getEdit(project) {
    props.editProject(project);
    setEditView(false);
    setCurrentId(null);
  }
  function cancelEdit() {
    setEditView(false);
    setCurrentId(null);
  }

  function deleteTicket(id) {
    props.delete(id);
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
                onClick={() => deleteTicket(project._id)}
              >
                Delete
              </span>
            </div>
          </div>
          {editView && project._id === currentId ? (
            <EditProject
              project={project}
              getEdit={getEdit}
              cancelEdit={cancelEdit}
            />
          ) : null}
        </div>
      );
    });
  }

  return <span>{renderProjects()}</span>;
}

export default GetProjects;
