export const projectServices = {
  getProject,
  getProjects,
  createProject,
  deleteProject
};

function getProjects() {
  return fetch("http://localhost:4000/projects")
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log("error on getProjects", err));
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
  return (fetch(`http://localhost:4000/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "applicatoin/json"
    }
  })
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log('error on ticket deletion', err)))
}