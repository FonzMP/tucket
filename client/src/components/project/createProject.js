import React, { useState } from "react";
import PROJECTCONSTANTS from "../../_constants/ProjectConstants";
import { projectServices } from "../../services/project.service";

const p = PROJECTCONSTANTS;

function CreateProject() {
  const [project, setProject] = useState({ name: "" });

  function handleOnChange(e) {
    setProject({ ...project, [e.target.id]: e.target.value });
  }
  function sendProject() {
    projectServices
      .createProject(this.state)
      .then(result => this.props.grabNew(result));
  }
  return (
    <div>
      <div className="form-group">
        <label htmlFor={p.NAME}>
          Project Name:
          <input
            id={p.NAME}
            type="text"
            value={project.projName}
            onChange={handleOnChange}
            placeholder={p.NAME_PLACE}
          />
        </label>
      </div>
      <div className="form-group">
        <button onClick={sendProject}>{p.CREATE_BUTTON}</button>
      </div>
    </div>
  );
}

export default CreateProject;
