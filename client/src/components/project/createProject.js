import React, { Component } from "react";

import PROJECTCONSTANTS from '../../_constants/ProjectConstants'
import { projectServices } from '../../services/project.service'

const p = PROJECTCONSTANTS;

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  sendProject = () => {
    projectServices
      .createProject(this.state)
      .then(result => this.props.grabNew(result));
  };
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor={p.NAME}>
            Project Name:
          <input
              id={p.NAME}
              type="text"
              value={this.state.projName}
              onChange={this.handleOnChange}
              placeholder={p.NAME_PLACE}
            />
          </label>
        </div>
        <div className="form-group">
          <button onClick={this.sendProject}>{p.CREATE_BUTTON}</button>
        </div>
      </div >
    );
  }
}

export default CreateProject;
