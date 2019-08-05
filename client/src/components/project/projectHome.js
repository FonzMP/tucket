import React, { Component } from "react";
import CreateProject from "./createProject";
import GetProjects from "./getProjects";

class ProjectHome extends Component {
  constructor() {
    super();
    this.state = {
      window: 1
    };
  }

  openProject(index) {
    this.setState({
      window: index
    });
  }
  render() {
    return (
      <div>
        <h1>Projects</h1>
        <div className="project-flex">
          <div className="view-link-container">
            {this.state.window === 1 ? (
              <span className="view-link" onClick={e => this.openProject(null)}>
                Hide Projects
              </span>
            ) : (
              <span className="view-link" onClick={e => this.openProject(1)}>
                All Projects
              </span>
            )}
            {this.state.window === 2 ? (
              <span className="view-link" onClick={e => this.openProject(null)}>
                Close Project
              </span>
            ) : (
              <span className="view-link" onClick={e => this.openProject(2)}>
                Create Project
              </span>
            )}
          </div>
          <div className="project-container">
            {this.state.window === 1 ? <GetProjects /> : null}
            {this.state.window === 2 ? <CreateProject /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectHome;
