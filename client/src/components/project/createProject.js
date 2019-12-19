import React, { useState } from "react";
import PROJECTCONSTANTS from "../../_constants/ProjectConstants";
import ProjectServices from "../../services/project.service";
import { Redirect } from "react-router-dom";

const p = PROJECTCONSTANTS;

function CreateProject() {
  const [project, setProject] = useState({ name: "" });
  const [successAdd, setSuccessAdd] = useState(false);

  function handleOnChange(e) {
    setProject({ ...project, [e.target.id]: e.target.value });
  }
  function createProject() {
    ProjectServices.createProject(project)
      .then(res => res.json())
      .then(response => setSuccessAdd(true))
      .catch(err => console.log("error creating new project"));
  }
  return (
    <div>
      {successAdd ? <Redirect to="/projects" /> : null}
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
