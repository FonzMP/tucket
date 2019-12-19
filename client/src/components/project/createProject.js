import React, { useState } from "react";
import PROJECTCONSTANTS from "../../_constants/ProjectConstants";
import { projectServices } from "../../services/project.service";

const p = PROJECTCONSTANTS;

function CreateProject() {
  console.log("create here ");
  const [project, setProject] = useState({ name: "" });

  function handleOnChange(e) {
    setProject({ ...project, [e.target.id]: e.target.value });
  }
  function createProject() {
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
        <span className="mock-link" onClick={() => createProject()}>
          View
        </span>
      </div>
    </div>
  );
}

export default CreateProject;
