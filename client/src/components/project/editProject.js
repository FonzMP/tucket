import React, { Component } from "react";

import PROJECTCONSTANTS from '../../_constants/ProjectConstants'
import { projectServices } from '../../services/project.service'

const p = PROJECTCONSTANTS;

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.project.name,
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  editProject = () => {
    const project = { ...this.props.project, name: this.state.name }
    this.props.getEdit(project)
  };
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor={p.NAME}>
            Name:
          <input
              id={p.NAME}
              type="text"
              value={this.state.name}
              onChange={this.handleOnChange}
              placeholder={p.NAME_PLACE}
            />
          </label>
        </div>
        <div className="form-group">
          <button onClick={this.editProject}>{p.EDIT_BUTTON}</button>
        </div>
      </div >
    );
  }
}

export default EditProject;
