const UserService = {
  searchUsers,
  inviteUserToProject,
  getUserInvites
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

function getUserInvites(userId) {
  return fetch(`http://localhost:4000/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export default UserService;
