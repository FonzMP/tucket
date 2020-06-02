import { AuthServices } from "./auth.service";

const UserService = {
  searchUsers,
  inviteUserToProject,
  getUserInvites,
  sendInviteResponse,
};

function searchUsers(username) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}

function inviteUserToProject(projectId, userId) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/projects/${projectId}/invite/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}

function getUserInvites(userId) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/users/${userId}/invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}

function sendInviteResponse(userId, projectId, didAccept) {
  const token = AuthServices.getToken();
  return fetch(`http://localhost:4000/users/${userId}/invites/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ accepted: didAccept }),
  });
}

export default UserService;
