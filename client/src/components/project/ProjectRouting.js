import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import GetProject from "./getProject";
import GetProjects from "./getProjects";
import CreateProject from "./createProject";

function ProjectRouting({ match }) {
  return (
    <span>
      <div className="projectHomeWrapper">
        <div className="view-link-container">
          <Link to="/projects" className="view-link">
            Projects
          </Link>
          <Link to="/projects/new" className="view-link">
            Create Project
          </Link>
        </div>
        <div className="project-container">
          <Switch>
            {console.log("projects ", match.url + "/new")}
            <Route exact path={match.url + "/new"} component={CreateProject} />
            <Route
              exact
              path={match.url + "/:projectId"}
              component={GetProject}
            />
            <Route exact path={match.url} component={GetProjects} />
          </Switch>
        </div>
      </div>
    </span>
  );
}

export default ProjectRouting;
