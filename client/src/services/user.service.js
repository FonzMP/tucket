const UserService = {
  searchUsers
};

function searchUsers(username) {
  return fetch(`http://localhost:4000/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export default UserService;
