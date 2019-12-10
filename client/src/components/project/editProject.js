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
        <label htmlFor={p.NAME}>
          Name:
          <input
            id={p.NAME}
            type="text"
            value={project.name}
            onChange={handleOnChange}
            placeholder={p.NAME_PLACE}
          />
        </label>
      </div>
      <div className="form-group">
        <button onClick={editProject}>{p.EDIT_BUTTON}</button>
      </div>
    </div>
  );
}

export default EditProject;
