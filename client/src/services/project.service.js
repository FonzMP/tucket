const ProjectServices = {
  getProject,
  getProjects,
  createProject,
  addTicket,
  deleteProject,
  editProject,
  editTicket,
  deleteTicket
};

// Fetch all projects
function getProjects() {
  return fetch("http://localhost:4000/projects", { method: "GET" });
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

// Create Ticket within Project of id :id
function addTicket(projectId, ticket) {
  return fetch(`http://localhost:4000/projects/${projectId}/tickets/new`, {
    method: 'POST', headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ticket: ticket })
  })
}


// Get Project with id of :id
function getProject(id) {
  return fetch(`http://localhost:4000/projects/${id}`);
}

function deleteProject(id) {
  return fetch(`http://localhost:4000/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  });
}

function editProject(project) {
  return fetch(`http://localhost:4000/projects/${project._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ project })
  });
}

function editTicket(id, ticket) {
  return fetch(`http://localhost:4000/projects/${id}/tickets`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ ticket })
  });
}

function deleteTicket(projectId, ticketId) {
  return fetch(
    `http://localhost:4000/projects/${projectId}/tickets/${ticketId}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    }
  );
}

export default ProjectServices;
