import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import PROJECTCONSTANTS from "../../_constants/ProjectConstants";
import ProjectServices from "../../services/project.service";

const p = PROJECTCONSTANTS;

function EditProject({ match }) {
  const [updateProject, setUpdateProject] = useState({
    name: "",
    description: "",
    tickets: []
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    ProjectServices.getProject(match.params.projectId)
      .then(resp => resp.json())
      .then(response => setUpdateProject(response.project))
      .catch(err => console.log("error getting project"));
  }, []);

  function editProject() {
    ProjectServices.editProject(updateProject)
      .then(resp => resp.json())
      .then(response => setRedirect(true))
      .catch(err => console.log("error editing project"));
  }
  return (
    <div>
      {redirect ? <Redirect to={`/projects/${updateProject._id}`} /> : null}
      <div className="form-group">
        <label htmlFor={p.NAME}>{p.NAME_LABEL}</label>
        <input
          type="text"
          className="editInput"
          name="name"
          value={updateProject.name}
          onChange={e =>
            setUpdateProject({
              ...updateProject,
              [e.target.name]: e.target.value
            })
          }
          placeholder={p.NAME_PLACE}
        />
        <label htmlFor="description">Description</label>
        <textarea
          autoComplete="off"
          className="editInput"
          name="description"
          type="text"
          value={updateProject.description}
          onChange={e =>
            setUpdateProject({
              ...updateProject,
              [e.target.name]: e.target.value
            })
          }
          placeholder="Description"
          rows="5"
        />
      </div>
      <div className="form-group">
        <span className="projectButtonWrap">
          <span></span>
          <span>
            <div className="mock-button" onClick={() => editProject()}>
              {p.UPDATE_BUTTON}
            </div>
            <Link className="mock-button" to={`/projects/${updateProject._id}`}>
              {p.CANCEL_BUTTON}
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}

export default EditProject;
