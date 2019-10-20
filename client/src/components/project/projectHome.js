import React, { Component } from "react";
import CreateProject from "./createProject";
import GetProjects from "./getProjects";
import GetProject from "./getProject";
import GetTicket from "../ticket/getTicket";
import { projectServices } from "../../services/project.service";

class ProjectHome extends Component {
  constructor() {
    super();
    this.state = {
      window: 1,
      loadingProject: false,
      loadingProjects: true,
      projects: null,
      project: null,
      ticket: null,
      ticketsDeleted: null
    };
  }

  componentDidMount() {
    this.setState({
      loadingProjects: true
    });
    this.getProjects();
  }

  openProject(index) {
    if (index === 3) {
      projectServices.getProject();
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

  setProject = project => {
    this.setState({
      project: project,
      window: 3
    });
  };

  setTicket = ticket => {
    this.setState({
      ticket: ticket,
      window: 4
    });
  };

  resetHome = () => {
    this.setState({
      window: 1
    });
  };
  grabNewProject = project => {
    this.setState({
      projects: [...this.state.projects, project]
    });
  };
  projectRefresh = () => {
    projectServices.getProjects().then(response => {
      this.setState({
        projects: response
      });
    });
  };
  editProject = newProject => {
    // need to fix edit to not change list order
    projectServices.editProject(newProject._id, newProject).then(result => {
      const updateList = this.state.projects.filter(
        proj => proj._id !== result._id
      );
      this.setState({
        projects: [...updateList, result]
      });
    });
  };
  deleteProject = id => {
    projectServices.deleteProject(id).then(result => {
      this.setState({
        projects: this.state.projects.filter(
          proj => proj._id !== result.project._id
        ),
        ticketsDeleted: result.deleted
      });
    });
  };
  resetToProject = () => {
    this.setState({
      window: 3
    });
  };
  sendEditTicket = ticket => {
    projectServices.editTicket(this.state.project._id, ticket).then(result => {
      console.log("result ", result);
      const updateList = this.state.projects.filter(
        proj => proj._id !== result._id
      );
      this.setState({
        projects: [...updateList, result]
      });
    });
  };
  render() {
    return (
      <div>
        <h1>Projects</h1>
        <div className="project-flex">
          <div className="view-link-container">
            {this.state.window === 1 || this.state.window === 3 ? (
              <span
                className="view-link"
                id="hide-all"
                onClick={() => this.openProject(null)}
              >
                Hide Projects
              </span>
            ) : (
              <span
                className="view-link"
                id="show-all"
                onClick={() => this.openProject(1)}
              >
                All Projects
              </span>
            )}
            {this.state.window === 2 ? (
              <span
                className="view-link"
                id="close-project-create"
                onClick={() => this.openProject(null)}
              >
                Close Project
              </span>
            ) : (
              <span
                className="view-link"
                id="open-project-create"
                onClick={() => this.openProject(2)}
              >
                Create Project
              </span>
            )}
          </div>
          <div className="project-container">
            {this.state.window === 1 ? (
              this.state.loadingProjects === true ? (
                <h3>Loading</h3>
              ) : (
                <GetProjects
                  projects={this.state.projects}
                  setProject={this.setProject}
                  delete={this.deleteProject}
                  editProject={this.editProject}
                />
              )
            ) : null}
            {this.state.window === 2 ? (
              <CreateProject grabNew={this.grabNewProject} />
            ) : null}
            {this.state.window === 3 ? (
              <GetProject
                project={this.state.project}
                setHome={this.resetHome}
                refreshProjects={this.projectRefresh}
                setTicket={this.setTicket}
              />
            ) : null}
            {this.state.window === 4 ? (
              <GetTicket
                ticket={this.state.ticket}
                resetWindow={this.resetToProject}
                editTicket={this.sendEditTicket}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectHome;
