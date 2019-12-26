const ProjectServices = {
  getProject,
  getProjects,
  createProject,
  deleteProject,
  editProject,
  getTicket,
  addTicket,
  editTicket,
  deleteTicket
};

// Fetch all projects
function getProjects() {
  return fetch("http://localhost:4000/projects", { method: "GET" });
}

// Get Project with id of :projectId
function getProject(projectId) {
  return fetch(`http://localhost:4000/projects/${projectId}`);
}

// Create Project
function createProject(project) {
  return fetch("http://localhost:4000/projects/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ project })
  });
}

// edits project with project id of project._id and accepts project
function editProject(project) {
  return fetch(`http://localhost:4000/projects/${project._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ project })
  });
}

// Deletes project with id of :projectId
function deleteProject(projectId) {
  return fetch(`http://localhost:4000/projects/${projectId}`, {
    method: "DELETE"
  });
}

// Gets ticket under :projectId with :ticketId
function getTicket(projectId, ticketId) {
  return fetch(
    `http://localhost:4000/projects/${projectId}/tickets/${ticketId}`,
    { method: "GET" }
  );
}

// Create Ticket within Project of id :id
function addTicket(projectId, ticket) {
  return fetch(`http://localhost:4000/projects/${projectId}/tickets/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ticket: ticket })
  });
}

// edits a ticket - still needs worked
function editTicket(projectId, ticket) {
  return fetch(
    `http://localhost:4000/projects/${projectId}/tickets/${ticket._id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ ticket })
    }
  );
}

// deletes ticket with ticketId of :ticketId
function deleteTicket(projectId, ticketId) {
  return fetch(
    `http://localhost:4000/projects/${projectId}/tickets/${ticketId}`,
    {
      method: "DELETE"
    }
  );
}

export default ProjectServices;
