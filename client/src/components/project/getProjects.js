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
        <div className="project-item-wrap">
          <h4 className="project-name">{project.name}</h4>
        </div>
      );
    });
  };

  render() {
    return this.state.projects !== undefined ? (
      <div className="project-wrapper">{this.renderProjects()}</div>
    ) : (
        <div>Loading....</div>
      );
  }
}

export default GetProjects;
