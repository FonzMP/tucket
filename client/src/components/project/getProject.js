import React, { Component } from "react";
import { projectServices } from "../../services/project.service";
import { Link } from "react-router-dom";

class GetProject extends Component {
  constructor() {
    super();
    this.state = {
      project: undefined
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProject(id);
  }

  getProject = id => {
    projectServices.getProject(id).then(project => {
      this.setState({
        project
      });
    });
  };

  render() {
    return this.state.project !== undefined ? (
      <div className="project-wrapper">
        <h4>{this.state.project.name}</h4>
        <Link to="/projects/home">Back</Link>
      </div>
    ) : (
      <div>Loading....</div>
    );
  }
}

export default GetProject;
