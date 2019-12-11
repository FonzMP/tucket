import React, { useState } from "react";

import PROJECTCONSTANTS from "../../_constants/ProjectConstants";

const p = PROJECTCONSTANTS;

function EditProject(props) {
  const [project, setProject] = useState(props.project);

  function handleOnChange(e) {
    setProject({ [e.target.id]: e.target.value });
  }
  function editProject() {
    // modify edit
    props.getEdit(project);
  }
  return (
    <div>
      <div className="form-group">
        <label htmlFor={p.NAME}>{p.NAME_LABEL}</label>
        <input
          type="text"
          className="editInput"
          value={project.name}
          onChange={handleOnChange}
          placeholder={p.NAME_PLACE}
        />
      </div>
      <div className="form-group">
        <span className="projectButtonWrap">
          <span></span>
          <span>
            <div className="mock-button" onClick={editProject}>
              {p.UPDATE_BUTTON}
            </div>
            <div className="mock-button" onClick={() => props.cancelEdit()}>
              {p.CANCEL_BUTTON}
            </div>
          </span>
        </span>
      </div>
    </div>
  );
}

export default EditProject;
