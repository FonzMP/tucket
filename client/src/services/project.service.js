const ProjectServices = {
  getProject,
  getProjects,
  createProject,
  deleteProject,
  editProject,
  editTicket,
  deleteTicket
};

function getProjects() {
  return fetch("http://localhost:4000/projects", { method: "GET" });
}
function createProject(project) {
  return fetch("http://localhost:4000/projects/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ project })
  });
}

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
