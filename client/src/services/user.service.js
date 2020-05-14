import { AuthServices } from "./auth.service";

const UserService = {
  searchUsers,
  inviteUserToProject,
  getUserInvites,
  sendInviteResponse
};

const { token } = AuthServices.getStorage();

function searchUsers(username) {
  return fetch(`http://localhost:4000/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
}

function inviteUserToProject(projectId, userId) {
  return fetch(`http://localhost:4000/projects/${projectId}/invite/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
}

function getUserInvites(userId) {
  return fetch(`http://localhost:4000/users/${userId}/invites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
}

function sendInviteResponse(userId, projectId, didAccept) {
  return fetch(`http://localhost:4000/users/${userId}/invites/${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ accepted: didAccept })
  });
}

export default UserService;
