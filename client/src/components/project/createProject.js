import React, { useState } from "react";
import PROJECTCONSTANTS from "../../_constants/ProjectConstants";
import ProjectServices from "../../services/project.service";
import { Redirect } from "react-router-dom";
import Project from "../../models/project";

const p = PROJECTCONSTANTS;

function CreateProject() {
  const [project, setProject] = useState(new Project());
  const [successAdd, setSuccessAdd] = useState(false);
  const [isValid, setIsValid] = useState(false);

  function handleOnChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
    enableSubmit(e);
  }
  function createProject() {
    ProjectServices.createProject(project)
      .then(res => res.json())
      .then(response => setSuccessAdd(true))
      .catch(err => console.log("error creating new project"));
  }

  function enableSubmit(e) {
    const validName = /^[0-9a-zA-Z\s]*$/;
    if (e.target.name === "name") {
      setIsValid(e.target.value.match(validName));
    }
  }
  return (
    <div>
      {successAdd ? <Redirect to="/projects" /> : null}
      <h4>Create New Project</h4>
      <div className="form-group">
        <label htmlFor={p.NAME}>Name:</label>
        <input
          autoComplete="off"
          className="editInput"
          name="name"
          type="text"
          value={project.projName}
          onChange={e => handleOnChange(e)}
          placeholder={p.NAME_PLACE}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          autoComplete="off"
          className="editInput"
          name="description"
          type="text"
          value={project.description}
          onChange={e => handleOnChange(e)}
          placeholder="Description"
          rows="5"
        />
      </div>
      <div className="form-group">
        <button
          className="create"
          disabled={!isValid}
          onClick={() => createProject()}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateProject;
