import React, { Component } from "react";
import { projectServices } from "../../services/project.service";

class GetProjects extends Component {
  constructor() {
    super();
    this.state = {
      projects: undefined
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    projectServices.getProjects().then(projects => {
      this.setState({
        projects
      });
    });
  };

  renderProjects = () => {
    return this.state.projects.map(project => {
      return (
        <span key={project.name}>
          <h3>{project.name}</h3>
        </span>
      );
    });
  };

  render() {
    return this.state.projects !== undefined ? (
      <div>{this.renderProjects()}</div>
    ) : (
        <div>Loading....</div>
      );
  }
}

export default GetProjects;
