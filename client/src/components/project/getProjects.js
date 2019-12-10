import React, { useState } from "react";
import EditProject from "./editProject";

function GetProjects(props) {
  const [editView, setEditView] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  function setProjectsOne(project) {
    props.setProject(project);
  }

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

  function deleteTicket(id) {
    props.delete(id);
  }

  function renderProjects() {
    return props.projects.map(project => {
      return (
        <div className="project-item-wrap" key={project.name}>
          <h4 className="project-name">{project.name}</h4>
          <span
            className="mock-link"
            id="first-link"
            onClick={() => setProjectsOne(project)}
          >
            View
          </span>
          <div className="edit-delete">
            <span className="mock-link" onClick={() => setEdit(project._id)}>
              Edit
            </span>
            <span
              className="mock-link"
              onClick={() => deleteTicket(project._id)}
            >
              Delete
            </span>
          </div>
          {editView && project._id === currentId ? (
            <EditProject project={project} getEdit={getEdit} />
          ) : null}
        </div>
      );
    });
  }

  return props.projects !== undefined ? (
    <span>
      <h3 className="project-head">All Projects</h3>
      <span>{renderProjects()}</span>
    </span>
  ) : (
    <div>Loading....</div>
  );
}

export default GetProjects;
