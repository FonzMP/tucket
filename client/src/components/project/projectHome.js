import React, { useState, useEffect } from "react";
import CreateProject from "./createProject";
import GetProjects from "./getProjects";
import GetProject from "./getProject";
import GetTicket from "../ticket/getTicket";
import { projectServices } from "../../services/project.service";

function ProjectHome() {
  const [window, setWindow] = useState(1);
  const [loadingProject, setLoadingProject] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [ticketsDeleted, setTicketsDeleted] = useState(null);

  useEffect(() => {
    setLoadingProjects(true);
    getProjects();
  }, []);

  function openProject(index) {
    if (index === 3) {
      projectServices.getProject();
    } else {
      setWindow(index);
    }
  }
  function getProjects() {
    projectServices.getProjects().then(projects => {
      setProjects(projects);
      setLoadingProjects(false);
    });
  }

  function setProjectView(project) {
    setProject(project);
    setWindow(3);
  }

  function setTicketView(ticket) {
    setTicket(ticket);
    setWindow(4);
  }

  function resetHome() {
    setWindow(1);
  }

  function grabNewProject(project) {
    setProjects(...projects, project);
  }
  function projectRefresh() {
    projectServices.getProjects().then(response => {
      setProjects(response);
    });
  }
  function editProject(newProject) {
    // need to fix edit to not change list order
    projectServices.editProject(newProject).then(result => {
      const updateList = projects.filter(proj => proj._id !== result._id);
      setProjects(...updateList, result);
    });
  }
  function deleteProject(id) {
    console.log("fix delete", id);
  }
  function resetToProject() {
    setWindow(3);
  }
  function sendEditTicket(ticket) {
    projectServices.editTicket(project._id, ticket).then(result => {
      const updateList = projects.filter(proj => proj._id !== result._id);
      setProjects(...updateList, result);
    });
  }
  return (
    <div className="project-container">
      <GetProjects
        projects={projects}
        setProject={setProjectView}
        delete={deleteProject}
        editProject={editProject}
      />
    </div>
  );
}

export default ProjectHome;
