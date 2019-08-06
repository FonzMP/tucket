import React, { Component } from "react";
import CreateProject from "./createProject";
import GetProjects from "./getProjects";
import GetProject from './getProject';
import { projectServices } from '../../services/project.service'

class ProjectHome extends Component {
  constructor() {
    super();
    this.state = {
      window: 1,
      loadingProject: false,
      loadingProjects: true,
      projects: null,
      project: null
    };
  }

  componentDidMount() {
    this.setState({
      loadingProjects: true
    })
    this.getProjects()
  }

  openProject(index) {
    if (index === 3) {
      projectServices.getProject()
    } else {
      this.setState({
        window: index
      });
    }
  }
  getProjects = () => {
    projectServices.getProjects().then(projects => {
      this.setState({
        projects: projects,
        loadingProjects: false
      });
    });
  };

  setProject = (project) => {
    this.setState({
      project: project,
      window: 3
    })
  }

  resetHome = () => {
    this.setState({
      window: 1
    })
  }
  grabNewProject = (project) => {
    this.setState({
      projects: [...this.state.projects, project]
    })
  }
  deleteProject = (id) => {
    projectServices.deleteProject(id).then(result => {
      let projectUpdate = this.state.projects.filter(proj => proj._id !== result._id)
      this.setState({
        projects: projectUpdate
      })
    })
  }
  render() {
    return (
      <div>
        <h1>Projects</h1>
        <div className="project-flex">
          <div className="view-link-container">
            {this.state.window === 1 || this.state.window === 3 ? (
              <span className="view-link" onClick={() => this.openProject(null)}>
                Hide Projects
              </span>
            ) : (
                <span className="view-link" onClick={() => this.openProject(1)}>
                  All Projects
              </span>
              )}
            {this.state.window === 2 ? (
              <span className="view-link" onClick={() => this.openProject(null)}>
                Close Project
              </span>
            ) : (
                <span className="view-link" onClick={() => this.openProject(2)}>
                  Create Project
              </span>
              )}
          </div>
          <div className="project-container">
            {this.state.window === 1 ? this.state.loadingProjects === true ? <h3>Loading</h3> : <GetProjects projects={this.state.projects} setProject={this.setProject} delete={this.deleteProject} /> : null}
            {this.state.window === 2 ? <CreateProject grabNew={this.grabNewProject} /> : null}
            {this.state.window === 3 ? <GetProject project={this.state.project} setHome={this.resetHome} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectHome;
