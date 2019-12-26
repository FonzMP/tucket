import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";

import GetProject from "./getProject";
import GetProjects from "./getProjects";
import CreateProject from "./createProject";
import ViewTicket from "../ticket/viewTicket";
import EditTicket from "../ticket/editTicket";

function ProjectRouting({ match, location }) {
  const [window, setWindow] = useState(1);
  useEffect(() => {
    let currentPage = 1;
    if (location.pathname === "/projects/new") {
      currentPage = 2;
    }
    setWindow(currentPage);
  }, [location]);
  return (
    <span>
      <div className="projectHomeWrapper">
        <div className="view-link-container">
          <Link
            to="/projects"
            className={window === 1 ? "active view-link" : "view-link"}
            onClick={() => setWindow(1)}
          >
            Projects
          </Link>
          <Link
            to="/projects/new"
            className={window === 2 ? "active view-link" : "view-link"}
            onClick={() => setWindow(2)}
          >
            Create Project
          </Link>
        </div>
        <div className="project-container">
          <Switch>
            <Route
              exact
              path={match.url + "/:projectId/tickets/:ticketId"}
              component={ViewTicket}
            />
            <Route
              exact
              path={match.url + "/:projectId/tickets/:ticketId/edit"}
              component={EditTicket}
            />
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
