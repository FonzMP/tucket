const UserService = {
  searchUsers,
  inviteUserToProject
};

function searchUsers(username) {
  return fetch(`http://localhost:4000/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function inviteUserToProject(projectId, userId) {
  return fetch(`http://localhost:4000/projects/${projectId}/invite/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export default UserService;
