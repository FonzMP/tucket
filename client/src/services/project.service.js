import { AuthServices } from "./auth.service";

const ProjectServices = {
  getProject,
  getProjects,
  createProject,
  deleteProject,
  editProject,
  getTicket,
  addTicket,
  editTicket,
  deleteTicket,
  leaveProject,
};

// Fetch all projects
function getProjects() {
  const token = AuthServices.getToken();
  return fetch("http://localhost:4000/projects", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  });
}

// Get Project with id of :projectId
function getProject(projectId) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/projects/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}

// Create Project
function createProject(project) {
  const token = AuthServices.getToken();
  return fetch("http://localhost:4000/projects/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ project }),
  });
}

// edits project with project id of project._id and accepts project
function editProject(project) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/projects/${project._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ project }),
  });
}

// Deletes project with id of :projectId
function deleteProject(projectId) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  });
}

function leaveProject(projectId) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/projects/${projectId}/leave`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  });
}

// Gets ticket under :projectId with :ticketId
function getTicket(projectId, ticketId) {
  const token = AuthServices.getToken();
  return fetch(
    `http://localhost:4000/projects/${projectId}/tickets/${ticketId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    }
  );
}

// Create Ticket within Project of id :id
function addTicket(projectId, ticket) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/projects/${projectId}/tickets/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ ticket: ticket }),
  });
}

// edits a ticket - still needs worked
function editTicket(projectId, ticket) {
  const token = AuthServices.getToken();
  return fetch(
    `http://localhost:4000/projects/${projectId}/tickets/${ticket._id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ ticket }),
    }
  );
}

// deletes ticket with ticketId of :ticketId
function deleteTicket(projectId, ticketId) {
  const token = AuthServices.getToken();
  return fetch(
    `http://localhost:4000/projects/${projectId}/tickets/${ticketId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    }
  );
}

export default ProjectServices;
