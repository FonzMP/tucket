export const projectServices = {
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
  })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on ticket creation, ", err));
}

function getProject(id) {
  return fetch(`http://localhost:4000/projects/${id}`)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on getProjects", err));
}

function deleteProject(id) {
  return fetch(`http://localhost:4000/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on ticket deletion", err));
}

function editProject(project) {
  return fetch(`http://localhost:4000/projects/${project._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ project })
  })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on ticket deletion", err));
}

function editTicket(id, ticket) {
  return fetch(`http://localhost:4000/projects/${id}/tickets`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ ticket })
  })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on editing ticket ", err));
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
  )
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on deleting ticket from project ", err));
}
