import React, { useState, useEffect } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";

import GetProject from "./getProject";
import GetProjects from "./getProjects";
import CreateProject from "./createProject";
import EditProject from "./editProject";
import ViewTicket from "../ticket/viewTicket";
import EditTicket from "../ticket/editTicket";
import { AuthServices } from "../../services/auth.service";
import InviteMember from "../users/inviteMember";

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
            <PrivateRoute path="/projects/new" component={CreateProject} />
            <Route
              exact
              path={match.url + "/:projectId"}
              component={GetProject}
            />
            <PrivateRoute
              path={match.url + "/:projectId/edit"}
              component={EditProject}
            />
            <PrivateRoute
              path={match.url + "/:projectId/users/invite"}
              component={InviteMember}
            />
            <Route exact path={match.url} component={GetProjects} />
          </Switch>
        </div>
      </div>
    </span>
  );
}

function PrivateRoute({ component: ChildComponent, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !!AuthServices.getStorage() ? (
          <ChildComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
                error: "You must be logged in to do that"
              }
            }}
          />
        )
      }
    />
  );
}

export default ProjectRouting;
