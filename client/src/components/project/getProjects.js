import React, { Component } from "react";

class GetProjects extends Component {

  setProjectsOne = (project) => {
    this.props.setProject(project)
  }

  deleteTicket = (id) => {
    this.props.delete(id)
  }

  renderProjects = () => {
    return this.props.projects.map(project => {
      return (
        <div className="project-item-wrap" key={project.name}>
          <h4 className="project-name">{project.name}</h4>
          <div className="mock-link" onClick={() => this.setProjectsOne(project)}>View</div>
          <div className="edit-delete">
            <span className="mock-link">Edit</span>
            <span className="mock-link" onClick={() => this.deleteTicket(project._id)}>Delete</span>
          </div>
        </div >
      );
    });
  };

  render() {
    return this.props.projects !== undefined ? (
      <span>
        <h3 className="project-head">All Projects</h3>
        <span>{this.renderProjects()}</span>
      </span>
    ) : (
        <div>Loading....</div>
      );
  }
}

export default GetProjects;
