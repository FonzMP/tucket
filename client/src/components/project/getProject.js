import React, { Component } from "react";

class GetProject extends Component {
  returnHome = () => {
    this.props.setHome()
  }
  render() {
    return (
      <div className="project-wrapper">
        <h4>{this.props.project.name}</h4>
        <div className="mock-link" onClick={this.returnHome} >Back</div>
      </div>
    )
  }
}

export default GetProject;
