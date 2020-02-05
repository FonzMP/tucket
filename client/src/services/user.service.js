const UserService = {
  searchUsers,
  inviteUserToProject,
  getUserInvites,
  sendInviteResponse
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
  return fetch(`http://localhost:4000/users/${userId}/invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function sendInviteResponse(userId, projectId, didAccept) {
  return fetch(`http://localhost:4000/users/${userId}/invites/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accepted: didAccept })
  });
}

export default UserService;
