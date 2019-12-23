import React, { useState } from "react";

import PROJECTCONSTANTS from "../../_constants/ProjectConstants";
import ProjectServices from "../../services/project.service";

const p = PROJECTCONSTANTS;

function EditProject(props) {
  const [updateProject, setUpdateProject] = useState(props.project);
  const [redirect, setRedirect] = useState(false);

  function editProject() {
    ProjectServices.editProject(updateProject)
      .then(resp => resp.json())
      .then(response => setRedirect(true))
      .catch(err => console.log("error editing project"));
  }
  return (
    <div>
      {redirect ? props.cancelEdit() : null}
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
      </div>
      <div className="form-group">
        <span className="projectButtonWrap">
          <span></span>
          <span>
            <div className="mock-button" onClick={() => editProject()}>
              {p.UPDATE_BUTTON}
            </div>
            <div className="mock-button" onClick={() => props.cancelEdit(true)}>
              {p.CANCEL_BUTTON}
            </div>
          </span>
        </span>
      </div>
    </div>
  );
}

export default EditProject;
